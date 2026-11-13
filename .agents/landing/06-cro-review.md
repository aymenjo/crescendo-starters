# CRO Review : landing Crescendo

**Version :** v1, 2026-11-11
**Sources :** `.agents/product-marketing.md` v1, `.agents/landing/03-offer.md` v1, `.agents/landing/04-copy-v1.md` v1, skill `cro` et sa référence formulaires.
**Usage :** revue avant mise en ligne de la copy v1 et du parcours de réservation. La page n'est pas en ligne : la revue porte sur le texte, la structure et le parcours, pas sur une page affichée. `[NEED: …]` désigne une information à fournir. Validée par le fondateur le 2026-11-11.

## Contexte
| | |
|---|---|
| Page | Landing unique, qui sert aussi de page d'accueil |
| Conversion | Réserver l'Appel Process Calvaires |
| Trafic | LinkedIn (posts, profil, messages de prospection). Des visiteurs qui connaissent déjà un peu le fondateur, sans doute surtout sur mobile et dans le navigateur de l'app LinkedIn (à vérifier dans les stats) |
| Situation actuelle | Environ 10 appels par mois, 20 % de signature, signature 24 à 48 h après l'appel. La landing n'est pas mesurée |
| Contrainte principale | La preuve (probabilité perçue de 4/10 dans 03-offer) |
| Levier business | Le volume d'appels (product-marketing) |

## Verdict
La copy v1 est claire et répond bien aux objections. Trois manques l'empêchent de convertir :
1. **Le parcours après le clic n'existe pas encore.** Outil, champs, confirmation et rappels ne sont pas définis.
2. **La preuve arrive tard et reste mince.** Le fondateur n'apparaît qu'en section 7, sans nom ni photo, et les cas clients sont masqués.
3. **Rien n'est mesuré.** Sans UTM ni événements, impossible de savoir si la page apporte des appels.

Autre problème de cohérence : **trois hypothèses encore ouvertes dans 03-offer sont écrites comme des faits dans 04-copy** :
- le récap sous 24 h (sections 4 et 11) ;
- l'accès à la plateforme de formation (section 5) ;
- les outils ouverts sur les comptes du client (section 5 et 2 FAQ).

Si l'une d'elles est fausse, le prospect le découvrira dans la propal, au moment de signer.

## Diagnostic
| Dimension | Verdict | Constat |
|---|---|---|
| Proposition de valeur | Solide | Le surtitre, le H1 et le sous-titre disent quoi, pour qui et comment. Le H1 seul ne dit pas ce que fait Crescendo : le surtitre doit donc être bien visible (taille, contraste) |
| Titre | Solide | Image concrète et vérifiable. Moins de continuité avec LinkedIn que la variante B (« process calvaires ») |
| CTA | À renforcer | Seulement 2 CTA pour 11 sections, et aucun après « Ce qu'on automatise », là où le dirigeant se reconnaît. Le libellé fait 37 caractères et passe sur 2 lignes sur mobile. Pas de bouton fixe |
| Hiérarchie | À renforcer | La preuve arrive en section 7. Une page longue se justifie pour un ticket de 4 à 30 k€, à condition qu'on puisse la parcourir vite |
| Confiance | **Bloquant** | Ni nom, ni photo, ni témoignage, et les cas sont masqués. La ligne de preuve du hero est trop longue (33 mots) |
| Objections | Solide | Il manque l'objection du moment du clic : « Que se passe-t-il pendant l'appel ? » Il manque aussi le délai et la question « à distance ou sur place ? » |
| Friction | **Bloquant** | Le parcours de réservation n'est pas défini, la durée de l'appel non plus, et rien n'a été testé dans le navigateur de l'app LinkedIn |

