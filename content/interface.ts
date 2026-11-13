/**
 * Textes d'interface qui ne figurent pas dans la copy finale : ils viennent de DESIGN.md
 * (§ 10.11 footer, § 10.13 planche, § 10.3 escalier, § 9 photo) et suivent ses règles de rédaction (§ 15).
 */
export const ui = {
  logoLabel: "Crescendo — accueil",
  founderAlt: "Aymen Jouini, fondateur de Crescendo",
  founderCaption: "Aymen Jouini · fondateur",
  toolsCote: "Les outils",
  stepCote: (n: number) => `Étape ${n}`,

  planche: {
    label: "Le devis validé génère la facture automatiquement, puis la relance part à échéance.",
    title: "Process calvaire → automatisé",
    annotation: "Excel ou CRM",
    docs: [
      { name: "Devis", cote: "n° D-0412 · validé", marker: "sky", icon: "devis" },
      { name: "Facture", cote: "n° F-0412 · générée", marker: "mustard", icon: "facture" },
      { name: "Relance", cote: "envoyée à échéance", marker: "sage", icon: "relance" },
    ],
    links: ["Automate Make", "À échéance"],
  },

  booking: {
    dialogTitle: "Réserver mon appel",
    close: "Fermer",
    frameTitle: "Agenda de réservation de l'Appel Process Calvaires",
  },

  confirmation: {
    cote: "Réservation confirmée",
    title: "Réservation confirmée",
  },

  legal: {
    mentions: { title: "Mentions légales", description: "Mentions légales du site de Crescendo." },
    confidentialite: {
      title: "Politique de confidentialité",
      description: "Politique de confidentialité de Crescendo : les données collectées et vos droits.",
    },
  },

  notFound: {
    title: "Cette page n'existe pas.",
    metaTitle: "Page introuvable",
    home: "Retour à l'accueil",
    blog: "Lire le carnet",
  },

  // Blog (DESIGN.md § 12), textes validés pendant le plan de la phase 2.
  blog: {
    nav: "le carnet",
    cote: "Le blog",
    title: "Le carnet de l'automatisation",
    lead: "Relances, devis, factures, emails : comment automatiser les process calvaires d'une PME, avec des exemples concrets.",
    description:
      "Le carnet de Crescendo : comment automatiser les process calvaires d'une PME (relances, devis, factures, emails), exemples concrets.",
    empty: "Les premiers articles arrivent.",
    articleCta: "Ce sujet vous parle ? Réservons 30 min.",
    author: "Aymen Jouini",
    readingTime: (minutes: number) => `${minutes} min de lecture`,
  },

  // Espace admin (DESIGN.md § 12.7, § 15) : vouvoiement, casse normale, jamais de corail.
  admin: {
    name: "Admin",
    signOut: "Se déconnecter",
    login: {
      title: "Connexion",
      email: "Email",
      submit: "Recevoir un lien de connexion",
      sent: "Si cette adresse est autorisée, un lien de connexion vient de vous être envoyé.",
      wait: (seconds: number) => `Nouveau lien possible dans ${seconds}\u00a0s`,
      invalidEmail: "Saisissez une adresse email valide.",
    },
    confirm: {
      title: "Connexion",
      intro: "Cliquez pour ouvrir votre session sur ce navigateur. Elle dure 7 jours.",
      submit: "Se connecter",
      invalid: "Ce lien n'est plus valable.",
      newLink: "Recevoir un nouveau lien",
    },
    list: {
      title: "Articles",
      new: "Nouvel article",
      empty: "Aucun article pour l'instant.",
      columns: { title: "Titre", status: "Statut", category: "Catégorie", published: "Publié le", updated: "Modifié le" },
      viewOnline: "Voir en ligne",
    },
    status: { draft: "Brouillon", published: "Publié" },
    editor: {
      newTitle: "Nouvel article",
      back: "Articles",
      unsaved: "Modifications non enregistrées",
      savedAt: (time: string) => `Enregistré à ${time}`,
      saving: "Enregistrement…",
      save: "Enregistrer",
      title: "Titre",
      excerpt: "Chapô",
      excerptHint: "1 ou 2 phrases : l'extrait des cartes et la meta description par défaut.",
      category: "Catégorie",
      categoryPlaceholder: "Choisir une catégorie",
      seo: "Référencement",
      seoTitle: "Titre SEO",
      seoTitleTooLong: "Au-delà de 60 caractères, le titre risque d'être coupé.",
      metaDescription: "Meta description",
      metaDescriptionTooLong: "Au-delà de 155 caractères, la description risque d'être coupée.",
      slug: "Slug",
      body: "Corps de l'article (Markdown)",
      preview: "Aperçu",
      titleMissing: "Saisissez un titre.",
      slugInvalid: "Seuls les lettres a à z, les chiffres et les tirets sont acceptés.",
      slugTaken: (title: string) => `Ce slug est déjà utilisé par « ${title} ».`,
      saveFailed: "L'enregistrement a échoué. Vos modifications sont toujours dans l'éditeur. Réessayez.",
      publish: "Publier",
      update: "Mettre à jour",
      unpublish: "Dépublier",
      delete: "Supprimer",
      viewOnline: "Voir en ligne",
      missing: "Pour publier, il manque :",
      requiredToPublish: "Obligatoire pour publier.",
      slugLocked: "Le slug ne change plus après publication.",
      deleteConfirm: (title: string) => `Supprimer définitivement « ${title} » ?`,
      cancel: "Annuler",
    },
    images: {
      cover: "Couverture",
      coverAlt: "Texte alternatif de la couverture",
      alt: "Texte alternatif",
      drop: "Déposez une image ou cliquez pour la choisir",
      formats: "JPEG, PNG ou WebP, 5 Mo au plus",
      replace: "Remplacer l'image",
      uploading: "Téléversement…",
      saveFirst: "Enregistrez l'article pour ajouter des images.",
      formatError: "Format accepté : JPEG, PNG ou WebP, 5 Mo au plus.",
      add: "Ajouter une image",
      file: "Fichier",
      insert: "Insérer",
      cancel: "Annuler",
      fileMissing: "Choisissez une image.",
      altMissing: "Saisissez un texte alternatif.",
    },
  },

  footer: {
    presentation: "Agence IA et automatisation pour PME de 10 à 250 salariés. De l'audit à la maintenance.",
    navTitle: "Navigation",
    nav: [
      { href: "#process", label: "Ce qu'on automatise" },
      { href: "#methode", label: "Méthode" },
      { href: "#offre", label: "Offre" },
      { href: "#faq", label: "FAQ" },
    ],
    resourcesTitle: "Ressources",
    blog: "Le carnet",
    contactTitle: "Contact et réseaux",
    linkedin: "Profil LinkedIn d'Aymen",
    legal: "Mentions légales",
    privacy: "Politique de confidentialité",
  },
} as const;
