---
name: diagramme-architecture
description: >-
  Génère une présentation d'architecture interactive (page HTML autonome, artefact
  partageable) pour une plateforme ou un projet : schémas fonctionnels, parcours
  utilisateur/admin, architecture technique, modèle de données et garanties partenaires.
  Style pro, épuré, bilingue FR/EN, thème clair/sombre. À utiliser quand on demande un
  « diagramme d'architecture », un « schéma fonctionnel », une « présentation d'archi »,
  un « parcours utilisateur en diagramme », un support pour rassurer des partenaires
  (fiabilité, sécurité, RGPD, montée en charge, duplicabilité, hébergement), ou de
  reproduire « le style des diagrammes Les Déterminés » pour un autre projet. Enregistre
  systématiquement le résultat dans la section `artifacts/` du repo et l'inscrit au
  registre pour la traçabilité.
---

# Diagramme d'architecture — générateur d'artefacts

Cette compétence produit une **page HTML unique, autonome et partageable** (artefact
Claude) qui présente l'architecture d'une plateforme sous forme de **schémas SVG
dessinés à la main** (boîtes + flèches étiquetées), et non de simples listes.

Elle est **réutilisable pour n'importe quel projet** : on décrit la plateforme, la
compétence adapte le contenu en gardant le même style.

## Quand l'utiliser

Déclencher dès qu'on demande, pour un projet quelconque :
- un diagramme / schéma **fonctionnel** de bout en bout ;
- un **parcours** utilisateur et/ou admin **en diagramme** ;
- une **architecture technique** (hébergement, services) ;
- un **modèle de données** ;
- une section **garanties / réponses** pour rassurer des partenaires ;
- « le même style que les diagrammes Les Déterminés » pour une autre plateforme.

## Étapes à suivre

1. **Cadrer** (2-3 questions max si besoin) : nom du projet, stack technique, rôles
   d'utilisateurs, hébergement/région, et quels onglets sont pertinents. Si l'info est
   déjà disponible (repo, brief), ne pas poser de question.
2. **Lire le modèle** : `reference/modele.html` (exemple complet « Les Déterminés ») et
   `reference/design-systeme.md` (contrat de style : palette, typographie, conventions
   SVG, routage des flèches). **Respecter ce contrat.**
3. **Générer** la page HTML en adaptant le contenu au projet. Onglets par défaut :
   `Fonctionnelle`, `Parcours`, `Technique`, `Modèle de données`, `Garanties`. On peut
   en retirer/ajouter selon le projet.
4. **Enregistrer dans le repo** (traçabilité — obligatoire) :
   - Écrire le fichier dans `artifacts/<slug-du-projet>/architecture.html`
     (slug en minuscules, tirets).
   - Ajouter/mettre à jour une ligne dans `artifacts/README.md` (le registre) :
     date, projet, chemin du fichier, lien de l'artefact publié, une phrase de résumé.
5. **Publier l'artefact** avec l'outil Artifact (même contenu que le fichier enregistré),
   récupérer le lien `claude.ai/artifact/...` et le reporter à l'utilisateur.
6. **Commit** sur une branche puis proposer une PR (ne pas pousser sur la branche par
   défaut sans accord). Message de commit clair, p. ex. `docs(artifacts): archi <projet>`.

## Règles de qualité (non négociables)

- **Schémas, pas listes.** Les parcours et le fonctionnel sont des **boîtes reliées par
  des flèches**. Les flèches sont **orthogonales**, **étiquetées**, et ne se croisent pas
  en diagonale.
- **Épuré mais décrit.** Chaque boîte décrit sa fonctionnalité (titre + 2-4 lignes max).
  Pas de mur de texte, pas de flou. Le détail complet va dans un **tableau descriptif
  numéroté** sous le schéma fonctionnel.
- **En-tête sobre** : pas de gros bloc coloré plein écran. Un titre + une ligne suffisent.
- **Autonome** : tout inline (CSS + SVG). Seules polices externes autorisées : Google
  Fonts. Aucune image externe.
- **Accessible** : `role="img"` + `aria-label` sur chaque `<svg>`, `<figure>` +
  `<figcaption>`, contrastes suffisants, navigation clavier des onglets.
- **Thème clair/sombre** géré par variables CSS (voir `reference/design-systeme.md`).
- **Bilingue FR/EN** si le projet le demande (sinon FR par défaut).

## Fichiers de la compétence

- `reference/design-systeme.md` — le contrat de style détaillé (à lire avant de générer).
- `reference/modele.html` — l'exemple de référence complet (« Les Déterminés »), à
  utiliser comme base et gabarit.

## Traçabilité

Chaque génération **laisse une trace** : un fichier versionné dans `artifacts/<projet>/`
et une ligne dans `artifacts/README.md`. Ne jamais produire un artefact « volatile »
sans l'enregistrer dans le repo.
