# Inventaire : photo, OCR et alerte de stock avec Make

Ordre de publication : **1 sur 6**. Les champs suivent l'ordre de l'éditeur.

## Titre

```text
Inventaire : photo, OCR et alerte de stock avec Make
```

## Chapô

```text
Compter, recopier, comparer : l'inventaire sur Excel prend du temps et laisse passer des erreurs. Une photo et un scénario Make font le gros du travail.
```

## Catégorie

**Outils & no-code**

## Couverture

Déposer `couverture.png` (ce dossier). La zone s'active après un premier « Enregistrer ».

## Texte alternatif de la couverture

```text
Un carton dont l'étiquette est cadrée comme dans un viseur, relié à une alerte marquée en jaune
```

## Référencement

### Titre SEO

```text
Inventaire : photo, OCR et alerte de stock
```

Le titre complet dépasse 60 caractères avec « — Crescendo ».

### Meta description

Laisser vide : le chapô sert de meta description.

### Slug

Ne rien saisir. Vérifier que l'éditeur affiche `inventaire-photo-ocr-et-alerte-de-stock-avec-make`.

## Corps de l'article (Markdown)

Copier le contenu du bloc ci-dessous (le bouton de copie du bloc le prend en entier).

````markdown
Les inventaires en Excel, c'est comme les fax : encore utilisés, mais dépassés. On compte les cartons, on note sur une feuille, on recopie dans le tableur, puis on compare avec le stock théorique à coups de VLOOKUP. Chaque étape est manuelle, et chaque recopie peut glisser une erreur.

Le même travail peut partir d'une simple photo. Un scénario Make lit l'étiquette, met le tableau à jour et prévient la bonne personne quand quelque chose cloche.

## Le scénario, étape par étape

1. **La photo.** Le magasinier photographie l'étiquette ou le bon de livraison avec son téléphone, depuis un formulaire ou un dossier partagé.
2. **La lecture.** L'OCR, la lecture automatique du texte sur une image, extrait la référence, la désignation et la quantité.
3. **La mise à jour.** Make écrit ces informations dans le tableau de stock, avec la date et l'auteur de la photo.
4. **La comparaison.** Le scénario compare la quantité comptée avec la quantité attendue, et le stock restant avec le seuil minimum de chaque référence.
5. **L'alerte.** S'il trouve un écart ou un stock bas, il crée un ticket pour la personne concernée.

Le magasinier prend des photos. Il ne recopie plus rien.

Pourquoi une photo plutôt qu'une douchette ? Un lecteur de codes-barres fait très bien ce travail quand chaque produit a son code et que l'entrepôt est équipé. La photo convient aux cas plus courants dans une PME : des étiquettes fournisseurs toutes différentes, des bons de livraison papier, des produits sans code. Le téléphone est déjà dans la poche du magasinier, et chaque photo reste liée à sa ligne du tableau. En cas de doute, on remonte à l'image d'origine.

## Ce que lit l'OCR, et ce qu'il faut vérifier

L'OCR lit bien un texte imprimé, net et bien éclairé. Il lit moins bien une étiquette froissée, une écriture manuscrite ou une photo floue. Le scénario en tient compte :

| Élément | Lecture automatique | Vérification |
|---|---|---|
| Référence imprimée | Fiable si la photo est nette | Contrôle avec la liste des références connues |
| Quantité imprimée | Fiable si la photo est nette | Comparaison avec la quantité attendue |
| Mention manuscrite | Incertaine | Validation par une personne |
| Photo floue ou coupée | Impossible | Demande d'une nouvelle photo |

Une référence inconnue ne passe jamais en silence : elle part en validation. Le stock reste fiable même quand une photo est ratée.

## Les alertes qui servent

Un scénario d'inventaire utile fait trois choses :

- **Générer les tickets** quand un produit passe sous son seuil, pour lancer la commande à temps.
- **Détecter les écarts** entre le stock compté et le stock théorique, pour repérer la casse, les erreurs de livraison ou les sorties non saisies.
- **Planifier les contrôles à venir** pour les références sensibles, sans attendre l'inventaire annuel.

Chaque alerte va à une personne précise, avec la photo d'origine en pièce jointe. Une alerte envoyée à tout le monde finit par n'être lue par personne.

## Commencer petit

On ne bascule pas tout l'entrepôt d'un coup. On choisit une famille de produits, celle qui pose le plus de problèmes, et on fait tourner le scénario quelques semaines. Les magasiniers prennent l'habitude de la photo, on ajuste les seuils et la liste des références, puis on étend aux autres familles.

Pendant ces semaines, on compare le stock du scénario avec un comptage manuel sur quelques références. Les écarts montrent où l'OCR se trompe, quelles étiquettes sont illisibles et quels seuils sont mal réglés.

Au début, le tableur reste le même : le scénario écrit dedans. Un vrai outil de gestion de stock pourra venir plus tard, si le besoin se confirme.

La [méthode Crescendo](/#methode) suit ce même ordre : le process d'abord, puis l'outil, puis la prise en main par l'équipe.

Et vous, votre inventaire est encore en VLOOKUP ?
````
