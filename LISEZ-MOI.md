# Sorts D&D 5e — pack d'installation

## L'objectif

Transformer la page des sorts en **application installable** : une icône sur
l'écran d'accueil du téléphone, une ouverture en plein écran sans barre
d'adresse, et une consultation qui continue de fonctionner **sans réseau**,
une fois la page visitée une première fois.

Le fichier HTML seul, envoyé par WhatsApp, marche déjà hors ligne, mais il
n'a pas d'icône : une page ouverte depuis les téléchargements du téléphone
(`file://`) n'est pas éligible à l'installation, ni sur Android ni sur
iPhone. Pour l'icône, il faut une adresse en **https**. D'où ce pack :
vous déposez ces fichiers sur GitHub Pages (gratuit), vous envoyez le lien à
vos amis, et chacun installe l'app en deux touchers.

## Ce que contient le pack

| Fichier | Rôle |
| --- | --- |
| `index.html` | L'application complète : les 339 sorts, la recherche, les filtres, « Mes sorts ». Tout est dedans, y compris les données. |
| `manifest.webmanifest` | La carte d'identité de l'app : nom, icônes, couleurs, mode plein écran. C'est ce fichier qui rend l'installation possible. |
| `sw.js` | Le *service worker* : il copie l'app dans le navigateur à la première visite et la ressert ensuite, réseau ou pas. |
| `icone-192.png`, `icone-512.png` | L'icône affichée sur l'écran d'accueil. |
| `icone-512-maskable.png` | La même, avec de la marge : Android rogne les icônes en cercle ou en goutte selon le téléphone. |

Les six fichiers doivent rester **dans le même dossier**, à plat. Pas de
sous-dossier, sinon les chemins relatifs du manifeste et du cache cassent.

## Mise en ligne sur GitHub Pages

1. Sur github.com, créez un dépôt **public**, par exemple `sorts-dnd`.
2. Glissez-y les six fichiers du pack (bouton *Add file* → *Upload files*),
   puis validez (*Commit changes*).
3. Onglet **Settings** → **Pages** (colonne de gauche).
4. Dans *Build and deployment*, source : **Deploy from a branch**, branche
   `main`, dossier `/ (root)`. Enregistrez.
5. Attendez une à deux minutes. L'adresse s'affiche en haut de la page :
   `https://gaetpicard.github.io/sorts-dnd/`

C'est ce lien que vous envoyez par WhatsApp. Il fonctionne aussi bien sur
ordinateur.

## Installer l'app sur le téléphone

**Android (Chrome)** — ouvrir le lien, menu ⋮ → *Installer l'application*
(parfois *Ajouter à l'écran d'accueil*). Une bannière le propose souvent
d'elle-même après quelques secondes.

**iPhone (Safari)** — ouvrir le lien **dans Safari**, bouton Partager (le
carré avec la flèche) → *Sur l'écran d'accueil*. Apple ne propose pas
d'installation automatique, et ça ne marche pas depuis Chrome ou depuis le
navigateur intégré à WhatsApp : il faut d'abord faire *Ouvrir dans Safari*.

Après l'installation, ouvrez l'app une fois **avec du réseau** : c'est à ce
moment que le cache se remplit. Ensuite, elle s'ouvre partout.

## Mettre l'app à jour

Quand vous modifiez `index.html` :

1. Ouvrez `sw.js` et incrémentez la ligne
   `var VERSION = 'sorts-dnd-v1';` → `'sorts-dnd-v2'`, etc.
2. Renvoyez les deux fichiers sur GitHub.

Sans ce changement de numéro, les téléphones déjà venus sur le site
continueront d'afficher l'ancienne version depuis leur cache, sans limite de
temps. Avec, la nouvelle version est récupérée au prochain lancement.

## Ce qui reste local à chaque téléphone

« Mes sorts » est rangé dans le stockage du navigateur de l'appareil, pas sur
le serveur. Rien n'est partagé, rien ne remonte nulle part, et la liste est
perdue si l'on vide les données du navigateur ou si l'on désinstalle l'app.
Pour passer sa liste d'un appareil à l'autre, c'est le bouton **Exporter**
dans l'onglet « Mes sorts » : il produit un code à coller dans **Importer**
sur l'autre appareil.

## Contenu et licence

Les 339 sorts proviennent du **SRD 5.2.1**, publié par Wizards of the Coast
sous licence [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
Traduction française relevée sur [dd2024.fr](https://dd2024.fr/). La mention
de licence figure en pied de page de l'application : gardez-la, c'est la
condition de la redistribution.
