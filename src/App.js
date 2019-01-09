import { Navigation } from 'react-native-navigation'

import Constants from '../global/Constants'

import HomeScreen from './HomeScreen'

export function registerScreens() {
  Navigation.registerComponent(Constants.Screens.HOME_SCREEN.screen)
}
