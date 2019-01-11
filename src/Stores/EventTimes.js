import moment from 'moment'
import {
  AsyncStorage,
} from 'react-native'


const NOTIFICATION_NAME_LIST_KEY = '@NotificationNames:'
const NOTIFICATION_KEY_PREFIX = '@Notification:'

export default class EventTimes {
  constructor(getStores) {
    this.getStores = getStores
  }

  notiDataMap = new Map()

  fetch = async () => {
    await this.loadAllNotificationData()
    //await this.removeOldNotificationData()
  }

  loadAllNotificationData = async () => {
    try {
      const nameList = JSON.parse(await AsyncStorage.getItem(NOTIFICATION_NAME_LIST_KEY))
      if (nameList && nameList.length) {
        const promiseList = nameList.map(name => this.loadNotificationData(name))
        await Promise.all(promiseList)
      }
    } catch (error) {
      throw error
    }
  }

  removeAllNotificationData = async () => {
    try {
      const nameList = Array.from(this.notiDataMap.keys())
      await AsyncStorage.setItem(NOTIFICATION_NAME_LIST_KEY, JSON.stringify([]))
      const promiseList = nameList.map(name => AsyncStorage.removeItem(NOTIFICATION_KEY_PREFIX + name))
      await Promise.all(promiseList)
      this.notiDataMap.clear()
    } catch {
      throw error
    }
  }

  removeOldNotificationData = async () => {
    try {
      const now = moment()
      const nameList = Array.from(this.notiDataMap.keys())
      const filteredList = nameList.filter(name => moment(this.notiDataMap.get(name).date).isSameOrBefore(now))
      const promiseList = filteredList.map(name => this.removeNotificationData(name))
      await Promise.all(promiseList)
      filteredList.forEach(name => this.notiDataMap.delete(name))
    } catch (error) {
      //console.log('error: ', error)
      throw error
    }
  }

  saveNotificationData = async (name, value) => {
    try {
      const nameList = Array.from(this.notiDataMap.keys())
      const idx = nameList.indexOf(name)
      if (idx === -1) nameList.push(name)
      await AsyncStorage.setItem(NOTIFICATION_NAME_LIST_KEY, JSON.stringify(nameList))
      await AsyncStorage.setItem(NOTIFICATION_KEY_PREFIX + name, JSON.stringify(value))
      this.notiDataMap.set(name, value)
    } catch (error) {
      throw error
    }
  }

  removeNotificationData = async (name) => {
    try {
      const nameList = Array.from(this.notiDataMap.keys())
      const idx = nameList.indexOf(name)
      if (idx !== -1) {
        nameList.splice(idx, 1)
        await AsyncStorage.setItem(NOTIFICATION_NAME_LIST_KEY, JSON.stringify(nameList))
        await AsyncStorage.removeItem(NOTIFICATION_KEY_PREFIX + name)
        this.notiDataMap.delete(name)
      }
    } catch (error) {
      throw error
    }
  }

  loadNotificationData = async (name) => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem(NOTIFICATION_KEY_PREFIX + name))
      if (value !== null) {
        this.notiDataMap.set(name, value)
      }
    } catch (error) {
      throw error
    }
  }

  getNotificationDataByName = (name) => this.notiDataMap.has(name) ? this.notiDataMap.get(name) : null
}