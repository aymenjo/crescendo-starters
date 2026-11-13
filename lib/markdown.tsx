import { Children, Fragment, isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Marker, type MarkerColor } from "@/components/ui/Marker";
import { linkClass, Need } from "@/components/ui/Rich";
import { highlight } from "@/lib/highlight";
import { NEED_PATTERN } from "@/lib/need";

/**
 * Le moteur Markdown unique (docs/PLAN.md, « Markdown ») : pages légales, page article et aperçu
 * de l'éditeur. Markdown standard et tableaux ; le HTML brut n'est pas interprété ;
 * un `#` devient un h2 (un seul h1 par page) ; `*texte*` est en graisse 500, sans italique ;
 * le code est coloré avec Shiki. Styles de la prose : DESIGN.md § 12.5.
 * Sans dépendance au serveur : le même composant rend l'aperçu de l'éditeur dans le navigateur.
 */

/** Un `[NEED: …]` reste visible et marqué, comme sur la landing. */
function markNeeds(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child !== "string") return child;
    const parts: ReactNode[] = [];
    let last = 0;
    for (const match of child.matchAll(new RegExp(NEED_PATTERN.source, "g"))) {
      const index = match.index ?? 0;
      if (index > last) parts.push(child.slice(last, index));
      parts.push(<Need key={index}>{match[0]}</Need>);
      last = index + match[0].length;
    }
    if (last === 0) return child;
    if (last < child.length) parts.push(child.slice(last));
    return parts;
  });
}

const NUMERIC = /^[\s\d  .,:%€+−-]+$/;

function isNumeric(children: ReactNode) {
  const text = Children.toArray(children)
    .map((c) => (typeof c === "string" || typeof c === "number" ? String(c) : ""))
    .join("");
  return text.trim() !== "" && NUMERIC.test(text);
}

/** Le langage et le texte d'un bloc de code (`<pre><code class="language-x">`). */
function codeBlock(children: ReactNode) {
  const code = Children.toArray(children).find(isValidElement) as
    | { props?: { className?: string; children?: ReactNode } }
    | undefined;
  const lang = code?.props?.className?.match(/language-(\S+)/)?.[1];
  const text = Children.toArray(code?.props?.children)
    .map((c) => (typeof c === "string" ? c : ""))
    .join("")
    .replace(/\n$/, "");
  return { lang, text };
}

function Code({ lang, text }: { lang?: string; text: string }) {
  const lines = highlight(text, lang);
  if (!lines) return <code>{text}</code>;
  return (
    <code data-highlighted>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && "\n"}
          {line.map((token, j) =>
            token.color ? (
              <span key={j} style={{ color: token.color }}>
                {token.content}
              </span>
            ) : (
              <Fragment key={j}>{token.content}</Fragment>
            ),
          )}
        </Fragment>
      ))}
    </code>
  );
}

/** Une image seule dans un paragraphe devient une figure : on ne la garde pas dans un `<p>`. */
function hasImage(node: unknown) {
  const children = (node as { children?: { type: string; tagName?: string }[] } | undefined)?.children ?? [];
  return children.some((child) => child.type === "element" && child.tagName === "img");
}

function heading(marker?: MarkerColor) {
  // Un `#` dans le corps devient un h2. Le marqueur bloc prend la couleur de la catégorie (§ 12.5).
  function H2({ children }: { children?: ReactNode }) {
    return (
      <h2 className="t-h2 mt-16 mb-4">
        {marker && <Marker color={marker} className="mr-3 align-middle" />}
        {children}
      </h2>
    );
  }
  return H2;
}

const components: Components = {
  h3: ({ children }) => <h3 className="t-h3 mt-10 mb-3">{children}</h3>,
  h4: ({ children }) => <h4 className="t-h4 mt-8 mb-3">{children}</h4>,
  p: ({ node, children }) =>
    hasImage(node) ? <div className="mb-6">{markNeeds(children)}</div> : <p className="mb-6">{markNeeds(children)}</p>,
  em: ({ children }) => <em className="font-medium not-italic">{children}</em>,
  strong: ({ children }) => <strong>{children}</strong>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a href={href} className={linkClass} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul
      role="list"
      className="mb-6 space-y-2 pl-6 [&>li]:relative [&>li]:before:absolute [&>li]:before:top-[0.7em] [&>li]:before:-left-5 [&>li]:before:size-1.5 [&>li]:before:bg-rule-strong [&>li]:before:content-['']"
    >
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 marker:font-mono marker:text-[0.8em] marker:text-ink-3">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{markNeeds(children)}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mb-6 border-l-2 border-ink pl-5 text-xl font-normal [&_p]:mb-3">{children}</blockquote>
  ),
  pre: ({ children }) => {
    const { lang, text } = codeBlock(children);
    return (
      <div className="relative mb-6">
        {lang && <span className="cote absolute top-3 right-4 text-on-ink-2!">{lang}</span>}
        <pre className="overflow-x-auto rounded-lg bg-ink px-5 pt-11 pb-5 font-mono text-[0.8125rem] leading-[1.7] text-on-ink">
          <Code lang={lang} text={text} />
        </pre>
      </div>
    );
  },
  img: ({ src, alt, title }) => (
    <figure className="mb-6">
      {/* eslint-disable-next-line @next/next/no-img-element -- images du corps d'article, servies par le stockage */}
      <img
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="w-full rounded-lg border border-rule"
      />
      {title && <figcaption className="cote mt-3 block text-center">{title}</figcaption>}
    </figure>
  ),
  hr: () => <hr className="my-12 border-rule" />,
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto rounded-lg border border-rule">
      <table className="w-full border-collapse bg-surface text-[0.9375rem]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className={`bg-raised px-4 py-3 font-medium ${isNumeric(children) ? "text-right" : "text-left"}`}>{children}</th>
  ),
  td: ({ children }) => (
    <td
      className={`border-t border-rule px-4 py-3 align-top ${isNumeric(children) ? "text-right tabular-nums" : ""}`}
    >
      {markNeeds(children)}
    </td>
  ),
};

const byMarker = new Map<MarkerColor | undefined, Components>();

function componentsFor(marker?: MarkerColor): Components {
  let map = byMarker.get(marker);
  if (!map) {
    const h2 = heading(marker);
    map = { ...components, h1: h2, h2 };
    byMarker.set(marker, map);
  }
  return map;
}

/**
 * `marker` : la couleur de la catégorie, posée devant chaque h2 d'un article.
 * Les pages légales n'en ont pas.
 */
export function Markdown({ source, marker }: { source: string; marker?: MarkerColor }) {
  return (
    <div className="t-article [&_:not(pre)>code]:rounded-sm [&_:not(pre)>code]:border [&_:not(pre)>code]:border-rule [&_:not(pre)>code]:bg-surface [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.9em] [&>:first-child]:mt-0 [&>:last-child]:mb-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={componentsFor(marker)}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
