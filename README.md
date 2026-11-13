# 🚀 crescendo – Points de départ des lives

Récupère le projet au début de chaque live et crée ta propre copie sur ton GitHub.

## ▶️ Session en cours : #v1.0.0 – Version une de Crescendo

```bash
npx degit aymenjo/crescendo-starters#v1.0.0 mon-projet
```

Ensuite :

1. **Installe** : `cd mon-projet && npm install`
2. **Mets-le sur ton GitHub** :

```bash
git init && git add . && git commit -m "Départ session v1.0.0"
gh repo create mon-projet --private --source=. --push
```

> Première fois ? Installe [GitHub CLI](https://cli.github.com) puis connecte-toi avec `gh auth login`.

## 📚 Toutes les sessions

| Session | Thème |
|---|---|
| #v-marketing-files | prêt pour cadrage |
| #v-design | prêt pour le plan et le prd |
| #v-design-unslop | prêt pour le plan et le prd |
| #v-prd-plan | prêt pour dev |
| #v1.0.0 | Version une de Crescendo |

Pour une autre session, remplace `v1.0.0` par son code dans la commande.
