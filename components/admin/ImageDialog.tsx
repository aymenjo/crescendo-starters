"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { ui } from "@/content/interface";
import { coverUrl } from "@/lib/article-model";
import { uploadImage } from "@/lib/admin/upload";
import { IMAGE_ACCEPT, imageMarkdown, validateImage } from "@/lib/images";
import { button } from "./buttons";
import { Field, inputClass } from "./Field";

const t = ui.admin.images;

/**
 * « Ajouter une image » (DESIGN.md § 12.7) : un `<dialog>` modal (focus piégé, Échap ferme) avec le fichier,
 * l'aperçu et le texte alternatif obligatoire. « Insérer » téléverse l'image et l'insère au curseur.
 */
export function ImageDialog({
  articleId,
  open,
  onClose,
  onInsert,
  onUploadFailed,
}: {
  articleId: string;
  open: boolean;
  onClose: () => void;
  onInsert: (markdown: string) => void;
  onUploadFailed: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [errors, setErrors] = useState<{ file?: string; alt?: string }>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  function reset() {
    setFile(null);
    setPreview(null);
    setAlt("");
    setErrors({});
  }

  function choose(next: File | undefined) {
    setErrors((e) => ({ ...e, file: undefined }));
    if (!next) return;
    if (!validateImage(next)) {
      setFile(null);
      setPreview(null);
      setErrors((e) => ({ ...e, file: t.formatError }));
      return;
    }
    setFile(next);
    setPreview(URL.createObjectURL(next));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = { file: file ? undefined : (errors.file ?? t.fileMissing), alt: alt.trim() ? undefined : t.altMissing };
    setErrors(nextErrors);
    if (!file || nextErrors.alt) return;

    setUploading(true);
    const result = await uploadImage(articleId, file);
    setUploading(false);
    if (result.ok) {
      onInsert(imageMarkdown(alt, coverUrl(result.path)));
      reset();
      onClose();
    } else if (result.error === "format") {
      setErrors({ file: t.formatError });
    } else {
      onUploadFailed();
    }
  }

  return (
    <dialog
      ref={dialog}
      aria-labelledby="image-dialog-title"
      onClose={() => {
        reset();
        onClose();
      }}
      className="m-auto w-full max-w-[560px] rounded-xl border border-rule bg-surface p-0 text-ink backdrop:bg-ink/40"
    >
      <form onSubmit={submit} noValidate className="grid gap-6 p-8">
        <h2 id="image-dialog-title" className="t-h3">
          {t.add}
        </h2>
        <Field id="image-file" label={t.file} error={errors.file} hint={<p className="cote">{t.formats}</p>}>
          <input
            id="image-file"
            type="file"
            accept={IMAGE_ACCEPT}
            onChange={(e) => choose(e.target.files?.[0])}
            aria-invalid={!!errors.file || undefined}
            aria-describedby={errors.file ? "image-file-error" : undefined}
            className={inputClass(!!errors.file, "py-3 text-[15px] file:mr-4 file:rounded-sm file:border file:border-rule-strong file:bg-surface file:px-3 file:py-1 file:font-medium")}
          />
        </Field>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element -- aperçu local du fichier choisi
          <img src={preview} alt="" className="max-h-64 w-full rounded-lg border border-rule bg-paper object-contain" />
        )}
        <Field id="image-alt" label={t.alt} error={errors.alt}>
          <input
            id="image-alt"
            value={alt}
            onChange={(e) => {
              setAlt(e.target.value);
              setErrors((x) => ({ ...x, alt: undefined }));
            }}
            aria-invalid={!!errors.alt || undefined}
            aria-describedby={errors.alt ? "image-alt-error" : undefined}
            className={inputClass(!!errors.alt, "h-12")}
          />
        </Field>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => dialog.current?.close()} className={button.secondary}>
            {t.cancel}
          </button>
          <button type="submit" disabled={uploading} className={button.action}>
            {uploading ? t.uploading : t.insert}
          </button>
        </div>
      </form>
    </dialog>
  );
}
