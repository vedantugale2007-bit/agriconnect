export function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support desktop notification');
    return Promise.resolve(false);
  }

  if (Notification.permission === 'granted') {
    return Promise.resolve(true);
  }

  if (Notification.permission !== 'denied') {
    return Notification.requestPermission().then((permission) => {
      return permission === 'granted';
    });
  }

  return Promise.resolve(false);
}

export function sendBrowserNotification(title: string, body: string, icon: string = '/favicon.ico') {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=100&auto=format&fit=crop&q=80',
      });
    } catch (e) {
      console.warn('Browser notification error:', e);
    }
  }
}
