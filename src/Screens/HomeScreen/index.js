import React, { Component } from 'react'
import { 
  View, 
  Text,
  Alert,
} from 'react-native'
import { Navigation } from 'react-native-navigation'

import Constants from '../../global/Constants'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

    Navigation.events().bindComponent(this)
    this.isDrawerVisible = false
  }

  static get options() {
    return {
      topBar: {
        borderColor: 'red',
        leftButtons: [{
          id: Constants.Buttons.HAMBURGER_BUTTON.id,
          icon: Constants.Images.HAMBURGER,
        }],
        title: {
          text: Constants.Screens.HOME_SCREEN.title,
          alignment: 'center',
        },
        background: {
          color: Constants.Colors.dodgerBlue,
        }
      }
    }
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === Constants.Buttons.HAMBURGER_BUTTON.id) {
      this.toggleDrawer()
    }
  }

  toggleDrawer() {
    //this.isDrawerVisible = !this.isDrawerVisible
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: true, //this.isDrawerVisible,
        }
      }
    })
  }

  render() {
    return (
      <View>
        <Text>Home Screen</Text>
      </View>
    )
  }
}