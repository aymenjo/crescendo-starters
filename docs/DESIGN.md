# DESIGN.md — Crescendo

> Design system de **Crescendo**, agence IA et automatisation pour PME.
> Ce fichier est la source de vérité visuelle du site construit en **Next.js (App Router) + Tailwind CSS v4**, déployé sur **Vercel**, dans **un seul projet** :
> - **Landing page** sur `crescendo.fr` : objectif unique, la réservation de l'Appel Process Calvaires.
> - **Blog** sur le sous-domaine `blog.crescendo.fr` (« le carnet ») : objectif SEO, attirer du trafic qualifié et le renvoyer vers la réservation.
>
> Les domaines sont provisoires, à remplacer par le domaine définitif.
>
> **Le texte de référence est `.agents/landing/07-copy-final.md`.** DESIGN.md décrit la forme et ne réécrit pas la copy. Le positionnement, la voix et les mots interdits sont dans `.agents/product-marketing.md`, l'offre dans `.agents/landing/03-offer.md`, le parcours de réservation et la mesure dans `.agents/landing/06-cro-review.md`.
>
> Claude Code : lis ce fichier avant toute création ou modification d'interface et respecte-le strictement.

---

## 1. Vision

**Style : « blueprint rétro doux »**, un néo-brutalisme adouci. Formes franches (contours encre, ombres portées dures sans flou) posées sur un fond papier crème, avec des pastels pour la douceur. La page se lit comme un **flowchart** : des blocs reliés par des flèches courbes qui guident le visiteur jusqu'à la réservation.

**Ce qu'on doit retenir en 3 secondes :** un architecte dessine vos automatisations. La grille blueprint, c'est son plan ; le flowchart, c'est votre process une fois automatisé. Le style illustre la preuve centrale de la page : « Vos automatisations sont conçues par un architecte. »

**Mots-clés :** plan d'architecte · papier technique · flowchart · pastel · ombre dure · contour encre · parcours guidé · progression.

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

### Règles
- Ordre des blocs **immuable** : bleu → moutarde → corail.
- Zone de protection : la largeur d'un bloc tout autour.
- Taille minimale du symbole : 24 px de large.
- Interdit : recolorer les blocs, ajouter un dégradé, une ombre floue, déformer, mettre le nom en majuscules.
- Favicon : symbole seul dans une tuile crème `#FAF7F2`, contour encre, coins de 22 %.

---

## 3. Couleurs

### Palette

| Token | Hex | Rôle |
|---|---|---|
| `paper` | `#EEE7DC` | Fond général du site |
| `surface` | `#FAF7F2` | Cartes, encadrés, fond des articles |
| `ink` | `#111111` | Texte, contours, ombres dures |
| `ink-muted` | `#5C574F` | Texte secondaire, labels mono (≥ 4.5:1 sur `paper` et `surface`) |
| `grid` | `#DCD5C9` | Lignes de la grille blueprint |
| `line` | `#B5B0A7` | Bordures fines décoratives, séparateurs, texte secondaire du footer |
| `sky` | `#B3C7D9` | Accent bleu poudré |
| `mustard` | `#F2BB6B` | Accent moutarde |
| `sage` | `#AFC6A2` | Accent vert sauge |
| `blush` | `#EDB1B3` | Accent rose poudré |
| `coral` | `#EE6F5A` | **Réservation uniquement** |
| `coral-dark` | `#D9573F` | Survol des CTA, bordure des erreurs |

### Règles d'usage
- **Le texte sur les couleurs est toujours `ink`.** Jamais de blanc sur pastel ni sur corail (contraste insuffisant).
- **Corail = réservation.** Il est réservé aux boutons primaires (hero, relances intermédiaires, CTA final), au bouton du header, au bouton fixe mobile et au bloc de réservation. Jamais en décoration, jamais pour une catégorie. Seule exception : le 3ᵉ bloc du logo.
- Un bloc = une seule couleur pastel. Pas de dégradés.
- Proportions indicatives : 70 % `paper`/`surface`, 15 % `ink`, 12 % pastels, 3 % corail.
- Pas de mode sombre en v1. Les sections sombres ponctuelles (footer) utilisent `ink` en fond avec du texte `surface`.

### Couleurs de la méthode

| Étape | Couleur |
|---|---|
| 1. Identification | `sky` |
| 2. Construction | `mustard` |
| 3. Adoption | `sage` |

Dans le logo, le 3ᵉ bloc est corail. Sur le site, l'étape Adoption reste `sage`, car elle ne contient pas de CTA.

### Couleurs de catégories (blog)

| Catégorie | Couleur |
|---|---|
| Automatisation IA | `sky` |
| Outils & no-code | `mustard` |
| Digitalisation & stratégie | `sage` |
| Cas clients | `blush` |

---

## 4. Typographie

### Familles (via `next/font/google`)
- **Inter Tight** (400, 500, 700, 800) : titres et texte courant.
- **JetBrains Mono** (500) : labels techniques, annotations, métadonnées, prix, code.

```ts
// app/fonts.ts
import { Inter_Tight, JetBrains_Mono } from "next/font/google";

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
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

| Rôle | Mobile | Desktop | Graisse | Interligne | Tracking |
|---|---|---|---|---|---|
| Display (H1 hero) | 36px | 64px | 800 | 1.05 | -0.035em |
| Surtitre (hero) | 17px | 18px | 700 | 1.3 | 0 |
| H1 page / article | 36px | 56px | 800 | 1.05 | -0.035em |
| H2 section | 30px | 44px | 800 | 1.1 | -0.03em |
| H3 | 22px | 28px | 700 | 1.2 | -0.02em |
| H4 | 18px | 20px | 700 | 1.3 | -0.01em |
| Lead (chapô) | 18px | 22px | 500 | 1.5 | 0 |
| Body | 16px | 17px | 400 | 1.6 | 0 |
| Body article | 18px | 19px | 400 | 1.75 | 0 |
| Small | 14px | 14px | 400–500 | 1.5 | 0 |
| Label mono | 12px | 13px | 500 | 1.4 | 0.04em, MAJUSCULES |

- Le H1 du hero fait 82 caractères. Il s'étale sur **toute la largeur du conteneur** avec `text-wrap: balance`, pour tenir en 3 lignes sur desktop. Sur mobile, il prend environ 5 lignes, et le CTA reste visible sans défiler.
- « week-end » est insécable dans le H1 (`<span className="whitespace-nowrap">`) : sinon, sur mobile, le navigateur coupe au trait d'union (« week- / end »).
- Tous les titres utilisent `text-wrap: balance`.

### Ponctuation des titres
- **Les titres affirmatifs (H1, H2, H3) finissent par un point.** C'est une signature du style. La copy finale est écrite sans point : on l'ajoute à l'intégration, sans changer un mot (« Le prix signé est le prix payé. »).
- Les titres en forme de question gardent leur « ? » (CTA final, questions de la FAQ).
- Jamais de point d'exclamation.
- Les intitulés en gras des listes (« **Devis et facturation.** ») gardent la ponctuation de la copy.

### Règles
- Pas d'italique décoratif, pas de texte justifié.
- Les labels mono (`ink-muted`, majuscules) servent d'annotations « techniques » : numéros d'étapes, outils du schéma, catégories, dates, temps de lecture.
- Les prix utilisent `font-variant-numeric: tabular-nums`.
- Largeur max du texte courant : `68ch` (articles) et `56ch` (paragraphes de landing).

---

## 5. Tokens Tailwind v4

À placer dans `app/globals.css` :

```css
@import "tailwindcss";

