# Contrat de style — diagrammes d'architecture

Ce document fige le style visuel des artefacts produits par la compétence
`diagramme-architecture`. L'objectif : des schémas **pro, épurés, cohérents**, lisibles
en clair comme en sombre. `modele.html` en est l'implémentation de référence.

## 1. Structure de la page

- Page HTML autonome (pas de `<!doctype>`/`<head>`/`<body>` propres si publiée comme
  artefact — le squelette est ajouté à la publication ; en fichier de repo, la page
  fonctionne telle quelle dans un navigateur).
- **En-tête sobre** (`.masthead`) : petit surtitre en capitales, titre en serif, une
  ligne de description. **Pas** de grand bloc dégradé plein écran.
- **Onglets** (`role="tablist"` + boutons `role="tab"`) commutant des `section
  role="tabpanel"`. Navigation clavier ←/→. Bouton de bascule de thème `◐`.
- Onglets par défaut : Fonctionnelle · Parcours · Technique · Modèle de données ·
  Garanties (retirer/ajouter selon le projet).

## 2. Typographie

- Police via Google Fonts : **Manrope** (corps, 400–800) + **Fraunces** (titres, italique
  pour accents). Toujours une pile de repli (`"Manrope","Helvetica Neue",Arial`).

## 3. Palette (variables CSS `:root`)

Neutres à légère dominante froide + bleu de marque, or, vert, teal. Redéfinir les tokens
sous `@media (prefers-color-scheme: dark)` (gardé `:root:not([data-theme="light"])`) et
sous `:root[data-theme="dark"]`. `body` a un fond explicite.

| Rôle | Clair | Usage |
|------|-------|-------|
| `--blue` | `#2f6bd6` | marque, flux principal, en-têtes |
| `--gold` | `#c9922e` | accent, cadre « plateforme », parcours utilisateur |
| `--green` | `#1c9c66` | badges numérotés, succès/garanties |
| `--live` | `#0e9aa0` | connexions **temps réel** |
| `--muted` | `#5c6c82` | texte secondaire, flèches |
| `--line` | `#d7e1f0` | bordures |
| `--card` | `#ffffff` | fond des boîtes |

Chaque couleur a une variante `2` plus claire pour les dégradés (`--blue2`, etc.).

## 4. Conventions SVG (le cœur)

- `viewBox="0 0 W H"`, `role="img"`, `aria-label` décrivant le schéma. `<figure>` +
  `<figcaption>`. Largeur mini via CSS (`svg{min-width:1000px}`) + conteneur
  `.scroll{overflow-x:auto}`.
- **Markers partagés** (définis une fois dans un `<svg>` caché en tête de page) :
  `#mArrow` (muted), `#mLive` (teal), `#mRel` (bleu relations). Dégradés partagés :
  `#gBlue`, `#gGreen`, `#gLive`, `#gGold`.
- **Boîtes** : `rect.card` (ombre douce via `filter:drop-shadow`) ou `rect.panel`
  (fond `--panel`). En-tête coloré optionnel = deux `rect` (`.hdr` arrondi haut +
  bande carrée) pour un bandeau à coins hauts arrondis.
- **Conteneur « plateforme »** : `rect.box` (cadre or, fond très léger).
- **Badges numérotés** : `circle` rempli d'un dégradé (`url(#gGreen)` par défaut ;
  `url(#gBlue)` / `url(#gGold)` pour distinguer des parcours) + `text.btxt` centré.
  Placés au coin haut-gauche des boîtes **ou** sur les flèches.
- **Texte** : `.t` (titre gras), `.m` (muted), `.i` (item). Libellés de flèches `.lbl`
  avec **halo** (`paint-order:stroke; stroke:var(--halo)`) pour rester lisibles sur les
  traits.

## 5. Flèches (routage) — règle stricte

- **Orthogonales uniquement** : commandes `H`/`V` (jamais de diagonale libre).
  `stroke-linejoin:round; stroke-linecap:round` pour adoucir les coins.
- Trois styles sémantiques :
  - `.flow` (muted) — flux / publication.
  - `.live` (teal, marker `#mLive`) — temps réel / notifications.
  - `.dash` (pointillé) — automatisation / contrôle (crons, supervision).
  - `.rel` (bleu, marker `#mRel`) — relations de données (clés étrangères).
- **Étiqueter** chaque flèche non triviale (`writes`, `valide`, `notifie`, `rappels J-1`…).
- **Pas de croisements en diagonale** ni de longs « swoops » traversant le schéma :
  regrouper les acteurs proches, router dans des gouttières dédiées.
- **Légende** (`.legend`) rappelant les styles de traits quand ils se répètent.

## 6. Parcours = diagramme, jamais liste

Un parcours est une **suite de boîtes reliées par des flèches** (disposition en
serpentin : rangée 1 gauche→droite, descente, rangée 2 droite→gauche). Badge numéroté +
icône + titre + 2 lignes par étape. Couleur de badge dédiée par rôle (ex. bleu = admin,
or = utilisateur).

## 7. Tableau descriptif

Sous le schéma fonctionnel, un tableau numéroté (`.rows`/`.row`/`.num`/`.rtxt`, 2 colonnes)
reprend chaque élément avec une phrase complète. C'est là que va le **détail**, pas dans
les boîtes.

## 8. Garanties / réponses partenaires

Grille de cartes « inquiétude → mécanisme » (question en italique + réponse concrète +
pastille « ✓ Couvert »), éventuellement précédée de 1-2 mini-schémas SVG (ex. isolation
multi-tenant, montée en charge). Répondre par un **choix d'architecture**, pas une promesse.

## 9. À éviter (retours utilisateur passés)

- Gros bloc d'en-tête coloré → **trop chargé**. Rester sobre.
- Boîtes bourrées de 7-9 puces → **trop dense**. Titre + 2-4 lignes, le reste au tableau.
- Flèches diagonales qui se croisent → **illisible**. Orthogonales + gouttières.
- Parcours en simple liste à puces → **non**. Toujours en diagramme.
