# 📦 Kit Claude Code — Site Carlos Hounsinou

> **Bienvenue !** Ce kit contient tout ce dont Claude Code a besoin pour construire ton site `carloshounsinou.com`.

---

## 📂 Contenu du kit

| Fichier | Rôle |
|---------|------|
| `BRIEF.md` | Cahier des charges complet (architecture, design system, contraintes techniques) |
| `CONTENU.md` | Tous les textes du site en FR et EN, organisés par section |
| `PROMPTS.md` | Les 4 prompts séquentiels à copier-coller dans Claude Code |
| `maquette-reference.html` | La maquette HTML cible pour la référence visuelle |
| `README.md` | Ce fichier |

---

## 🚀 Démarrage rapide

### 1. Préparer ton dossier de projet

```bash
# Créer le dossier
mkdir -p ~/Sites/carloshounsinou
cd ~/Sites/carloshounsinou

# Copier le contenu de ce kit dans ce dossier
# (BRIEF.md, CONTENU.md, PROMPTS.md, maquette-reference.html)

# Vérifier
ls -la
```

### 2. Lancer Claude Code

```bash
claude
```

### 3. Ouvrir `PROMPTS.md` et suivre les sessions dans l'ordre

- Session 1 → Bootstrapping (~15 min)
- Session 2 → Composants visuels (~45 min)
- Session 3 → Formulaire + SEO (~30 min)
- Session 4 → Déploiement Vercel + DNS (~20 min)

**⚠️ IMPORTANT** : Ne pas enchaîner les sessions sans tester. Entre chaque session, vérifie que tout marche, fais un git commit, puis passe à la suivante.

---

## 🎯 Conseils stratégiques

1. **Une session = un objectif clair**. Si Claude Code part en vrille, ferme la session et relance avec `/clear`.

2. **Toujours commit avant de tester en grand**. Un `git commit` après chaque session te permet de revenir en arrière si besoin.

3. **Test sur mobile dès la session 2**. Beaucoup de bugs CSS apparaissent uniquement en responsive.

4. **Garde une longueur d'avance sur les comptes externes** :
   - Compte Resend créé avant la session 3
   - Compte Vercel lié à GitHub avant la session 4
   - Accès au panneau DNS de ton registrar avant la session 4

5. **Si quelque chose ne te plaît pas visuellement** : demande à Claude Code de le modifier en référence à la maquette HTML. Exemple : *« Compare ton Hero avec celui de la maquette ligne 800-900. Le portrait modulaire n'a pas le bon cadre doré. Corrige. »*

---

## 🆘 Support

Si tu rencontres un blocage que Claude Code n'arrive pas à résoudre, reviens me voir avec :
- L'étape où tu es bloqué
- Le message d'erreur complet
- Ce que Claude Code a tenté

On débuggera ensemble.

---

**Bonne construction ! 🛠️**

— Préparé en mai 2026 par Claude
