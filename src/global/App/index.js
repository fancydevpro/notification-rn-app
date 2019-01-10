import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Constants from '../Constants'

function startSingleScreenApp() {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          ...Constants.Screens.LOADING_SCREEN,
        }
      }
    })
  })
}

function setGlobalOptions() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: true,
      title: {
        alignment: 'center',
      },
      background: {
        color: Constants.Colors.dodgerBlue,
      }
    }
  })
}

export {
  startSingleScreenApp,
  setGlobalOptions,
}