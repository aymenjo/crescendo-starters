# DESIGN.md — Crescendo

> Design system de **Crescendo**, agence IA et automatisation pour PME.
> Ce fichier est la source de vérité visuelle du site construit en **Next.js (App Router) + Tailwind CSS v4**, déployé sur **Vercel**, dans **un seul projet** et sur **un seul domaine** :
> - **Landing page** sur `crescendo.fr` : objectif unique, la réservation de l'Appel Process Calvaires.
> - **Blog** sur `crescendo.fr/blog` (« le carnet ») : objectif SEO, attirer du trafic qualifié et le renvoyer vers la réservation.
> - **Espace admin**, réservé au consultant : écriture et publication des articles (§ 12.7).
>
> Le domaine est provisoire, à remplacer par le domaine définitif.
>
> **Le texte de référence est `.agents/landing/07-copy-final.md`.** DESIGN.md décrit la forme et ne réécrit pas la copy. Le positionnement, la voix et les mots interdits sont dans `.agents/product-marketing.md`, l'offre dans `.agents/landing/03-offer.md`, le parcours de réservation et la mesure dans `.agents/landing/06-cro-review.md`. **Le périmètre fonctionnel est fixé par `docs/PRD.md`** : en cas d'écart, le PRD l'emporte.
>
> Claude Code : lis ce fichier avant toute création ou modification d'interface et respecte-le strictement. Le rendu de référence est `docs/design-preview.html`.

---

## 1. Vision

**Style : « planche d'architecte ».** De l'encre sur du papier crème. Le chrome est calme : filets fins, aucune ombre, pas de couleur. Un seul dessin est riche, la planche du hero, qui montre un process calvaire une fois automatisé. La page se lit comme une planche de bureau d'études : on comprend d'abord ce qui est dessiné, puis on lit les cotes.

**Ce qu'on doit retenir en 3 secondes :** un architecte dessine vos automatisations. La planche montre votre process une fois automatisé (devis → facture → relance). Le style illustre la preuve centrale de la page : « Vos automatisations sont conçues par un architecte. »

### Direction

| | |
|---|---|
| **Produit** | Une agence qui conçoit et livre les automatisations des PME de 10 à 250 salariés, de l'audit à la maintenance, menée par un architecte |
| **Caractère** | Exact, posé, un peu chaleureux |
| **Monde** | La planche à dessin d'un bureau d'études : papier crème, trait d'encre, cotes, équerres |
| **Moments** | 1. La planche du hero : trois documents dessinés (devis, facture, relance), reliés à l'équerre (§ 10.13). 2. L'escalier de la méthode, en écho au logo (§ 10.3) |
| **Signature** | La **cote** : une annotation en mono, en casse normale, reliée à son objet par un trait fin (§ 8) |

### Principe

**Le chrome se tait, le dessin parle.** La navigation, les cartes, les boutons secondaires et le texte n'utilisent que le papier, l'encre et des filets. La couleur et la matière vont à deux endroits seulement : les moments, et le bouton corail de réservation.

**Objectif business :** chaque page mène à **« Réserver mon Appel Process Calvaires »**. Le corail est réservé à cette action.

**Personnalité :** claire, pédagogue, concrète, rassurante. On démystifie l'IA, on ne l'enjolive pas.

---

## 2. Logo

**Concept « Les Étapes » :** trois blocs arrondis qui montent en escalier, reliés par des connecteurs. Ils représentent la méthode : **Identification → Construction → Adoption**.

### SVG de référence (`/public/logo-mark.svg`)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 80" fill="none">
  <path d="M28 63H55V53" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M68 40H95V30" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="2" y="50" width="26" height="26" rx="7" fill="#B3C7D9" stroke="currentColor" stroke-width="4"/>
  <rect x="42" y="27" width="26" height="26" rx="7" fill="#F2BB6B" stroke="currentColor" stroke-width="4"/>
  <rect x="82" y="4" width="26" height="26" rx="7" fill="#EE6F5A" stroke="currentColor" stroke-width="4"/>
</svg>
```

- Le trait utilise `currentColor` : encre `#111111` sur fond clair, crème `#FAF7F2` sur fond sombre.
- Épaisseur du trait : 3 pour les grands formats (≥ 120 px de large), 4 par défaut, 5 sous 48 px.

### Wordmark
- Toujours en **minuscules** : `crescendo`.
- Inter Tight 800, `letter-spacing: -0.045em`.
- Lockup horizontal : symbole + nom, espacement = 0,3 × la hauteur du symbole.
- **Livré en SVG vectorisé** (`/public/logo-lockup.svg`, symbole + nom en tracés). Le site ne charge pas la graisse 800 : c'est la seule exception à la règle des graisses (§ 4), et elle appartient au logo, pas à l'interface.

### Règles
- Ordre des blocs **immuable** : bleu → moutarde → corail.
- Zone de protection : la largeur d'un bloc tout autour.
- Taille minimale du symbole : 24 px de large.
- Interdit : recolorer les blocs, ajouter un dégradé, une ombre floue, déformer, mettre le nom en majuscules.
- Favicon : symbole seul dans une tuile crème `#FAF7F2`, contour encre, coins de 22 %.

**Le logo donne aussi la géométrie du site :** le rayon des blocs (rx 7 sur 26, soit environ 27 %) fixe l'échelle des rayons (§ 7), et le connecteur en équerre fixe la forme de tous les connecteurs (§ 10.6).

---

## 3. Couleurs

### Palette

| Token | Hex | Rôle | Contraste |
|---|---|---|---|
| `paper` | `#EEE7DC` | Fond général du site | |
| `surface` | `#FAF7F2` | Cartes, panneaux, documents de la planche, fond des inputs | |
| `raised` | `#E6DED1` | En-tête de tableau, panneau Engagement, survol du bouton secondaire | |
| `ink` | `#111111` | Texte principal, trait du dessin, états actifs, contour et ombre du bouton corail | 16:1 sur `paper` |
| `ink-2` | `#4A453E` | Texte secondaire : lead, extraits, ligne de réassurance, icônes | 7,7:1 sur `paper` |
| `ink-3` | `#6B655B` | Cotes, méta, légendes. **Sur `paper` et `surface` uniquement** | 4,7:1 sur `paper`, 5,4:1 sur `surface`, 4,3:1 sur `raised` (interdit) |
| `rule` | `rgb(17 17 17 / 0.12)` | Filets : contour des cartes, séparateurs, lignes de tableau | décoratif |
| `rule-strong` | `#8A8378` | Bord des inputs, du contrôle segmenté et du bouton secondaire, puces | 3,5:1 sur `surface`, 3,05:1 sur `paper` (WCAG 1.4.11) |
| `grid` | `#DCD5C9` | Grille de la planche du hero, **et nulle part ailleurs** | décoratif |
| `on-ink` | `#FAF7F2` | Texte sur `ink` (footer, état actif, bloc de code) | |
| `on-ink-2` | `#B5B0A7` | Texte secondaire sur `ink` | 8,4:1 sur `ink` |
| `sky` | `#B3C7D9` | Méthode : Identification · catégorie Automatisation IA | |
| `mustard` | `#F2BB6B` | Méthode : Construction · catégorie Outils & no-code | |
| `sage` | `#AFC6A2` | Méthode : Adoption · catégorie Digitalisation & stratégie | |
| `blush` | `#EDB1B3` | Catégorie Cas clients · mini-cas | |
| `coral` | `#EE6F5A` | **Réservation uniquement** | `ink` sur `coral` : 6,3:1 |
| `coral-dark` | `#D9573F` | Survol du bouton corail | `ink` sur `coral-dark` : 4,9:1 |
| `danger` | `#A8321E` | Erreurs de formulaire (texte, icône, bord) | 6,2:1 sur `surface` |

### Règles d'usage
- **Le chrome est neutre.** Fond, cartes, filets, texte, icônes et boutons secondaires viennent uniquement de `paper`, `surface`, `raised`, `ink`, `ink-2`, `ink-3`, `rule` et `rule-strong`.
- **Les pastels portent un sens, toujours.** Ils n'apparaissent qu'à quatre endroits :
  1. le logo ;
  2. l'escalier de la méthode (une couleur par étape) ;
  3. les marqueurs de catégorie du blog (§ 8.4) ;
  4. les documents de la planche du hero, qui suivent la progression `sky` → `mustard` → `sage` : la couleur dit « ça avance ».
