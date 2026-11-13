# PRD : site Crescendo

## Problème

Crescendo vend ses projets par un appel découverte, et presque tous les prospects arrivent par LinkedIn : posts, profil du fondateur et messages de prospection. Ces prospects n'ont aujourd'hui aucune page où atterrir. Un dirigeant de PME qui clique sur un lien ne trouve ni ce que fait l'agence, ni à qui elle s'adresse, ni comment réserver l'appel. Rien n'est mesuré non plus, donc personne ne sait quels posts amènent des appels.

Le volume d'appels est le principal levier de l'agence. Elle vise 30 000 € de chiffre d'affaires mensuel d'ici novembre 2027. Elle reçoit aujourd'hui environ 10 appels par mois et en signe environ 20 %, 24 à 48 h après l'appel. Chaque visite qui ne finit pas par une réservation, c'est un appel en moins.

Le consultant veut aussi attirer, hors LinkedIn, des dirigeants qui cherchent sur un moteur de recherche comment automatiser leurs process calvaires. Sans outil de publication, chaque article demanderait une intervention technique. Et sans SEO technique propre, un article serait mal trouvé et mal affiché quand on le partage.

Pourquoi maintenant : la vague IA pousse les dirigeants à chercher un partenaire, et la copy finale, l'offre et le design system sont validés. Il ne manque que le site pour les mettre en ligne.

## Solution

Le site comprend trois parties, toutes tournées vers une seule action : réserver l'Appel Process Calvaires.

1. **La landing**, qui sert aussi de page d'accueil, reprend mot pour mot la copy finale. Le dirigeant réserve dans un agenda intégré à la page, en plein écran sur mobile, avec un formulaire court. Une page de confirmation lui dit quoi préparer. Quand le lien est partagé sur LinkedIn, l'aperçu montre un titre, une description et la photo d'Aymen.
2. **Le blog** (« le carnet ») est public et se trouve à l'adresse /blog du site. On y trouve la liste des articles et des pages article qui se terminent par une invitation à réserver. Chaque article est indexable, déclaré dans le sitemap et s'affiche avec un aperçu propre quand on le partage.
3. **L'espace admin** est réservé au consultant. Il s'y connecte avec un lien magique reçu par email. Il écrit ses articles en Markdown en voyant le rendu final à côté, et il ajoute ses images. Il règle le titre SEO, la meta description et le slug, puis il publie, met à jour, dépublie ou supprime sans toucher au code.

La mesure fonctionne dès le premier jour : le consultant sait d'où viennent les visiteurs, sur quels boutons ils cliquent et combien réservent.

## Utilisateur cible

**Le dirigeant de PME (visiteur principal).** Il dirige une PME française de 10 à 250 salariés dans le BTP, le juridique, le commerce, l'industrie ou les services B2B. Son équipe ressaisit les devis dans l'outil de facturation, relance les clients quand elle y pense et trie les emails à la main. Il sait que l'IA pourrait aider, mais il ne sait pas par où commencer. Il découvre Crescendo sur LinkedIn, souvent sur son téléphone, dans le navigateur de l'app LinkedIn, entre deux rendez-vous. Il veut comprendre en quelques secondes ce que fait l'agence, savoir s'il est dans la cible et réserver sans friction. Il arrive aussi sur le blog par une recherche, par exemple « automatiser les relances clients ».