@theme {
  /* Couleurs */
  --color-paper: #EEE7DC;
  --color-surface: #FAF7F2;
  --color-ink: #111111;
  --color-ink-muted: #5C574F;
  --color-grid: #DCD5C9;
  --color-line: #B5B0A7;
  --color-sky: #B3C7D9;
  --color-mustard: #F2BB6B;
  --color-sage: #AFC6A2;
  --color-blush: #EDB1B3;
  --color-coral: #EE6F5A;
  --color-coral-dark: #D9573F;

  /* Typo */
  --font-sans: var(--font-inter-tight), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  /* Rayons */
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;

  /* Ombres dures (signature) */
  --shadow-hard-sm: 3px 3px 0 0 var(--color-ink);
  --shadow-hard: 6px 6px 0 0 var(--color-ink);
  --shadow-hard-lg: 8px 8px 0 0 var(--color-ink);
  --shadow-hard-xl: 12px 12px 0 0 var(--color-ink);

  /* Contours */
  --border-ink: 2px;
  --border-ink-strong: 3px;
}

@layer base {
  html { background: var(--color-paper); color: var(--color-ink); }
  body { font-family: var(--font-sans); -webkit-font-smoothing: antialiased; }
  ::selection { background: var(--color-mustard); color: var(--color-ink); }
  :focus-visible { outline: 3px solid var(--color-ink); outline-offset: 3px; border-radius: 6px; }
}

@layer utilities {
  /* Grille blueprint */
  .bg-blueprint {
    background-color: var(--color-paper);
    background-image:
      linear-gradient(var(--color-grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-grid) 1px, transparent 1px);
    background-size: 32px 32px;
    background-position: -1px -1px;
  }
  .bg-blueprint-lg { background-size: 64px 64px; }

  /* Effet « pression » des éléments à ombre dure */
  .press {
    transition: transform 120ms ease, box-shadow 120ms ease;
  }
  .press:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 0 var(--color-ink); }
  .press:active { transform: translate(4px, 4px); box-shadow: 2px 2px 0 0 var(--color-ink); }
}

@media (prefers-reduced-motion: reduce) {
  .press, .press:hover, .press:active { transition: none; transform: none; }
}
```

---

## 6. Espacements et mise en page

- Base **8px**. Échelle usuelle : 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128.
- **Conteneur** : `max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8` (16px de gouttière minimum sur mobile).
- **Conteneur article** : `max-w-[720px]` pour le texte, `max-w-[960px]` pour les images larges.
- **Rythme vertical des sections** : `py-20 lg:py-32` (80px / 128px).
- **Breakpoints Tailwind par défaut** : `sm 640`, `md 768`, `lg 1024`, `xl 1280`. Conception **mobile-first**.
- **Alternance en zigzag** : sur desktop, les pilules alternent gauche/droite pour créer le parcours. Sur mobile, tout s'empile en colonne.
- **Bouton fixe mobile** : sous `lg`, le `body` réserve en bas l'espace du bouton fixe (§ 10.19) : `pb-[calc(80px+env(safe-area-inset-bottom))]`. Le footer n'est jamais masqué.
- **Ancres** : `scroll-margin-top` égal à la hauteur du header collant (desktop) sur chaque section ciblée.

---

## 7. Formes, contours, ombres

| Élément | Rayon | Contour | Ombre |
|---|---|---|---|
| Bouton, tag, pilule | `pill` | 2px `ink` | `hard-sm` → `hard` (CTA principal) |
| Surtitre du hero | `pill` | 2px `ink` | aucune |
| Grande pilule de section | `pill` (ou `lg` si multi-ligne) | 3px `ink` | `hard-lg` |
| Carte | `lg` (24px) | 2px `ink` | `hard` |
| Encadré / input | `md` (16px) | 2px `ink` | aucune |
| Image | `md` | 2px `ink` | `hard` |
| Avatar du fondateur | `full` | 2px `ink` | aucune |
| Cadre décoratif blueprint | `md` | 1.5px `line` | aucune |

- **Ombres toujours pleines, sans flou, décalées en bas à droite.** Jamais de `shadow-md`/`shadow-lg` par défaut de Tailwind.
- Les éléments décoratifs (grille, cadres, flèches) utilisent des traits **fins et gris** (`line`). Les éléments interactifs utilisent des traits **épais et noirs** (`ink`).

---

## 8. Motifs décoratifs

1. **Grille blueprint** (`.bg-blueprint`) : en fond du hero, de la section Méthode, du CTA final et de la page de confirmation. Jamais sous du texte long (Problème, Preuve, FAQ).
2. **Repères « vis »** : petits cercles (12px, trait 1.5px `line`, point central) aux coins des cadres décoratifs.
3. **Flèches courbes** : SVG inline, trait 2px `ink`, `stroke-linecap: round`, pointe ouverte en V. Elles relient une section à la suivante : **une au plus par transition**, desktop uniquement (masquées sous `lg`), `aria-hidden="true"`. Pas de flèche à côté d'une relance CTA : le bouton suffit à guider.
4. **Annotations mono** : petits labels type cotes de plan (`ÉTAPE 01`, `AUTOMATE MAKE`) en `ink-muted`, 12px.
5. **Escalier de blocs** : le motif du logo, réutilisé en grand dans la section Méthode, sur la page 404 et dans l'en-tête du blog. **Pas dans le hero** : c'est le schéma flowchart qui l'occupe (§ 10.13).

**Interdit :** dégradés, glassmorphism, ombres floues, images de robots ou de cerveaux lumineux, faux texte illisible, emojis comme icônes.

---

## 9. Iconographie et images

- **Icônes** : [Lucide](https://lucide.dev) (`lucide-react`), `strokeWidth={2.25}`, 24px par défaut, couleur `ink`.
- Les icônes vedettes (process, offre) sont placées dans une **pastille** : carré 56px, `rounded-md`, fond pastel, contour 2px `ink`.
- **Illustrations** : style line art à trait épais noir avec **une seule** touche de couleur pastel.
- **Photo du fondateur** : `public/images/fondateur.jpg` (JPEG carré, 628 × 628 px). Trois usages :
  - l'avatar rond près des CTA (hero, CTA final, confirmation), § 10.12 ;
  - la photo du bloc Preuve : rectangle `rounded-md`, contour 2px, ombre dure, légère désaturation (`saturate-[.85]`) ;
  - l'og:image (§ 16).
- **Schéma du hero** : composant HTML/SVG inline (§ 10.13), jamais une image bitmap.
- **Jamais de logos** de Société Générale, Hermès, Orange Bank, SNCF ou Enedis. Ce sont des expériences du fondateur avant Crescendo, pas des clients. Leurs noms n'apparaissent que dans le texte courant, jamais en bandeau ni en gras isolé.

---

## 10. Composants

> Tous les composants vivent dans `components/ui/` (primitives) et `components/sections/` (sections de page). Chaque composant interactif utilise les vrais éléments HTML (`<button>`, `<a>`, `<input>`, `<label>`).

### 10.1 Bouton

| Variante | Fond | Texte | Contour | Ombre | Usage |
|---|---|---|---|---|---|
| `primary` | `coral` (survol `coral-dark`) | `ink` | 2px `ink` | `hard` + `.press` | Réservation uniquement |
| `primary` compact | `coral` | `ink` | 2px `ink` | `hard-sm` + `.press` | Header, bouton fixe mobile, nav du blog |
| `secondary` | `surface` | `ink` | 2px `ink` | `hard-sm` + `.press` | Actions secondaires ; bouton de réservation **posé sur un fond corail** (§ 10.9) |
| `ghost` | transparent | `ink` souligné | aucun | aucune | Liens textuels |

**Libellés (repris de la copy, ne pas les modifier) :**
- « **Réserver mon Appel Process Calvaires** » : hero, relances intermédiaires, CTA final.
- « **Réserver mon appel** » : header, bouton fixe mobile, nav et CTA du blog.

**Règles :**
- Hauteur min 48px (44px en compact), `px-6`, texte 16–17px, graisse 700, `rounded-pill`.
- Icône optionnelle à droite (`ArrowRight`, 18px).
- Le libellé long fait 37 caractères. Sur mobile, le bouton passe en `w-full`, 16px, et peut s'afficher sur 2 lignes centrées (`text-balance`).
- Chaque CTA porte `data-cta` avec sa position : `header`, `hero`, `apres-process`, `engagement`, `final`, `sticky`. C'est ce qui permet de mesurer le clic par position (§ 12.0 ter).
- Comportement : sur desktop, le CTA fait défiler jusqu'à `#rdv`. Sous `lg`, il ouvre directement l'agenda en plein écran (§ 10.9).

