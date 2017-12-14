const cacheName = 'news-v1'
const staticAssets = [
    './',
    './style.css',
    './app.js'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event=> {
    const req = event.request;
    const url = new URL(req.url);
    if(url.origin == location.origin){
    event.respondWith(cacheFirst(req));
    }else{
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req){
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}

async function newworkFirst(req){
    const cache = await caches.open('news-dynamic');
    try{
        const res = await fetch(req);
        cache.put(req,res.clone());
        return res;
    }catch(Error){
        return await cache.match(req);
    }
}


