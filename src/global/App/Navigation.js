import { Navigation } from 'react-native-navigation'

import Constants from '../Constants'

const goToHome = () => Navigation.setRoot({
  root: {
    sideMenu: {
      id: Constants.Screens.SIDE_MENU_ID,
      left: {
        component: {
          ...Constants.Screens.SIDE_MENU_LEFT,
        },
        visible: false,
      },
      center: {
        stack: {
          id: 'AppRoot',
          children: [
            {
              component: {
                ...Constants.Screens.HOME_SCREEN,
              },
            }
          ],
        }
      }
    },
  }
})

const showSideMenu = componentId => Navigation.mergeOptions(
  componentId,
  {
    sideMenu: {
      left: {
        visible: true,
      }
    }
  }
)

const hideSideMenu = componentId => Navigation.mergeOptions(
  componentId,
  {
    sideMenu: {
      left: {
        visible: false,
      }
    }
  }
)

const showSettingsModal = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        ...Constants.Screens.SETTINGS_MODAL,
      }
    }]
  }
})

export {
  goToHome,
  showSideMenu,
  hideSideMenu,
  showSettingsModal,
}
