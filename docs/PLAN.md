# Plan : site Crescendo

> PRD source : `docs/PRD.md` · Design : `docs/DESIGN.md` · Copy : `.agents/landing/07-copy-final.md`

## Décisions architecturales

Ces décisions durables s'appliquent à toutes les phases.

- **Stack** : Next.js (App Router), Tailwind v4 (tokens de DESIGN.md § 5), Supabase (Postgres, Auth, Storage), Vercel, Resend (SMTP de Supabase Auth en prod), Cal.com.
- **Routes publiques** :
  - `/`, la landing, avec les ancres `#process`, `#methode`, `#offre`, `#faq` et `#rdv` ;
  - `/merci`, en noindex ;
  - `/mentions-legales` et `/confidentialite` ;
  - la 404 globale ;
  - `/blog` et `/blog/<slug>` (phase 2) ;
  - `/sitemap.xml` et `/robots.txt` ;
  - l'image de partage de la landing, générée en 1200 × 630.
- **Routes admin** (noindex, nofollow, absentes du sitemap et de robots, sans mesure) :
  - `/admin/connexion` ;
  - `/admin/connexion/confirmer`, la page du bouton « Se connecter » ;
  - `/admin`, la liste ;
  - `/admin/articles/nouveau` : l'article est créé en base au premier enregistrement ;
  - `/admin/articles/<id>`.
- **Schéma** (phase 2) :
  - deux enums :
    - `article_status` : `draft`, `published` ;
    - `article_category` : `automatisation-ia`, `outils-no-code`, `digitalisation`, `cas-clients`.
  - Table `articles` :
    - `id` (uuid) ;
    - `slug`, unique, au format `a-z0-9` avec des tirets ;
    - `title` et `excerpt` (le chapô) ;
    - `category` ;
    - `body`, en Markdown ;
    - `cover_path` et `cover_alt` ;
    - `seo_title` et `meta_description`, nuls par défaut (on retombe alors sur le titre et le chapô) ;
    - `status` ;
    - `first_published_at`, conservée à la republication ;
    - `created_at` et `updated_at`.
  - Règles appliquées **en base** :
    - le slug ne peut plus changer une fois `first_published_at` renseignée ;
    - un article `published` a forcément tous ses champs obligatoires.
  - Le temps de lecture est calculé au rendu (200 mots/min, arrondi au-dessus, 1 au minimum).
  - Un brouillon s'enregistre dès qu'il a un titre.
