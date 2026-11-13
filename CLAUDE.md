# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site de Crescendo, agence IA et automatisation pour PME : d'abord la landing (réservation d'un appel via Cal.com), puis le blog et son espace admin. Stack : Next.js (App Router), Tailwind v4, Supabase, Vercel. Architecture complète dans `docs/PLAN.md`, section « Décisions architecturales ». Le repo ne contient encore que la documentation : le code arrive avec la tranche 1.1.

## Sources de vérité

Lis le fichier concerné avant d'agir. Ce CLAUDE.md n'en recopie rien.

- `docs/PRD.md` : ce qu'on construit et les critères d'acceptation.
- `docs/PLAN.md` : l'ordre des phases. On travaille une phase à la fois.
- `docs/DESIGN.md` : couleurs, typo, composants. Chaque écran le respecte.
- `.agents/product-marketing.md` : le positionnement.
- `.agents/landing/03-offer.md` : l'offre.
- `.agents/landing/07-copy-final.md` : le texte de la landing.

En cas d'écart, le périmètre suit le PRD, le texte suit `07-copy-final.md` et la forme suit DESIGN.md.

## Texte de la landing

- Il se reprend mot pour mot depuis `07-copy-final.md`. Seules exceptions : la ponctuation des titres (DESIGN.md § 4) et les indications `[Visuel : …]` et `[Mise en page : …]`, qui ne s'affichent pas.
- Un `[NEED: …]` reste un manque explicite. Ne le remplace jamais par une invention.
- Pour changer un texte, modifie d'abord `07-copy-final.md`, puis reporte le changement dans le module de contenu de la landing (`docs/PLAN.md`, « Contenu de la landing »).
