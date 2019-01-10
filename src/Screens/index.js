import { Navigation } from 'react-native-navigation'

import Constants from '../global/Constants'

import LoadingScreen from './LoadingScreen'
import HomeScreen from './HomeScreen'
import SideMenuLeft from './Drawer'
import SettingsModal from './SettingsModal'
import AddTimeEventModal from './SettingsModal/AddTimeEventModal'

export default function registerScreens() {
  Navigation.registerComponent(Constants.Screens.LOADING_SCREEN.name, () => LoadingScreen)
  Navigation.registerComponent(Constants.Screens.HOME_SCREEN.name, () => HomeScreen)
  Navigation.registerComponent(Constants.Screens.SIDE_MENU_LEFT.name, () => SideMenuLeft)
  Navigation.registerComponent(Constants.Screens.SETTINGS_MODAL.name, () => SettingsModal)
  Navigation.registerComponent(Constants.Screens.ADD_TIME_EVENT_MODAL.name, () => AddTimeEventModal)
}