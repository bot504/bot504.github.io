/* بيخلّي الصفحة تفتح فورًا وحتى من غير نت، وبيجيب آخر نسخة كل مرة فيه نت */
var V='km-202611260953';
var CORE=['./','index.html','manifest.webmanifest','img/avatar.webp','img/cardbg.webp','img/bg.webp','img/icon-192.png','img/fav.png','img/sp1.webp','img/sp2.webp'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE.map(function(u){return new Request(u,{cache:'reload'})}))}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  if(u.pathname.endsWith('version.json'))return; /* دايمًا من النت */
  if(r.mode==='navigate'){ /* الصفحة: من النت الأول (من غير كاش المتصفح)، ومن الكاش لو مفيش نت */
    e.respondWith(fetch(r,{cache:'no-cache'}).then(function(res){var c=res.clone();caches.open(V).then(function(k){k.put('index.html',c)});return res}).catch(function(){return caches.match('index.html')}));return}
  e.respondWith(caches.match(r).then(function(hit){var net=fetch(r).then(function(res){if(res.ok){var c=res.clone();caches.open(V).then(function(k){k.put(r,c)})}return res});return hit||net}));
});
