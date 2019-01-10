import { Navigation } from 'react-native-navigation'

import Constants from '../global/Constants'

import LoadingScreen from './LoadingScreen'
import HomeScreen from './HomeScreen'
import SideMenuLeft from './Drawer'

export default function registerScreens() {
  Navigation.registerComponent(Constants.Screens.LOADING_SCREEN.name, () => LoadingScreen)
  Navigation.registerComponent(Constants.Screens.HOME_SCREEN.name, () => HomeScreen)
  Navigation.registerComponent(Constants.Screens.SIDE_MENU_LEFT.name, () => SideMenuLeft)
}