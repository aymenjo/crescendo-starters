"use client";

import { ImagePlus } from "lucide-react";
import { type DragEvent, useState } from "react";
import { ui } from "@/content/interface";
import { coverUrl } from "@/lib/article-model";
import { uploadImage } from "@/lib/admin/upload";
import { IMAGE_ACCEPT } from "@/lib/images";
import { button } from "./buttons";
import { Field, FieldError, inputClass } from "./Field";

const t = ui.admin.images;

/**
 * Couverture (DESIGN.md § 12.7) : une zone de dépôt tiretée, puis l'aperçu en 16:10 recadré,
 * et juste dessous le texte alternatif obligatoire. Désactivée tant que l'article n'est pas enregistré :
 * les fichiers sont rangés sous `<article_id>/`.
 */
export function CoverField({
  articleId,
  path,
  alt,
  onPathChange,
  onAltChange,
  onUploadFailed,
  errors = {},
}: {
  articleId: string | null;
  path: string | null;
  alt: string;
  onPathChange: (path: string) => void;
  onAltChange: (alt: string) => void;
  onUploadFailed: () => void;
  errors?: { cover?: string; alt?: string };
}) {
  const [uploading, setUploading] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [dragging, setDragging] = useState(false);
  const disabled = !articleId || uploading;

  async function upload(file: File | undefined) {
    if (!file || !articleId) return;
    setFormatError(false);
    setUploading(true);
    const result = await uploadImage(articleId, file);
    setUploading(false);
    if (result.ok) onPathChange(result.path);
    else if (result.error === "format") setFormatError(true);
    else onUploadFailed();
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    setDragging(false);
    if (!disabled) void upload(event.dataTransfer.files[0]);
  }

  const zoneError = formatError ? t.formatError : errors.cover;
  const input = (
    <input
      id="cover"
      type="file"
      accept={IMAGE_ACCEPT}
      disabled={disabled}
      className="sr-only"
      aria-invalid={!!zoneError || undefined}
      aria-describedby={zoneError ? "cover-error" : !articleId ? "cover-hint" : undefined}
      onChange={(e) => {
        void upload(e.target.files?.[0]);
        e.target.value = "";
      }}
    />
  );

  return (
    <div className="grid content-start gap-6">
      <div className="grid content-start gap-2" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
        <span className="text-[15px] font-medium">{t.cover}</span>
        {path ? (
          <>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-rule bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element -- aperçu de l'admin, servi par le stockage */}
              <img src={coverUrl(path)} alt="" data-cover-preview className="size-full object-cover" />
            </div>
            <label className={`${button.secondary} justify-self-start focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink ${disabled ? "cursor-not-allowed text-ink-2" : "cursor-pointer"}`}>
              {uploading ? t.uploading : t.replace}
              {input}
            </label>
          </>
        ) : (
          <label
            onDragEnter={() => setDragging(true)}
            onDragLeave={() => setDragging(false)}
            className={`flex aspect-[16/10] flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ink ${
              zoneError ? "border-danger" : "border-rule-strong"
            } ${disabled ? "cursor-not-allowed bg-paper text-ink-2" : `cursor-pointer ${dragging ? "bg-raised" : "bg-surface hover:bg-raised"}`}`}
          >
            <ImagePlus size={20} strokeWidth={1.75} aria-hidden className="text-ink-2" />
            <span className="font-medium">{uploading ? t.uploading : t.drop}</span>
            <span className="cote">{t.formats}</span>
            {input}
          </label>
        )}
        {!articleId && (
          <p id="cover-hint" className="cote">
            {t.saveFirst}
          </p>
        )}
        {zoneError && <FieldError id="cover-error">{zoneError}</FieldError>}
      </div>
      <Field id="cover-alt" label={t.coverAlt} error={errors.alt}>
        <input
          id="cover-alt"
          value={alt}
          onChange={(e) => onAltChange(e.target.value)}
          aria-invalid={!!errors.alt || undefined}
          aria-describedby={errors.alt ? "cover-alt-error" : undefined}
          className={inputClass(!!errors.alt, "h-12")}
        />
      </Field>
    </div>
  );
}
