# Un reporting hebdo qui se remplit tout seul

Ordre de publication : **4 sur 6**. Les champs suivent l'ordre de l'éditeur.

## Titre

```text
Un reporting hebdo qui se remplit tout seul
```

## Chapô

```text
Le lundi matin, quelqu'un recopie les chiffres de trois outils dans un tableur. Un automate peut faire cette collecte et envoyer le tableau avant 8 h 30.
```

## Catégorie

**Outils & no-code**

## Couverture

Déposer `couverture.png` (ce dossier). La zone s'active après un premier « Enregistrer ».

## Texte alternatif de la couverture

```text
Une feuille de reporting avec un graphique en barres, la dernière barre en jaune, reliée à une enveloppe
```

## Référencement

### Titre SEO

Laisser vide : le titre tient en 60 caractères avec « — Crescendo ».

### Meta description

Laisser vide : le chapô sert de meta description.

### Slug

Ne rien saisir. Vérifier que l'éditeur affiche `un-reporting-hebdo-qui-se-remplit-tout-seul`.

## Corps de l'article (Markdown)

Copier le contenu du bloc ci-dessous (le bouton de copie du bloc le prend en entier).

````markdown
Lundi, 8 h 30. Quelqu'un ouvre le CRM, l'outil de facturation et la boîte mail commerciale, puis recopie des chiffres dans un tableur. Le tableau part ensuite au dirigeant, avec une erreur de copie quelque part. Le lundi suivant, on recommence.

Ce reporting est un process calvaire typique : il revient chaque semaine, il suit toujours les mêmes étapes, et personne n'aime le faire. C'est aussi l'un des plus simples à automatiser.

## Ce que fait l'automate

Un automate est un scénario, sur Make ou Zapier, qui relie vos outils sans intervention humaine. Pour le reporting, il tient en trois étapes :

1. **Collecter.** Chaque lundi à 7 h, il va chercher les chiffres de la semaine dans chaque outil : les devis envoyés dans le CRM, les factures émises et encaissées dans l'outil de facturation, les demandes reçues dans la boîte commerciale.
2. **Calculer.** Il range ces chiffres dans un Google Sheets, à côté de ceux des semaines précédentes, et calcule les écarts.
3. **Envoyer.** Il envoie le tableau, ou un lien vers lui, aux personnes concernées.

À 8 h 30, le tableau est déjà dans les boîtes mail. La personne qui le remplissait garde son lundi matin pour autre chose.

## Peu d'indicateurs, bien choisis

Un reporting automatique a un piège : comme il ne coûte plus rien à produire, on a envie d'y mettre tout. Un tableau de quarante lignes, personne ne le lit. On part plutôt des décisions que vous prenez chaque semaine, et on garde les chiffres qui les éclairent :

| Indicateur | Source | La question qu'il éclaire |
|---|---|---|
| Devis envoyés | CRM | L'activité commerciale suit-elle ? |
| Devis signés | CRM | Les devis se transforment-ils ? |
| Factures en retard | Outil de facturation | Faut-il relancer ? |
| Demandes entrantes | Boîte commerciale | La demande monte-t-elle ou baisse-t-elle ? |

Si un chiffre ne change jamais aucune décision, il sort du tableau.

## Quelques phrases de commentaire, écrites par l'IA

Un tableau de chiffres se lit mal sur un téléphone. On ajoute donc en tête de l'email quelques phrases rédigées par l'IA à partir des écarts : ce qui a bougé depuis la semaine précédente, et ce qui sort de l'ordinaire. Par exemple :

> Les devis envoyés sont en hausse par rapport à la semaine dernière. Deux factures dépassent trente jours de retard. Les demandes entrantes sont stables.

L'IA décrit les chiffres du tableau, sans inventer de tendance ni donner de conseil.

C'est de l'IA bien placée : une petite tâche, utile et facile à vérifier.

## Ce qu'il faut pour démarrer

Trois choses suffisent : un accès en lecture à chaque outil, la liste des indicateurs validée par le dirigeant, et la personne qui fait le reporting aujourd'hui. Cette personne est précieuse. Elle sait que telle colonne inclut les avoirs, que tel client est facturé à part, que les chiffres de décembre se lisent autrement. Ces règles, souvent dans sa tête, deviennent des règles écrites dans le scénario.

Avant la mise en service, l'automate tourne quelques semaines en parallèle du reporting manuel. Tant que les deux tableaux ne donnent pas les mêmes chiffres, on cherche pourquoi. Le jour où ils concordent, on arrête la version manuelle.

## Quand une source change

Le jour où quelqu'un renomme une colonne ou change d'outil de facturation, l'automate ne trouve plus ses chiffres. Un reporting bricolé continue alors d'envoyer un tableau faux, sans que personne ne s'en aperçoive.

Pour éviter ça, l'automate vérifie ce qu'il reçoit avant d'envoyer. Une source vide ou un chiffre incohérent bloque l'envoi et déclenche une alerte. Mieux vaut un reporting en retard qu'un reporting faux.

C'est aussi pour ce genre de cas qu'on propose une maintenance après la livraison : quelqu'un surveille le scénario, le corrige et le fait évoluer avec vos outils.

La [méthode Crescendo](/#methode) détaille comment on passe d'un process comme celui-ci à un automate en production.

Et vous, qui remplit votre reporting le lundi matin ?
````
