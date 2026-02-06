import { useState, useEffect, useCallback } from 'react';

export function useNativeNotification() {
    const [permission, setPermission] = useState<NotificationPermission>('default');
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        if ('Notification' in window) {
            setIsSupported(true);
            setPermission(Notification.permission);
        }
    }, []);

    const requestPermission = useCallback(async () => {
        if (!isSupported) return 'denied';

        if (Notification.permission === 'granted') {
            setPermission('granted');
            return 'granted';
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return 'denied';
        }
    }, [isSupported]);

    const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
        if (!isSupported) {
            console.warn('Notifications not supported in this browser.');
            return null;
        }

        if (permission !== 'granted') {
            console.warn('Notification permission not granted.');
            // Optionally request permission here if appropriate, but usually better to have explicit request
            return null;
        }

        try {
            const notification = new Notification(title, options);
            return notification;
        } catch (e) {
            console.error("Failed to crate notification", e);
            return null;
        }

    }, [isSupported, permission]);

    return {
        permission,
        requestPermission,
        sendNotification,
        isSupported,
    };
}