## Quick Wins
1. **Remplir les 2 [NEED] bloquants :** la durée de l'appel (30 minutes, validé), puis le prénom, le nom et la photo du fondateur.
2. **Ajouter l'avatar et le prénom du fondateur à côté du CTA du hero.** Le visiteur sait à qui il va parler.
3. **Remonter sous le CTA du hero la phrase « ou rien du tout si le gain ne vaut pas l'investissement ».** Aujourd'hui, elle n'est qu'en section 11.
4. **Ajouter 2 CTA intermédiaires**, après « Ce qu'on automatise » et après « Engagement ». Sur mobile, ajouter un bouton fixe en bas de l'écran, au libellé court.
5. **Simplifier le header :** le logo et le bouton, sans menu.
6. **Raccourcir la ligne de preuve du hero.** Les secteurs sont déjà dans « Pour qui ».
7. **Soigner l'aperçu LinkedIn (balises Open Graph) :** titre, description, image. C'est la première chose que le prospect voit quand le lien est partagé dans un post ou un message.
8. **Afficher un mois de démarrage plutôt qu'une date**, et le mettre à jour chaque mois. Une date dépassée décrédibilise la rareté. Si le mois n'est plus à jour, on retire la phrase.
9. **Sur mobile, présenter la FAQ en accordéon et la section 3 en cartes.**
10. **Ajouter une mention RGPD sous le formulaire :** une ligne et un lien vers la politique de confidentialité. C'est cohérent avec la Fiche sécurité et données.

## High-Impact Changes
**1. Définir le parcours de réservation** (détail plus bas).

**2. Combler le manque de preuve en 2 ou 3 semaines, sans attendre les Bilans à J+30.**
- Appeler 3 des 10 clients existants, 20 minutes chacun. Leur demander comment le process se passait avant, le temps qu'il prenait, ce qui a changé, et leur accord pour être cités (avec leur nom ou anonymisés).
- Publier dès maintenant des mini-cas anonymisés et sans chiffres : secteur, taille, process, ce qui a été livré (outils nommés). Cela change la règle de 04-copy, qui masque la section 9 jusqu'à ce qu'il y ait des chiffres.
- Un chiffre donné par le client et attribué (« selon le dirigeant… ») vient bien de nos projets, donc il respecte la Brand Voice.
- Profiter de ces appels pour faire le test des 5 secondes (test 1).

**3. Créer un bloc Preuve (fondateur et mini-cas) juste après « Ce qu'on automatise ».**

**4. Aligner la copy sur les faits validés** (voir le tableau des hypothèses).

**5. Mesurer dès le premier jour.**

## Parcours de réservation
**Format :** l'agenda est intégré dans la page et s'ouvre en plein écran sur mobile. L'outil reste à choisir : `[NEED]` (Cal.com, Calendly, pages de réservation Google Agenda…). L'appel se fait en visio, avec le lien envoyé automatiquement.

| Champ | Statut | Pourquoi |
|---|---|---|
| Nom | Obligatoire | Personnaliser l'appel |
| Email professionnel | Obligatoire | Envoyer la confirmation, le lien visio et le récap |
| Entreprise | Obligatoire | Préparer l'appel (site, secteur) |
| Taille : 1-9 / 10-49 / 50-250 / 250+ (boutons) | Obligatoire | Repérer l'anti-persona sans bloquer la réservation |
| « Quel process vous fait perdre le plus de temps ? » (une ligne) | Facultatif | Préparer l'appel et récolter des verbatims (la section Customer Language est vide) |
| « Comment avez-vous connu Crescendo ? » | Facultatif | Les visites depuis l'app LinkedIn arrivent souvent sans source |
| Téléphone | Facultatif | Utile pour les rappels SMS. L'appel se fait en visio |

- **Pas de champ budget :** la mention « à partir de 4 000 € HT » filtre déjà.
- **Créneaux sous 48 à 72 h :** la signature se fait en 24 à 48 h, donc un appel à une semaine refroidit le prospect.
- **Après la réservation :**
  - une page de confirmation qui dit quoi préparer (voir Copy Alternatives) ;
  - des rappels par email la veille et une heure avant (SMS si le téléphone est renseigné) ;
  - un email de secours s'il ne reste aucun créneau.
- **Avant la mise en ligne :** faire une réservation complète depuis l'app LinkedIn sur iPhone et sur Android. Les agendas intégrés peuvent mal s'afficher dans le navigateur de l'app. Prévoir le lien « Ouvrir l'agenda dans un nouvel onglet ».

## Mesure
**UTM sur chaque lien LinkedIn :**

| Emplacement | utm_source | utm_medium | utm_campaign |
|---|---|---|---|
| Post | linkedin | post | sujet du post (ex. `inventaire-excel`) |
| Profil (lien, section Sélection) | linkedin | profil | n/a |
| Message de prospection | linkedin | message | secteur ou campagne |
| Commentaire | linkedin | commentaire | sujet |

Ces UTM répondent aussi au Learning resté en « watch » dans product-marketing : savoir si les posts techniques amènent des appels.

