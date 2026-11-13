-- Seed local et CI uniquement (jamais en prod) : 3 articles publiés de catégories différentes et 1 brouillon.
-- Les images sont dans supabase/seed-images/ et sont téléversées par scripts/seed-images.ts après `db reset`.

insert into public.articles
  (id, slug, title, excerpt, category, body, cover_path, cover_alt, seo_title, meta_description, status,
   first_published_at, created_at, updated_at)
values
(
  '11111111-1111-4111-8111-111111111111',
  'automatiser-les-relances-clients',
  'Automatiser les relances clients sans perdre le ton de votre équipe',
  'Une relance automatique peut rester polie et personnelle. Voici comment la construire pas à pas, de la facture échue au message envoyé.',
  'automatisation-ia',
  ltrim($md$
Une facture échue, c'est souvent une relance oubliée. L'automate ne remplace pas votre équipe : il envoie le bon message au bon moment, et votre équipe garde la main sur les cas sensibles.

# Ce que fait l'automate

Il lit chaque jour la liste des factures, repère celles qui arrivent à échéance et prépare la relance.

- Il vérifie que la facture n'est pas déjà payée.
- Il choisit le modèle selon le retard : courtois, puis ferme.
- Il **vous prévient** quand un client dépasse trois relances.

![Schéma : facture échue, puis relance, puis alerte](http://127.0.0.1:54321/storage/v1/object/public/articles/11111111-1111-4111-8111-111111111111/schema-relances.png "La relance part à échéance, l'alerte arrive après trois envois")

## Garder le ton de l'équipe

Le modèle de message vient de vos propres relances. On reprend vos formules, et l'IA ne fait qu'adapter le *contexte* : le montant, la date et le nom du contact.

> Le client doit lire un message de votre équipe, pas celui d'un robot.

## Les données nécessaires

| Donnée | Source | Mise à jour (h) |
|---|---|---|
| Factures | Outil de facturation | 24 |
| Contacts | CRM | 24 |
| Paiements | Banque | 12 |

Le déclencheur tient en quelques lignes :

```json
{
  "declencheur": "facture_echue",
  "delai_jours": 3,
  "modele": "relance-courtoise"
}
```

---

Pour aller plus loin, la [méthode complète](/#methode) décrit chaque étape.
$md$, E'\n'),
  '11111111-1111-4111-8111-111111111111/couverture.png',
  'Trois documents reliés à l''équerre, le dernier marqué en bleu',
  'Automatiser les relances clients',
  null,
  'published',
  '2026-10-08 08:00:00+02',
  '2026-10-06 09:12:00+02',
  '2026-10-09 17:40:00+02'
),
(
  '22222222-2222-4222-8222-222222222222',
  'relier-un-devis-excel-a-la-facturation',
  'Relier un devis Excel à votre outil de facturation',
  'Ressaisir un devis validé dans l''outil de facturation fait perdre du temps et crée des erreurs. Un scénario Make suffit souvent à relier les deux.',
  'outils-no-code',
  ltrim($md$
Le devis est validé dans Excel, puis quelqu'un le ressaisit dans l'outil de facturation. Chaque ressaisie est une occasion d'erreur.

## Le scénario

1. Le devis passe au statut « validé ».
2. Le scénario lit les lignes du devis.
3. Il crée la facture en brouillon dans l'outil.

Pour tester l'API de l'outil, une seule commande suffit :

```bash
curl -s https://api.exemple.fr/v1/factures \
  -H "Authorization: Bearer $CLE_API" \
  -d devis=D-0412
```

## Ce qu'on vérifie avant de livrer

- Les arrondis de TVA.
- Les remises par ligne.
- Le numéro de devis, repris sur la facture.

Le code `D-0412` reste la référence commune aux deux documents.
$md$, E'\n'),
  '22222222-2222-4222-8222-222222222222/couverture.png',
  'Trois documents reliés à l''équerre, le dernier marqué en jaune',
  null,
  'Un devis validé dans Excel peut créer la facture tout seul. Le scénario Make pas à pas, et ce qu''on vérifie avant de livrer.',
  'published',
  '2026-10-22 08:00:00+02',
  '2026-10-20 10:00:00+02',
  '2026-10-22 08:00:00+02'
),
(
  '33333333-3333-4333-8333-333333333333',
  'par-quel-process-commencer',
  'Par quel process commencer l''automatisation de votre PME ?',
  'Le bon premier process est fréquent, répétitif et mesurable. Trois questions pour le repérer avant de choisir un outil.',
  'digitalisation',
  ltrim($md$
On commence rarement par le process le plus visible. On commence par celui qui revient le plus souvent.

## Trois questions

- Combien de fois par semaine la tâche revient-elle ?
- Suit-elle toujours les mêmes étapes ?
- Peut-on mesurer le temps qu'elle prend ?

## Ensuite seulement, l'outil

L'outil vient après le process. Un scénario simple vaut mieux qu'une plateforme que personne n'utilise.
$md$, E'\n'),
  '33333333-3333-4333-8333-333333333333/couverture.png',
  'Trois documents reliés à l''équerre, le dernier marqué en vert',
  null,
  null,
  'published',
  '2026-11-05 08:00:00+01',
  '2026-11-04 15:30:00+01',
  '2026-11-05 08:00:00+01'
),
(
  '44444444-4444-4444-8444-444444444444',
  'tri-des-emails-entrants',
  'Tri des emails entrants : un premier bilan',
  'Brouillon : le bilan d''un tri automatique des emails entrants.',
  'cas-clients',
  ltrim($md$
Ce brouillon n'est jamais visible sur le blog public.
$md$, E'\n'),
  '44444444-4444-4444-8444-444444444444/couverture.png',
  'Trois documents reliés à l''équerre, le dernier marqué en rose',
  null,
  null,
  'draft',
  null,
  '2026-11-10 11:00:00+01',
  '2026-11-11 16:20:00+01'
);
