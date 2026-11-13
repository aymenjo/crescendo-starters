# Articles de démo du carnet

Six articles de démo pour que `/blog` ne soit pas vide en prod en attendant les vrais articles. Ils sont saisis à la main dans l'admin : aucun script, aucune clé secrète. Ils ne citent aucun client, aucun chiffre de résultat ni aucun témoignage.

**À retirer avant le lancement** (avant d'activer `SITE_INDEXABLE`) : « Supprimer » chaque article dans l'admin (la couverture part avec), puis supprimer ce dossier.

## Où sont les champs

Chaque dossier contient un `corps.md` avec **tous les champs de l'éditeur, dans son ordre** : titre, chapô, catégorie, couverture, texte alternatif, titre SEO, meta description, slug, puis le corps de l'article. La couverture à téléverser est `couverture.png`, dans le même dossier.

## Saisie d'un article

1. `/admin` → « Nouvel article ».
2. Remplir **Titre**, **Chapô** et **Catégorie**, puis coller le **Corps de l'article (Markdown)**.
3. « Enregistrer » (Cmd + S). La zone de couverture s'active une fois l'article enregistré.
4. Déposer `couverture.png`, puis coller le **Texte alternatif de la couverture**.
5. **Référencement** : coller le titre SEO s'il est donné, laisser la meta description vide, vérifier le slug.
6. « Publier ».

## Ordre de publication

Le blog affiche le plus récent en premier. Publié dans cet ordre, chaque ligne de la grille mélange les trois catégories. Les six articles portent la date du jour de saisie, puisque l'admin ne peut pas antidater.

| Ordre | Dossier | Catégorie |
|---|---|---|
| 1 | `inventaire-photo-ocr-et-alerte-de-stock-avec-make/` | Outils & no-code |
| 2 | `reactiver-une-base-de-prospects-dormants-avec-l-ia/` | Automatisation IA |
| 3 | `excel-email-papier-digitaliser-sans-tout-changer/` | Digitalisation & stratégie |
| 4 | `un-reporting-hebdo-qui-se-remplit-tout-seul/` | Outils & no-code |
| 5 | `un-agent-vocal-pour-ne-plus-rater-les-appels-hors-horaires/` | Automatisation IA |
| 6 | `par-quel-process-commencer-l-automatisation-de-votre-pme/` | Digitalisation & stratégie |

## Couvertures

`couverture.svg` est la source, `couverture.png` (1600 × 1000) le fichier à téléverser. Style DESIGN.md § 9 : trait d'encre sur fond papier, un seul pastel, celui du marqueur de la catégorie. Après une retouche du SVG, réexporter le PNG depuis la racine du repo :

```bash
node -e "require('sharp')(process.argv[1]).png().toFile(process.argv[2])" docs/articles-demo/<slug>/couverture.svg docs/articles-demo/<slug>/couverture.png
```