**Événements à suivre :**
- le clic sur un CTA, avec sa position (hero, intermédiaire, bouton fixe, final) ;
- l'ouverture de l'agenda ;
- la réservation confirmée. C'est la conversion : elle se déclenche à la confirmation, pas au clic.

**Après chaque appel (tableur ou CRM) :** présent ou non, dans la cible ou non, Sprint, Audit ou rien, signé ou non, montant. Ce suivi donne enfin le panier moyen.

**Outils :**
- Pour l'audience, choisir de préférence un outil exempté de consentement par la CNIL, par exemple Matomo dans sa configuration exemptée (à vérifier). Cela évite un bandeau cookies sur mobile.
- Microsoft Clarity (enregistrements de session) demande le consentement : on n'aura les données que d'une partie des visiteurs.

**En fin d'appel, poser deux questions :** « Qu'est-ce qui vous a décidé à réserver ? » et « Qu'est-ce qui a failli vous retenir ? » Avec une dizaine d'appels par mois, c'est la meilleure source d'information sur la page.

## Test Ideas
**Pas d'A/B test.** Pour détecter une hausse de 30 % (seuil de 5 %, puissance de 80 %), il faut environ 200 réservations par variante, soit 400 au total. Avec une dizaine d'appels par mois, un seul test durerait plus de 3 ans. Même pour une hausse de 50 %, il faudrait plus d'un an.

À la place, des tests qualitatifs et des changements faits l'un après l'autre :

| # | Test | Méthode | Décision |
|---|---|---|---|
| 1 | Clarté du hero | Test des 5 secondes auprès de 5 dirigeants (clients existants ou réseau) : « Que fait cette entreprise ? Pour qui ? Que se passe-t-il si vous cliquez ? Qu'est-ce qui vous retiendrait de réserver ? » | Si 2 dirigeants sur 5 ou plus ne savent pas dire ce que fait Crescendo, passer au H1 B |
| 2 | Visuel du hero : schéma ou photo du fondateur | Le même test, avec 2 maquettes | Garder celle qui donne les réponses les plus justes |
| 3 | Où les visiteurs décrochent | Profondeur de scroll et enregistrements pendant 4 à 6 semaines | Raccourcir la section où la plupart s'arrêtent, ou remonter le CTA avant elle |
| 4 | Prix de l'audit affiché | Revue à 3 mois avec le tableur d'appels | Si les appels sont dans la cible mais trop rares, retirer le prix de l'audit (garder « à partir de 4 000 € HT »). S'il y a beaucoup d'appels hors cible, le garder |
| 5 | Visiteurs pas encore prêts | Si beaucoup atteignent le CTA final sans réserver | Ajouter un lien secondaire « Décrivez votre process par écrit » `[délai de réponse à valider]` |
| 6 | H1 A ou H1 B | Un mois chacun, en lisant les chiffres avec prudence : le volume LinkedIn varie d'un mois à l'autre | Ne trancher que si l'écart est net et que les réponses de fin d'appel le confirment |

## Copy Alternatives
**Sous le CTA du hero**
- **A (reco) :** « Appel gratuit de 30 minutes avec [Prénom], le fondateur. Vous repartez avec vos process calvaires prioritaires et la suite recommandée. » Elle ajoute le nom et garde le bénéfice.
- **B :** « 30 minutes avec [Prénom], le fondateur. Si l'automatisation ne vaut pas l'investissement chez vous, il vous le dira. » Elle lève la peur d'un appel commercial.
- **C :** « Gratuit, 30 minutes, avec le fondateur. Récap écrit sous 24 h. » C'est la plus courte, pour le mobile. À n'utiliser que si le récap sous 24 h est confirmé (hypothèse 3).

**Ligne de preuve du hero**
- **A :** « 10 clients accompagnés. Fondateur architecte d'entreprise, passé par Société Générale, Hermès, Orange Bank, SNCF et Enedis. »
- **B :** « 10 clients accompagnés. Fondateur architecte d'entreprise, certifié TOGAF et AWS. » Elle met en avant la compétence. Les grands comptes passent alors dans la section Fondateur.

**CTA intermédiaires**
- Après la section 3 : « Un de ces process vous coûte des heures chaque semaine ? On commence par celui-là. » Puis le bouton.
- Après Engagement : « Prix ferme, correctifs inclus pendant 30 jours. Reste à choisir le premier process. » Puis le bouton.
- Bouton fixe sur mobile : « Réserver mon appel »

