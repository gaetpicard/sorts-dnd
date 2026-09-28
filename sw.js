/* Service worker de « Sorts D&D 5e — hors ligne ».
 *
 * Rôle : copier les fichiers de l'app dans un cache du navigateur à la
 * première visite, puis servir cette copie. Une fois installée, l'app
 * s'ouvre sans réseau, en avion, dans une cave ou au fond d'une vallée.
 *
 * MISE À JOUR : après chaque modification de index.html, changez le numéro
 * de VERSION ci-dessous. Sans ça, les téléphones déjà passés sur le site
 * continueront d'afficher l'ancienne version, indéfiniment.
 */

var VERSION = 'sorts-dnd-v1';

var FICHIERS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icone-192.png',
  './icone-512.png',
  './icone-512-maskable.png'
];

// Installation : on remplit le cache, puis on prend la main sans attendre
// la fermeture des onglets ouverts.
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (cache) {
      return cache.addAll(FICHIERS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

// Activation : on jette les caches des versions précédentes.
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (cles) {
      return Promise.all(cles.map(function (c) {
        return c === VERSION ? null : caches.delete(c);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// Lecture : le cache d'abord (instantané et hors ligne), le réseau ensuite,
// et la réponse du réseau est rangée au passage.
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(function (enCache) {
      if (enCache) return enCache;

      return fetch(e.request).then(function (reponse) {
        if (reponse && reponse.status === 200 && reponse.type === 'basic') {
          var copie = reponse.clone();
          caches.open(VERSION).then(function (cache) {
            cache.put(e.request, copie);
          });
        }
        return reponse;
      }).catch(function () {
        // Hors ligne et rien en cache : pour une navigation, on renvoie
        // la page d'accueil plutôt que l'écran de dinosaure.
        if (e.request.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 504, statusText: 'Hors ligne' });
      });
    })
  );
});
