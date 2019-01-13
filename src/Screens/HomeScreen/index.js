import React, { Component } from 'react'
import { 
  View, 
  Text,
  Alert,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import glamorous from 'glamorous-native'

import Constants from '../../global/Constants'
import { showSideMenu, showSettingsModal } from '../../global/App/Navigation'
import { getStores } from '../../Stores'

const Container = glamorous(View)({
  flex: 1,
})

const WelcomeContainer = glamorous(View)({
  //width: '100%',
  alignItems: 'center',
})

const WelcomeTxt = glamorous(Text)({
  fontSize: 40,
  fontWeight: '300',
  color: Constants.Colors.pinkishGreyTwo,
  marginTop: 200,
})

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.goToSettingsScreen = this.goToSettingsScreen.bind(true)

    Navigation.events().bindComponent(this)
    this.isDrawerVisible = false
  }

  static get options() {
    return {
      topBar: {
        leftButtons: [{
          id: Constants.Buttons.HAMBURGER_BUTTON.id,
          icon: Constants.Images.HAMBURGER,
        }],
        title: {
          text: Constants.Screens.HOME_SCREEN.title,
        },
      }
    }
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === Constants.Buttons.HAMBURGER_BUTTON.id) {
      this.toggleDrawer()
    }
  }

  componentDidMount() {
    const {
      App: {
        launchedAppFlag,
        setLaunchFlag,
      }
    } = getStores()

    if (!launchedAppFlag) {
      setLaunchFlag()
      Alert.alert(
        '',
        'You don\'t have any event will be notified. Please add!',
        [
          { text: 'OK', onPress: () => this.goToSettingsScreen({ firstLaunch: true }) },
          { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        ],
        { cancelable: true }
      )
    }
  }

  goToSettingsScreen(passProps) {
    showSettingsModal(passProps)
  }

  toggleDrawer() {
    showSideMenu(this.props.componentId)
  }

  render() {
    return (
      <Container>
        <WelcomeContainer>
          <WelcomeTxt>Welcome</WelcomeTxt>
        </WelcomeContainer>
      </Container>
    )
  }
}