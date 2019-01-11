import PushNotificationStore from './PushNotification'
import EventTimesStore from './EventTimes'

let globalStore

class GlobalStore {
  constructor() {
    this.getStores = this.getStores.bind(this)
    this.pushnotificationStore = new PushNotificationStore(this.getStores)
    this.eventtimesStore = new EventTimesStore(this.getStores)
  }

  fetch() {
    try {
      const stores = this.getStores()
      const promiseList = Object.keys(stores).reduce((all, store) => {
        if (store.fetch) all.push(store.fetch)
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