- **Stockage** : un bucket `articles`, en lecture publique et en écriture pour les utilisateurs authentifiés. Il accepte JPEG, PNG et WebP, 5 Mo au plus, et range les fichiers sous `<article_id>/<uuid>.<ext>`. Supprimer un article supprime aussi ses images.
  - Les images partent du navigateur directement vers le stockage (client Supabase du navigateur, session de l'admin) : les requêtes Vercel sont limitées à 4,5 Mo. Le format et le poids sont contrôlés côté client, puis par le bucket.
  - Il faut l'`id` de l'article pour ranger ses fichiers : la couverture et « Ajouter une image » restent désactivées jusqu'au premier enregistrement, avec la cote « Enregistrez l'article pour ajouter des images. ».
  - Une image remplacée ou retirée du corps reste stockée jusqu'à la suppression de l'article.
  - La couverture est servie par `next/image` (bucket autorisé dans `images.remotePatterns`), les images du corps par des `<img loading="lazy">`.
- **Autorisations (RLS)** :
  - le public lit seulement les articles `published` ;
  - l'utilisateur authentifié lit et écrit tout ;
  - les inscriptions sont désactivées, si bien que le seul utilisateur possible est l'admin.
- **Auth** :
  - lien magique Supabase, sans création de compte ;
  - le compte admin est créé et tenu à jour par la CI depuis un secret GitHub, l'email admin. C'est aussi la **procédure de secours** : on change le secret et on relance le workflow ;
  - le même message s'affiche quelle que soit l'adresse ;
  - le lien est valable 1 h, sert une fois, et un nouveau lien peut être demandé après 60 s. Il mène à la page du bouton « Se connecter » : l'ouvrir ne le consomme pas ;
  - la session dure 7 jours **fixes** après la connexion (claim `amr` du JWT) : au-delà, l'admin déconnecte et renvoie vers la connexion. Le cookie dure aussi 7 jours ;
  - l'email part de l'expéditeur de test de Resend, `onboarding@resend.dev` (variable GitHub `AUTH_SENDER_EMAIL`, modifiable sans toucher au code). Cet expéditeur n'écrit qu'à l'adresse du compte Resend : `ADMIN_EMAIL` doit donc être cette adresse tant qu'aucun domaine n'est vérifié dans Resend ;
  - `proxy.ts` (admin seulement) rafraîchit la session et renvoie vers la connexion avant le rendu ; chaque page et action admin vérifie aussi la session côté serveur, mais la RLS reste la vraie barrière.
- **Config Auth as code** : `supabase/config.toml` contient l'URL du site, les redirections, le SMTP Resend, le template du lien magique, les durées et les inscriptions désactivées. La CI le pousse en prod. Les valeurs de prod sont injectées depuis les secrets GitHub. En local, Mailpit capte les emails.
- **Rendu et cache** :
  - la landing est statique et revalidée chaque jour, pour que la phrase « Prochain démarrage » disparaisse une fois le mois passé ;
  - la liste du blog, les articles et le sitemap sont en cache, invalidés à la demande par publier, mettre à jour, dépublier et supprimer (`updateTag` sur `articles` et `article:<slug>`). Le résultat est visible en moins d'une minute, sans redéploiement. Après une dépublication, la page déjà en cache peut encore être servie une fois pendant sa revalidation, puis elle renvoie la 404 ;
  - Next.js 16 tourne avec Cache Components : la mise en cache passe par `'use cache'` et `cacheLife` (la landing est en `cacheLife('days')`), et non par `export const revalidate`.
  - les lectures Supabase sont en `no-store` : le seul cache est `'use cache'`, recalculé à chaque build et invalidé par tags. Le fetch cache de Next, qui survit aux déploiements, garderait sinon une donnée changée en base sans `updateTag` (migration, tableau de bord Supabase) ;
  - Partial Prefetching est désactivé (`partialPrefetching: false`). Avec lui, le shell d'une route dynamique part en 200 avant `notFound()` : un brouillon ou un slug inconnu ne renverrait jamais un vrai 404.
  - `/blog/<slug>` prérend les articles publiés au build. Un article publié ensuite est rendu à la première visite, puis gardé en cache. Sur une base vide, un slug réservé sert de modèle au build et renvoie la 404.
- **Markdown** : un **seul moteur de rendu** sert à la page article, à l'aperçu de l'éditeur et aux pages légales :
  - Markdown standard et tableaux ;
  - le HTML brut n'est pas interprété ;
  - un `#` dans le corps devient un h2 ;
  - `*texte*` est rendu en graisse 500 ;
  - le code est coloré avec Shiki ;
  - styles de la prose : DESIGN.md § 12.5.
- **Contenu de la landing** : la copy finale est transcrite mot pour mot dans un module de contenu typé versionné. Un `[NEED]` y reste un manque explicite, jamais une invention. Le mois du prochain démarrage est une variable de configuration.
- **Indexation** : tout est en noindex (previews et prod de test) tant que le drapeau « site indexable » n'est pas activé, ce qui se fait au lancement. Une fois le drapeau activé, la construction échoue s'il reste un `[NEED]`. Avant de l'activer, on supprime dans l'admin les articles de démo saisis en prod, puis le dossier `docs/articles-demo/`.
- **Cal.com** (configuré dans Cal.com, hors code) :
  - un appel de 30 min en visio, avec des créneaux dans les 48 à 72 h ;
  - les champs du formulaire de la copy ;
  - un rappel par email la veille et 1 h avant, et par SMS si le téléphone est renseigné ;
  - la couleur corail ;
  - la **redirection vers `/merci`** après la réservation.

  Côté site :
  - l'embed est chargé en différé, intégré dans `#rdv` sur desktop et ouvert dans un dialog plein écran sur mobile ;
  - le lien « Ouvrir l'agenda dans un nouvel onglet » sert de secours.
- **Mesure** (Vercel Web Analytics) :
  - pages vues : en Hobby, les vues de `/merci` servent d'approximation des réservations ;
  - événements personnalisés `cta_click` (propriété `position`, la liste de DESIGN.md § 10.1 : `header`, `hero`, `apres-process`, `engagement`, `final`, `sticky`, puis `blog-nav`, `article-cta` et `blog-vide` en phase 2) et `reservation_confirmee`. Ce second événement part depuis `/merci`, une seule fois par réservation, dédupliqué par l'identifiant Cal.com ;
  - les UTM des liens suivent DESIGN.md § 12.0 bis et 06-cro-review ;
  - le script n'est pas chargé dans `/admin`.
- **Environnements et secrets** :
  - les secrets GitHub contiennent le token Supabase, le mot de passe de la base, le ref du projet, la clé secrète Supabase (pour créer le compte admin), la clé SMTP Resend et l'email admin ;
  - les variables GitHub contiennent la config publique dont la CI a besoin : `SUPABASE_URL` et `SUPABASE_PUBLISHABLE_KEY` (workflow `keep-alive`, compte admin), `SITE_URL` (URL de prod, pour les liens de connexion) et `AUTH_SENDER_EMAIL` (expéditeur des emails) ;
  - Vercel ne contient que de la config publique : l'URL Supabase et la clé publishable, le lien Cal.com, le mois de démarrage et le drapeau d'indexation ;
  - le poste local ne touche jamais Supabase Cloud ;
  - les previews lisent la base de prod en lecture publique, et l'admin y renvoie la 404 (`VERCEL_ENV === "preview"`).
- **CI/CD (GitHub Actions)** :
  - **PR** : lint et typecheck, tests unitaires, Supabase local dans Docker (migrations, seed, tests pgTAP de la base et images du seed), build, Playwright. main n'est pas protégée : le repo est privé sur GitHub Free, qui ne le permet pas. C'est Vercel qui protège la prod (ligne suivante).
  - **Push sur main** : job `test`, identique à la PR (avec l'upsert du compte admin sur le Supabase local), puis job `migration` : vérification des secrets et variables, `db push`, `config push` (bloc `[remotes.production]` de `config.toml`, activé par `SUPABASE_REMOTES_PRODUCTION_PROJECT_ID`) et upsert du compte admin. Les Deployment Checks de Vercel attendent ces deux jobs avant de promouvoir en prod.
  - **Ordre build et migration** : les Deployment Checks retardent la mise en ligne, pas le build. Le build de prod, comme celui des previews, tourne donc avant la migration, sur l'ancien schéma. Une migration doit fonctionner avec le code en ligne comme avec le nouveau. Le blog tolère l'absence de la table `articles` (premier déploiement de la phase 2) : il s'affiche vide et le build le signale. Toute autre erreur de lecture fait échouer le build.
  - **Planifié** (phase 2) : une lecture légère quotidienne pour éviter la pause du projet Free. Le workflow `keep-alive` lit `articles` en REST avec la clé publishable, et échoue sur une réponse hors 2xx.
- **Tests** :
  - unitaires : slug, temps de lecture, validation de publication, détection des `[NEED]`, formats de date ;
  - base (pgTAP, `supabase test db`) : complétude d'un article publié, slug figé après publication, brouillon invisible pour le public ;
  - Playwright, 3 parcours : réserver jusqu'à l'affichage de l'agenda, se connecter par lien magique (via l'API Mailpit), publier puis dépublier.

---

## Phase 1 : Fast landing

**User stories** : US-1 à US-9, US-27

### Ce qu'on livre

La landing complète, la réservation Cal.com, les pages annexes et la mesure, sur un squelette déployé automatiquement. La CI/CD est en place dès la première tranche. La phase est livrée en une seule PR, avec un commit par tranche, puis promue en prod (domaine provisoire, noindex) une fois verte.

#### Tranche 1.1 : squelette déployé et CI/CD complète

On livre une page d'accueil minimale aux tokens du design system (polices, couleurs, focus), déployée par toute la chaîne. Une migration initiale vide prouve le passage `db push` en prod, sans que le poste local y accède.

- [ ] Une PR lance lint, typecheck, tests unitaires, Supabase local, build et un smoke test Playwright.
- [ ] Un merge sur main enchaîne `test` puis `migration`, et Vercel ne promeut la prod qu'une fois les deux jobs verts. *Amendé le 2026-11-12 :* main n'est pas protégée (GitHub Free, repo privé) ; la prod reste protégée par les Deployment Checks de Vercel.
- [ ] Une migration en échec laisse la prod précédente en ligne : on vérifie que les checks `test` et `migration` sont sélectionnés dans les Deployment Checks, sans démonstration réelle.
- [ ] Les previews et la prod de test portent `noindex`.
- [ ] Aucun secret n'est dans le repo ni sur Vercel.

#### Tranche 1.2 : landing (US-1, US-2, US-3)

On livre :
- les 10 sections dans l'ordre de la copy finale, avec le header sans menu et le footer ;
- la planche devis → facture → relance ;
- les CTA, avec l'avatar, dans le header, le hero, après les process, après l'engagement et en fin de page ;
- le bouton fixe sur mobile.

Ne sont pas rendus : les mini-cas, la citation « prospects chauds », et la phrase de capacité si le mois est vide ou passé.

- [ ] Le texte affiché est identique, mot pour mot, à la copy finale. La ponctuation des titres suit DESIGN.md § 4, et aucune indication de mise en page n'est affichée.
- [ ] Sur mobile, le bouton fixe apparaît quand le CTA du hero sort de l'écran et disparaît quand `#rdv` entre. Une fois caché, il est `inert`.
- [ ] La garde `[NEED]` est testée : la construction échoue si le site est indexable et qu'il reste un `[NEED]`.
- [ ] La page se parcourt au clavier, avec un focus toujours visible.

#### Tranche 1.3 : réservation (US-4, US-5, US-6)

On livre :
- l'agenda Cal.com intégré dans `#rdv` sur desktop ;
- sur mobile, chaque CTA ouvre un dialog plein écran (bouton « Fermer », Échap ferme, focus piégé puis rendu au bouton d'origine) ;
- le lien de secours vers un nouvel onglet et la phrase sans créneau avec l'email de contact ;
- la page `/merci`, avec un header réduit au logo et en noindex.

- [ ] Playwright : un clic sur un CTA affiche l'agenda, sur desktop et sur mobile. L'embed Cal.com y est simulé ; le vrai agenda se vérifie à la main sur la preview.
- [ ] Une réservation de test, intégrée ou par le lien de secours, arrive sur `/merci`.
- [ ] Dans Cal.com : les créneaux tombent dans les 48 à 72 h, les champs obligatoires et facultatifs sont conformes, le lien de visio est dans la confirmation, les rappels sont actifs, et la mention RGPD renvoie vers `/confidentialite`.

#### Tranche 1.4 : pages annexes et partage (US-7, US-8, US-9)

On livre :
- `/mentions-legales` et `/confidentialite`, en Markdown dans le repo, rendues avec la prose ;
- la 404 avec l'escalier du logo et un lien vers l'accueil (« Lire le carnet » arrive en phase 2) ;
- l'image de partage 1200 × 630 (photo d'Aymen, logo, titre de partage, « Aymen Jouini · fondateur ») ;
- les métadonnées de la copy et les données `Organization` ;
- le sitemap avec `/`, et robots.

- [ ] L'inspecteur de publication de LinkedIn affiche le titre, la description et l'image 1200 × 630.
- [ ] Une adresse inexistante renvoie la 404 avec ses liens.
- [ ] Lighthouse sur mobile donne au moins 95 sur les 4 axes pour la landing.

#### Tranche 1.5 : mesure (US-27)

On livre Vercel Web Analytics hors admin, `cta_click` avec sa position sur chaque bouton de réservation, `reservation_confirmee` sur `/merci`, et les UTM des liens.

- [ ] Aucun bandeau cookies ne s'affiche.
- [ ] Les visites et les vues de `/merci` remontent en Hobby.
- [ ] Un test vérifie que chaque CTA émet sa position, et qu'une réservation n'émet `reservation_confirmee` qu'une fois, même si l'on recharge `/merci`.

### Critères d'acceptation (mise en ligne de la landing)

- [ ] Toutes les informations `[NEED]` sont fournies, et la garde est verte une fois le site indexable.
- [ ] Vercel passe en **Pro**, le domaine définitif est branché et le drapeau d'indexation est activé.
- [ ] Une réservation complète aboutit à `/merci` depuis l'app LinkedIn, sur iPhone puis sur Android.
- [ ] Cal.com : les rappels SMS partent, le créneau choisi est en corail et la redirection vers `/merci` fonctionne.
- [ ] En Pro, une réservation de test donne 1 seul `reservation_confirmee`, et chaque CTA est compté avec sa position.
- [ ] À trancher : le panneau UTM demande l'option Web Analytics Plus. Sans elle, le critère « visite avec UTM attribuée à la bonne source » du PRD est à amender.

## Bloquée par

Aucune : démarrable immédiatement. À l'intérieur de la phase :
- 1.2 et 1.4 dépendent de 1.1 ;
- 1.3 dépend de 1.2 ;
- 1.5 dépend de 1.3.

---

## Phase 2 : Fast blog

**User stories** : US-10 à US-26

### Ce qu'on livre

Le blog public, lu en base, avec son SEO technique, puis l'admin : connexion par lien magique, éditeur Markdown avec aperçu exact, images, publication. Tout passe par les migrations de la CI.

#### Tranche 2.1 : blog public lu en base (US-10 à US-15)

On livre :
- la migration `articles` (enums, contraintes, RLS) et le bucket, avec un seed local d'articles ;
- `/blog` en grille, du plus récent au plus ancien, avec un état vide soigné ;
- `/blog/<slug>` : en-tête, ligne méta, couverture, corps rendu par le moteur Markdown commun, et CTA de fin d'article ;
- pour chaque article : canonical, titre « titre SEO — Crescendo », meta description, aperçu de partage (couverture) et `BlogPosting` ;
- le sitemap avec les articles publiés ;
- le lien « Le carnet » dans le footer et « Lire le carnet » sur la 404 ;
- le workflow planifié qui garde le projet actif.

- [ ] Un brouillon et un slug inconnu renvoient la 404.
- [ ] Le sitemap ne contient aucun brouillon.
- [ ] Les liens de réservation du blog portent `utm_medium` nav ou article-cta, et le slug, avant `#rdv`.
- [ ] Un article du seed passe l'outil de test des résultats enrichis sans erreur.
- [ ] Lighthouse sur mobile donne au moins 95 sur les 4 axes pour `/blog` et pour un article.

#### Tranche 2.2 : connexion admin (US-16, US-17, US-18)

On livre :
- la config Auth poussée par la CI : SMTP Resend, template, 1 h, 60 s, inscriptions désactivées (`config push` ajouté au job `migration`) ;
- l'upsert du compte admin depuis le secret, dans le même job ;
- `/admin/connexion` avec le même message pour toutes les adresses et le compte à rebours de 60 s ;
- `/admin/connexion/confirmer` avec le bouton « Se connecter », et « Ce lien n'est plus valable. » avec « Recevoir un nouveau lien » ;
- une session de 7 jours, « Se déconnecter » sur toutes les pages, et la redirection vers la connexion sans session.

- [ ] Playwright : la demande de lien, la lecture dans Mailpit, le clic « Se connecter » et l'arrivée sur `/admin` passent.
- [ ] Un lien déjà utilisé ou expiré affiche le message d'invalidité.
- [ ] Une adresse non autorisée ne reçoit rien et voit le même message.
- [ ] Un appel direct à l'API Auth avec une autre adresse ne crée aucun compte.

#### Tranche 2.3 : liste et éditeur, brouillon (US-19, US-20, US-22, US-23, US-24)

On livre :
- la liste en tableau, triée par dernière modification, avec un état vide et « Nouvel article » ;
- l'éditeur avec ses métadonnées : titre, chapô, catégorie ;
- le panneau SEO :
  - compteurs, avertissements non bloquants au-delà de 60 et de 155 caractères ;
  - slug généré, refus d'un format invalide ou d'un slug pris, avec le nom de l'article concerné ;
- le Markdown à gauche et l'aperçu au rendu exact à droite ;
- « Enregistrer » et Cmd/Ctrl + S ;
- l'avertissement en quittant l'éditeur sans enregistrer ;
- le message d'échec, avec le texte gardé dans l'éditeur.

- [ ] L'aperçu est identique au rendu de `/blog/<slug>`, puisque c'est le même moteur.
- [ ] Un enregistrement en échec, simulé, garde le texte et affiche le message.
- [ ] L'admin se parcourt au clavier.

#### Tranche 2.4 : images (US-21)

On livre :
- la couverture : zone de dépôt, aperçu en 16:10 et texte alternatif obligatoire ;
- « Ajouter une image » : un dialog avec le fichier, l'aperçu et le texte alternatif obligatoire, et une insertion au curseur ;
- les formats JPEG, PNG et WebP, 5 Mo au plus, contrôlés côté client et par le bucket.

- [ ] Un fichier trop lourd ou au mauvais format affiche « Format accepté : JPEG, PNG ou WebP, 5 Mo au plus. ».
- [ ] Une image sans texte alternatif n'est pas insérée.

#### Tranche 2.5 : publier, mettre à jour, dépublier, supprimer (US-25, US-26)

On livre :
- « Publier », qui liste ce qui manque, et rien n'est publié si un élément manque ;
- « Mettre à jour » et « Voir en ligne » ;
- « Dépublier », qui repasse l'article en brouillon et garde la date de première publication ;
- « Supprimer », avec une confirmation, qui supprime aussi les images ;
- le slug figé avec sa mention ;
- l'invalidation de la liste, de l'article et du sitemap.

- [ ] Playwright : publier fait apparaître l'article sur `/blog` et dans le sitemap. Dépublier le fait passer en 404 et le retire des deux.
- [ ] Le changement est visible en moins d'une minute, sans redéploiement.
- [ ] Après la première publication, le slug ne peut plus changer, ni dans l'UI ni en base.

### Critères d'acceptation (mise en ligne du blog)

- [ ] En prod, le lien magique arrive par Resend en moins d'une minute dans la boîte du consultant. Il est testé avec sa messagerie réelle et fonctionne une seule fois.
- [ ] De « Nouvel article » à l'article en ligne, le consultant n'intervient ni dans le code ni dans un redéploiement.
- [ ] La propriété Search Console est déclarée et le sitemap soumis.
- [ ] Le workflow qui garde le projet actif tourne chaque jour sans erreur.

## Bloquée par

- Phase 1, tranches 1.1 (chaîne CI/CD) et 1.4 (sitemap, 404, robots).
- À l'intérieur de la phase :
  - 2.2 ne dépend que de 1.1 et peut se faire en parallèle de 2.1 ;
  - 2.3 dépend de 2.1 et de 2.2 ;
  - 2.4 dépend de 2.3 ;
  - 2.5 dépend de 2.4.
