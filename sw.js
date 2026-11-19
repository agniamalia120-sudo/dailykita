/* Service worker Diary Kita */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow('./');
    })
  );
});

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) {}
  const n = d.notification || d;
  e.waitUntil(self.registration.showNotification(n.title || 'Diary Kita', {
    body: n.body || '',
    requireInteraction: true
  }));
});