- **Interdit :** un pastel en fond de carte, de tuile d'icône, d'en-tête d'offre, de pilule décorative, d'état sélectionné ou de sélection de texte.
- **Corail = réservation.** Il sert aux boutons primaires (hero, relances intermédiaires, CTA final, header, bouton fixe mobile, fin d'article) et au créneau choisi dans l'agenda, puisque choisir un créneau, c'est réserver. Jamais en décoration, jamais en fond de section, jamais pour une catégorie ni pour une erreur. Seule exception : le 3ᵉ bloc du logo.
- **Le texte sur le corail et sur les pastels est toujours `ink`.** Jamais de blanc (le blanc sur corail fait 3:1).
- **États actifs en encre.** Radio cochée, `::selection`, bouton `action` de l'admin : fond `ink`, texte `on-ink`.
- **Erreur = `danger`**, distincte du corail, toujours accompagnée d'un texte et d'une icône.
- `ink-3` ne se pose que sur `paper` et `surface`. Sur `raised`, on utilise `ink-2`.
- Pas de dégradé de couleur, pas de transparence décorative, pas de blanc pur `#FFFFFF`.
- Proportions indicatives : 85 % `paper` / `surface`, 12 % `ink` (texte et traits), 2 % pastels, 1 % corail.
- Pas de mode sombre en v1. Les zones sombres ponctuelles (footer, bloc de code) utilisent `ink` en fond avec `on-ink` / `on-ink-2`.

### Couleurs de la méthode

| Étape | Couleur |
|---|---|
| 1. Identification | `sky` |
| 2. Construction | `mustard` |
| 3. Adoption | `sage` |

Dans le logo, le 3ᵉ bloc est corail. Sur le site, l'étape Adoption reste `sage`, car elle ne contient pas de CTA.

### Couleurs de catégories (blog)

Les catégories se reconnaissent à leur **marqueur bloc** (§ 8.4), jamais à un fond coloré.

| Catégorie | Marqueur |
|---|---|
| Automatisation IA | `sky` |
| Outils & no-code | `mustard` |
| Digitalisation & stratégie | `sage` |
| Cas clients | `blush` |

---

## 4. Typographie

### Familles (via `next/font/google`)
- **Inter Tight** (400, 500, 600) : titres et texte courant.
- **JetBrains Mono** (500) : cotes, métadonnées, horaires, code.

```ts
// app/fonts.ts
import { Inter_Tight, JetBrains_Mono } from "next/font/google";

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

### Échelle

| Rôle | Classe | Mobile | Desktop | Graisse | Interligne | Tracking | Couleur |
|---|---|---|---|---|---|---|---|
| Display (H1 hero) | `.t-display` | 36px | 64px | 600 | 1.06 | -0.02em → -0.025em | `ink` |
| Surtitre (hero) | `.t-surtitre` | 16px | 18px | 500 | 1.4 | 0 | `ink` |
| H1 page / article | `.t-h1` | 34px | 48px | 600 | 1.1 | -0.02em | `ink` |
| H2 section | `.t-h2` | 28px | 40px | 600 | 1.12 | -0.02em | `ink` |
| H3 | `.t-h3` | 20px | 24px | 600 | 1.25 | -0.01em | `ink` |
| H4 | `.t-h4` | 17px | 18px | 600 | 1.35 | 0 | `ink` |
| Lead (chapô) | `.t-lead` | 18px | 20px | 400 | 1.5 | 0 | `ink-2` |
| Body | — | 16px | 17px | 400 | 1.6 | 0 | `ink` |
| Body article | `.t-article` | 18px | 19px | 400 | 1.7 | 0 | `ink` |
| Small | `.t-small` | 14px | 14px | 400 | 1.5 | 0 | `ink-2` |
| Bouton, label de champ | — | 15px | 16px | 500 | 1.25 | 0 | selon le fond |
| Question FAQ | — | 17px | 18px | 500 | 1.35 | 0 | `ink` |
| Cote (mono) | `.cote` | 12px | 13px | 500 | 1.4 | 0 | `ink-3` |
| Prix | `.t-price` | 32px | 40px | 500 | 1 | -0.02em | `ink` |

- Le H1 du hero fait 82 caractères. Il s'étale sur **toute la largeur du conteneur** avec `text-wrap: balance`, pour tenir en 3 lignes sur desktop. Sur mobile, il prend environ 5 lignes, et le CTA reste visible sans défiler.
- « week-end » est insécable dans le H1 (`<span className="whitespace-nowrap">`) : sinon, sur mobile, le navigateur coupe au trait d'union (« week- / end »).
- Tous les titres utilisent `text-wrap: balance`.

### Graisses
- **400** pour le texte, **500** pour l'interface (boutons, labels, questions, cotes, prix, surtitre), **600** pour les titres et le `<b>` du texte courant.
- Jamais 700 ni plus dans l'interface. La hiérarchie passe par la **taille** et la **couleur**, pas par la graisse.

### Ponctuation des titres
- **Un titre qui est une phrase finit par un point.** Une phrase, c'est un titre dont la proposition principale contient un verbe conjugué. La copy finale est écrite sans point : on l'ajoute à l'intégration, sans changer un mot.
- **Un titre nominal n'a pas de point.** Ce sont les groupes nominaux, les infinitifs et les relatives sans proposition principale.
- Les titres en forme de question gardent leur « ? » (CTA final, questions de la FAQ).
- Jamais de point d'exclamation.
- Les intitulés en gras **intégrés à un paragraphe** (« **Le Bilan des gains à J+30.** On mesure… ») gardent la ponctuation de la copy : ce sont des débuts de phrase. Quand un intitulé devient un titre à part (nomenclature des process, § 10.14), il suit la règle des titres nominaux : « Devis et facturation ».

| Titre | Type | Rendu |
|---|---|---|
| H1 hero | Phrase | « Lundi matin, les relances clients sont parties et les appels du week-end sont triés. » |
| H2 Problème | Phrase | « Chaque semaine, votre équipe refait à la main ce qu'un automate ferait seul. » |
| H2 Ce qu'on automatise | Nominal | « Les process calvaires qu'on automatise » |
| H2 Preuve | Phrase | « Vos automatisations sont conçues par un architecte. » |
| H2 Méthode | Nominal | « De l'appel à la mise en production, en trois étapes » |
| H3 Méthode | Nominal | « Ce qui se passe pendant l'appel » · « Identification » · « Construction » · « Adoption » |
| H2 Offre | Phrase (impératif) | « Démarrez par un process, ou par un audit de toute l'entreprise. » |
| H3 Offre | Nominal | « Sprint Process Calvaire » · « Audit Process Calvaires » · « Inclus dans chaque projet » |
| H2 Engagement | Phrase | « Le prix signé est le prix payé. » |
| H2 Pour qui | Nominal | « Pour les PME de 10 à 250 salariés qui perdent du temps sur des tâches répétitives » |
| H2 FAQ | Nominal | « Questions fréquentes » |
| H2 CTA final | Question | « Quels process calvaires coûtent le plus à votre équipe ? » |
| H1 confirmation | Phrases | « C'est réservé. Préparez deux ou trois process calvaires. » |
| H1 blog | Nominal | « Le carnet de l'automatisation » |

### Chiffres
- Tous les chiffres sont en `font-variant-numeric: tabular-nums`.
- Les montants s'écrivent en entier, avec une espace fine insécable (U+202F) comme séparateur de milliers : « 4 000 € HT », « 10 000 € HT ». Jamais « k€ » dans l'interface.
- Les horaires sont en mono, au format « 09:30 ».

### Règles
- **Casse normale partout.** Les seules majuscules sont la première lettre et les sigles (HT, IA, CRM, RGPD).
- Pas de tracking négatif sous 20px. Le tracking serré est réservé aux titres (H3 et plus).
- Pas d'italique, ni décoratif, ni pour l'emphase. Pas de texte justifié.
- Largeur max du texte courant : `68ch` (articles) et `56ch` (paragraphes de landing).

---

## 5. Tokens Tailwind v4

À placer dans `app/globals.css` :

```css
@import "tailwindcss";

@theme {
  /* Neutres : papier et encre */
  --color-paper: #EEE7DC;
  --color-surface: #FAF7F2;
  --color-raised: #E6DED1;
  --color-ink: #111111;
  --color-ink-2: #4A453E;
  --color-ink-3: #6B655B;
  --color-rule: rgb(17 17 17 / 0.12);
  --color-rule-strong: #8A8378;
  --color-grid: #DCD5C9;
  --color-on-ink: #FAF7F2;
  --color-on-ink-2: #B5B0A7;

  /* Couleurs qui portent un sens */
  --color-sky: #B3C7D9;
  --color-mustard: #F2BB6B;
  --color-sage: #AFC6A2;
  --color-blush: #EDB1B3;
  --color-coral: #EE6F5A;
  --color-coral-dark: #D9573F;
  --color-danger: #A8321E;

  /* Typo */
  --font-sans: var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  /* Rayons, dérivés du logo (rx 7 sur 26) */
  --radius-xs: 3px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;

  /* Profondeur : deux ombres, deux usages */
  --shadow-press: 3px 3px 0 0 var(--color-ink);
  --shadow-float: 0 1px 2px rgb(17 17 17 / 0.06), 0 8px 24px rgb(17 17 17 / 0.06);

  /* Mouvement : une seule courbe */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --default-transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  --default-transition-duration: 150ms;
}

@layer base {
  html { background: var(--color-paper); color: var(--color-ink); }
  body { font-family: var(--font-sans); font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
  @media (min-width: 1024px) { body { font-size: 17px; } }
  h1, h2, h3, h4 { font-weight: 600; text-wrap: balance; }
  b, strong { font-weight: 600; }
  ::selection { background: var(--color-ink); color: var(--color-on-ink); }
  :focus-visible { outline: 2px solid var(--color-ink); outline-offset: 2px; }
}

@layer components {
  /* Rôles typographiques (mobile d'abord) */
  .t-display  { font-size: 2.25rem;  line-height: 1.06; letter-spacing: -0.02em; font-weight: 600; }
  .t-surtitre { font-size: 1rem;     line-height: 1.4;  font-weight: 500; }
  .t-h1       { font-size: 2.125rem; line-height: 1.1;  letter-spacing: -0.02em; font-weight: 600; }
  .t-h2       { font-size: 1.75rem;  line-height: 1.12; letter-spacing: -0.02em; font-weight: 600; }
  .t-h3       { font-size: 1.25rem;  line-height: 1.25; letter-spacing: -0.01em; font-weight: 600; }
  .t-h4       { font-size: 1.0625rem; line-height: 1.35; font-weight: 600; }
  .t-lead     { font-size: 1.125rem; line-height: 1.5;  color: var(--color-ink-2); }
  .t-article  { font-size: 1.125rem; line-height: 1.7; }
  .t-small    { font-size: 0.875rem; line-height: 1.5;  color: var(--color-ink-2); }
  .t-price    { font-size: 2rem;     line-height: 1;    letter-spacing: -0.02em; font-weight: 500; font-variant-numeric: tabular-nums; }
  .cote       { font-family: var(--font-mono); font-size: 0.75rem; line-height: 1.4; font-weight: 500; color: var(--color-ink-3); }

  @media (min-width: 1024px) {
    .t-display  { font-size: 4rem; letter-spacing: -0.025em; }
    .t-surtitre { font-size: 1.125rem; }
    .t-h1       { font-size: 3rem; }
    .t-h2       { font-size: 2.5rem; }
    .t-h3       { font-size: 1.5rem; }
    .t-h4       { font-size: 1.125rem; }
    .t-lead     { font-size: 1.25rem; }
    .t-article  { font-size: 1.1875rem; }
    .t-price    { font-size: 2.5rem; }
    .cote       { font-size: 0.8125rem; }
  }

  /* Cote avec trait de rappel vers l'objet annoté, à sa gauche */
  .cote-leader { display: inline-flex; align-items: center; gap: 8px; }
  .cote-leader::before { content: ""; inline-size: 16px; block-size: 1px; background: var(--color-rule-strong); flex: none; }

  /* Marqueur bloc : le bloc du logo, porteur de couleur */
  .marker { display: inline-block; flex: none; inline-size: 12px; block-size: 12px; border-radius: var(--radius-xs); border: 1.5px solid var(--color-ink); background: var(--marker, var(--color-surface)); }
  .marker-sm { inline-size: 8px; block-size: 8px; border-width: 1px; border-radius: 2px; }

  /* Planche du hero : la seule grille du site */
  .planche {
    background-color: var(--color-paper);
    background-image:
      linear-gradient(var(--color-grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-grid) 1px, transparent 1px);
    background-size: 24px 24px;
    background-position: -1px -1px;
  }

  /* Bouton corail : survol en couleur, pression qui enfonce */
  .btn-press {
    transition-property: background-color, transform, box-shadow;
    transition-duration: 150ms;
    transition-timing-function: var(--ease-out);
  }
  .btn-press:hover { background-color: var(--color-coral-dark); }
  .btn-press:active { transform: translate(3px, 3px); box-shadow: 0 0 0 0 var(--color-ink); }

  /* Rythme vertical des sections */
  .section { padding-top: 64px; }
  .section-end { padding-bottom: 64px; }
  @media (min-width: 1024px) {
    .section { padding-top: 112px; }
    .section-end { padding-bottom: 112px; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-press, .btn-press:active { transition: none; transform: none; box-shadow: var(--shadow-press); }
}
```

---

## 6. Espacements et mise en page

- **Grille de 4px.** Échelle : 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112, 128. Toute marge, tout padding, tout `gap` et toute hauteur fixe est un multiple de 4. Un pas de 2px n'est permis qu'à l'intérieur d'un petit contrôle (tag, marqueur, code inline). Le logo garde sa propre géométrie (§ 2).
- **Pas de valeur arbitraire** (`mt-[13px]`, `py-[11px]`) et **pas de surcharge en ligne** (`style="padding-top:0"`).
- **L'espace dit le groupe.** À l'intérieur d'un groupe : 8 à 12. Entre deux groupes : 24 à 32. Entre un H2 et son contenu : 32 (40 en `lg`).
- **Densité :**
  - cartes : `p-5 lg:p-6` (20 / 24) ;
  - panneaux (planche, réservation, Engagement) : `p-6 lg:p-12` (24 / 48) ;
  - encadrés : `p-6` ;
  - rangées de liste : `py-6`.
- **Conteneur** : `max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8` (16px de gouttière minimum sur mobile).
- **Conteneur article** : `max-w-[720px]` pour le texte, `max-w-[960px]` pour les images larges.
- **Rythme vertical des sections** (`.section` / `.section-end`, § 5) :
  - chaque section porte un **`padding-top` seulement** : 64px sur mobile, 112px en `lg` ;
  - la dernière section avant un changement de fond (footer, panneau sombre) ajoute le même `padding-bottom` ;
  - l'écart entre deux sections est donc toujours le même, sans surcharge.
- **Hero :**
  - 64px (32px sur mobile) entre le header et le surtitre ;
  - 16 entre le surtitre et le H1 ;
  - 40 entre le H1 et la grille ;
  - 24 entre le lead et le CTA ;
  - 16 entre le CTA et la ligne de réassurance, puis entre la réassurance et la ligne de preuve.
- **Breakpoints Tailwind par défaut** : `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Conception **mobile-first**.
- **Bouton fixe mobile** : sous `lg`, le `body` réserve en bas l'espace du bouton fixe (§ 10.19) : `pb-[calc(72px+env(safe-area-inset-bottom))]` (12 + 44 + 12 + le filet). Le footer n'est jamais masqué.
- **Ancres** : `scroll-margin-top` égal à la hauteur du header collant (desktop) sur chaque section ciblée.

---

## 7. Formes, traits, profondeur

### Deux familles de traits
- **Le filet** (1px `rule`) dessine le chrome : cartes, séparateurs, header, tableaux. Il se voit à peine, et c'est voulu.
- **Le trait d'encre** (1.5px `ink`) dessine les objets : la planche, l'escalier, les connecteurs, les marqueurs et le contour du bouton corail. C'est le trait de l'architecte, et il ne sert qu'à ce qui est dessiné.

### Tableau

| Élément | Rayon | Trait | Ombre |
|---|---|---|---|
| Bouton primaire (corail) | `md` 10 | 1.5px `ink` | `press` |
| Bouton secondaire | `md` | 1px `rule-strong` | aucune |
| Input, contrôle segmenté, créneau d'agenda | `md` | 1px `rule-strong` | aucune |
| Tag de catégorie | `sm` 6 | 1px `rule` | aucune |
| Carte, encadré, image, photo | `lg` 14 | 1px `rule` | aucune |
| Panneau (planche, réservation, confirmation) | `xl` 20 | 1px `rule` | aucune |
| Panneau Engagement | `xl` | aucun (fond `raised`) | aucune |
| Document de la planche | `md` | 1px `rule` | `float` |
| Bloc de l'escalier | `lg` | 1.5px `ink` | aucune |
| Dialog de l'agenda (mobile) | aucun (plein écran) | aucun | aucune |
| Marqueur bloc | `xs` 3 (2 pour 8px) | 1.5px `ink` (1px pour 8px) | aucune |
| Avatar | `full` | 1px `rule` | aucune |
| Code inline | `sm` | 1px `rule` | aucune |

### Règles
- **Pas de pilule.** Aucun élément en `rounded-full`, sauf l'avatar.
- **Rayons imbriqués.** Un rayon intérieur vaut le rayon extérieur moins le padding qui les sépare, jamais moins de 4px.
- **Une ombre dure, une seule fois :** `shadow-press`, sur le bouton corail. C'est le seul objet qu'on « presse ». Aucune carte, image, pilule ou panneau n'a d'ombre dure.
- **`shadow-float`** ne sert qu'aux documents de la planche, qui sont des objets posés sur le papier. Les ombres par défaut de Tailwind (`shadow-md`, `shadow-lg`) sont interdites.

---

## 8. Motifs

Quatre motifs, pas un de plus.

1. **La planche** (`.planche`) : grille de 24px en `grid`, **uniquement dans le cadre du schéma du hero** (§ 10.13). Jamais en fond de section, de carte, de couverture d'article ou de page.
2. **La cote** (`.cote`, `.cote-leader`) : la signature. Une annotation mono en casse normale, `ink-3`, reliée à son objet par un trait de rappel de 1px (`rule-strong`, 16px) quand elle est posée à côté de lui.
   - Usages : les annotations de la planche (« Excel ou CRM », « Automate Make », « À échéance »), les numéros d'étape (« Étape 1 »), la légende photo (« Aymen Jouini · fondateur »), les méta du blog (date · temps de lecture), l'en-tête d'un encadré (« Les outils »).
   - Pas ailleurs, et jamais comme titre de section.
3. **L'escalier** : le motif du logo, en grand dans la section Méthode (§ 10.3), en illustration sur la page 404 et dans l'état vide du blog. **Pas dans le hero, pas dans l'en-tête du blog.**
4. **Le marqueur bloc** (`.marker`) : un petit bloc du logo (12px, ou 8px dans un tag), porteur de la couleur d'une catégorie ou d'un document. C'est la seule façon de poser un pastel sur un petit élément.

**Supprimés le 2026-11-12 :**
- les repères « vis » aux coins des cadres ;
- les flèches courbes entre les sections ;
- les pilules de douleurs de la section Problème ;
- la grille blueprint en fond de section ;
- les tuiles d'icônes colorées ;
- les pilules partout.

**Interdit :**
- dégradés de couleur, glassmorphism, ombres floues, lueurs ;
- images de robots ou de cerveaux lumineux ;
- faux texte illisible (lignes grises à la place du texte) ;
- emojis comme icônes ;
- décor `aria-hidden` qui répète le texte d'à côté.

---

## 9. Iconographie et images

- **Icônes** : [Lucide](https://lucide.dev) (`lucide-react`), **20px, `strokeWidth={1.75}`**, couleur `ink-2`. 18px dans les boutons et dans les documents de la planche. Aucune autre taille.
- **Pas de tuile d'icône.** L'icône se pose à côté de son texte, dans une colonne de 20px avec un écart de 16px, alignée sur la première ligne. Elle ne prend jamais de couleur propre.
- **Illustrations** : trait d'encre de 1.5px, avec au plus un pastel, et seulement s'il porte un sens. Réservées aux états vides, à la 404 et aux articles.
- **Photo du fondateur** : `public/images/fondateur.jpg` (JPEG carré, 628 × 628 px). Trois usages :
  - l'avatar rond près des CTA (hero, CTA final, confirmation), § 10.12 ;
  - la photo du bloc Preuve : rayon `lg`, filet, légère désaturation (`saturate-[.85]`), légende en cote ;
  - l'og:image de la landing (§ 16). Les articles du blog utilisent leur couverture (§ 12.1).
- **Schéma du hero** : composant HTML/SVG inline (§ 10.13), jamais une image bitmap.
- **Jamais de logos** de Société Générale, Hermès, Orange Bank, SNCF ou Enedis. Ce sont des expériences du fondateur avant Crescendo, pas des clients. Leurs noms n'apparaissent que dans le texte courant, jamais en bandeau ni en gras isolé.
- **Emojis** : aucun sur le site, ni en icône, ni en décoration, ni dans les labels. Ils restent possibles sur LinkedIn (voix « Social » de product-marketing), jamais sur crescendo.fr ni sur le blog.

---

## 10. Composants

> Tous les composants vivent dans `components/ui/` (primitives) et `components/sections/` (sections de page). Chaque composant interactif utilise les vrais éléments HTML (`<button>`, `<a>`, `<input>`, `<label>`).

### 10.1 Bouton

| Variante | Fond | Texte | Trait | Ombre | Usage |
|---|---|---|---|---|---|
| `primary` | `coral` (survol `coral-dark`) | `ink` | 1.5px `ink` | `press` + `.btn-press` | Réservation uniquement |
| `primary` compact | `coral` | `ink` | 1.5px `ink` | `press` + `.btn-press` | Header, bouton fixe mobile, nav et fin d'article du blog |
| `secondary` | `surface` (survol `raised`) | `ink` | 1px `rule-strong` | aucune | Actions secondaires (« Fermer », accueil du blog) |
| `ghost` | transparent | `ink`, souligné 1px `rule-strong`, `underline-offset-4` (survol : soulignement `ink`) | aucun | aucune | Liens textuels |
| `action` | `ink` (survol `ink-2`) | `on-ink` | 1.5px `ink` | aucune | **Admin uniquement** : action principale (« Publier », « Mettre à jour », « Recevoir un lien de connexion »). Jamais sur le site public |

**Libellés (repris de la copy, ne pas les modifier) :**
- « **Réserver mon Appel Process Calvaires** » : hero, relances intermédiaires, CTA final.
- « **Réserver mon appel** » : header, bouton fixe mobile, nav et CTA du blog.

**Règles :**
- Hauteur min 48px (compact : 40px en `lg`, 44px en dessous), `px-5`, texte 16px (15px compact), graisse 500, `rounded-md`.
- Icône optionnelle à droite (`ArrowRight`, 18px, trait 1.75).
- Le libellé long fait 37 caractères. Sur mobile, le bouton passe en `w-full` et peut s'afficher sur 2 lignes centrées (`text-balance`).
- Le bouton corail n'est **jamais** posé sur un fond coloré : il n'y a plus de variante « secondaire sur corail ».
- Chaque CTA porte `data-cta` avec sa position : `header`, `hero`, `apres-process`, `engagement`, `final`, `sticky` sur la landing ; `blog-nav`, `article-cta`, `blog-vide` sur le blog. C'est ce qui permet de mesurer le clic par position (§ 12.0 bis).
- Comportement : sur desktop, le CTA fait défiler jusqu'à `#rdv`. Sous `lg`, il ouvre directement l'agenda en plein écran (§ 10.9).

```tsx
<a
  href="#rdv"
  data-cta="hero"
  className="btn-press inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-12 px-5 py-3 rounded-md bg-coral border-[1.5px] border-ink shadow-press font-medium text-base text-ink text-center text-balance"
>
  Réserver mon Appel Process Calvaires <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
</a>
```

### 10.2 Tag de catégorie
- `inline-flex items-center gap-2`, hauteur 28px, `px-3`, `rounded-sm`, filet 1px `rule`, fond `surface`.
- Contenu : marqueur bloc 8px de la couleur de la catégorie (`.marker .marker-sm`), puis le nom en 13px, graisse 500, `ink`.
- En v1, le tag est une **étiquette non cliquable** (`<span>`) : il n'y a ni filtre ni page par catégorie (PRD, hors périmètre).

### 10.3 Bloc d'escalier (méthode)
Le motif du logo, en grand. C'est le second moment de la page.
- Fond pastel de l'étape (`sky`, `mustard`, `sage`), trait d'encre 1.5px, `rounded-lg`, sans ombre, `p-6 lg:p-8`, `gap-3`.
- Contenu : cote « Étape 1 » (sur pastel, la cote passe en `ink`), titre H3 sans point (« Identification »), texte Body `ink`.
- Connecteurs à l'équerre entre les blocs (§ 10.6), comme dans le logo.
- Sert uniquement à la section Méthode.

### 10.4 Carte
- `bg-surface`, filet 1px `rule`, `rounded-lg`, `p-5 lg:p-6`, sans ombre.
- Variante cliquable : toute la carte est un `<a>`. Au survol, le trait passe en `rule-strong` et le titre se souligne. Rien ne bouge.

### 10.5 Carte « étapes numérotées »
- Carte `surface` (§ 10.4, `lg:p-8`) avec une liste ordonnée.
- Numéros : carré de 28px, `rounded-sm`, filet 1px `rule-strong`, chiffre en mono 13px 500 `ink`, aligné sur la première ligne du texte. Écart de 16px avec le texte, 16px entre les étapes.
- Utilisée pour « Ce qui se passe pendant l'appel » (section Méthode). La ligne « 30 minutes en visio, directement avec Aymen… » se place sous la liste, avec l'avatar (§ 10.12), après un filet.

### 10.6 Connecteur
- Composant `<FlowConnector />` en SVG inline, `aria-hidden`.
- **Toujours à l'équerre** (segments verticaux et horizontaux, angles nets), comme dans le logo. Trait 1.5px `ink`, `stroke-linecap: round`, pointe ouverte en V de 6px.
- N'existe qu'à l'intérieur de la planche (§ 10.13) et de l'escalier (§ 10.3). **Aucune flèche entre les sections.**

### 10.7 Navigation

**Nav de la landing (`crescendo.fr`) : pas de menu** (décision CRO).
- Gauche : lockup logo (symbole 32px + nom 22px), lien vers `#` (haut de page), `aria-label="Crescendo — accueil"`.
- Droite : bouton `primary` compact « Réserver mon appel » (`data-cta="header"`).
- Aucun lien d'ancre, aucun lien vers le blog.
- Desktop (`lg` et plus) : barre collante de 72px, fond `paper`, filet bas 1px `rule` qui apparaît au scroll (200ms).
- Mobile : header **non collant**, de 64px. Il défile avec la page, et le bouton fixe en bas de l'écran (§ 10.19) prend le relais. On n'affiche jamais deux boutons corail fixes en même temps.
- Sous `sm` (640px), le lockup passe à symbole 28px + nom 20px, et le bouton compact à `px-3` et `whitespace-nowrap`. Le logo et le bouton tiennent ainsi sur une ligne dès 360px de large.

**Nav du blog (`/blog`)**
- Barre collante, fond `paper`, filet bas 1px `rule` au scroll. Pas de menu, pas de catégories.
- Gauche : lockup logo suivi de « · le carnet » en Inter Tight 500, `ink-2`. Le logo renvoie vers `/` ; « le carnet » renvoie vers `/blog`.
- Droite : bouton `primary` compact « Réserver mon appel » (`data-cta="blog-nav"`) → `/?utm_source=blog&utm_medium=nav&utm_campaign=<slug>#rdv` (sans `utm_campaign` sur la liste).
- Sous `sm` : le symbole seul (sans le nom), suivi de « le carnet », puis le bouton. Tout tient sur une ligne dès 360px de large.

### 10.8 Accordéon FAQ
- `<details>`/`<summary>` natifs, ou Radix Accordion. Accordéon sur **tous** les breakpoints : 11 questions, tout se parcourt d'un coup d'œil.
- **Liste à filets, pas de cartes :** chaque item a un filet haut 1px `rule`, le dernier un filet bas. Question en 18px (17px sur mobile), graisse 500, avec son « ? », `py-5`. Icône `Plus` 20px `ink-2` à droite, qui pivote de 45° à l'ouverture (200ms).
- Réponse en Body `ink-2`, `pb-6`, `max-w-[62ch]`.
- Colonne de `max-w-[720px]`. Tous les items sont fermés au chargement.

### 10.9 Bloc de réservation (`#rdv`)
Dernière section, sur fond `paper`.

**Panneau :** `bg-surface`, filet 1px `rule`, `rounded-xl`, `p-6 lg:p-12`. Pas de fond corail : le corail est sur le bouton et le créneau choisi.

**Contenu, dans l'ordre de la copy :**
1. H2 en question : « Quels process calvaires coûtent le plus à votre équipe ? »
2. Paragraphe (« En 30 minutes, on les identifie avec vous… »).
3. Phrase de capacité (« On démarre 3 nouveaux projets par mois… »). Elle n'est **rendue que si le mois est renseigné et pas encore passé** (variable `NEXT_START_MONTH`). Sinon, rien ne s'affiche.
4. Bouton de réservation, puis la ligne « Gratuit, 30 minutes en visio. Récap écrit sous 24 h. » avec l'avatar (§ 10.12).
5. L'agenda.

**Disposition :**
- Desktop (`lg`) : 2 colonnes (5/12 et 7/12, `gap-12`). Le texte à gauche, l'agenda intégré à droite dans un cadre `paper`, filet 1px `rule`, `rounded-lg`, `p-6`. L'agenda est visible directement, donc le bouton n'est pas affiché.
- Mobile : le texte, puis le bouton `primary` corail. Le bouton ouvre l'agenda en **plein écran** (`<dialog>` plein écran, bouton « Fermer » en haut, focus piégé, `Échap` ferme). Tous les autres CTA de la page ouvrent le même dialog sous `lg`.
- **Style de l'agenda**, si l'outil le permet :
  - en-tête : titre en H4, cote « 30 min · visio · lien envoyé automatiquement » ;
  - jours et créneaux : boutons de 44px, `rounded-md`, filet 1px `rule-strong`, horaires en mono `tabular-nums` ;
  - **le jour et le créneau choisis sont en `coral`** avec un texte `ink` et un trait d'encre de 1.5px.

**Autour de l'agenda :**
- Lien `ghost` sous l'agenda : « Ouvrir l'agenda dans un nouvel onglet » (`target="_blank" rel="noopener"`). C'est la solution de secours si l'embed s'affiche mal dans le navigateur de l'app LinkedIn.
- Champs du formulaire : ceux du tableau « Réservation » de 07-copy-final (Nom, Email professionnel, Entreprise, Taille en 4 boutons, process facultatif, source facultative, téléphone facultatif), configurés dans l'outil. Si l'outil permet de styler les champs, suivre § 10.10.
- Sous le formulaire : « Vos informations servent à préparer et à suivre votre appel. » + lien vers la politique de confidentialité.
- S'il ne reste aucun créneau : la phrase de secours de la copy, avec l'email de contact.

**Technique :**
- Outil : **Cal.com** (embed inline sur desktop, dans le `<dialog>` sous `lg`). À vérifier selon l'offre retenue : rappels SMS, couleur du créneau choisi (`coral`), redirection vers `/merci` après la réservation.
- Embed chargé en différé (`next/script` avec `strategy="lazyOnload"`, ou au premier clic sur un CTA sous `lg`).
- Avant la mise en ligne : faire une réservation complète depuis l'app LinkedIn, sur iPhone et sur Android.

### 10.10 Formulaire
- `<label>` visibles au-dessus des champs, 15px, graisse 500, `ink`, 8px au-dessus du champ.
- Inputs : `bg-surface`, filet 1px `rule-strong`, `rounded-md`, hauteur 48px, `px-4`, texte 16px. Au focus : outline 2px `ink`, décalage de 2px.
- **Contrôle segmenté** pour les choix courts (taille de l'entreprise : 1-9 / 10-49 / 50-250 / 250+) : `<fieldset>` + `<input type="radio">`. Un cadre `rounded-md`, filet 1px `rule-strong`, et des segments de 44px séparés par un filet. Segment coché : fond `ink`, texte `on-ink`.
- Erreurs : texte `danger` 14px 500, précédé de l'icône `AlertCircle` 18px `danger`, et bord du champ en `danger`. Ne jamais signaler une erreur par la couleur seule.

### 10.11 Footer
- Fond `ink`, texte `on-ink`, logo version sombre. Texte secondaire en `on-ink-2`. Intitulés de colonnes en cote (mono 12px, casse normale, `on-ink-2`).
- **Colonnes :**
  - Présentation : 2 lignes (« Agence IA et automatisation pour PME de 10 à 250 salariés. De l'audit à la maintenance. »).
  - Navigation : ancres `#process` (Ce qu'on automatise) · `#methode` (Méthode) · `#offre` (Offre) · `#faq` (FAQ).
  - Ressources : « Le carnet » → `/blog`. C'est le seul lien de la landing vers le blog. Il reste discret, mais il évite que le blog soit orphelin. **Il n'est rendu qu'à partir de la livraison du blog** (phase 2) : jamais de lien vers une page qui n'existe pas encore.
  - Contact et réseaux : email de contact `[NEED]`, profil LinkedIn d'Aymen.
- **Bas :** mentions légales (`/mentions-legales`), politique de confidentialité (`/confidentialite`), © année. Séparé par un filet `rgb(250 247 242 / 0.12)`. Les deux pages sont hébergées sur le site, texte fourni par le consultant (`[NEED]`).
- Sur le blog, le footer est identique ; ses liens de navigation pointent vers les ancres de la landing (`/#process`, `/#methode`…).
- Desktop : 4 colonnes. Mobile : empilé, avec l'espace réservé au bouton fixe (§ 6).

### 10.12 Avatar et ligne de réassurance
- Photo ronde 40px (48px sur desktop), `rounded-full`, filet 1px `rule`, `object-cover`, `alt="Aymen Jouini, fondateur de Crescendo"`.
- Placée à gauche d'une ligne de texte Small (14px, 15px en `lg`, `ink-2`, `max-w-[46ch]`), centrée verticalement si le texte tient sur 2 lignes, alignée en haut au-delà. Écart de 12px.
- Usages : sous le CTA du hero (« Appel gratuit de 30 minutes avec Aymen, le fondateur… »), sous le bouton du CTA final, dans la carte « Ce qui se passe pendant l'appel », sur la page de confirmation.

### 10.13 Planche du hero (`<FlowDiagram />`)
Le visuel du hero et **le premier moment de la page**. Il montre ce que fait Crescendo, ce que le H1 ne dit pas. C'est l'endroit le plus riche de l'écran : il porte la matière et la couleur, et tout ce qui l'entoure reste calme.

**Cadre :**
- `<figure>` en `.planche` (papier + grille de 24px), filet 1px `rule`, `rounded-xl`, `p-6 lg:p-8`.
- Cote de titre en haut à gauche : « Process calvaire → automatisé ».

**Documents (3), dessinés en code :**
- Chaque document : `bg-surface`, filet 1px `rule`, `rounded-md`, `shadow-float`, `px-4 py-3`, largeur 216px (184px sous `sm`).
- Ligne 1 : marqueur bloc 12px de la couleur de la progression, nom du document en 15px 600 `ink`, icône Lucide 18px `ink-2` alignée à droite.
- Ligne 2 : une cote qui donne la référence et l'état.

| # | Document | Marqueur | Icône | Cote |
|---|---|---|---|---|
| 1 | Devis | `sky` | `FileText` | « n° D-0412 · validé » |
| 2 | Facture | `mustard` | `Receipt` | « n° F-0412 · générée » |
| 3 | Relance | `sage` | `BellRing` | « envoyée à échéance » |

- Annotation à droite du devis : cote avec trait de rappel « Excel ou CRM ». La rangée ne se replie jamais : sur un écran étroit, c'est le texte de la cote qui passe à la ligne, pour que le connecteur reste accroché au document.
- **Pas de montant** sur les documents : un chiffre affiché serait lu comme une promesse.

**Connecteurs :**
- `<FlowConnector />` à l'équerre (§ 10.6). Chaque connecteur part du bas du document, à 24px de son bord gauche, descend de 16px, tourne à droite sur la longueur du décalage, puis descend de 16px jusqu'au document suivant, où il finit par la pointe.
- Une cote le long de chaque connecteur : « Automate Make » (1 → 2), « À échéance » (2 → 3).

**Disposition :**
- En cascade descendante. Chaque document est décalé vers la droite par rapport au précédent : 48px en `lg`, 24px en dessous.
- Même disposition sur mobile, en plus compact.

**Accessibilité :** conteneur `role="img"` avec `aria-label="Le devis validé génère la facture automatiquement, puis la relance part à échéance."` ; contenu interne `aria-hidden`.

**Mouvement :** c'est **la seule entrée animée de la page**.
- Les documents apparaissent en fondu, avec une montée de 8px, décalés de 60ms, en 480ms.
- Les connecteurs se dessinent juste après (`stroke-dashoffset`, 480ms).
- Avec `prefers-reduced-motion`, tout est affiché directement.

**Variante B (test 2 de la revue CRO) :** la photo d'Aymen au même emplacement, `rounded-xl`, filet 1px `rule`, légende en cote « Aymen Jouini · fondateur ». **Hors v1 (PRD) :** le site ne livre que le schéma, sans bascule. Le test des 5 secondes se fait sur des maquettes (`docs/design-preview.html`).

### 10.14 Nomenclature des process (section « Ce qu'on automatise »)
Sur une planche, la nomenclature est la liste des pièces. Ici, c'est la liste des process.
- `<ul>` en grille : 1 colonne, 2 colonnes en `lg` (`gap-x-12`). Pas de cartes.
- Chaque `<li>` : filet haut 1px `rule`, `py-6`, grille `grid-cols-[20px_1fr] gap-x-4 gap-y-2`.
  - Icône 20px `ink-2` dans la 1ʳᵉ colonne, alignée sur le titre.
  - Intitulé en H3 au format H4, **sans point** (« Devis et facturation »).
  - Texte Body `ink-2` sous l'intitulé, dans la 2ᵉ colonne.
- Icônes : Devis et facturation `FileText` · Relances clients `BellRing` · Tri des emails `Inbox` · Appels et demandes entrantes `PhoneIncoming` · Bases dormantes `RefreshCcw` · Reporting `ChartColumn` · Inventaire `Package`.
- **« Les outils » :** le paragraphe « On choisit l'outil le plus simple qui tienne la route… » occupe la 8ᵉ case de la grille en `lg`, ce qui complète les 2 colonnes (4 + 4). C'est un encadré `surface`, filet 1px `rule`, `rounded-lg`, `p-6`, avec la cote « Les outils » au-dessus du texte. Sur mobile, il suit la liste.

### 10.15 Relance CTA intermédiaire
- Bloc placé à la fin d'une section : filet haut 1px `rule`, `pt-8 mt-12`.
- Desktop : la phrase de relance à gauche (20px, graisse 500, `max-w-[44ch]`), le bouton `primary` à droite. Mobile : empilés, bouton `w-full`.
- Deux occurrences : après « Ce qu'on automatise » (`data-cta="apres-process"`) et après « Engagement » (`data-cta="engagement"`).

### 10.16 Cartes d'offre et « Inclus dans chaque projet »
- **Deux cartes** côte à côte (`lg`, `gap-8`), empilées sur mobile : **Sprint Process Calvaire** à gauche (porte d'entrée), **Audit Process Calvaires** à droite.
- Carte `surface`, filet 1px `rule`, `rounded-lg`, sans ombre, `overflow-clip`, pas de fond coloré.
  - **En-tête** (`p-6 lg:p-8`) : nom de l'offre en H3 sans point, puis la ligne « Pour… » en Body `ink-2`. Un filet 1px `rule` le sépare du corps.
  - **Corps** (`p-6 lg:p-8`, `gap-5`) :
    - le prix : « À partir de » en Small, le montant en `.t-price` (« 4 000 € »), « HT » en cote ;
    - puis la liste de la copy, avec des puces carrées de 6px en `rule-strong`.
- **Ni badge « recommandé », ni mise en avant**, ni bouton dans les cartes. C'est l'appel qui oriente vers l'une ou l'autre.
- **Inclus dans chaque projet :**
  - H3 sans point, puis un encadré `surface` (filet, `rounded-lg`, `p-6 lg:p-8`) en grille 2 × 2 (`lg`, `gap-8`) ou 1 colonne (mobile, `gap-6`) ;
  - chaque élément : icône 20px `ink-2`, puis l'intitulé en gras (600) et le texte ;
  - icônes : `LifeBuoy` (support 30 jours), `TrendingUp` (Bilan des gains), `FolderOpen` (Dossier de passation), `ShieldCheck` (Fiche sécurité et données).

### 10.17 Bloc Engagement
- Panneau `raised`, `rounded-xl`, sans trait, sans icône, `p-8 lg:p-12`.
- Contenu : H2 « Le prix signé est le prix payé. » et le paragraphe de la copy (`max-w-[56ch]`, `ink`).
- Suivi de la relance CTA (§ 10.15).

### 10.18 Section « Pour qui »
- H2 + premier paragraphe en Body (`max-w-[56ch]`).
- Le second paragraphe (« Crescendo n'est pas le bon partenaire si… ») dans un encadré `surface`, filet 1px `rule`, `rounded-lg`, `p-6`, sans couleur : c'est une information, pas une alerte.

### 10.19 Bouton fixe mobile
- Sous `lg` uniquement : `fixed inset-x-0 bottom-0 z-40`, fond `paper`, filet haut 1px `rule`, `px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]`.
- Contenu : bouton `primary` compact pleine largeur « Réserver mon appel » (`data-cta="sticky"`). Il ouvre l'agenda en plein écran.
- Visibilité (via `IntersectionObserver`) : il apparaît quand le CTA du hero sort de l'écran, et disparaît quand `#rdv` entre dans l'écran. Une fois masqué, il est retiré de l'ordre de tabulation (`inert`).
- Apparition : glissement vers le haut de 200ms, `ease-out` (§ 13).

### 10.20 Page de confirmation (`/merci`)
- `robots: { index: false }`. Header réduit au logo, sans CTA.
- Fond `paper`, panneau `surface` centré (`max-w-[640px]`), filet 1px `rule`, `rounded-xl`, `p-8 lg:p-12`.
- Contenu : cote « Réservation confirmée », H1 de la copy (« C'est réservé. Préparez deux ou trois process calvaires. »), texte, avatar, lien `ghost` « Voir le profil LinkedIn d'Aymen ».
- C'est ici (ou dans le callback de l'outil de RDV) que se déclenche l'événement de conversion « réservation confirmée ».

---

## 11. Landing page (`/`)

Le parcours suit l'ordre de `.agents/landing/07-copy-final.md`. Les textes viennent de la copy, ponctués selon § 4.

| # | Section (ancre) | Contenu (copy) | Mise en forme |
|---|---|---|---|
| — | Header | Logo, bouton « Réserver mon appel » | § 10.7, sans menu |
| 1 | **Hero** | Surtitre, H1, sous-titre, CTA, avatar + ligne sous le bouton, ligne de preuve | Fond `paper`, sans grille. Surtitre en `.t-surtitre` `ink`, sans pilule. H1 en Display sur toute la largeur du conteneur. Dessous, 2 colonnes `lg` (7/12 et 5/12, `gap-12`) : à gauche le lead, le CTA, l'avatar (§ 10.12) et la ligne de preuve en Small ; à droite la planche (§ 10.13). Mobile : empilé, la planche en dernier |
| 2 | **Problème** | H2, 2 paragraphes | Fond `paper`. Sur `lg`, H2 à gauche (5/12) et les 2 paragraphes à droite (7/12, `max-w-[56ch]`), alignés en haut. Mobile : empilé. Aucun décor |
| 3 | **Ce qu'on automatise** (`#process`) | H2, intro, 7 process, paragraphe outils, relance + CTA | Intro en Lead. Nomenclature (§ 10.14), puis relance (§ 10.15) |
| 4 | **Preuve** | H2, photo, 2 paragraphes ; H3 « Quelques projets livrés » masqué | 2 colonnes `lg` (`gap-16`) : photo (5/12, § 9) avec la légende en cote, et texte (7/12). Pas de logos. Mini-cas : composant `<MiniCase>` prêt (carte § 10.4, marqueur bloc `blush`, cote « Secteur · taille », « Avant » / « Livré »), **non rendu** tant qu'il n'y a pas 2 cas avec accord écrit. Dans ce cas, le H3 n'est pas rendu non plus |
| 5 | **Méthode** (`#methode`) | H2 ; H3 « Ce qui se passe pendant l'appel » ; Identification, Construction, Adoption | Fond `paper`, sans grille. Carte étapes numérotées pour l'appel (§ 10.5, `max-w-[720px]`). Puis l'**escalier montant**, 72px plus bas : 3 blocs (§ 10.3) `sky` → `mustard` → `sage`. Sur `lg`, 3 colonnes (`gap-8`) décalées vers le haut de gauche à droite (marge haute 96 / 48 / 0px), reliées par des connecteurs en équerre (§ 10.6). Mobile : en colonne, connecteur vertical de 24px |
| 6 | **Offre** (`#offre`) | H2, Sprint, Audit, Inclus | § 10.16 |
| 7 | **Engagement** | H2, paragraphe, relance + CTA | § 10.17, puis § 10.15 |
| 8 | **Pour qui** | H2, 2 paragraphes | § 10.18 |
| 9 | **FAQ** (`#faq`) | H2, 11 questions | § 10.8 |
| 10 | **CTA final** (`#rdv`) | H2 en question, paragraphe, capacité, CTA, ligne sous le bouton, agenda | § 10.9, avec `.section-end` |
| — | Footer | | § 10.11 |
| — | Bouton fixe mobile | « Réserver mon appel » | § 10.19 |
| — | Confirmation (`/merci`) | Titre, texte, lien LinkedIn | § 10.20 |

**Règles de la page :**
- **Aucun `[NEED]` ni placeholder visible en production.** Un élément qui dépend d'une information facultative n'est pas rendu (phrase de capacité, mini-cas, citation « prospects chauds »). Les `[NEED]` obligatoires de la copy (délai du Sprint, durée de l'audit, prix de la maintenance, etc.) bloquent la mise en ligne.
- **Toutes les sections ont le même rythme** (`.section`, § 6). Aucune surcharge de padding au cas par cas.
- **Aucune flèche entre les sections.** Le parcours se lit par l'ordre des sections et par les relances CTA.
- **Une seule animation d'entrée** : la planche du hero. Les sections n'apparaissent pas au scroll.
- Variante en réserve : H1 B (« Automatisez vos process calvaires, de l'audit à la mise en production. »), à utiliser si le test des 5 secondes échoue. Elle remplacerait le H1 par une modification du texte, sans bascule prévue en v1. La mise en forme ne change pas.
- **Autres pages de la landing :** `/merci` (§ 10.20), `/mentions-legales` et `/confidentialite` (panneau `surface` centré comme `/merci`, `max-w-[720px]`, prose § 12.5, header complet), et la **page 404** : en-tête de page sur `paper`, l'escalier du logo en illustration (96px), H1 « Cette page n'existe pas. », puis un bouton `secondary` « Retour à l'accueil » et un lien `ghost` « Lire le carnet » (rendu à partir de la phase 2).

---

## 12. Blog (`/blog`) et espace admin

> Le blog est un **levier SEO**. La landing ne le met pas en avant : seul le lien « Le carnet » du footer y mène. Il est pourtant **entièrement indexable**, et chaque article renvoie vers la réservation. Les articles sont **stockés en base**. Le consultant les écrit et les publie depuis l'espace admin (§ 12.7). Le périmètre de la v1 est celui de la phase « fast blog » de `docs/PRD.md`.

### 12.0 Routes et SEO technique

- Le blog est sur le même domaine que la landing. Il n'y a ni sous-domaine ni middleware de réécriture.
- URLs publiques : `/blog` pour la liste, `/blog/<slug>` pour un article. Le code est dans `app/blog/page.tsx` et `app/blog/[slug]/page.tsx`.
- Un article absent, en brouillon, dépublié ou supprimé renvoie la page 404 (§ 11).
- Il y a un seul `metadataBase` (`https://crescendo.fr`), déclaré dans le layout racine. Chaque page déclare `alternates.canonical` : `/`, `/blog` ou `/blog/<slug>`.
- **Titre et description :** `<titre SEO> — Crescendo` et la meta description de l'article (§ 12.1). La liste a son propre titre, « Le carnet de l'automatisation — Crescendo ».
- **Open Graph et Twitter card :** l'image de partage d'un article est **sa couverture**, sans image générée.
- **Sitemap unique** (`app/sitemap.ts`) : la landing, `/blog` et les articles publiés, avec `lastModified` égal à la date de dernière modification. Il ne contient jamais de brouillon. La publication ou la dépublication le met à jour sans redéploiement, par revalidation.
- **Robots** : un seul `app/robots.ts`, qui pointe vers le sitemap. L'admin **n'y figure pas**, pour ne pas exposer son adresse : il est protégé par `noindex` (§ 12.7).
- Les déploiements de preview Vercel ne sont jamais indexés (`noindex` hors production).
- **Données structurées** : un `BlogPosting` par article, avec :
  - `headline` et `description` ;
  - `image`, la couverture ;
  - `datePublished`, la date de première publication, et `dateModified` ;
  - `author`, une `Person` « Aymen Jouini » dont l'`url` est son profil LinkedIn ;
  - `publisher`, l'`Organization` Crescendo, dont l'`url` est `https://crescendo.fr`.
- **Search Console** : déclarer la propriété de domaine `crescendo.fr`, puis soumettre le sitemap.
- Pas de flux RSS en v1.

### 12.0 bis Conversion et mesure

- **UTM des CTA du blog** : `/?utm_source=blog&utm_medium=<nav|article-cta>&utm_campaign=<slug>#rdv`. Sur la liste, il n'y a pas de `utm_campaign`. Les paramètres se placent **avant** l'ancre `#rdv` : placés après, ils feraient partie du fragment et l'outil de mesure ne les lirait pas.
- **Outil de mesure** : Vercel Web Analytics, sans cookie, donc sans bandeau cookies, très pénalisant sur mobile. Les événements personnalisés demandent l'offre Pro, et le panneau UTM l'option Web Analytics Plus. Comme il n'y a qu'un domaine, passer du blog à la landing reste une seule visite.
- **Événements (PRD)** :
  - le clic sur un CTA, avec sa position (`data-cta`, § 10.1) ;
  - la réservation confirmée, à la confirmation (§ 10.20) et non au clic.
  - L'ouverture de l'agenda n'est pas mesurée en v1.
- Le script de mesure n'est pas chargé dans l'admin.
- Les UTM des liens LinkedIn suivent le tableau de 06-cro-review.

### 12.1 Contenu d'un article

Le consultant saisit tous les champs dans l'admin (§ 12.7).

| Champ | Règle |
|---|---|
| Titre | Obligatoire, ponctué selon § 4 |
| Chapô | Obligatoire, 1 ou 2 phrases. Il sert d'extrait sur les cartes et de meta description par défaut |
| Catégorie | Obligatoire, une des 4 de § 3 : `automatisation-ia`, `outils-no-code`, `digitalisation`, `cas-clients` |
| Couverture | Obligatoire pour publier, avec son texte alternatif. JPEG, PNG ou WebP, 5 Mo au plus. Affichée en 16:10, recadrée au centre. Elle sert aussi d'image de partage. Recommandé : 1200 × 750 px au moins, le sujet au centre (LinkedIn recadre en 1,91:1) |
| Corps | Markdown standard |
| Titre SEO | Par défaut, le titre. Le suffixe « — Crescendo » est compté. Avertissement non bloquant au-delà de 60 caractères |
| Meta description | Par défaut, le chapô. Avertissement non bloquant au-delà de 155 caractères |
| Slug | Généré à partir du titre, en minuscules, sans accents, avec des tirets. Seuls `a-z`, `0-9` et `-` sont acceptés. Il doit être unique. **Il est figé après la première publication** |

- **Valeurs calculées :**
  - le temps de lecture, à 200 mots par minute, arrondi à la minute supérieure (1 au minimum) ;
  - la date de publication, celle de la première publication, conservée si l'article est republié ;
  - la date de dernière modification, transmise aux moteurs mais jamais affichée.
- **Auteur** : toujours « Aymen Jouini ». Il n'y a pas de champ auteur.
- **Markdown accepté :**
  - Intertitres, gras, listes, citations, liens, images, code et tableaux.
  - Un `#` dans le corps est rendu comme un H2, pour garder un seul `h1` par page (§ 14).
  - `*texte*` est rendu en graisse 500, parce que le site n'utilise pas l'italique (§ 17).
  - Le HTML brut n'est pas interprété.
- Il n'y a pas de composant maison en v1 (§ 12.6).

### 12.2 Page liste

- L'en-tête est sur fond `paper`, sans grille ni escalier. Il contient la cote « Le blog », le H1 « Le carnet de l'automatisation » et le lead.
- La liste n'a ni filtre ni article à la une.
- La grille compte 3 colonnes sur desktop, 2 sur tablette et 1 sur mobile, avec `gap-x-8 gap-y-12`. Les articles vont du plus récent au plus ancien, tous sur une seule page.
- **État vide** (aucun article publié) :
  - l'en-tête reste, et la grille est remplacée par un panneau `surface` (filet, `rounded-xl`, `p-8`) ;
  - dans le panneau : l'escalier du logo en illustration (96px), une phrase courte (« Les premiers articles arrivent. ») et un bouton `primary` compact « Réserver mon appel » (`data-cta="blog-vide"`) ;
  - cet état ne doit jamais ressembler à une page cassée.

### 12.3 Carte d'article
- Sans boîte : tout le bloc est un `<a>`.
- Image de couverture `rounded-lg` en haut (ratio 16:10), filet 1px `rule`.
- Puis, dans l'ordre :
  - le tag de catégorie (§ 10.2) ;
  - la cote « date · temps de lecture » ;
  - le titre en H4, 2 lignes au plus ;
  - le chapô en extrait, 3 lignes au plus, en `ink-2`.
- Au survol, le titre se souligne (1px, `underline-offset-4`). L'image ne bouge pas.

### 12.4 Page article
- Fond `paper`.
- **En-tête**, dans une colonne `max-w-[720px]` :
  - le tag de catégorie et le H1 ;
  - le chapô en Lead ;
  - la ligne méta en cote : « Aymen Jouini · 12 novembre 2026 · 6 min de lecture ». La date est au format long français.
  - Puis la couverture, plus large (`max-w-[960px]`, `rounded-lg`, filet, 16:10, avec son `alt`).
- **Corps** : colonne `max-w-[720px]`, typo « Body article », prose § 12.5.
- Pas de fil d'Ariane ni de sommaire en v1. Pour revenir à la liste, on passe par « le carnet » dans la nav.
- **Fin d'article** : un bloc CTA sur panneau `surface`, filet, `rounded-xl`, `p-6 lg:p-8`. Il contient « Ce sujet vous parle ? Réservons 30 min. » et le bouton `primary` compact « Réserver mon appel » (`data-cta="article-cta"`, UTM `article-cta`). Il n'y a pas d'articles liés en v1.

### 12.5 Styles du contenu (prose Markdown)

| Élément | Style |
|---|---|
| `h2` | H2 avec `mt-16 mb-4` ; marqueur bloc 12px de la couleur de la catégorie avant le titre, écart de 12px |
| `h3` | H3, `mt-10 mb-3` |
| `p` | Body article, `mb-6` |
| `strong`, `em` | Graisse 600 pour `strong`, 500 pour `em` (pas d'italique) |
| `a` | `ink`, soulignement 1px `rule-strong`, `underline-offset-4` ; survol : soulignement `ink` |
| `ul`, `ol` | Puces carrées de 6px `rule-strong` / numéros en mono `ink-3`, `pl-6`, `space-y-2` |
| `blockquote` | Bord gauche 2px `ink`, `pl-5`, texte 20px 400 `ink`, sans fond, sans italique |
| `code` inline | Mono 0.9em, fond `surface`, filet 1px `rule`, `rounded-sm`, `px-1.5` |
| Bloc de code | Fond `ink`, texte `on-ink`, `rounded-lg`, sans ombre, langage en cote `on-ink-2` en haut à droite ; coloration avec Shiki (thème sombre aux couleurs de la palette) |
| `img` | `rounded-lg`, filet 1px `rule`, `alt` obligatoire ; légende en cote centrée si l'image a un titre Markdown |
| `hr` | Filet 1px `rule`, `my-12` |
| `table` | Filet 1px `rule` autour (`rounded-lg`), en-têtes fond `raised` texte 500, lignes séparées par 1px `rule`, chiffres `tabular-nums` alignés à droite |

Ces styles servent aussi aux pages légales (§ 11) et à l'aperçu de l'éditeur (§ 12.7).

### 12.6 Composants maison : hors v1

Le PRD écarte les composants maison de la v1, et le CTA de fin d'article est ajouté automatiquement (§ 12.4). Leur dessin est gardé ici pour une version ultérieure :
- **Callout** (astuce, attention, à retenir) : un encadré `surface`, filet, `rounded-lg`, `p-5`. L'en-tête porte un marqueur bloc (`sage`, `blush` ou `sky`) et la cote « Astuce », « Attention » ou « À retenir ». Pas d'icône, pas de fond coloré.
- **Steps** : une liste numérotée de documents reliés par des connecteurs à l'équerre. C'est une version compacte de la planche, sans grille ni ombre.
- **BeforeAfter** : deux cartes côte à côte. « Avant » a un trait tireté de 1px `rule-strong`, comme les éléments à démolir sur un plan. « Après » a un trait d'encre plein de 1.5px. Chaque titre est en cote.
- **CTA** : un bloc de réservation compact, inséré dans le corps.

### 12.7 Espace admin

> Réservé au consultant et conçu pour un écran d'ordinateur (1024px et plus). Il suit le même design system en mode outil : papier, encre et filets. **Il n'utilise jamais le corail**, réservé à la réservation : son action principale utilise le bouton `action` (§ 10.1). Il vouvoie, et ses libellés suivent § 15.

**Accès**
- L'admin est sous `/admin`. Aucun lien du site public n'y mène. Toutes ses pages portent `noindex, nofollow` et ne figurent ni dans le sitemap ni dans robots. Il n'a pas de mesure.
- **Layout** : une barre haute de 56px, fond `paper`, filet bas 1px `rule`. À gauche, le symbole du logo suivi de « Admin » en Inter Tight 500, `ink-2`. À droite, un lien `ghost` « Se déconnecter ». L'admin n'a ni footer ni bouton fixe.

**Connexion** (`/admin/connexion`)
- Un panneau `surface` centré (`max-w-[440px]`, filet, `rounded-xl`, `p-8`) contient le H1 « Connexion », le champ « Email » (§ 10.10) et le bouton `action` « Recevoir un lien de connexion ».
- Après l'envoi, quelle que soit l'adresse, le panneau affiche « Si cette adresse est autorisée, un lien de connexion vient de vous être envoyé. ». Le bouton est désactivé pendant 60 s, avec la cote « Nouveau lien possible dans 42 s ».
- Si le lien a expiré ou a déjà servi, le panneau affiche « Ce lien n'est plus valable. » et le bouton `action` « Recevoir un nouveau lien ».
- Une fois connecté, le consultant arrive sur la liste des articles.

**Liste des articles** (`/admin`)
- **En-tête :** le H1 « Articles » à gauche, le bouton `action` « Nouvel article » à droite.
- **Tableau** (style `table` de § 12.5), trié par dernière modification. Ses colonnes :
  - **Titre** : un lien vers l'éditeur.
  - **Statut** : un texte, « Publié » en `ink` 500 ou « Brouillon » en `ink-3`. Il n'y a pas de pastille de couleur.
  - **Catégorie** : le tag de § 10.2.
  - **Publié le** et **Modifié le** : en mono `tabular-nums`, au format JJ/MM/AAAA.
  - Un lien `ghost` « Voir en ligne » pour les articles publiés.
- **État vide** : un panneau `surface` avec « Aucun article pour l'instant. » et le bouton `action` « Nouvel article ».

**Éditeur** (`/admin/articles/<id>`)
- **Barre d'actions collante** sous la barre haute, fond `paper`, filet bas :
  - À gauche :
    - le lien `ghost` « Articles », avec l'icône `ArrowLeft` ;
    - le statut en cote ;
    - l'état d'enregistrement en cote (« Modifications non enregistrées », « Enregistré à 14:32 »).
  - À droite, pour un brouillon : `ghost` « Supprimer », `secondary` « Enregistrer », `action` « Publier ».
  - À droite, pour un article publié : `ghost` « Supprimer », `ghost` « Voir en ligne », `secondary` « Dépublier », `action` « Mettre à jour ».
  - Cmd/Ctrl + S enregistre.
- **Métadonnées**, en haut, sur une grille de 2 colonnes (`gap-8`), avec les champs de § 10.10 :
  - **Titre** (pleine largeur, texte 20px) ;
  - **Chapô** (zone de texte sur 3 lignes) ;
  - **Catégorie** (liste déroulante) ;
  - **Couverture** : une zone de dépôt (filet tireté 1px `rule-strong`, `rounded-lg`), qui montre ensuite l'aperçu en 16:10 recadré, avec juste dessous le champ obligatoire « Texte alternatif ».
- **Panneau SEO** (`<details>` ouvert par défaut, encadré `surface`, filet, `rounded-lg`, `p-6`) :
  - **Titre SEO** et **Meta description**, chacun avec un compteur en cote (`52 / 60`, `ink-3`). Au-delà de la limite, le compteur passe en `ink` 500 et une phrase s'ajoute (« Au-delà de 60 caractères, le titre risque d'être coupé. »). Ce n'est pas bloquant, donc jamais en `danger`.
  - **Slug** : le préfixe `crescendo.fr/blog/` en cote devant un champ en mono.
    - Erreurs de § 10.10 : « Ce slug est déjà utilisé par « Titre de l'article ». » ou « Seuls les lettres a à z, les chiffres et les tirets sont acceptés. »
    - Après la première publication, le champ passe en lecture seule, sur fond `raised`, avec l'icône `Lock` et la mention « Le slug ne change plus après publication. ».
- **Zone d'écriture**, sous les métadonnées, en 2 colonnes égales (`gap-8`). Elle occupe la hauteur de l'écran moins les barres, et chaque colonne défile seule.
  - **À gauche, le Markdown :**
    - Une zone de texte en mono 15px, interligne 1.6, sur fond `surface`, filet 1px `rule-strong`, `rounded-md`, `p-4`.
    - Au-dessus, le bouton `secondary` « Ajouter une image », seul bouton de l'éditeur. Il n'y a pas de barre de mise en forme.
  - **À droite, l'aperçu :**
    - Le corps rendu exactement comme sur la page article (prose § 12.5), sur fond `paper`, filet 1px `rule`, `rounded-lg`, `p-6`.
    - La cote « Aperçu » en tête.
- **Ajouter une image** : un `<dialog>` modal sur panneau `surface`. Il contient le choix du fichier, l'aperçu, le champ obligatoire « Texte alternatif » et le bouton `action` « Insérer ». L'image est insérée à l'endroit du curseur. En cas d'erreur de format ou de taille (§ 10.10) : « Format accepté : JPEG, PNG ou WebP, 5 Mo au plus. »
- **Publication incomplète** :
  - Un encadré d'erreur s'affiche en haut de l'éditeur : filet 1px `danger`, icône `AlertCircle`, et « Pour publier, il manque : » suivi de la liste des éléments.
  - Chaque champ concerné passe à l'état d'erreur.
  - Rien n'est publié.
- **Échec d'enregistrement ou de téléversement** : le même encadré affiche « L'enregistrement a échoué. Vos modifications sont toujours dans l'éditeur. Réessayez. ». Le texte reste en place.
- **Supprimer** :
  - un `<dialog>` modal affiche « Supprimer définitivement « Titre de l'article » ? » ;
  - il a deux boutons, `secondary` « Annuler », qui a le focus par défaut, et `action` « Supprimer » ;
  - après la suppression, le consultant revient sur la liste.
- **Quitter avec des modifications non enregistrées** : l'avertissement natif du navigateur s'affiche, y compris pour une navigation dans l'admin.
- Les dialogs de l'admin suivent les règles de § 14 : focus piégé, `Échap` ferme, et le focus revient au bouton d'origine.

---

## 13. Mouvement

- **Une seule courbe :** `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-out`, § 5). Aucun `ease`, `linear`, ressort ou rebond.
- **Trois durées :**

| Durée | Usage |
|---|---|
| 150ms | Survol et pression : couleur, fond, trait, enfoncement du bouton corail |
| 200ms | Accordéon FAQ, filet du header au scroll, bouton fixe mobile |
| 480ms | Entrée de la planche du hero (documents et connecteurs) |

- **Une seule entrée au chargement :** la planche du hero (§ 10.13). Les documents apparaissent en fondu avec une montée de 8px, décalés de 60ms, puis les connecteurs se dessinent.
- **Survol** = changement de couleur ou de trait. Rien ne se soulève, rien ne grossit.
- **Pression** du bouton corail : il s'enfonce de 3px et son ombre disparaît.
- On anime uniquement `color`, `background-color`, `border-color`, `opacity`, `transform` et `stroke-dashoffset`. Jamais `transition-all`, jamais une largeur, une hauteur ou une marge.
- **Supprimé :** l'apparition des sections au scroll, les flèches qui se dessinent entre les sections, le soulèvement `.press` au survol.
- Toujours respecter `prefers-reduced-motion` : pas de translation, pas de dessin de connecteur, pas de glissement. L'état final s'affiche directement.

---

## 14. Accessibilité

- Contraste du texte ≥ 4.5:1 :
  - `ink` passe sur toutes les couleurs de la palette ;
  - `ink-2` sur `paper`, `surface` et `raised` ;
  - `ink-3` **uniquement** sur `paper` et `surface` ;
  - sur `ink`, le texte secondaire utilise `on-ink-2`.
- Contraste des composants ≥ 3:1 (WCAG 1.4.11) : le bord des inputs, du contrôle segmenté et des créneaux utilise `rule-strong`, jamais `rule`.
- Focus visible partout : outline 2px `ink`, décalage de 2px. Sur fond `ink` (footer, segment coché), l'outline passe en `on-ink`.
- Cibles tactiles ≥ 44 × 44px.
- Les éléments décoratifs (grille de la planche, connecteurs, marqueurs, traits de rappel des cotes) portent `aria-hidden="true"`.
- La planche du hero est une image pour les lecteurs d'écran : `role="img"` + `aria-label` (§ 10.13).
- L'avatar porte `alt="Aymen Jouini, fondateur de Crescendo"`.
- Une erreur n'est jamais signalée par la couleur seule : texte + icône + bord `danger`.
- Le bouton fixe mobile ne masque jamais l'élément qui a le focus : l'espace est réservé en bas de page (§ 6), et le bouton est `inert` quand il est caché.
- Le dialog de l'agenda piège le focus, se ferme avec `Échap` et rend le focus au bouton qui l'a ouvert.
- Hiérarchie de titres stricte (un seul `h1` par page).
- Le symbole du logo dans la nav est accompagné du nom ; le lien porte `aria-label="Crescendo — accueil"`.
- `lang="fr"` sur `<html>`.

---

## 15. Ton et rédaction

> La copy de la landing est figée dans `.agents/landing/07-copy-final.md`. Ces règles servent aux textes d'interface qui n'y figurent pas (états vides, labels, messages d'erreur, blog).

- **Vouvoiement**, phrases courtes, verbes d'action.
- Ponctuation des titres selon § 4 : point final sur les phrases, rien sur les titres nominaux, « ? » sur les questions. Pas de point d'exclamation.
- Labels, boutons et cotes en casse normale, sans point final.
- On parle de **gains concrets** (heures gagnées, erreurs évitées) plutôt que de technologie.
- Vocabulaire accessible : « automatiser vos relances » plutôt que « déployer un agent LLM ».
- Mots de la marque : process calvaires, IA bien placée, de l'audit à la mise en production.
- Mots interdits (détail dans `.agents/product-marketing.md`) : révolutionner, disruptif, magique, remplacer vos équipes, transformation digitale, garanti, zéro complexité.
- **Pas de chiffres inventés.** Une information manquante reste un `[NEED]` dans la copy, et elle n'est jamais affichée en production (§ 11).
- CTA toujours formulé de la même façon : **« Réserver mon Appel Process Calvaires »**, ou en version courte **« Réserver mon appel »**.

**Exemples de titres (copy finale, ponctuée) :**
- Hero : « Lundi matin, les relances clients sont parties et les appels du week-end sont triés. »
- Preuve : « Vos automatisations sont conçues par un architecte. »
- Engagement : « Le prix signé est le prix payé. »
- CTA final : « Quels process calvaires coûtent le plus à votre équipe ? »
- Section process (nominal) : « Les process calvaires qu'on automatise »

---

## 16. Performance et SEO

- Polices via `next/font` (aucune requête externe au rendu). Inter Tight en 3 graisses (400, 500, 600), JetBrains Mono en 1 (500). Le wordmark est en SVG (§ 2).
- Images via `next/image` (formats AVIF/WebP, `sizes` renseigné). La photo du fondateur est servie en 80px et 96px pour l'avatar, en 480px pour la Preuve.
- Grille de la planche en CSS pur (pas d'image de fond).
- Logo, icônes et planche du hero en SVG ou HTML inline.
- Embed de l'agenda chargé en différé (§ 10.9).
- Objectif Lighthouse : ≥ 95 sur les quatre axes.
- **Métadonnées :**
  - landing : les balises de la copy (title « Crescendo, agence IA et automatisation pour PME », meta description, og:title, og:description) ;
  - autres pages : title au format « Titre de la page — Crescendo », description ≤ 155 caractères ;
  - Open Graph et Twitter cards partout ; données structurées `Organization` (landing) et `BlogPosting` (articles).
- **og:image de la landing** : 1200 × 630 px, générée avec `next/og`. C'est le premier visuel que voit un prospect sur LinkedIn.
  - Fond `paper`, sans grille.
  - À gauche, la photo d'Aymen, `rounded-xl`, filet 1px `rule`.
  - À droite, le lockup logo et l'og:title en Inter Tight 600 `ink`, puis la cote « Aymen Jouini · fondateur ».

---

## 17. À faire / À éviter

**À faire**
- Garder le chrome calme : papier, encre, filets de 1px.
- Mettre la couleur et la matière dans la planche du hero et dans l'escalier, nulle part ailleurs.
- Utiliser le corail uniquement pour réserver (boutons, créneau choisi), avec un texte `ink`.
- Annoter avec des cotes : mono, casse normale, `ink-3`, trait de rappel.
- Tracer les connecteurs à l'équerre, comme dans le logo.
- Construire la hiérarchie avec la taille et la couleur (400 / 500 / 600).
- Poser chaque espacement sur la grille de 4px, avec le même rythme pour toutes les sections.
- Donner une couleur à une catégorie par son marqueur bloc.
- Placer le visage d'Aymen près de chaque CTA important.
- Ponctuer les phrases-titres, laisser les titres nominaux sans point.

**À éviter**
- Les pilules (sauf l'avatar) et les rayons de plus de 20px.
- Une ombre dure ailleurs que sur le bouton corail. Les ombres floues par défaut.
- Les contours noirs épais sur les cartes, les tags ou les inputs.
- Un pastel en fond de carte, de tuile d'icône, d'en-tête d'offre ou d'état sélectionné.
- Les tuiles d'icônes colorées, les icônes de tailles ou d'épaisseurs différentes.
- Les graisses 700 et plus, les majuscules espacées, le tracking négatif sous 20px, l'italique.
- La grille blueprint ailleurs que dans la planche du hero.
- Le décor sans information : vis, flèches entre sections, pilules qui répètent le texte.
- L'apparition des sections au scroll, le soulèvement au survol, `transition-all`.
- Les dégradés, la transparence décorative, le blanc pur `#FFFFFF`.
- Les visuels clichés de l'IA (robots, cerveaux, circuits bleus néon) et les emojis sur le site.
- Un `[NEED]`, un `[RÉSULTAT]` ou tout autre placeholder visible en production.
- Les logos des grands comptes du fondateur, ou un bandeau « ils nous font confiance ».
- Un badge « recommandé » ou « populaire » sur une offre.
- Un menu dans le header de la landing ou du blog.
- Le corail dans l'admin : son action principale est le bouton `action` en encre.
- Un lien vers une page qui n'existe pas encore (« Le carnet » avant la livraison du blog).
- Des montants en « k€ » dans l'interface.

---

## 18. Journal des décisions

| Date | Décision | Raison |
|---|---|---|
| 2026-11-12 | Blog : lead de `/blog` (« Relances, devis, factures, emails : comment automatiser les process calvaires d'une PME, avec des exemples concrets. »), état vide validé (« Les premiers articles arrivent. »), thème Shiki sombre aux couleurs de la palette, sans corail ni italique. Le bouton de l'état vide porte les UTM de la nav (sans campagne). La liste reprend l'image de partage de la landing | Textes validés par le fondateur pendant le plan de la phase 2 |
| 2026-11-12 | Mesure : Vercel Web Analytics (§ 12.0 bis) à la place de Matomo ; H1 de la 404 validé (« Cette page n'existe pas. ») | Choix du fondateur pendant le plan d'implémentation : un outil intégré à l'hébergeur, sans cookie |
| 2026-11-12 | **Alignement sur `docs/PRD.md`** : le blog passe sur `crescendo.fr/blog` (plus de sous-domaine ni de middleware), les articles sont stockés en base et écrits en Markdown dans un espace admin (§ 12.7), avec Aymen Jouini comme auteur. La couverture sert d'image de partage, et le slug est figé après publication | PRD validé par le fondateur : livrer en deux phases, « fast landing » puis « fast blog ». Un seul domaine simplifie le SEO, le sitemap et la mesure |
| 2026-11-12 | Hors v1 : filtre et pages par catégorie, article à la une, sommaire, fil d'Ariane, articles liés, flux RSS, composants maison (§ 12.6), variante photo du hero et sa bascule, événement « ouverture de l'agenda » | Allègement du PRD. Les dessins restent décrits pour une version ultérieure |
| 2026-11-12 | Outil de rendez-vous : Cal.com | Choix du fondateur. Il levait le `[NEED]` n° 7 de la copy |
| 2026-11-12 | Bouton `action` en encre pour l'admin ; le lien « Le carnet » du footer apparaît avec le blog | Le corail reste réservé à la réservation. On ne met jamais de lien vers une page qui n'existe pas encore |
| 2026-11-12 | **Direction « planche d'architecte »** à la place du « blueprint rétro doux » : chrome en filets de 1px, aucune ombre sur les cartes, rayons 3 / 6 / 10 / 14 / 20 dérivés du logo, plus de pilules | Audit de design : le néo-brutalisme pastel (contour 2px, ombre dure, pilule et pastel sur chaque élément) est devenu le style par défaut des générateurs de sites. Appliqué partout, il empêchait le schéma du hero de ressortir. Une planche calme et précise rend visible la preuve « conçues par un architecte » auprès de dirigeants de PME |
| 2026-11-12 | Ombre dure réservée au bouton corail (`shadow-press`) ; `shadow-float` pour les documents de la planche | Une signature appliquée partout ne signale plus rien. Le bouton de réservation est le seul objet qu'on « presse » |
| 2026-11-12 | Pastels limités au logo, à l'escalier de la méthode, aux marqueurs de catégorie et aux documents de la planche | Les pastels décoraient les pastilles d'icônes, les pilules de douleurs, les en-têtes d'offres et les états sélectionnés sans rien signifier |
| 2026-11-12 | Planche du hero : trois documents dessinés reliés à l'équerre, seul moment riche de la page et seule animation d'entrée | Concentrer la couleur et la matière sur ce qui montre le métier, pour le test des 5 secondes |
| 2026-11-12 | La cote devient la signature : mono, casse normale, `ink-3`, trait de rappel | Les labels mono en MAJUSCULES espacées étaient un tic. La cote vient du monde de l'architecte et reste discrète |
| 2026-11-12 | Inter Tight en 400 / 500 / 600 (au lieu de 400 / 500 / 700 / 800) ; Display à 600, -0.025em ; wordmark en SVG | Le « grotesque ultra-gras serré » était un tic. La hiérarchie passe par la taille. Le wordmark reste en 800 (logo inchangé) sans charger la graisse |
| 2026-11-12 | Point final sur les titres qui sont des phrases, pas sur les titres nominaux (tableau en § 4). **Remplace partiellement** la décision du 2026-11-11 sur la ponctuation | Choix du fondateur. « Le prix signé est le prix payé. » garde son point ; « Reporting. » ou « Identification. » sonnaient comme un tic |
| 2026-11-12 | Section process en nomenclature (liste à filets sur 2 colonnes) au lieu de 7 cartes égales à tuile colorée | Les cartes identiques avec tuile d'icône sont la « feature card » des templates |
| 2026-11-12 | Suppression des flèches entre sections, des repères « vis », des pilules de douleurs, de la grille en fond de section et de l'apparition au scroll | Décor sans information, ou qui répétait le texte |
| 2026-11-12 | Bloc de réservation sur panneau `surface` (au lieu d'une grande carte corail) ; créneau choisi en corail ; suppression de la variante « secondaire sur corail » | Le corail marque l'action de réserver, pas une surface. Le bouton corail redevient le même partout |
| 2026-11-12 | Couleur `danger` (#A8321E) pour les erreurs, au lieu de `coral-dark` | Une erreur ne doit pas emprunter la couleur de la réservation |
| 2026-11-12 | Rythme vertical unique (`.section` : 64 / 112px de `padding-top`), grille stricte de 4px | Le preview corrigeait le rythme avec des `padding-top:0` en ligne et contenait des valeurs hors grille (6, 10, 14, 18, 26px) |
| 2026-11-12 | `design-preview.html` réécrit selon la nouvelle direction | Le preview est le rendu de référence de ce fichier |
| 2026-11-11 | Mise à jour du design system pour l'aligner sur `.agents/` (copy finale v2.2, revue CRO, offre, product-marketing). La direction visuelle est conservée | La version précédente décrivait une autre landing : menu Services · Méthode · FAQ, 7 sections, « Services » (dont la formation, non incluse), méthode Diagnostic → Mise en place → Croissance, CTA « Réserver un appel », placeholders `[RÉSULTAT]` visibles |
| 2026-11-11 | Méthode renommée Identification → Construction → Adoption, dans le logo et sur le site | Nom de la méthode dans product-marketing et dans la copy |
| 2026-11-11 | Header de la landing sans menu ; bouton fixe en bas de l'écran sur mobile | Décisions n° 12 et quick win 4 de la revue CRO : une seule action |
| 2026-11-11 | Display ramené de 80px à 64px (desktop) et de 44px à 36px (mobile), H1 sur toute la largeur | Le H1 de la copy fait 82 caractères ; il doit tenir en 3 lignes sur desktop et laisser le CTA visible sur mobile |
| 2026-11-11 | ~~Surtitre du hero en pilule visible, et plus en label mono gris~~ **Remplacée le 2026-11-12** : surtitre en texte 18px 500 `ink`, sans pilule | La revue CRO demande un surtitre bien visible. La taille et l'encre suffisent, sans la pilule |
| 2026-11-11 | ~~Point final sur les titres affirmatifs, « ? » sur les questions~~ **Remplacée le 2026-11-12** (voir plus haut) | |
| 2026-11-11 | Visuel du hero : schéma flowchart « devis → facture → relance ». Photo d'Aymen en variante B ; escalier du logo réservé à la Méthode, à la 404 et au blog | Le schéma montre le métier (le H1 ne le dit pas) et fait du flowchart le produit. Test 2 de la revue CRO préparé |
| 2026-11-11 | Footer complet conservé, avec le lien « Le carnet » ~~dès le lancement~~ (**remplacé le 2026-11-12** : le lien apparaît avec le blog) ; état vide soigné pour la liste du blog | Choix du fondateur. L'état vide évite une page qui a l'air cassée tant qu'il n'y a pas d'article |
| 2026-11-11 | Mesure : outil exempté de consentement (Matomo exempté, à vérifier) plutôt que Plausible ou GA4 ; `data-cta` par position | Revue CRO : pas de bandeau cookies sur mobile, clics mesurés par emplacement |
| 2026-11-11 | UTM placés avant `#rdv` dans les liens du blog | Dans l'ancienne version, `#rdv?utm_…` mettait les UTM dans le fragment, illisibles par l'outil de mesure |
