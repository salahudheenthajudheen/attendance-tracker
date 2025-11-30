import React, { useEffect } from 'react';

const NotificationScheduler = () => {
    useEffect(() => {
        // Request permission on mount
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        const checkTime = () => {
            const now = new Date();
            // Check if it's 5:30 PM (17:30)
            // We check if it's within the minute of 17:30 to avoid double firing, 
            // but we need a state to ensure we only fire once per day.
            // For simplicity in this MVP, we'll check if hours=17 and minutes=30 and seconds < 10
            if (now.getHours() === 17 && now.getMinutes() === 30 && now.getSeconds() < 10) {
                showNotification();
            }
        };

        const showNotification = async () => {
            if (Notification.permission === 'granted') {
                const registration = await navigator.serviceWorker.ready;
                registration.showNotification("Time to mark attendance!", {
                    body: "Did you attend all your classes today?",
                    icon: "/pwa-192x192.png",
                    vibrate: [200, 100, 200],
                    tag: 'daily-attendance', // Prevents duplicate notifications
                    actions: [
                        { action: 'mark-all', title: 'All Present' },
                        { action: 'mark-not-all', title: 'Not All' },
                        { action: 'mark-not', title: 'Not Present' }
                    ]
                });
            }
        };

        // Check every 10 seconds
        const interval = setInterval(checkTime, 10000);
        return () => clearInterval(interval);
    }, []);

    return null; // This component doesn't render anything
};

export default NotificationScheduler;
