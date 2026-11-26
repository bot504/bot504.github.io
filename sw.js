/* بيخلّي الصفحة تفتح فورًا وحتى من غير نت. غيّر الرقم ده مع كل تحديث كبير */
var V='km-v1';
var CORE=['./','index.html','manifest.webmanifest','img/avatar.webp','img/cardbg.webp','img/bg.webp','img/icon-192.png','img/fav.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  if(r.mode==='navigate'){ /* الصفحة: من النت الأول عشان التحديث، ومن الكاش لو مفيش نت */
    e.respondWith(fetch(r).then(function(res){var c=res.clone();caches.open(V).then(function(k){k.put('index.html',c)});return res}).catch(function(){return caches.match('index.html')}));return}
  e.respondWith(caches.match(r).then(function(hit){return hit||fetch(r).then(function(res){var c=res.clone();caches.open(V).then(function(k){k.put(r,c)});return res})}));
});
