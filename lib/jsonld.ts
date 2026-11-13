import { coverUrl, metaDescription, type PublishedArticle } from "./articles";
import { contact, siteUrl } from "./site";

/** Données structurées `Organization` de la landing (DESIGN.md § 16). */
export function organizationJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Crescendo",
    url: `${url}/`,
    logo: `${url}/logo-lockup.svg`,
    email: contact.email,
    founder: {
      "@type": "Person",
      name: "Aymen Jouini",
      sameAs: [contact.linkedin],
    },
  };
}

/** Données structurées `BlogPosting` d'un article publié (DESIGN.md § 12.0). */
export function blogPostingJsonLd(article: PublishedArticle) {
  const url = siteUrl();
  const page = `${url}/blog/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: metaDescription(article),
    image: [coverUrl(article.cover_path)],
    datePublished: article.first_published_at,
    dateModified: article.updated_at,
    url: page,
    mainEntityOfPage: { "@type": "WebPage", "@id": page },
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: "Aymen Jouini", url: contact.linkedin },
    publisher: { "@type": "Organization", name: "Crescendo", url: `${url}/` },
  };
}

/** Sérialise pour un <script type="application/ld+json"> sans risque de fermer la balise. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
