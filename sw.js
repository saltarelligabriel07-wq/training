const C='turno-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','manifest.json'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==location.origin&&!/^fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)&&!u.href.startsWith('https://www.gstatic.com/firebasejs/'))return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();if(r.ok||r.type==='opaque')caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('./'))))});
