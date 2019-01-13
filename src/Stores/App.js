import { AsyncStorage } from 'react-native'

const APP_LAUNCH_FLAG_KEY = 'App.Launched'

export default class {
  constructor(getStores) {
    this.getStores = getStores
  }

  launchedApp = false

  fetch = () => this.getLaunchFlag()

  async getLaunchFlag() {
    try {
      const value = JSON.parse(await AsyncStorage.getItem(APP_LAUNCH_FLAG_KEY))
      if (value !== null) {
        this.launchedApp = value
      } else {
        this.launchedApp = false
      }
    } catch (error) {
      this.launchedApp = false
      throw error
    }
  }

  async setLaunchFlag() {
    try {
      await AsyncStorage.setItem(APP_LAUNCH_FLAG_KEY, JSON.stringify(true))
      this.launchedApp = true
    } catch (error) {
      throw error
    }
  }
}