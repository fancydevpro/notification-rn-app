import React, { Component } from 'react'
import {
  Text,
  View,
  Switch,
  TouchableOpacity,
} from 'react-native'
import glamorous from 'glamorous-native'
import { Navigation } from 'react-native-navigation'

import Constants from '../../global/Constants'

const Container = glamorous(View)({

})

export default class SettingsModal extends Component {
  constructor(props) {
    super(props)

    Navigation.events().bindComponent(this)
  }

  static get options() {
    return {
      topBar: {
        leftButtons: [
          {
            id: Constants.Buttons.BACK_BUTTON.id,
            icon: Constants.Images.ARROW_BACK,
          }
        ],
        rightButtons: [
          {
            id: Constants.Buttons.PLUS_BUTTON.id,
            icon: Constants.Images.ROUND_PLUS,
          }
        ],
        title: {
          text: Constants.Screens.SETTINGS_MODAL.title,
        }
      }
    }
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === Constants.Buttons.BACK_BUTTON.id) {
      Navigation.dismissModal(this.props.componentId)
    } else if (buttonId === Constants.Buttons.PLUS_BUTTON.id) {
      this.addTimeEvent()
    }
  }

  render() {
    return (
      <Container>
        <Text>Settings Page</Text>
      </Container>
    )
  }
}