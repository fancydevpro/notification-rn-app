import PushNotificationStore from './PushNotification'
import EventTimesStore from './EventTimes'
import CalendarStore from './Calendar'

let globalStore

class GlobalStore {
  constructor() {
    this.getStores = this.getStores.bind(this)
    this.pushnotificationStore = new PushNotificationStore(this.getStores)
    this.eventtimesStore = new EventTimesStore(this.getStores)
    this.calendarStore = new CalendarStore(this.getStores)
  }

  fetch = async () => {
    try {
      const stores = this.getStores()
      const promiseList = Object.keys(stores).reduce((all, store) => {
        if (stores[store].fetch) all.push(stores[store].fetch())
        return all
      }, [])
      await Promise.all(promiseList)
    } catch (error) {
      throw error
    }
  }

  getStores() {
    return {
      PushNotification: this.pushnotificationStore,
      EventTimes: this.eventtimesStore,
      Calendar: this.calendarStore,
    }
  }
}

function initStore() {
  globalStore = new GlobalStore()
  globalStore.fetch()
}

function getGlobalStore() {
  return globalStore
}

function getStores() {
  return globalStore.getStores()
}

export {
  initStore,
  getGlobalStore,
  getStores,
}