```tsx
<a
  href="#rdv"
  data-cta="hero"
  className="press inline-flex w-full sm:w-auto items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-pill bg-coral hover:bg-coral-dark border-2 border-ink shadow-hard font-bold text-base lg:text-[17px] text-ink text-center text-balance"
>
  Réserver mon Appel Process Calvaires <ArrowRight size={18} strokeWidth={2.5} aria-hidden />
</a>
```

### 10.2 Tag / pilule de catégorie
- `rounded-pill`, contour 1.5px `ink`, `px-3 py-1`, 13px graisse 700, fond = couleur de la catégorie.
- Version filtre (blog) : bouton ; l'état actif ajoute `shadow-hard-sm` et un fond plein. L'état inactif a un fond `surface`.

### 10.3 Pilule de section (signature)
Le grand bloc arrondi de l'image d'inspiration.
- Fond pastel, contour 3px `ink`, `shadow-hard-lg`, `rounded-pill` (desktop, une ligne) ou `rounded-lg` (mobile ou contenu multi-ligne).
- Contenu : icône en pastille + titre + texte court.
- Sert aux étapes de la méthode, au bloc Engagement et aux pilules de douleurs de la section Problème.

### 10.4 Carte
- `bg-surface`, contour 2px `ink`, `rounded-lg`, `shadow-hard`, `p-6 lg:p-8`.
- Variante cliquable : toute la carte est un `<a>` avec `.press`. Une carte non cliquable n'a jamais `.press`.

### 10.5 Carte « étapes numérotées »
- Carte `surface` avec liste ordonnée `1 · 2 · 3`. Numéros dans des cercles de 40px, contour 2px `ink`, chiffres 800.
- Utilisée pour « Ce qui se passe pendant l'appel. » (section Méthode). La ligne « 30 minutes en visio, directement avec Aymen… » se place sous la liste, avec l'avatar (§ 10.12).

### 10.6 Connecteur / flèche
- Composant `<FlowArrow direction="down-right" />` en SVG inline, trait 2px `ink`, `aria-hidden`.
- Masqué sous `lg` entre les sections. Visible à toutes les tailles à l'intérieur du schéma du hero (§ 10.13).

### 10.7 Navigation

**Nav de la landing (`crescendo.fr`) : pas de menu** (décision CRO).
- Gauche : lockup logo (symbole 32px + nom 22px), lien vers `#` (haut de page), `aria-label="Crescendo — accueil"`.
- Droite : bouton `primary` compact « Réserver mon appel » (`data-cta="header"`).
- Aucun lien d'ancre, aucun lien vers le blog.
- Desktop (`lg` et plus) : barre collante, fond `paper`, bordure basse 2px `ink` au scroll.
- Mobile : header **non collant**. Il défile avec la page, et le bouton fixe en bas de l'écran (§ 10.19) prend le relais. On n'affiche jamais deux boutons corail fixes en même temps.
- Sous `sm` (640px), le lockup passe à symbole 28px + nom 20px, et le bouton compact à 14px avec `px-3.5` et `whitespace-nowrap`. Le logo et le bouton tiennent ainsi sur une ligne dès 360px de large.

**Nav du blog (`blog.crescendo.fr`)**
- Barre collante, fond `paper`, bordure basse 2px `ink` au scroll.
- Gauche : lockup logo suivi de « · le carnet » en Inter Tight 500, `ink-muted`. Le logo renvoie vers `https://crescendo.fr` ; « le carnet » renvoie vers l'accueil du blog.
- Centre : catégories du blog (pilules compactes, § 10.2).
- Droite : bouton `primary` compact « Réserver mon appel » → `https://crescendo.fr/?utm_source=blog&utm_medium=nav#rdv`.
- Mobile : logo + bouton menu (`aria-label="Ouvrir le menu"`) qui ouvre un panneau plein écran `paper` avec les catégories ; le CTA reste visible.