**Bloc « Ce qui se passe pendant l'appel »** (dans la section Méthode, il remplace le paragraphe sur l'Appel Process Calvaires)

*H3 : Ce qui se passe pendant l'appel*
1. Vous décrivez les tâches que votre équipe refait à la main chaque semaine.
2. On repère ensemble celles qui coûtent le plus d'heures et celles qui s'automatisent facilement.
3. Vous repartez avec la suite recommandée : un Sprint, un Audit, ou rien du tout si le gain ne vaut pas l'investissement.

Vous parlez directement à [Prénom], le fondateur, pendant 30 minutes en visio.

**FAQ à ajouter**
- « Combien de temps avant la première mise en production ? » `[NEED: délai type du Sprint]`
- « Vous intervenez à distance ou sur place ? » `[NEED]`

**Page de confirmation**
- **Titre :** « C'est réservé. Préparez deux ou trois process calvaires. »
- **Texte :** « Pour que l'appel soit utile, notez pour chacun ce qui est fait, qui le fait, combien de temps par semaine et dans quels outils. Vous recevez une confirmation par email avec le lien de la visio. »
- **Lien :** vers le profil LinkedIn du fondateur.

**Aperçu LinkedIn (Open Graph)**
- **og:title :** « Automatisez vos process calvaires, de l'audit à la mise en production ». Elle reprend le vocabulaire des posts.
- **og:description :** la meta description de 04-copy.
- **og:image :** la photo du fondateur avec le nom Crescendo, ou le schéma devis → facture → relance.

**H1 et CTA principaux :** on garde les choix de 04-copy (H1 A, CTA A). Le test 1 tranche pour le H1.

## Ordre des sections
| # | Actuel (04-copy v1) | Proposé |
|---|---|---|
| 1 | Hero | Hero, avec l'avatar du fondateur près du CTA |
| 2 | Problème | Problème |
| 3 | Ce qu'on automatise | Ce qu'on automatise, puis un CTA |
| 4 | Méthode | **Preuve** : fondateur et mini-cas anonymisés |
| 5 | Offre | Méthode, avec le bloc « Ce qui se passe pendant l'appel » |
| 6 | Engagement | Offre |
| 7 | Fondateur | Engagement, puis un CTA |
| 8 | Pour qui | Pour qui |
| 9 | Cas clients (masquée) | FAQ, avec 2 questions de plus |
| 10 | FAQ | CTA final |
| 11 | CTA final | n/a |

## Décisions (validées le 2026-11-11)
| # | Point | Décision | Statut |
|---|---|---|---|
| 1 | Durée de l'appel | 30 minutes | Validé |
| 2 | Visio ou téléphone | Visio, avec le lien envoyé automatiquement | Validé |
| 3 | Récap écrit sous 24 h | À garder seulement si vous pouvez le tenir chaque semaine. Sinon, le retirer des sections 4 et 11 | Règle validée, faisabilité à confirmer |
| 4 | Accès à la plateforme de formation IA | À retirer de « Inclus » si ce n'est pas confirmé | Règle validée, fait à confirmer |
| 5 | Outils ouverts sur les comptes du client | Si ce n'est pas systématique, réécrire le Dossier de passation et 2 FAQ | Règle validée, fait à confirmer |
| 6 | Agent vocal déjà livré chez un client | Si non, H1 : « …les relances clients sont parties et les emails du week-end sont triés » | Règle validée, fait à confirmer |
| 7 | Bloc Preuve en section 4 | Oui | Validé |
| 8 | Mini-cas publiés sans chiffres | Oui, avec l'accord écrit des clients | Validé |
| 9 | Champ Taille obligatoire | Oui, sans bloquer la réservation | Validé |
| 10 | Prix de l'audit affiché | Oui au lancement, avec une revue à 3 mois (test 4) | Validé |
| 11 | Outil de prise de RDV | `[NEED]` (Cal.com, Calendly, Google Agenda…) | À choisir |
| 12 | Header sans menu | Oui | Validé |

## Next Skills
`copywriting` pour la copy v2 (intégrer cette revue), `customer-research` pour les appels aux clients existants, `analytics` pour le plan de suivi.

## Changelog
- v1 (2026-11-11) : première revue CRO de la copy v1, avant la mise en ligne. Recommandations validées par le fondateur.
