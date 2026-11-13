"use client";

import { AlertCircle, ArrowLeft, ChevronDown, Lock } from "lucide-react";
import { useCallback, useDeferredValue, useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import {
  deleteArticle,
  publishArticle,
  saveArticle,
  unpublishArticle,
  updateArticle,
} from "@/app/admin/(app)/articles/actions";
import { ui } from "@/content/interface";
import { type ArticleInput, fromArticle, type SaveResult } from "@/lib/admin/article-input";
import { type Article, type ArticleCategory, CATEGORIES, CATEGORY_KEYS } from "@/lib/article-model";
import { formatTime } from "@/lib/dates";
import { Markdown } from "@/lib/markdown";
import { insertBlock } from "@/lib/images";
import { missingForPublish, PUBLISH_FIELDS, type PublishField } from "@/lib/publish";
import { slugify } from "@/lib/slug";
import { AdminLink } from "./AdminLink";
import { button } from "./buttons";
import { CoverField } from "./CoverField";
import { DeleteDialog } from "./DeleteDialog";
import { Field, FieldError, inputClass } from "./Field";
import { ImageDialog } from "./ImageDialog";

const t = ui.admin.editor;
const ti = ui.admin.images;
const SEO_TITLE_MAX = 60;
const META_DESCRIPTION_MAX = 155;
const SITE_SUFFIX = " — Crescendo";

const EMPTY: ArticleInput = {
  id: null,
  title: "",
  excerpt: "",
  category: null,
  body: "",
  slug: "",
  seoTitle: "",
  metaDescription: "",
  coverPath: null,
  coverAlt: "",
};

type FieldErrors = Partial<Record<PublishField, string>>;
type Banner = { kind: "failed" } | { kind: "missing"; fields: PublishField[] } | null;
type Action = (input: ArticleInput) => Promise<SaveResult>;

/** Le champ du formulaire dont l'erreur s'efface quand on le modifie. */
const FIELD_OF: Partial<Record<keyof ArticleInput, PublishField>> = {
  title: "title",
  excerpt: "excerpt",
  category: "category",
  body: "body",
  slug: "slug",
  coverPath: "cover",
  coverAlt: "coverAlt",
};

const noop = () => () => {};

/** Les champs comparés pour savoir s'il reste des modifications non enregistrées. */
const snapshot = (v: ArticleInput) => JSON.stringify(v);

/**
 * Éditeur d'article (DESIGN.md § 12.7) : barre d'actions collante, métadonnées, panneau SEO,
 * Markdown à gauche et aperçu au rendu exact à droite (le moteur de la page article).
 */
export function Editor({ initial, siteHost }: { initial: Article | null; siteHost: string }) {
  const [values, setValues] = useState<ArticleInput>(() => (initial ? fromArticle(initial) : EMPTY));
  const [article, setArticle] = useState<Article | null>(initial);
  const [saved, setSaved] = useState(() => snapshot(initial ? fromArticle(initial) : EMPTY));
  // Le slug suit le titre tant qu'il n'a pas été modifié à la main.
  const [slugTouched, setSlugTouched] = useState(() => (initial ? initial.slug !== slugify(initial.title) : false));
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState<Banner>(null);
  const [pending, startTransition] = useTransition();
  // Vrai après l'hydratation : les tests attendent que l'éditeur réagisse à la saisie.
  const ready = useSyncExternalStore(noop, () => true, () => false);

  const dirty = snapshot(values) !== saved;
  const status = article?.status ?? "draft";
  // Le slug est figé dès la première publication, comme en base.
  const slugLocked = !!article?.first_published_at;

  const update = useCallback(
    <K extends keyof ArticleInput>(key: K, value: ArticleInput[K]) => {
      setValues((current) => {
        const next = { ...current, [key]: value };
        if (key === "title" && !slugTouched && !slugLocked) next.slug = slugify(String(value));
        return next;
      });
      const field = FIELD_OF[key];
      if (field) setErrors((e) => ({ ...e, [field]: undefined, ...(key === "title" ? { slug: undefined } : {}) }));
    },
    [slugLocked, slugTouched],
  );

  /** « Pour publier, il manque : » en tête de l'éditeur, et chaque champ concerné en erreur. */
  function showMissing(fields: PublishField[]) {
    setBanner({ kind: "missing", fields });
    setErrors(Object.fromEntries(fields.map((f) => [f, t.requiredToPublish])));
  }

  /** Applique le résultat d'un enregistrement ; renvoie vrai s'il a réussi. */
  const apply = useCallback((result: SaveResult, sent: ArticleInput) => {
    if (!result.ok) {
      if (result.error === "title_missing") setErrors({ title: t.titleMissing });
      else if (result.error === "slug_invalid") setErrors({ slug: t.slugInvalid });
      else if (result.error === "slug_taken") setErrors({ slug: t.slugTaken(result.takenBy) });
      else if (result.error === "incomplete") showMissing(result.missing);
      else setBanner({ kind: "failed" });
      return false;
    }
    const savedArticle = result.article;
    const savedValues = { ...sent, id: savedArticle.id, slug: savedArticle.slug };
    setArticle(savedArticle);
    setSaved(snapshot(savedValues));
    setValues((current) => ({ ...current, id: savedArticle.id, slug: current.slug === sent.slug ? savedArticle.slug : current.slug }));
    setSavedAt(new Date());
    setErrors({});
    setBanner(null);
    // Premier enregistrement : l'adresse devient celle de l'article, sans recharger l'éditeur.
    if (!sent.id) window.history.replaceState(null, "", `/admin/articles/${savedArticle.id}`);
    return true;
  }, []);

  const run = useCallback(
    (action: Action, { requiresComplete = false } = {}) => {
      if (pending) return;
      const sent = values;
      // Publier ou mettre à jour : on liste ce qui manque avant tout envoi. Le serveur et la base revérifient.
      if (requiresComplete) {
        const missing = missingForPublish(sent);
        if (missing.length > 0) return showMissing(missing);
      }
      setBanner(null);
      startTransition(async () => {
        try {
          apply(await action(sent), sent);
        } catch {
          // Réseau coupé ou serveur en erreur : le texte reste dans l'éditeur.
          setBanner({ kind: "failed" });
        }
      });
    },
    [apply, pending, values],
  );

  const save = useCallback(() => run(saveArticle), [run]);
  const publish = useCallback(() => run(publishArticle, { requiresComplete: true }), [run]);
  const updateOnline = useCallback(() => run(updateArticle, { requiresComplete: true }), [run]);
  const unpublish = useCallback(() => run(unpublishArticle), [run]);

  // Cmd/Ctrl + S enregistre : un brouillon reste en brouillon, un article publié est mis à jour en ligne.
  const primarySave = status === "published" ? updateOnline : save;
  const saveRef = useRef(primarySave);
  useEffect(() => {
    saveRef.current = primarySave;
  }, [primarySave]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Quitter avec des modifications non enregistrées : l'avertissement natif du navigateur.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  // « Ajouter une image » : le curseur est mémorisé à l'ouverture, le focus revient au bouton à la fermeture.
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const imageButtonRef = useRef<HTMLButtonElement>(null);
  const selection = useRef({ start: 0, end: 0 });
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  function openImageDialog() {
    const el = bodyRef.current;
    selection.current = el ? { start: el.selectionStart, end: el.selectionEnd } : { start: values.body.length, end: values.body.length };
    setImageDialogOpen(true);
  }

  function insertImage(markdown: string) {
    const { start, end } = selection.current;
    const { text, cursor } = insertBlock(values.body, start, end, markdown);
    update("body", text);
    selection.current = { start: cursor, end: cursor };
  }

  const failUpload = useCallback(() => setBanner({ kind: "failed" }), []);

  const [deleting, setDeleting] = useState(false);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const body = useDeferredValue(values.body);
  const marker = values.category ? CATEGORIES[values.category].marker : undefined;

  const seoTitleLength = `${(values.seoTitle.trim() || values.title.trim())}${SITE_SUFFIX}`.length;
  const metaLength = (values.metaDescription.trim() || values.excerpt.trim()).length;

  const saveState = pending ? t.saving : dirty ? t.unsaved : savedAt ? t.savedAt(formatTime(savedAt)) : "";

  return (
    <div data-editor data-ready={ready || undefined}>
      <div className="sticky top-14 z-20 border-b border-rule bg-paper">
        <div className="mx-auto flex min-h-16 max-w-[1440px] items-center justify-between gap-6 px-8">
          <div className="flex min-w-0 items-center gap-6">
            <AdminLink href="/admin" className={button.ghost}>
              <ArrowLeft size={18} strokeWidth={1.75} aria-hidden />
              {t.back}
            </AdminLink>
            <span className="cote" data-article-status>
              {ui.admin.status[status]}
            </span>
            <span className="cote" role="status" aria-live="polite">
              {saveState}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {values.id && (
              <button
                ref={deleteButtonRef}
                type="button"
                onClick={() => setDeleting(true)}
                disabled={pending}
                className={`${button.ghost} mr-3`}
              >
                {t.delete}
              </button>
            )}
            {status === "published" ? (
              <>
                <a href={`/blog/${article?.slug}`} target="_blank" rel="noopener" className={`${button.ghost} mr-3`}>
                  {t.viewOnline}
                </a>
                <button type="button" onClick={unpublish} disabled={pending} className={button.secondary}>
                  {t.unpublish}
                </button>
                <button type="button" onClick={updateOnline} disabled={pending} className={button.action}>
                  {t.update}
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={save} disabled={pending} className={button.secondary}>
                  {t.save}
                </button>
                <button type="button" onClick={publish} disabled={pending} className={button.action}>
                  {t.publish}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-[1440px] gap-8 px-8 py-8">
        <h1 className="sr-only">{values.title.trim() || t.newTitle}</h1>

        {banner && (
          <div role="alert" className="flex items-start gap-3 rounded-lg border border-danger bg-surface p-6 text-danger">
            <AlertCircle size={20} strokeWidth={1.75} aria-hidden className="mt-0.5 flex-none" />
            {banner.kind === "failed" ? (
              <p className="font-medium">{t.saveFailed}</p>
            ) : (
              <div className="grid gap-2">
                <p className="font-medium">{t.missing}</p>
                <ul role="list" className="grid gap-1 text-ink">
                  {banner.fields.map((field) => (
                    <li key={field}>{PUBLISH_FIELDS[field]}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <section className="grid grid-cols-2 gap-8">
          <Field id="title" label={t.title} error={errors.title} className="col-span-2">
            <input
              id="title"
              value={values.title}
              onChange={(e) => update("title", e.target.value)}
              aria-invalid={!!errors.title || undefined}
              aria-describedby={errors.title ? "title-error" : undefined}
              className={inputClass(!!errors.title, "h-14 text-xl font-medium")}
            />
          </Field>
          <div className="grid content-start gap-6 self-start">
            <Field id="excerpt" label={t.excerpt} error={errors.excerpt} hint={<p className="cote">{t.excerptHint}</p>}>
              <textarea
                id="excerpt"
                rows={3}
                value={values.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                aria-invalid={!!errors.excerpt || undefined}
                aria-describedby={errors.excerpt ? "excerpt-error" : undefined}
                className={inputClass(!!errors.excerpt, "resize-y py-3")}
              />
            </Field>
            <Field id="category" label={t.category} error={errors.category}>
              <div className="relative">
                <select
                  id="category"
                  value={values.category ?? ""}
                  onChange={(e) => update("category", (e.target.value || null) as ArticleCategory | null)}
                  aria-invalid={!!errors.category || undefined}
                  aria-describedby={errors.category ? "category-error" : undefined}
                  className={inputClass(!!errors.category, "h-12 appearance-none pr-12")}
                >
                  <option value="">{t.categoryPlaceholder}</option>
                  {CATEGORY_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {CATEGORIES[key].label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  strokeWidth={1.75}
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-2"
                />
              </div>
            </Field>
          </div>
          <CoverField
            articleId={values.id}
            path={values.coverPath}
            alt={values.coverAlt}
            onPathChange={(path) => update("coverPath", path)}
            onAltChange={(alt) => update("coverAlt", alt)}
            onUploadFailed={failUpload}
            errors={{ cover: errors.cover, alt: errors.coverAlt }}
          />
        </section>

        <details open className="rounded-lg border border-rule bg-surface p-6">
          <summary className="cursor-pointer font-medium">{t.seo}</summary>
          <div className="mt-6 grid grid-cols-2 gap-8">
            <Field
              id="seo-title"
              label={t.seoTitle}
              aside={<Counter value={seoTitleLength} max={SEO_TITLE_MAX} />}
              hint={seoTitleLength > SEO_TITLE_MAX ? <p className="text-sm text-ink">{t.seoTitleTooLong}</p> : null}
            >
              <input
                id="seo-title"
                value={values.seoTitle}
                placeholder={values.title}
                onChange={(e) => update("seoTitle", e.target.value)}
                className={inputClass(false, "h-12")}
              />
            </Field>
            <Field
              id="meta-description"
              label={t.metaDescription}
              aside={<Counter value={metaLength} max={META_DESCRIPTION_MAX} />}
              hint={metaLength > META_DESCRIPTION_MAX ? <p className="text-sm text-ink">{t.metaDescriptionTooLong}</p> : null}
            >
              <textarea
                id="meta-description"
                rows={2}
                value={values.metaDescription}
                placeholder={values.excerpt}
                onChange={(e) => update("metaDescription", e.target.value)}
                className={inputClass(false, "resize-y py-3")}
              />
            </Field>
            <div className="col-span-2 grid gap-2">
              <label htmlFor="slug" className="text-[15px] font-medium">
                {t.slug}
              </label>
              <div className="flex">
                <span className="cote flex items-center rounded-l-md border border-r-0 border-rule-strong bg-surface px-3">
                  {siteHost}/blog/
                </span>
                {slugLocked ? (
                  <input
                    id="slug"
                    value={values.slug}
                    readOnly
                    aria-describedby="slug-locked"
                    className="h-12 w-full rounded-r-md border border-rule-strong bg-raised px-4 font-mono text-[15px] text-ink"
                  />
                ) : (
                  <input
                    id="slug"
                    value={values.slug}
                    spellCheck={false}
                    autoCapitalize="off"
                    onChange={(e) => {
                      setSlugTouched(true);
                      update("slug", e.target.value);
                    }}
                    aria-invalid={!!errors.slug || undefined}
                    aria-describedby={errors.slug ? "slug-error" : undefined}
                    className={inputClass(!!errors.slug, "h-12 rounded-l-none font-mono text-[15px]")}
                  />
                )}
              </div>
              {slugLocked && (
                <p id="slug-locked" className="flex items-center gap-2 text-sm text-ink-2">
                  <Lock size={18} strokeWidth={1.75} aria-hidden />
                  {t.slugLocked}
                </p>
              )}
              {errors.slug && <FieldError id="slug-error">{errors.slug}</FieldError>}
            </div>
          </div>
        </details>

        <section className="grid h-[calc(100dvh-7.5rem)] min-h-[480px] grid-cols-2 gap-8">
          <div className="flex min-h-0 flex-col gap-3">
            <div className="flex min-h-11 items-center justify-between gap-4">
              <label htmlFor="body" className="cote">
                {t.body}
              </label>
              <div className="flex items-center gap-3">
                {!values.id && (
                  <span id="add-image-hint" className="cote">
                    {ti.saveFirst}
                  </span>
                )}
                <button
                  ref={imageButtonRef}
                  type="button"
                  onClick={openImageDialog}
                  disabled={!values.id}
                  aria-describedby={values.id ? undefined : "add-image-hint"}
                  className={button.secondary}
                >
                  {ti.add}
                </button>
              </div>
            </div>
            <textarea
              ref={bodyRef}
              id="body"
              value={values.body}
              onChange={(e) => update("body", e.target.value)}
              spellCheck
              aria-invalid={!!errors.body || undefined}
              aria-describedby={errors.body ? "body-error" : undefined}
              className={`min-h-0 flex-1 resize-none overflow-y-auto rounded-md border bg-surface p-4 font-mono text-[15px] leading-[1.6] text-ink ${
                errors.body ? "border-danger" : "border-rule-strong"
              }`}
            />
            {errors.body && <FieldError id="body-error">{errors.body}</FieldError>}
          </div>
          <div className="flex min-h-0 flex-col gap-3">
            <div className="flex min-h-11 items-center">
              <p className="cote">{t.preview}</p>
            </div>
            <div data-preview className="min-h-0 flex-1 overflow-y-auto rounded-lg border border-rule bg-paper p-6">
              <Markdown source={body} marker={marker} />
            </div>
          </div>
        </section>
      </main>

      {values.id && (
        <ImageDialog
          articleId={values.id}
          open={imageDialogOpen}
          onClose={() => {
            setImageDialogOpen(false);
            imageButtonRef.current?.focus();
          }}
          onInsert={insertImage}
          onUploadFailed={failUpload}
        />
      )}

      {values.id && (
        <DeleteDialog
          open={deleting}
          title={values.title.trim() || article?.title || ""}
          onCancel={() => {
            setDeleting(false);
            deleteButtonRef.current?.focus();
          }}
          onConfirm={async () => {
            const id = values.id;
            if (!id) return;
            try {
              // En cas de succès, l'action renvoie vers la liste.
              await deleteArticle(id);
              setBanner({ kind: "failed" });
            } catch {
              setBanner({ kind: "failed" });
            }
            setDeleting(false);
          }}
        />
      )}
    </div>
  );
}

/** Compteur en cote (« 52 / 60 ») : au-delà de la limite, il passe en encre 500. Jamais en `danger`. */
function Counter({ value, max }: { value: number; max: number }) {
  return (
    <span className={`cote tabular-nums ${value > max ? "font-medium text-ink" : ""}`}>
      {value} / {max}
    </span>
  );
}
