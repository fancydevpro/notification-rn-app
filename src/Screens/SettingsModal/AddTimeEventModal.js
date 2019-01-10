import React, { Component } from 'react'
import {
  View,
  Switch,
  Text,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import glamorous from 'glamorous-native'

import Constants from '../../global/Constants'

const Container = glamorous(View)({

})

export default class AddTimeEventModal extends Component {
  constructor(props) {
    super(props)

    Navigation.events().bindComponent(this)
  }

  static get options() {
    return {
      topBar: {
        title: {
          text: Constants.Screens.ADD_TIME_EVENT_MODAL.title,
        },
        leftButtons: [
          {
            id: Constants.Buttons.BACK_BUTTON.id,
            icon: Constants.Images.ARROW_BACK,
          }
        ],
        rightButtons: [
          {
            id: Constants.Buttons.SAVE_BUTTON.id,
            icon: Constants.Images.ROUND_CHECK,
          }
        ],
      }
    }
  }

  navigationButtonPressed({buttonId}) {
    if (buttonId === Constants.Buttons.BACK_BUTTON.id) {
      Navigation.dismissModal(this.props.componentId)
    } else if (buttonId === Constants.Buttons.SAVE_BUTTON.id) {
      this.saveEvent()
    }
  }

  saveEvent() {}

  render() {
    return (
      <Container>
        <Text>Add New Notification Page</Text>
      </Container>
    )
  }
}