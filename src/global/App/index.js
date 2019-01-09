import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Constants from '../Constants'

export default function startSingleScreenApp() {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [{
            component: {
              name: Constants.Screens.HOME_SCREEN.screen,
            }
          }]
        }
      }
    })
  })
}