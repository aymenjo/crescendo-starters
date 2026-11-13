/**
 * Texte de la landing, transcrit mot pour mot depuis `.agents/landing/07-copy-final.md` (v2.3).
 *
 * Règles (CLAUDE.md) :
 * - pour changer un texte, modifier d'abord la copy, puis ce module ;
 * - les chaînes gardent `**gras**`, les liens `[libellé](url)` et les marqueurs NEED de la copy, tels quels ;
 * - chaque titre déclare la ponctuation ajoutée à l'intégration (DESIGN.md § 4), jamais écrite dans le texte ;
 * - les indications de mise en page de la copy ne figurent pas ici.
 *
 * Le test `content/landing.test.ts` vérifie que chaque chaîne se trouve telle quelle dans la copy.
 */

/** Ponctuation ajoutée à un titre : point pour une phrase, rien pour un titre nominal ou une question. */
export type Punct = "." | "";

export type Title = { text: string; punct: Punct };

export type Cta = { label: string };

export const landing = {
  header: {
    cta: { label: "Réserver mon appel" },
  },

  meta: {
    title: "Crescendo, agence IA et automatisation pour PME",
    description:
      "Devis, relances, tri des emails, appels entrants : Crescendo automatise les process calvaires des PME, de l'audit à la maintenance. Appel gratuit de 30 min.",
    ogTitle: "Automatisez vos process calvaires, de l'audit à la mise en production",
  },

  hero: {
    surtitre: "Agence IA et automatisation pour PME de 10 à 250 salariés",
    h1: {
      text: "Lundi matin, les relances clients sont parties et les appels du week-end sont triés",
      punct: ".",
    },
    lead: "Crescendo repère les tâches que votre équipe refait à la main chaque semaine, puis les automatise avec un peu d'IA bien placée. Un seul interlocuteur, de l'audit à la maintenance.",
    cta: { label: "Réserver mon Appel Process Calvaires" },
    reassurance:
      "Appel gratuit de 30 minutes avec Aymen, le fondateur. Il vous dit par où commencer, ou de ne rien faire si le gain ne vaut pas l'investissement.",
    proof:
      "10 clients accompagnés. Fondateur architecte d'entreprise, passé par Société Générale, Hermès, Orange Bank, SNCF et Enedis.",
  },

  probleme: {
    h2: { text: "Chaque semaine, votre équipe refait à la main ce qu'un automate ferait seul", punct: "." },
    paragraphs: [
      "Le devis est tapé dans Excel, puis recopié dans l'outil de facturation. Les relances partent quand quelqu'un y pense. Les emails entrants attendent qu'on les lise pour savoir à qui les transmettre. Et une base de prospects dort depuis six mois dans un fichier que personne n'a le temps d'ouvrir.",
      "Ces process calvaires prennent des heures et multiplient les erreurs de ressaisie. Pendant ce temps, des prospects chauds signent ailleurs, parce que personne ne les a rappelés à temps.",
    ],
  },

  process: {
    h2: { text: "Les process calvaires qu'on automatise", punct: "" },
    intro: "On commence toujours par le process qui coûte le plus d'heures à votre équipe.",
    items: [
      {
        icon: "devis",
        title: "Devis et facturation",
        text: "Le devis validé génère la facture. Personne ne ressaisit les montants.",
      },
      {
        icon: "relances",
        title: "Relances clients",
        text: "Elles partent à date, avec un message adapté à chaque client.",
      },
      {
        icon: "emails",
        title: "Tri des emails",
        text: "Un agent IA lit les demandes, les classe et prépare une réponse que votre équipe valide avant l'envoi.",
      },
      {
        icon: "appels",
        title: "Appels et demandes entrantes",
        text: "Un agent vocal décroche, qualifie la demande et vous transmet les prospects chauds, y compris le soir et le week-end.",
      },
      {
        icon: "bases",
        title: "Bases dormantes",
        text: "Vos anciens prospects et clients sont recontactés automatiquement. Ceux qui répondent arrivent directement chez vos commerciaux.",
      },
      {
        icon: "reporting",
        title: "Reporting",
        text: "Les chiffres de la semaine sont compilés et envoyés sans que personne n'ouvre un tableur.",
      },
      {
        icon: "inventaire",
        title: "Inventaire",
        text: "Les documents sont lus et catégorisés automatiquement. Quand un écart apparaît, une alerte part et le prochain contrôle est planifié.",
      },
    ],
    tools:
      "On choisit l'outil le plus simple qui tienne la route. Un scénario Make ou n8n quand il suffit, un agent IA (OpenAI, Gemini ou Mistral) quand il faut lire ou rédiger, et du développement sur mesure quand le besoin dépasse ces outils.",
    relance: "Un de ces process vous coûte des heures chaque semaine ? On commence par celui-là.",
    cta: { label: "Réserver mon Appel Process Calvaires" },
  },

  preuve: {
    h2: { text: "Vos automatisations sont conçues par un architecte", punct: "." },
    paragraphs: [
      "Aymen Jouini, fondateur de Crescendo, est ingénieur en informatique. Avant Crescendo, il a été développeur chez Société Générale, Hermès, Orange Bank, SNCF et Enedis, puis architecte cloud et architecte d'entreprise. Il est certifié TOGAF, AWS et SAFe. Il a aussi créé des plateformes de formation en ligne sur l'IA. Faire adopter un nouvel outil par une équipe fait partie de son métier.",
      "Un automate bricolé en interne marche jusqu'au jour où l'un des outils qu'il relie change. Ensuite, personne ne sait le réparer. Chez Crescendo, chaque projet part d'une architecture : on sait ce qui est relié à quoi, on teste avant de mettre en production, et on documente pour que quelqu'un d'autre puisse reprendre.",
    ],
    /** Masqué au lancement : rendu seulement à partir de 2 mini-cas avec l'accord écrit du client. */
    cases: {
      h3: { text: "Quelques projets livrés", punct: "" },
      items: [] as { secteur: string; taille: string; avant: string; livre: string }[],
    },
  },

  methode: {
    h2: { text: "De l'appel à la mise en production, en trois étapes", punct: "" },
    appel: {
      h3: { text: "Ce qui se passe pendant l'appel", punct: "" },
      steps: [
        "Vous décrivez les tâches que votre équipe refait à la main chaque semaine.",
        "On repère ensemble celles qui coûtent le plus d'heures et celles qui s'automatisent facilement.",
        "On vous recommande la suite : un Sprint si un process se détache, un Audit si plusieurs se disputent la priorité. Si le gain ne vaut pas l'investissement, on vous le dit.",
      ],
      footer: "30 minutes en visio, directement avec Aymen, le fondateur. Sous 24 h, vous recevez un récap écrit.",
    },
    etapes: [
      {
        title: "Identification",
        text: "On cartographie vos process, on les classe par gain attendu et on dessine l'architecture cible. Pour un Sprint, ce travail porte sur un seul process. Pour un Audit, il couvre toute l'entreprise et se termine par une roadmap chiffrée.",
      },
      {
        title: "Construction",
        text: "On construit les automates, les agents IA ou les outils sur mesure. Chaque livraison est testée et sécurisée avant la mise en production.",
      },
      {
        title: "Adoption",
        text: "On forme vos équipes à l'outil. Pendant les 30 jours qui suivent chaque livraison, on reste disponible pour ajuster et corriger. Ensuite, si vous le souhaitez, l'abonnement Maintenance & Surveillance prend le relais.",
      },
    ],
  },

  offre: {
    h2: { text: "Démarrez par un process, ou par un audit de toute l'entreprise", punct: "." },
    // Le premier élément de chaque liste de la copy est réparti entre le bloc prix et la liste (DESIGN.md § 10.16).
    sprint: {
      h3: { text: "Sprint Process Calvaire", punct: "" },
      pour: "Pour un besoin clair : un process à automatiser, identifié pendant l'appel.",
      price: { from: "À partir de", amount: "4 000 €", unit: "HT" },
      items: [
        "prix ferme fixé à la signature",
        "Un process automatisé, en production en [NEED: délai en semaines]",
        "50 % à la commande, 50 % à la mise en production",
      ],
    },
    audit: {
      h3: { text: "Audit Process Calvaires", punct: "" },
      pour: "Pour plusieurs process, quand vous ne savez pas encore par lequel commencer.",
      price: { from: "", amount: "10 000 €", unit: "HT" },
      items: [
        "durée [NEED: durée de l'audit]",
        "Livrables : cartographie de vos process, priorisation par gain, architecture cible, roadmap chiffrée",
        "50 % à la commande, 50 % à la remise de l'audit",
        "Si vous signez la réalisation dans les 60 jours suivant la remise de l'audit, 5 000 € HT sont déduits du forfait",
      ],
    },
    inclus: {
      h3: { text: "Inclus dans chaque projet", punct: "" },
      items: [
        { icon: "support", text: "**30 jours de support** après chaque mise en production." },
        {
          icon: "bilan",
          text: "**Le Bilan des gains à J+30.** On mesure avant et après : heures passées, volumes traités, erreurs. Vous savez ce que le projet rapporte.",
        },
        {
          icon: "passation",
          text: "**Le Dossier de passation.** Schéma, accès et procédure de reprise. Les outils sont ouverts sur vos comptes, donc un autre prestataire peut reprendre la main.",
        },
        {
          icon: "securite",
          text: "**La Fiche sécurité et données**, remise avant la mise en production : les flux, l'hébergement des données et les services IA utilisés. Une option européenne avec Mistral est possible.",
        },
      ],
    },
  },

  engagement: {
    h2: { text: "Le prix signé est le prix payé", punct: "." },
    text: "Aucun dépassement n'est facturé sur le périmètre signé. Si un besoin nouveau apparaît en cours de route, on le chiffre avant d'y toucher, et c'est vous qui décidez. Pendant les 30 jours qui suivent la mise en production, tout dysfonctionnement est corrigé sans frais.",
    relance: "Prix ferme, correctifs inclus pendant 30 jours. Reste à choisir le premier process.",
    cta: { label: "Réserver mon Appel Process Calvaires" },
  },

  pourQui: {
    h2: { text: "Pour les PME de 10 à 250 salariés qui perdent du temps sur des tâches répétitives", punct: "" },
    text: "Nos clients dirigent des PME dans le BTP, le juridique, le commerce, l'industrie et les services B2B. Certains tournent encore sur Excel et l'email. D'autres ont un CRM ou un ERP qui communique mal avec le reste de leurs outils. On travaille avec les deux.",
    exclusion:
      "Crescendo n'est pas le bon partenaire si vous cherchez un développeur à plein temps, si votre budget est inférieur à 4 000 € HT, ou si vos achats passent par un appel d'offres piloté par une DSI.",
  },

  faq: {
    h2: { text: "Questions fréquentes", punct: "" },
    items: [
      {
        q: "10 000 € pour un audit, n'est-ce pas trop cher pour une PME ?",
        a: "Si votre besoin est déjà clair, vous pouvez vous en passer. On démarre directement par un Sprint, à partir de 4 000 € HT, sur proposition gratuite. L'audit est utile quand plusieurs process se disputent la priorité. Et si vous signez la réalisation dans les 60 jours, 5 000 € HT sont déduits du forfait.",
      },
      {
        q: "L'IA, est-ce vraiment pour une entreprise comme la nôtre ?",
        a: "On part d'un process concret, vos relances ou vos factures par exemple, et on mesure le gain en heures dans le Bilan des gains à J+30. Si un simple automate suffit, on ne met pas d'IA.",
      },
      {
        q: "Que deviennent nos données ?",
        a: "Avant toute mise en production, vous recevez la Fiche sécurité et données. Elle indique les flux, l'endroit où les données sont hébergées et les services IA qui les traitent. Si vous préférez un fournisseur européen, on utilise Mistral.",
      },
      {
        q: "Est-ce qu'on va dépendre de vous ?",
        a: "On utilise des outils standards (Make, Zapier, n8n), ouverts sur vos comptes. À la livraison, vous recevez le Dossier de passation : schéma, accès et procédure de reprise. La maintenance reste optionnelle.",
      },
      {
        q: "Et si ça casse après la livraison ?",
        a: "Pendant 30 jours après la mise en production, on corrige sans frais. Ensuite, l'abonnement Maintenance & Surveillance ([NEED: prix mensuel]) prend le relais : on surveille, on corrige, on fait évoluer.",
      },
      {
        q: "Combien de temps avant la première mise en production ?",
        a: "Pour un Sprint, comptez [NEED: délai type] semaines entre la signature et la mise en production. Pour un projet issu d'un Audit, le délai dépend des process retenus. Il est fixé dans la proposition, avant que vous signiez.",
      },
      {
        q: "Combien de temps faut-il prévoir de notre côté ?",
        a: "On pilote le projet de bout en bout. De votre côté, il faut [NEED: temps client type] et une personne qui connaît le process au quotidien.",
      },
      {
        q: "Vous intervenez à distance ou sur place ?",
        a: "L'appel découverte se fait en visio. Pour la suite du projet : [NEED: à distance, sur place, ou les deux selon les étapes].",
      },
      {
        q: "Un stagiaire ne pourrait-il pas le faire avec ChatGPT ?",
        a: "Il peut monter un premier automate. Reste à savoir qui le réparera quand un outil changera, qui le documentera et qui vérifiera que les données clients sont protégées. Le bricolage finit par se payer en pannes et en ressaisies.",
      },
      {
        q: "Pourquoi pas un freelance ou une ESN ?",
        a: "Un freelance livre souvent un morceau, puis passe au projet suivant. Une ESN est taillée pour les budgets et les délais des grands comptes. Crescendo couvre l'audit, l'architecture, la réalisation et la maintenance, avec un seul interlocuteur, à partir de 4 000 € HT.",
      },
      {
        q: "Les licences des outils sont-elles incluses ?",
        a: "Non. Make, n8n ou les services IA sont souscrits sur vos comptes et facturés par leur éditeur. Leur coût mensuel figure dans la proposition, avant que vous signiez.",
      },
    ],
  },

  ctaFinal: {
    h2: { text: "Quels process calvaires coûtent le plus à votre équipe ?", punct: "" },
    text: "En 30 minutes, on les identifie avec vous, puis on vous dit par où commencer : un Sprint, un Audit, ou rien du tout si le gain ne vaut pas l'investissement.",
    // Le mois vient de NEXT_START_MONTH : la phrase n'est rendue que si le mois est renseigné et pas encore passé.
    capacity: { before: "On démarre 3 nouveaux projets par mois. Prochain démarrage possible : ", after: "." },
    cta: { label: "Réserver mon Appel Process Calvaires" },
    reassurance: "Gratuit, 30 minutes en visio. Récap écrit sous 24 h.",
  },

  sticky: {
    cta: { label: "Réserver mon appel" },
  },

  reservation: {
    newTab: "Ouvrir l'agenda dans un nouvel onglet",
    rgpd: "Vos informations servent à préparer et à suivre votre appel. [Politique de confidentialité](/confidentialite)",
    noSlot: "Aucun créneau ne vous convient ? Écrivez à aymen@croissanceconsulting.com avec vos disponibilités.",
  },

  confirmation: {
    h1: { text: "C'est réservé. Préparez deux ou trois process calvaires.", punct: "" },
    text: "Pour que l'appel soit utile, notez pour chacun ce qui est fait, qui le fait, le temps passé par semaine et les outils utilisés. Vous recevez une confirmation par email avec le lien de la visio.",
    link: "[Voir le profil LinkedIn d'Aymen](https://www.linkedin.com/in/aymen-jouini-77038220)",
  },
} as const;
