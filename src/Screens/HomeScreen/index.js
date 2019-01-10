import React, { Component } from 'react'
import { 
  View, 
  Text,
  Alert,
} from 'react-native'
import { Navigation } from 'react-native-navigation'

import Constants from '../../global/Constants'
import { showSideMenu } from '../../global/App/Navigation'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

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

  toggleDrawer() {
    showSideMenu(this.props.componentId)
  }

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
      </View>
    )
  }
}