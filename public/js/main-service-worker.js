const CACHE_NAME = 'Version 0.1';
const PREFETCHED_ASSETS = [
    
];

// Event fires if this is the first time the ServiceWorker has been
// downloaded, or when there's an updated ServiceWorker
self.addEventListener('install', event => {
    console.log('Main ServiceWorker has been installed');
});

self.addEventListener('activate', event => {
    console.log('Main ServiceWorker has been activated');

    // delete old caches
    event.waitUntil(caches.keys().then(async cacheNames => {        
        return Promise.all(cacheNames.map(name => {
            if(name !== CACHE_NAME) {
                console.log(`Deleting the Cache: ${name}`);
                return caches.delete(name);
            }
        }));
    }));
})

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            // if the network is available, use the online resource
            // and store it inside a cache
            .then(async response => {
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone());
                });

                return response;
            })
            // if the network is down, the catch handler will trigger 
            // and use a cached version of the requested resource
            .catch(async () => {
                return caches.match(event.request);
            })
    );
})