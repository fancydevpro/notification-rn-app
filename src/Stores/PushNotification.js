import PushNotification from 'react-native-push-notification'
import moment from 'moment'

import Constants from '../global/Constants'

const DEFAULT_DETAILS = {
  // Android
  autoCancel: true,
  vibrate: true,
  vibration: 300,
  ongoing: false,

  // iOS
  alertAction: 'Slide to open',

  // iOS & Android
  playSound: true,
  soundName: 'default',
}

export default class PushNotificationStore {
  constructor(getStores) {
    this.getStores = getStores
  }

  configureNotification() {
    PushNotification.configure({
      onRegister: token => {
      },
      onNotification: notification => {
      },
      onError: error => {
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    })
  }

  addNotification(name, date, message, repeat = false, repeatType = null, repeatTime = null) {
    const dateMoment = moment(date)
    PushNotification.cancelLocalNotifications({ id: name })

    if (dateMoment.isAfter(moment())) {
      PushNotification.localNotificationSchedule({
        ...DEFAULT_DETAILS,
        // Android
        id: name,
        // iOS
        userInfo: { id: name },
        // Android & iOS
        title: 'Alarm',
        message,
        date: new Date(dateMoment.valueOf()),
        repeatType: repeat ? repeatType : null,
        repeatTime: repeat ? repeatTime : null,
      })
    }
  }
}