### 10.8 Accordéon FAQ
- `<details>`/`<summary>` natifs, ou Radix Accordion. Accordéon sur **tous** les breakpoints : 11 questions, tout se parcourt d'un coup d'œil.
- Chaque item : carte `surface`, contour 2px, `rounded-md` ; question en H4 (avec son « ? ») ; icône `Plus` qui pivote à 45° à l'ouverture.
- Colonne de `max-w-[720px]`. Tous les items sont fermés au chargement.

### 10.9 Bloc de réservation (`#rdv`)
Section finale sur fond `.bg-blueprint`.

**Carte :** grande carte corail `rounded-lg`, contour 3px, `shadow-hard-xl`, `p-6 lg:p-12`.

**Contenu, dans l'ordre de la copy :**
1. H2 en question : « Quels process calvaires coûtent le plus à votre équipe ? »
2. Paragraphe (« En 30 minutes, on les identifie avec vous… »).
3. Phrase de capacité (« On démarre 3 nouveaux projets par mois… »). Elle n'est **rendue que si le mois est renseigné et pas encore passé** (variable `NEXT_START_MONTH`). Sinon, rien ne s'affiche.
4. Bouton de réservation, puis la ligne « Gratuit, 30 minutes en visio. Récap écrit sous 24 h. » avec l'avatar (§ 10.12).
5. L'agenda.

**Disposition :**
- Desktop (`lg`) : 2 colonnes. Le texte à gauche, l'agenda intégré à droite dans un cadre `surface`, contour 2px, `rounded-md`. L'agenda est visible directement, donc le bouton n'est pas affiché.
- Mobile : le texte, puis le bouton. Sur fond corail, un bouton corail disparaîtrait : on utilise la variante `secondary` (fond `surface`, `shadow-hard`). Le bouton ouvre l'agenda en **plein écran** (`<dialog>` plein écran, bouton « Fermer » en haut, focus piégé, `Échap` ferme). Tous les autres CTA de la page ouvrent le même dialog sous `lg`.

**Autour de l'agenda :**
- Lien `ghost` sous l'agenda : « Ouvrir l'agenda dans un nouvel onglet » (`target="_blank" rel="noopener"`). C'est la solution de secours si l'embed s'affiche mal dans le navigateur de l'app LinkedIn.
- Champs du formulaire : ceux du tableau « Réservation » de 07-copy-final (Nom, Email professionnel, Entreprise, Taille en 4 boutons, process facultatif, source facultative, téléphone facultatif), configurés dans l'outil. Si l'outil permet de styler les champs, suivre § 10.10.
- Sous le formulaire : « Vos informations servent à préparer et à suivre votre appel. » + lien vers la politique de confidentialité.
- S'il ne reste aucun créneau : la phrase de secours de la copy, avec l'email de contact.

**Technique :**
- Outil : `[NEED]` (Cal.com, Calendly ou Google Agenda). Critères : champs personnalisés, rappels par email et SMS, affichage correct dans le navigateur de l'app LinkedIn.
- Embed chargé en différé (`next/script` avec `strategy="lazyOnload"`, ou au premier clic sur un CTA sous `lg`).
- Avant la mise en ligne : faire une réservation complète depuis l'app LinkedIn, sur iPhone et sur Android.

