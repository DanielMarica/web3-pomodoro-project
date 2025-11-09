export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('Ce navigateur ne supporte pas les notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title: string, body: string): void => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    });
  }
};

export const notifyWorkComplete = (): void => {
  showNotification('🎉 Pomodoro terminé !', 'Bravo ! Temps de faire une pause.');
};

export const notifyBreakComplete = (): void => {
  showNotification('⚡ Pause terminée !', 'C\'est reparti pour un nouveau cycle !');
};
