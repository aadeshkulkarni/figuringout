self.addEventListener('push', function (event) {
    if (event.data) {
     const data = event.data.json();
     const { title, body, primaryKey, badge, url } = data;
     const options = {
      body,
      icon: '/logo.svg',
      badge: badge || '/logo.svg',
      vibrate: [100, 50, 100],
      data: {
       dateOfArrival: Date.now(),
       primaryKey,
       url,
      },
     };
     event.waitUntil(self.registration.showNotification(title, options));
    }
   });
   
   self.addEventListener('notificationclick', function (event) {
    const data = event.notification.data;
    const { url } = data;
    event.notification.close();
   
    if (url) {
     event.waitUntil(clients.openWindow(url));
    }
   });