### 10.10 Formulaire
- `<label>` visibles au-dessus des champs, 14px graisse 700.
- Inputs : `bg-surface`, contour 2px `ink`, `rounded-md`, hauteur 48px ; au focus, `shadow-hard-sm`.
- Choix courts (taille de l'entreprise : 1-9 / 10-49 / 50-250 / 250+) : `<fieldset>` + `<input type="radio">` affichés en pilules. Pilule cochée : fond `sky` + `shadow-hard-sm`.
- Erreurs : texte `ink` avec icône `AlertCircle` et bordure `coral-dark`. Ne jamais signaler une erreur par la couleur seule.

### 10.11 Footer
- Fond `ink`, texte `surface`, logo version sombre. Texte secondaire en `line`.
- **Colonnes :**
  - Présentation : 2 lignes (« Agence IA et automatisation pour PME de 10 à 250 salariés. De l'audit à la maintenance. »).
  - Navigation : ancres `#process` (Ce qu'on automatise) · `#methode` (Méthode) · `#offre` (Offre) · `#faq` (FAQ).
  - Ressources : « Le carnet » → `https://blog.crescendo.fr`. C'est le seul lien de la landing vers le blog. Il reste discret, mais il évite que le blog soit orphelin et lui transmet de l'autorité.
  - Contact et réseaux : email de contact `[NEED]`, profil LinkedIn d'Aymen.
- **Bas :** mentions légales, politique de confidentialité `[NEED: URL]`, © année.
- Sur le blog, le footer est identique ; ses liens de navigation pointent vers les ancres de `https://crescendo.fr`.
- Desktop : 4 colonnes. Mobile : empilé, avec l'espace réservé au bouton fixe (§ 6).

### 10.12 Avatar et ligne de réassurance
- Photo ronde 40px (48px sur desktop), `rounded-full`, contour 2px `ink`, `object-cover`, `alt="Aymen Jouini, fondateur de Crescendo"`.
- Placée à gauche d'une ligne de texte Small (14–15px, `ink`, `max-w-[46ch]`), alignée en haut.
- Usages : sous le CTA du hero (« Appel gratuit de 30 minutes avec Aymen, le fondateur… »), sous le bouton du CTA final, dans la carte « Ce qui se passe pendant l'appel », sur la page de confirmation.

### 10.13 Schéma flowchart du hero (`<FlowDiagram />`)
Le visuel du hero. Il montre ce que fait Crescendo, ce que le H1 ne dit pas.
- **Cadre :** cadre décoratif blueprint (`rounded-md`, 1.5px `line`, repères vis aux 4 coins), `p-6`. Label mono en haut : « PROCESS CALVAIRE → AUTOMATISÉ ».
- **Nœuds :** 3 pilules (contour 2px `ink`, `shadow-hard-sm`, 17px graisse 700, icône Lucide 20px à gauche), sans `.press` car non cliquables :
  1. « Devis validé » (`sky`, `FileText`), annotation mono à droite : « EXCEL OU CRM » ;
  2. « Facture générée » (`mustard`, `Receipt`) ;
  3. « Relance envoyée » (`sage`, `BellRing`).
- **Connecteurs :** `FlowArrow` courbes entre les nœuds, avec une annotation mono le long de chaque flèche : « AUTOMATE MAKE » (1 → 2), « À ÉCHÉANCE » (2 → 3).
- **Disposition :** en cascade descendante. Chaque nœud est décalé de 48px vers la droite par rapport au précédent, et la flèche part de l'intérieur d'un nœud pour arriver dans le suivant. Même disposition sur mobile, en plus compact.
- **Accessibilité :** conteneur `role="img"` avec `aria-label="Le devis validé génère la facture automatiquement, puis la relance part à échéance."` ; contenu interne `aria-hidden`.
- **Mouvement :** les flèches se dessinent une fois à l'apparition (`stroke-dashoffset`, 400ms, décalées de 150ms). Rien avec `prefers-reduced-motion`.
- **Variante B (test 2 de la revue CRO) :** au même emplacement, la photo d'Aymen dans un cadre `rounded-md`, contour 2px, `shadow-hard`, avec la légende mono « AYMEN JOUINI · FONDATEUR ». Pilotée par un flag (`HERO_VISUAL=schema|photo`) pour préparer les 2 maquettes du test des 5 secondes.

### 10.14 Carte process (section « Ce qu'on automatise »)
- `<li>` en carte `surface`, contour 2px `ink`, `rounded-lg`, `shadow-hard`, `p-6`. Non cliquable, donc sans `.press`.
- Contenu : pastille icône 56px (§ 9), intitulé en H3 au format H4 (« Devis et facturation. »), texte Body.
- Sous `md`, la pastille passe à 40px, à gauche de l'intitulé et du texte (`p-5`). Les 7 cartes empilées restent ainsi parcourables d'un pouce.
- Couleur des pastilles dans l'ordre, en boucle : `sky` → `mustard` → `sage` → `blush`.
- Icônes : Devis et facturation `FileText` · Relances clients `BellRing` · Tri des emails `Inbox` · Appels et demandes entrantes `PhoneIncoming` · Bases dormantes `RefreshCcw` · Reporting `ChartColumn` · Inventaire `Package`.
- **Grille :** 1 colonne (mobile), 2 colonnes (`md`), 3 colonnes (`lg`). Le paragraphe « On choisit l'outil le plus simple qui tienne la route… » remplit la grille dans un cadre décoratif blueprint avec le label mono « LES OUTILS » : il occupe 1 case en `md` et 2 cases en `lg`, soit 7 cartes + 1 cadre = une grille complète.

### 10.15 Relance CTA intermédiaire
- Bloc placé à la fin d'une section : bordure haute 2px `ink`, `pt-8 mt-12`.
- Desktop : la phrase de relance à gauche (20px, graisse 700, `max-w-[44ch]`), le bouton `primary` à droite. Mobile : empilés, bouton `w-full`.
- Deux occurrences : après « Ce qu'on automatise » (`data-cta="apres-process"`) et après « Engagement » (`data-cta="engagement"`).

### 10.16 Cartes d'offre et « Inclus dans chaque projet »
- **Deux cartes** côte à côte (`lg`), empilées sur mobile : **Sprint Process Calvaire** à gauche (porte d'entrée), **Audit Process Calvaires** à droite.
- Carte `surface`, contour 2px, `rounded-lg`, `shadow-hard`, `overflow-clip`. En-tête de carte sur fond pastel (Sprint `sky`, Audit `mustard`), séparé par une bordure 2px `ink` : nom de l'offre en H3 + la ligne « Pour… ».
- Prix : petit « À partir de » en Small, montant en Inter Tight 800 40px `tabular-nums`, « HT » en label mono.
- Puis la liste de la copy, avec des puces carrées `ink`.
- **Ni badge « recommandé », ni mise en avant**, ni bouton dans les cartes. C'est l'appel qui oriente vers l'une ou l'autre.
- **Inclus dans chaque projet :** H3, puis un encadré `surface` (contour 2px, `rounded-md`, sans ombre) en grille 2 × 2 (`lg`) ou 1 colonne (mobile). Chaque élément : pastille 40px `sage` + intitulé en gras + texte. Icônes : `LifeBuoy` (support 30 jours), `TrendingUp` (Bilan des gains), `FolderOpen` (Dossier de passation), `ShieldCheck` (Fiche sécurité et données).

### 10.17 Bloc Engagement
- Grande pilule de section `mustard` (§ 10.3), `rounded-lg`, `p-8 lg:p-12`, avec une pastille `surface` et l'icône `CircleCheck`.
- Contenu : H2 « Le prix signé est le prix payé. » et le paragraphe de la copy (`max-w-[56ch]`).
- Suivi de la relance CTA (§ 10.15).

### 10.18 Section « Pour qui »
- H2 + premier paragraphe en Body (`max-w-[56ch]`).
- Le second paragraphe (« Crescendo n'est pas le bon partenaire si… ») dans un encadré `surface`, contour 2px, `rounded-md`, sans ombre ni couleur : c'est une information, pas une alerte.

### 10.19 Bouton fixe mobile
- Sous `lg` uniquement : `fixed inset-x-0 bottom-0 z-40`, fond `paper`, bordure haute 2px `ink`, `px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]`.
- Contenu : bouton `primary` compact pleine largeur « Réserver mon appel » (`data-cta="sticky"`). Il ouvre l'agenda en plein écran.
- Visibilité (via `IntersectionObserver`) : il apparaît quand le CTA du hero sort de l'écran, et disparaît quand `#rdv` entre dans l'écran. Une fois masqué, il est retiré de l'ordre de tabulation (`inert`).
- Apparition : glissement vers le haut de 200ms, `ease-out`.

### 10.20 Page de confirmation (`/merci`)
- `robots: { index: false }`. Header réduit au logo, sans CTA.
- Fond `.bg-blueprint`, carte `surface` centrée (`max-w-[640px]`), contour 2px, `shadow-hard-lg`.
- Contenu : label mono « RÉSERVATION CONFIRMÉE », H1 de la copy (« C'est réservé. Préparez deux ou trois process calvaires. »), texte, avatar, lien `ghost` « Voir le profil LinkedIn d'Aymen ».
- C'est ici (ou dans le callback de l'outil de RDV) que se déclenche l'événement de conversion « réservation confirmée ».

---

## 11. Landing page (`/`)

Le parcours suit l'ordre de `.agents/landing/07-copy-final.md`. Les textes viennent de la copy, avec un point ajouté aux titres affirmatifs (§ 4).

| # | Section (ancre) | Contenu (copy) | Mise en forme |
|---|---|---|---|
| — | Header | Logo, bouton « Réserver mon appel » | § 10.7, sans menu |
| 1 | **Hero** | Surtitre, H1, sous-titre, CTA, avatar + ligne sous le bouton, ligne de preuve | `.bg-blueprint`. Surtitre dans une pilule `surface` (§ 7). H1 en Display, sur toute la largeur du conteneur. Dessous, 2 colonnes `lg` (7/12 et 5/12) : sous-titre en Lead, CTA, avatar (§ 10.12) et ligne de preuve en Small `ink-muted` à gauche ; schéma (§ 10.13) à droite. Mobile : empilé, le schéma en dernier |
| 2 | **Problème** | H2, 2 paragraphes | Fond `paper` sans grille. Prose en `max-w-[56ch]` à gauche. À droite sur `lg`, 4 pilules de douleurs en zigzag, une par pastel : « Devis recopié », « Relances oubliées », « Emails en attente », « Base dormante ». Elles reprennent le texte, donc `aria-hidden`, et sont masquées sous `lg` |
| 3 | **Ce qu'on automatise** (`#process`) | H2, intro, 7 process, paragraphe outils, relance + CTA | Grille de cartes process (§ 10.14), puis relance (§ 10.15) |
| 4 | **Preuve** | H2, photo, 2 paragraphes ; H3 « Quelques projets livrés » masqué | 2 colonnes `lg` : photo (5/12, § 9) et texte (7/12). Pas de logos. Mini-cas : composant `<MiniCase>` prêt (carte `blush`, label mono « SECTEUR · TAILLE », « Avant » / « Livré »), **non rendu** tant qu'il n'y a pas 2 cas avec accord écrit. Dans ce cas, le H3 n'est pas rendu non plus |
| 5 | **Méthode** (`#methode`) | H2 ; H3 « Ce qui se passe pendant l'appel » ; Identification, Construction, Adoption | `.bg-blueprint`. Carte étapes numérotées pour l'appel (§ 10.5, `max-w-[720px]`). Puis l'**escalier montant** : 3 pilules de section `sky` → `mustard` → `sage`, label mono « ÉTAPE 01/02/03 », titre en H3. Sur `lg`, 3 colonnes décalées vers le haut de gauche à droite (marge haute 96 / 48 / 0px), reliées par des connecteurs en équerre comme dans le logo. Mobile : en colonne |
| 6 | **Offre** (`#offre`) | H2, Sprint, Audit, Inclus | § 10.16 |
| 7 | **Engagement** | H2, paragraphe, relance + CTA | § 10.17, puis § 10.15 |
| 8 | **Pour qui** | H2, 2 paragraphes | § 10.18 |
| 9 | **FAQ** (`#faq`) | H2, 11 questions | § 10.8 |
| 10 | **CTA final** (`#rdv`) | H2 en question, paragraphe, capacité, CTA, ligne sous le bouton, agenda | § 10.9 |
| — | Footer | | § 10.11 |
| — | Bouton fixe mobile | « Réserver mon appel » | § 10.19 |
| — | Confirmation (`/merci`) | Titre, texte, lien LinkedIn | § 10.20 |

**Règles de la page :**
- **Aucun `[NEED]` ni placeholder visible en production.** Un élément qui dépend d'une information facultative n'est pas rendu (phrase de capacité, mini-cas, citation « prospects chauds »). Les `[NEED]` obligatoires de la copy (délai du Sprint, durée de l'audit, prix de la maintenance, etc.) bloquent la mise en ligne.
- Flèches entre sections (§ 8) : Hero → Problème, Problème → Ce qu'on automatise, Preuve → Méthode, Méthode → Offre. Pas de flèche après une relance CTA.
- Variante en réserve : H1 B (« Automatisez vos process calvaires, de l'audit à la mise en production. »), à utiliser si le test des 5 secondes échoue. La mise en forme ne change pas.

---

## 12. Blog (`blog.crescendo.fr`)

> Le blog est un **levier SEO**. Il n'est pas mis en avant sur la landing (seulement le lien « Le carnet » du footer), mais il est **entièrement indexable** et chaque article renvoie vers la réservation.

### 12.0 Routing par sous-domaine (un seul projet Next.js)

- Le code du blog vit dans `app/blog/…` (`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/categorie/[category]/page.tsx`).
- Un `middleware.ts` réécrit les requêtes du sous-domaine vers ces routes, et redirige l'ancien chemin :

```ts
// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const BLOG_HOST = "blog.crescendo.fr";
const MAIN_HOST = "crescendo.fr";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host")?.replace(/^www\./, "") ?? "";
  const url = req.nextUrl.clone();

  // blog.crescendo.fr/xxx  → rendu par app/blog/xxx
  if (host === BLOG_HOST) {
    if (!url.pathname.startsWith("/blog")) {
      url.pathname = `/blog${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  // crescendo.fr/blog/xxx → 301 vers blog.crescendo.fr/xxx (pas de contenu dupliqué)
  if (host === MAIN_HOST && url.pathname.startsWith("/blog")) {
    const path = url.pathname.replace(/^\/blog/, "") || "/";
    return NextResponse.redirect(`https://${BLOG_HOST}${path}${url.search}`, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
```

- Dans Vercel : ajouter `crescendo.fr`, `www.crescendo.fr` (redirigé vers l'apex) et `blog.crescendo.fr` au **même projet**.
- Les liens internes du blog s'écrivent **sans** le préfixe `/blog` (`/mon-article`, `/categorie/automatisation-ia`) puisqu'ils sont servis sur le sous-domaine.
- Les liens du blog vers la landing sont **absolus** (`https://crescendo.fr/#rdv`).

### 12.0 bis SEO du sous-domaine

- **Canonicals** : chaque page du blog déclare `alternates.canonical` en `https://blog.crescendo.fr/...`. La landing déclare `https://crescendo.fr/`.
- **`metadataBase`** différent selon l'hôte : `https://blog.crescendo.fr` dans `app/blog/layout.tsx`, `https://crescendo.fr` dans le layout racine.
- **Sitemaps et robots séparés par hôte** : `app/sitemap.ts` et `app/robots.ts` lisent l'en-tête `host` et renvoient respectivement les URLs de la landing ou celles des articles, avec le sitemap correspondant.
- **Search Console** : une **propriété de domaine** `crescendo.fr` (couvre tous les sous-domaines), puis soumettre les deux sitemaps.
- **Données structurées** : `BlogPosting` sur chaque article, avec `publisher` = `Organization` Crescendo et `url` = `https://crescendo.fr`.
- **Flux RSS** : `blog.crescendo.fr/rss.xml`.
- **Phase de préparation** : tant que le blog n'est pas lancé, `metadata.robots = { index: false, follow: false }` dans `app/blog/layout.tsx`, piloté par une variable d'environnement (`BLOG_INDEXABLE=false`). **À repasser à `true` au lancement.**
- Les déploiements de preview Vercel ne doivent jamais être indexés.

### 12.0 ter Conversion et mesure

- **UTM des CTA du blog** : `https://crescendo.fr/?utm_source=blog&utm_medium=<nav|article-cta|footer>&utm_campaign=<slug>#rdv`. Les paramètres se placent **avant** l'ancre `#rdv` : placés après, ils feraient partie du fragment et l'outil de mesure ne les lirait pas.
- **Outil de mesure** : un outil exempté de consentement par la CNIL, par exemple Matomo dans sa configuration exemptée (à vérifier). Il évite un bandeau cookies, très pénalisant sur mobile. Cookies posés sur `.crescendo.fr` pour suivre les deux hôtes comme un seul site. Sinon, le passage du blog à la landing compte comme une nouvelle visite et la source de la conversion est perdue.
- **Événements** :
  - clic sur un CTA, avec sa position (`data-cta`, § 10.1) ;
  - ouverture de l'agenda ;
  - réservation confirmée. C'est la conversion : elle se déclenche à la confirmation (§ 10.20), pas au clic.
- Les UTM des liens LinkedIn suivent le tableau de 06-cro-review.

### 12.1 Contenu
- Articles en **MDX** dans `content/blog/<slug>.mdx`, avec `next-mdx-remote` ou `@next/mdx`.
- Frontmatter :

```yaml
---
title: "Automatiser ses relances clients avec l'IA."
description: "Le chapô de l'article, 1 à 2 phrases."
date: "2026-11-10"
category: "automatisation-ia"   # automatisation-ia | outils-no-code | digitalisation | cas-clients
cover: "/blog/relances-ia/cover.png"
readingTime: 6
author: "Crescendo"
---
```

- URLs publiques : `blog.crescendo.fr/` (liste), `blog.crescendo.fr/<slug>` (article), `blog.crescendo.fr/categorie/<category>` (filtre).
- SEO : `generateMetadata` par article, image Open Graph générée avec `next/og` (fond `paper`, titre `ink`, pilule de catégorie, logo + « le carnet »).

### 12.2 Page liste
- En-tête : label mono « LE BLOG », H1 (« Le carnet de l'automatisation. »), lead, sur `.bg-blueprint` avec l'escalier de blocs en décor.
- Filtres : pilules de catégories (§ 10.2) en défilement horizontal sur mobile.
- Article à la une : grande carte horizontale (image à gauche, texte à droite) avec `shadow-hard-lg`.
- Grille : 3 colonnes desktop, 2 tablette, 1 mobile, `gap-8`.
- **État vide** (aucun article publié, ou catégorie vide) : l'en-tête reste ; la grille est remplacée par une carte `surface` avec l'escalier de blocs en petit, une phrase courte (texte à faire valider, par exemple « Les premiers articles arrivent. ») et un bouton `secondary` vers l'accueil du blog ou un bouton `primary` compact « Réserver mon appel ». Le lien « Le carnet » du footer est actif dès le lancement : cet état ne doit jamais ressembler à une page cassée.

### 12.3 Carte d'article
- Carte cliquable (§ 10.4) : image `rounded-md` en haut (ratio 16:10), contour 2px.
- Puis : tag catégorie · label mono (date · temps de lecture) · titre H4 (2 lignes max) · extrait (3 lignes max, `ink-muted`).

### 12.4 Page article
- Fond `paper` ; zone de lecture **sans grille blueprint**.
- En-tête : fil d'Ariane mono, tag de catégorie, H1, chapô (lead), ligne méta (auteur · date · lecture), image de couverture large.
- Corps : colonne `max-w-[720px]`, typo « Body article ».
- Sommaire collant à droite sur `xl` (`sticky top-24`, liens vers les H2).
- Fin d'article : bloc CTA (carte corail compacte « Ce sujet vous parle ? Réservons 30 min. », bouton `secondary` « Réserver mon appel » puisqu'il est posé sur du corail, UTM `article-cta`), puis 3 articles liés.

### 12.5 Styles du contenu (prose MDX)

| Élément | Style |
|---|---|
| `h2` | H2 avec `mt-16 mb-4` ; une petite pastille carrée 12px de la couleur de la catégorie avant le titre |
| `h3` | H3, `mt-10 mb-3` |
| `p` | Body article, `mb-6` |
| `a` | `ink`, soulignement 2px `mustard` (`decoration-mustard underline-offset-4`) ; survol : soulignement `ink` |
| `ul`, `ol` | Puces carrées `ink` / numéros en mono, `pl-6`, `space-y-2` |
| `blockquote` | Carte `surface` contour 2px, barre de 6px de la couleur de la catégorie **en haut**, texte 20px 500 |
| `code` inline | Mono 0.9em, fond `surface`, contour 1px `line`, `rounded-sm`, `px-1.5` |
| Bloc de code | Fond `ink`, texte `surface`, `rounded-md`, contour 2px `ink`, `shadow-hard`, label mono du langage en haut à droite ; coloration avec Shiki (thème clair adapté) |
| `img` | `rounded-md`, contour 2px, `shadow-hard`, légende mono `ink-muted` centrée |
| `hr` | Trois petits carrés (bleu, moutarde, corail) centrés, rappel du logo |
| `table` | Contour 2px, en-têtes fond `mustard`, lignes séparées par 1px `line` |

### 12.6 Composants MDX
- `<Callout type="astuce|attention|a-retenir">` : encadré `rounded-md`, contour 2px, fond respectivement `sage`, `blush`, `sky`, avec icône en pastille et titre en label mono.
- `<Steps>` : liste numérotée en cartes reliées par des connecteurs (version compacte du flowchart).
- `<BeforeAfter>` : deux cartes côte à côte « Avant / Après automatisation ».
- `<CTA />` : bloc de réservation compact (même règle de bouton que § 12.4).

---

## 13. Mouvement

- Sobre et mécanique : `transition` de 120–200ms, `ease-out`.
- Effet `.press` sur les éléments interactifs à ombre dure (survol : se soulève ; clic : s'enfonce).
- Apparition des sections au scroll : fondu + translation de 16px, une seule fois, déclenché par `IntersectionObserver`.
- Les flèches courbes (entre sections et dans le schéma du hero) se « dessinent » (`stroke-dashoffset`) à l'apparition.
- Bouton fixe mobile : glissement vers le haut de 200ms à l'apparition.
- Toujours respecter `prefers-reduced-motion` : aucune translation, aucun dessin de flèche, aucun glissement.

---

## 14. Accessibilité

- Contraste du texte ≥ 4.5:1 (le texte `ink` passe sur toutes les couleurs de la palette ; `ink-muted` est réservé à `paper` et `surface` ; sur `ink`, le texte secondaire utilise `line`).
- Focus visible partout (outline 3px `ink`, décalage de 3px).
- Cibles tactiles ≥ 44 × 44px.
- Les éléments décoratifs (grille, flèches, repères vis, pilules de douleurs) portent `aria-hidden="true"`.
- Le schéma du hero est une image pour les lecteurs d'écran : `role="img"` + `aria-label` (§ 10.13).
- L'avatar porte `alt="Aymen Jouini, fondateur de Crescendo"`.
- Le bouton fixe mobile ne masque jamais l'élément qui a le focus : l'espace est réservé en bas de page (§ 6), et le bouton est `inert` quand il est caché.
- Le dialog de l'agenda piège le focus, se ferme avec `Échap` et rend le focus au bouton qui l'a ouvert.
- Hiérarchie de titres stricte (un seul `h1` par page).
- Le symbole du logo dans la nav est accompagné du nom ; le lien porte `aria-label="Crescendo — accueil"`.
- `lang="fr"` sur `<html>`.

---

## 15. Ton et rédaction

> La copy de la landing est figée dans `.agents/landing/07-copy-final.md`. Ces règles servent aux textes d'interface qui n'y figurent pas (états vides, labels, messages d'erreur, blog).

- **Vouvoiement**, phrases courtes, verbes d'action.
- Titres affirmatifs terminés par un point, questions par « ? ». Pas de point d'exclamation.
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

---

## 16. Performance et SEO

- Polices via `next/font` (aucune requête externe au rendu).
- Images via `next/image` (formats AVIF/WebP, `sizes` renseigné). La photo du fondateur est servie en 80px et 96px pour l'avatar, en 480px pour la Preuve.
- Grille blueprint en CSS pur (pas d'image de fond).
- Logo, icônes et schéma du hero en SVG inline.
- Embed de l'agenda chargé en différé (§ 10.9).
- Objectif Lighthouse : ≥ 95 sur les quatre axes.
- **Métadonnées :**
  - landing : les balises de la copy (title « Crescendo, agence IA et automatisation pour PME », meta description, og:title, og:description) ;
  - autres pages : title au format « Titre de la page — Crescendo », description ≤ 155 caractères ;
  - Open Graph et Twitter cards partout ; données structurées `Organization` (landing) et `BlogPosting` (articles).
- **og:image de la landing** : 1200 × 630 px, générée avec `next/og`. Fond `paper` avec la grille blueprint ; à gauche, la photo d'Aymen dans un cadre contour 3px `ink` et ombre dure ; à droite, le lockup logo et l'og:title en Inter Tight 800 `ink`. C'est le premier visuel que voit un prospect sur LinkedIn.

---

## 17. À faire / À éviter

**À faire**
- Contours noirs nets et ombres dures sur tout ce qui est interactif.
- Une couleur pastel par bloc, du texte `ink` dessus.
- Le corail uniquement pour réserver.
- Des flèches et des numéros d'étapes pour guider le parcours.
- Beaucoup d'air autour des blocs.
- Le visage d'Aymen près de chaque CTA important.

**À éviter**
- Ombres floues, dégradés, transparence décorative.
- Blanc pur `#FFFFFF` en fond (utiliser `surface`).
- Plus de deux couleurs pastel côte à côte dans le même bloc.
- Grille blueprint sous un texte long.
- Visuels clichés de l'IA (robots, cerveaux, circuits bleus néon).
- Emojis à la place des icônes.
- Un `[NEED]`, un `[RÉSULTAT]` ou tout autre placeholder visible en production.
- Les logos des grands comptes du fondateur, ou un bandeau « ils nous font confiance ».
- Un badge « recommandé » ou « populaire » sur une offre.
- Un menu dans le header de la landing.

---

## 18. Journal des décisions

| Date | Décision | Raison |
|---|---|---|
| 2026-11-11 | Mise à jour du design system pour l'aligner sur `.agents/` (copy finale v2.2, revue CRO, offre, product-marketing). La direction visuelle est conservée | La version précédente décrivait une autre landing : menu Services · Méthode · FAQ, 7 sections, « Services » (dont la formation, non incluse), méthode Diagnostic → Mise en place → Croissance, CTA « Réserver un appel », placeholders `[RÉSULTAT]` visibles |
| 2026-11-11 | Méthode renommée Identification → Construction → Adoption, dans le logo et sur le site | Nom de la méthode dans product-marketing et dans la copy |
| 2026-11-11 | Header de la landing sans menu ; bouton fixe en bas de l'écran sur mobile | Décisions n° 12 et quick win 4 de la revue CRO : une seule action |
| 2026-11-11 | Display ramené de 80px à 64px (desktop) et de 44px à 36px (mobile), H1 sur toute la largeur | Le H1 de la copy fait 82 caractères ; il doit tenir en 3 lignes sur desktop et laisser le CTA visible sur mobile |
| 2026-11-11 | Surtitre du hero en pilule visible, et plus en label mono gris | La revue CRO demande un surtitre bien visible : c'est lui qui dit ce que fait Crescendo |
| 2026-11-11 | Point final sur les titres affirmatifs, « ? » sur les questions | Signature du style conservée sans changer les mots de la copy |
| 2026-11-11 | Visuel du hero : schéma flowchart « devis → facture → relance ». Photo d'Aymen en variante B ; escalier du logo réservé à la Méthode, à la 404 et au blog | Le schéma montre le métier (le H1 ne le dit pas) et fait du flowchart le produit. Test 2 de la revue CRO préparé |
| 2026-11-11 | Footer complet conservé, avec le lien « Le carnet » dès le lancement ; état vide soigné pour la liste du blog | Choix du fondateur. L'état vide évite une page qui a l'air cassée tant qu'il n'y a pas d'article |
| 2026-11-11 | Mesure : outil exempté de consentement (Matomo exempté, à vérifier) plutôt que Plausible ou GA4 ; `data-cta` par position | Revue CRO : pas de bandeau cookies sur mobile, clics mesurés par emplacement |
| 2026-11-11 | UTM placés avant `#rdv` dans les liens du blog | Dans l'ancienne version, `#rdv?utm_…` mettait les UTM dans le fragment, illisibles par l'outil de mesure |
