import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'Flashcards:notifications';
const NOTIFICATION_HOUR = 18;
const NOTIFICATION_MINUTES = 0;
const NOTIFICATION_REPEAT = 'day';

function getNotificationConfig() {
  return {
    title: 'Study your flashcard decks.',
    body: `Don't forget to study your flashcard decks today!`,
    android: {
      sound: false,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => JSON.parse(data))
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(NOTIFICATION_HOUR);
              tomorrow.setMinutes(NOTIFICATION_MINUTES);

              Notifications.scheduleLocalNotificationAsync(
                getNotificationConfig(),
                {
                  time: tomorrow,
                  repeat: NOTIFICATION_REPEAT,
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          });
      }
    });
}
