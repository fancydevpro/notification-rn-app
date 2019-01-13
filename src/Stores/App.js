import { AsyncStorage } from 'react-native'

const APP_LAUNCH_FLAG_KEY = 'App.Launched'

export default class {
  constructor(getStores) {
    this.getStores = getStores

    this.getLaunchFlag = this.getLaunchFlag.bind(this)
    this.setLaunchFlag = this.setLaunchFlag.bind(this)
  }

  launchedAppFlag = false

  fetch = () => this.getLaunchFlag()

  async getLaunchFlag() {
    try {
      const value = JSON.parse(await AsyncStorage.getItem(APP_LAUNCH_FLAG_KEY))
      if (value !== null) {
        this.launchedAppFlag = value
      } else {
        this.launchedAppFlag = false
      }
    } catch (error) {
      this.launchedAppFlag = false
    }
  }

  async setLaunchFlag() {
    try {
      await AsyncStorage.setItem(APP_LAUNCH_FLAG_KEY, JSON.stringify(true))
      this.launchedAppFlag = true
    } catch (error) {
      throw error
    }
  }
}