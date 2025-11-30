import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const action = event.action;
    let url = '/';

    if (action === 'mark-yes') {
        url = '/?action=mark-yes';
    } else if (action === 'mark-no') {
        url = '/?action=mark-no';
    } else {
        url = '/';
    }

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if there is already a window/tab open with the target URL
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url.includes(url) && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, open a new window
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