**Le consultant (seul utilisateur de l'admin).** C'est Aymen Jouini, le fondateur, ingénieur puis architecte cloud et d'entreprise. Il rédige lui-même ses articles et maîtrise Markdown. Il publie depuis son ordinateur, entre deux missions, puis relaie l'article sur LinkedIn. Il veut qu'un article sorte propre, bien référencé et bien affiché au partage, sans intervention technique.

## User Stories

**Landing et réservation**

- **US-1** En tant que dirigeant, je veux lire sur la page d'accueil, dans l'ordre de la copy finale, ce que fait Crescendo, pour qui, comment et à quel prix, avec les réponses à mes objections, afin de décider si l'appel vaut mes 30 minutes.
- **US-2** En tant que dirigeant, je veux un bouton de réservation dans le header, le hero, après les process automatisés, après l'engagement et en fin de page, avec le visage d'Aymen à côté, afin de réserver dès que je suis convaincu et de savoir à qui je vais parler.
- **US-3** En tant que dirigeant sur mobile, je veux un bouton « Réserver mon appel » fixé en bas de l'écran une fois le hero dépassé, afin de ne pas devoir remonter la page pour réserver.
- **US-4** En tant que dirigeant, je veux choisir un créneau et remplir un formulaire court dans un agenda intégré à la page (plein écran sur mobile), afin de réserver sans quitter le site.
- **US-5** En tant que dirigeant qui ne peut pas réserver dans l'agenda intégré, parce qu'il s'affiche mal dans l'app LinkedIn ou qu'il n'y a aucun créneau, je veux un lien pour l'ouvrir dans un nouvel onglet et une adresse email où envoyer mes disponibilités, afin de ne pas abandonner.
- **US-6** En tant que dirigeant qui vient de réserver, je veux une page qui me dit quoi préparer, puis un email de confirmation avec le lien de la visio et des rappels avant l'appel, afin que l'appel me soit utile et que je ne l'oublie pas.
- **US-7** En tant que dirigeant qui voit le lien du site dans un post ou un message LinkedIn, je veux un aperçu avec un titre, une description et la photo d'Aymen, afin de savoir ce que je vais ouvrir.
- **US-8** En tant que dirigeant, je veux accéder aux mentions légales et à la politique de confidentialité, afin de savoir ce que deviennent mes informations.
- **US-9** En tant que visiteur qui ouvre une adresse inexistante ou un article retiré, je veux une page 404 qui me renvoie vers l'accueil et le blog, afin de ne pas rester bloqué.

**Blog public**

- **US-10** En tant que visiteur, je veux voir les articles publiés du plus récent au plus ancien, avec leur couverture, leur catégorie, leur date et leur temps de lecture, afin de repérer ce qui m'intéresse.
- **US-11** En tant que visiteur, je veux une page article lisible, avec le chapô, l'auteur, la date et le temps de lecture, afin de lire confortablement.
- **US-12** En tant que visiteur convaincu par un article, je veux un bloc « Réserver mon appel » à la fin de l'article, afin de passer à l'action sans chercher.
- **US-13** En tant que visiteur qui arrive alors qu'aucun article n'est publié, je veux un état vide soigné, afin de ne pas croire que le site est cassé.
- **US-14** En tant que visiteur qui partage un article sur LinkedIn, je veux un aperçu avec la couverture, le titre et la description, afin que le lien donne envie de cliquer.
- **US-15** En tant que dirigeant qui fait une recherche, je veux voir dans les résultats un titre et une description clairs pour chaque article, afin de cliquer sur le bon.

**Espace admin : connexion**

- **US-16** En tant que consultant, je veux saisir mon email et recevoir un lien magique, puis en redemander un si le lien a expiré ou a déjà servi, afin de me connecter sans mot de passe.
- **US-17** En tant que consultant, je veux qu'une autre adresse que la mienne ne reçoive jamais de lien, et qu'on ne puisse pas savoir depuis l'écran de connexion si une adresse est autorisée, afin que personne d'autre ne puisse publier.
- **US-18** En tant que consultant, je veux rester connecté 7 jours sur mon navigateur et pouvoir me déconnecter, afin de ne pas redemander un lien à chaque visite.

**Espace admin : rédaction et publication**

- **US-19** En tant que consultant, je veux voir tous mes articles avec leur statut (brouillon ou publié), leur catégorie et leurs dates, et un bouton « Nouvel article » même quand la liste est vide, afin de savoir où j'en suis.
- **US-20** En tant que consultant, je veux écrire en Markdown en voyant à côté le rendu exact du blog, afin de savoir comment l'article s'affichera une fois publié.
- **US-21** En tant que consultant, je veux téléverser une image de couverture et des images dans le corps, avec un texte alternatif obligatoire, afin d'illustrer l'article sans nuire à l'accessibilité.
- **US-22** En tant que consultant, je veux saisir le titre et le chapô et choisir la catégorie, afin de présenter et de classer l'article.
- **US-23** En tant que consultant, je veux régler le titre SEO, la meta description et le slug, pré-remplis par défaut et accompagnés d'un compteur de caractères, et être averti si le slug est déjà pris ou invalide, afin d'optimiser chaque article sans publier d'URL en double.
- **US-24** En tant que consultant, je veux enregistrer un brouillon, être averti si je quitte l'éditeur sans enregistrer, et garder mon texte si l'enregistrement échoue, afin de ne rien perdre.
- **US-25** En tant que consultant, je veux publier un article complet, ou mettre en ligne la correction d'un article publié, en un clic, et voir le résultat sur le blog et dans le sitemap dans la minute, afin de le partager aussitôt sur LinkedIn.
- **US-26** En tant que consultant, je veux dépublier un article, ou le supprimer après une confirmation, afin de le retirer du site.

**Mesure**

- **US-27** En tant que consultant, je veux savoir combien de visiteurs viennent de chaque source (post, profil ou message LinkedIn, blog, recherche), combien cliquent sur chaque bouton de réservation et combien réservent, afin de savoir ce qui amène des appels.

## Critères de succès

**Landing et réservation**
- Le texte affiché sur la landing est identique, mot pour mot, à la copy finale. Les indications de mise en page et les éléments masqués au lancement ne sont pas affichés.
- Aucune page en production n'affiche « [NEED] » ou un autre texte à compléter.
- Depuis l'app LinkedIn, sur iPhone puis sur Android, une réservation complète arrive jusqu'à la page de confirmation, par l'agenda intégré ou par le lien de secours.
- Sur mobile, le bouton fixe apparaît quand le bouton du hero sort de l'écran et disparaît quand le bloc de réservation entre dans l'écran.
- L'inspecteur de publication de LinkedIn affiche pour la landing le titre, la description et une image de 1200 × 630 px.
- L'audit standard de qualité web donne au moins 95 sur chacun des quatre axes (performance, accessibilité, bonnes pratiques, SEO) pour la landing, la liste du blog et une page article, sur mobile.
- La réservation et l'admin se parcourent entièrement au clavier, avec un focus toujours visible.

**Blog et SEO technique**
- Le sitemap contient la landing et tous les articles publiés, et aucun brouillon. Un article publié y entre, et un article dépublié en sort, dans la minute et sans redéploiement.
- Chaque article publié a une URL canonique, un titre de page, une meta description d'au plus 155 caractères, un aperçu de partage avec sa couverture et des données structurées d'article. Ces données sont validées sans erreur par l'outil de test des résultats enrichis.
- Un article dépublié ou supprimé renvoie une page 404 et disparaît de la liste et du sitemap.
- Après la première publication, le slug d'un article ne peut plus être modifié.
- Les versions de test du site portent une consigne de non-indexation.

**Espace admin**
- En production, le lien magique arrive dans la boîte du consultant en moins d'une minute. Il ne fonctionne qu'une fois et expire au bout d'une heure.
- Une adresse non autorisée ne reçoit aucun email et voit exactement le même message que le consultant.
- Une page de l'admin ouverte sans session renvoie vers la connexion. Un brouillon n'est jamais accessible au public : son adresse renvoie une page 404.
- De « Nouvel article » jusqu'à l'article en ligne, le consultant n'intervient ni dans le code ni dans un redéploiement.

**Mesure**
- Une réservation de test déclenche une seule fois l'événement « réservation confirmée », à la confirmation et non au clic.
- Un clic sur chaque bouton de réservation est enregistré avec sa position.
- Une visite arrivée avec des UTM est attribuée à la bonne source.
- Aucun bandeau cookies ne s'affiche.

**Livraison**
- Une modification n'est fusionnée que si toutes les vérifications automatiques passent : qualité du code, tests, construction du site. Les tests couvrent trois parcours dans un vrai navigateur : réserver jusqu'à l'affichage de l'agenda, se connecter à l'admin par lien magique, et publier puis dépublier un article.
- Après chaque fusion, la base et le site de production sont mis à jour sans aucune action manuelle.

## Hors périmètre

- Comptes visiteurs, commentaires, paiement.
- Plusieurs auteurs, plusieurs comptes admin, rôles ou droits différenciés.
- Connexion par mot de passe ou par réseau social.
- Programmation d'une publication à une date future.
- Historique des versions d'un article et enregistrement automatique en continu.
- Blocs maison dans les articles (encadré, étapes, avant/après, CTA dans le corps) et barre d'outils de mise en forme.
- Page de prévisualisation séparée de l'éditeur.
- Modification du slug après publication, et redirection d'anciennes adresses d'articles.
- Filtre et pages par catégorie, et création ou modification des catégories.
- Article à la une, articles liés, sommaire, flux RSS, recherche et pagination du blog.
- Image de partage générée automatiquement, et aperçus du résultat de recherche et du partage dans l'admin.
- Médiathèque partagée entre articles.
- Variantes du hero (photo, H1 B) et bascule entre elles.
- Sous-domaine dédié au blog.
- Newsletter, formulaire de contact, et le lien « Décrivez votre process par écrit ».
- Statistiques dans l'admin, outils de mesure soumis à consentement, bandeau cookies, A/B test.
- Modification de la landing depuis l'admin.
- Gestion des créneaux, des rendez-vous et des rappels par le site : l'outil de rendez-vous s'en charge.
- Affichage des mini-cas clients et de la citation « prospects chauds » au lancement.
- Version anglaise ou multilingue, et import d'articles ou de posts existants.

## Décisions d'implémentation

**Landing**
- Le texte vient de la copy finale, sans réécriture. Les titres sont ponctués selon le design system : un point sur les phrases, rien sur les titres nominaux, un « ? » sur les questions.
- Les libellés des boutons sont « Réserver mon Appel Process Calvaires » dans les sections, et « Réserver mon appel » dans le header, sur le bouton fixe mobile et dans le blog.
- Le header n'a pas de menu. Le footer contient le lien « Le carnet » vers le blog.
- Le visuel du hero est le schéma devis → facture → relance.
- Certains éléments ne sont pas affichés : le bloc « Quelques projets livrés » et son titre, et la citation « prospects chauds ». La phrase « Prochain démarrage possible » n'apparaît que si le mois est renseigné et pas encore passé. Le consultant met ce mois à jour en dehors de l'admin. Les [NEED] obligatoires de la copy bloquent la mise en ligne.
- Sur ordinateur, l'agenda est affiché dans le bloc final, à droite du texte. Sur mobile, chaque bouton de réservation ouvre l'agenda en plein écran : un bouton « Fermer » en haut, et la touche Échap ferme aussi. Le lien « Ouvrir l'agenda dans un nouvel onglet » est sous l'agenda. S'il n'y a aucun créneau, la phrase de secours de la copy donne l'email de contact.
- Les créneaux proposés tombent dans les 48 à 72 h. Le formulaire contient Nom, Email professionnel, Entreprise et Taille de l'entreprise (1-9 / 10-49 / 50-250 / 250+), qui sont obligatoires. Il contient aussi « Quel process vous fait perdre le plus de temps ? », « Comment avez-vous connu Crescendo ? » et Téléphone, qui sont facultatifs. La mention RGPD et le lien vers la politique de confidentialité sont sous le formulaire.
- L'email de confirmation contient le lien de la visio. Un rappel part par email la veille et une heure avant l'appel, et par SMS si le téléphone est renseigné. Après la réservation, le visiteur arrive sur la page de confirmation. Elle n'est pas indexée et son header ne garde que le logo.
- L'aperçu de partage de la landing fait 1200 × 630 px : la photo d'Aymen, le logo, le titre de partage de la copy et « Aymen Jouini · fondateur ».
- La page 404 montre l'escalier du logo, avec un lien vers l'accueil et un lien vers le blog.
- Les mentions légales et la politique de confidentialité sont des pages du site. Le consultant fournit leur texte.

**Blog**
- Le blog est à l'adresse crescendo.fr/blog (domaine provisoire), et chaque article à l'adresse crescendo.fr/blog/slug.
- La navigation du blog contient le logo, « le carnet » et le bouton « Réserver mon appel ». Les liens de réservation du blog indiquent leur source (navigation ou fin d'article) et le slug de l'article.
- La liste montre tous les articles publiés, du plus récent au plus ancien, en grille, sur une seule page. Chaque carte montre la couverture, la catégorie, la date, le temps de lecture, le titre (2 lignes au plus) et le chapô (3 lignes au plus).
- Il y a 4 catégories fixes : Automatisation IA, Outils & no-code, Digitalisation & stratégie, Cas clients. La catégorie s'affiche comme une étiquette, sans page dédiée.
- La page article montre la catégorie, le titre, le chapô, puis « Aymen Jouini · date de publication · X min de lecture », la couverture et le corps. Le temps de lecture est calculé automatiquement. La date affichée est celle de la première publication. La date de dernière modification est transmise aux moteurs de recherche, sans être affichée.
- La fin d'article contient le bloc « Ce sujet vous parle ? Réservons 30 min. » avec le bouton « Réserver mon appel ».
- Le titre de page est le titre SEO suivi de « — Crescendo ». L'aperçu de partage reprend la couverture, le titre SEO et la meta description.
- Quand aucun article n'est publié, la liste affiche l'escalier du logo, la phrase « Les premiers articles arrivent. » et le bouton « Réserver mon appel ».

**Espace admin : accès**
- L'admin a une adresse qui n'est liée nulle part sur le site public et qui n'est jamais indexée. Il est conçu pour un écran d'ordinateur, et il vouvoie comme le reste du site.
- Une seule adresse email est autorisée, celle du consultant. Quelle que soit l'adresse saisie, le message est le même : « Si cette adresse est autorisée, un lien de connexion vient de vous être envoyé. » Un nouveau lien peut être demandé au bout de 60 secondes.
- Le lien est valable 1 h et ne sert qu'une fois. S'il a expiré ou déjà servi, l'admin affiche « Ce lien n'est plus valable. » avec un bouton « Recevoir un nouveau lien ».
- La session dure 7 jours sur le même navigateur. Un bouton « Se déconnecter » est visible sur toutes les pages de l'admin. Après la connexion, le consultant arrive sur la liste des articles.

**Espace admin : articles**
- La liste est un tableau trié par dernière modification, avec ces colonnes : titre, statut (Brouillon ou Publié), catégorie, date de publication, dernière modification. Chaque ligne a un lien vers l'éditeur et, pour un article publié, un lien vers l'article en ligne. Quand il n'y a aucun article, la liste affiche « Aucun article pour l'instant. » et le bouton « Nouvel article ».
- L'éditeur a deux colonnes : le Markdown standard à gauche (intertitres, gras, listes, citations, liens, images, code, tableaux) et le rendu exact du blog à droite.
- Au-dessus de l'éditeur se trouvent les champs Titre, Chapô (1 ou 2 phrases, qui servent d'extrait et de meta description par défaut), Catégorie (une liste de 4) et Couverture, avec son texte alternatif.
- Les réglages SEO :
  - **Titre SEO** : par défaut, le titre de l'article. Le compteur inclut « — Crescendo », et un avertissement non bloquant s'affiche au-delà de 60 caractères.
  - **Meta description** : par défaut, le chapô. Un avertissement non bloquant s'affiche au-delà de 155 caractères.
  - **Slug** : généré à partir du titre, en minuscules, sans accents, avec des tirets. Il reste modifiable tant que l'article est en brouillon. Seuls les lettres a à z, les chiffres et les tirets sont acceptés. Un slug déjà pris est refusé avec le nom de l'article concerné. Après la première publication, le champ passe en lecture seule avec la mention « Le slug ne change plus après publication. »
- Images : le bouton « Ajouter une image » téléverse l'image, demande son texte alternatif et l'insère à l'endroit du curseur. Formats acceptés : JPEG, PNG ou WebP, 5 Mo au plus. La couverture est affichée au format 16:10, recadrée au centre.
- Pour publier, il faut un titre, un chapô, une catégorie, un slug valide, un corps non vide et une couverture avec son texte alternatif. Si un élément manque, « Publier » affiche la liste de ce qui manque, et rien n'est publié.
- Boutons d'un brouillon : « Enregistrer », « Publier » et « Supprimer ». Boutons d'un article publié : « Mettre à jour », « Voir en ligne », « Dépublier » et « Supprimer ». Le raccourci Cmd/Ctrl + S enregistre.
- « Dépublier » repasse l'article en brouillon. Une republication garde la date de première publication. « Supprimer » demande une confirmation (« Supprimer définitivement « titre » ? ») et la suppression est définitive.
- Quitter l'éditeur avec des modifications non enregistrées affiche un avertissement. Si un enregistrement ou un téléversement échoue, l'admin affiche « L'enregistrement a échoué. Vos modifications sont toujours dans l'éditeur. Réessayez. », et le texte reste en place.

**Mesure**
- L'audience est mesurée sans bandeau cookies.
- Deux événements sont suivis :
  - le clic sur un bouton de réservation, avec sa position (header, hero, après les process, engagement, bouton fixe, CTA final, navigation du blog, fin d'article) ;
  - la réservation confirmée.
- Les liens LinkedIn suivent le tableau d'UTM de la revue CRO (post, profil, message, commentaire).
- Les visites de l'admin ne sont pas comptées.

## Notes complémentaires

- **Livraison en deux temps** : la landing d'abord, avec les fondations du site et la chaîne de livraison, puis le blog et l'admin. Le lien « Le carnet » du footer apparaît avec le blog.
- **Bloquant pour la mise en ligne de la landing (les [NEED] de la copy) :**
  - le délai type du Sprint ;
  - la durée de l'audit ;
  - le prix mensuel de Maintenance & Surveillance ;
  - le temps à prévoir côté client ;
  - l'intervention à distance, sur place, ou les deux ;
  - le mois du prochain démarrage ;
  - l'email de contact ;
  - le texte des mentions légales et de la politique de confidentialité.
- **Outil de rendez-vous** : il est choisi. Il faut vérifier que l'offre retenue permet les rappels par SMS, l'affichage dans l'app LinkedIn, la couleur du créneau choisi et la redirection vers la page de confirmation.
- **Outil de mesure** : il faut vérifier qu'il est bien exempté de consentement dans la configuration retenue.
- **Domaine provisoire**, à remplacer par le domaine définitif avant le lancement.
- **Test obligatoire avant la mise en ligne** : une réservation complète depuis l'app LinkedIn, sur iPhone et sur Android.
- **Aucun cas client ni aucune citation au lancement.** Ils s'afficheront après l'accord écrit des clients : 2 mini-cas au minimum.
- **Risque lié au lien magique** : certains filtres de messagerie ouvrent les liens avant le destinataire, ce qui peut consommer un lien à usage unique. À vérifier avec la messagerie du consultant.
- **Risque lié au compte unique** : si le consultant perd l'accès à son email, plus personne ne peut publier. Il faut prévoir une procédure de secours, qui passe par les livraisons automatisées.
- **Contraintes de livraison du brief** : le poste du consultant n'accède jamais à la base de production. La structure de la base n'évolue que par les livraisons automatisées après chaque fusion, et les secrets restent sur la plateforme d'intégration continue. En local, les emails de connexion sont captés par un outil de test, sans envoi réel. Le détail de la stack et de la CI/CD sera dans le plan d'implémentation.