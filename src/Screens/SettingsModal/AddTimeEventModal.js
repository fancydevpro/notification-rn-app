import React, { Component } from 'react'
import {
  View,
  Switch,
  Text,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import glamorous from 'glamorous-native'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'

import Constants from '../../global/Constants'

const Container = glamorous(View)({
  flex: 1,
})

const TimePickerContainer = glamorous(View)({
  alignItems: 'center',
  width: '100%',
  height: 200,
  marginTop: 10,
  marginBottom: 10,
})

export default class AddTimeEventModal extends Component {
  constructor(props) {
    super(props)

    Navigation.events().bindComponent(this)
    this.onTimeSelected = this.onTimeSelected.bind(this)

    this.timeFormat = 'YYYY-MM-DD h:mm A'
    this.state = {
      date: moment().format(this.timeFormat),
    }
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

  onTimeSelected(time) {
    console.log('time: ', time)
  } 

  saveEvent() {}

  render() {
    const now = moment()
    const aYearFromNow = moment(now).add(1, 'years')
    const dateFormat = 'YYYY-MM-DD'

    return (
      <Container>
        <TimePickerContainer>
          <DatePicker 
            style={{ width: '80%' }}
            date={this.state.date}
            mode={'datetime'}
            placeholder={'Select Date'}
            format={this.timeFormat}
            minDate={now.format(dateFormat)}
            maxDate={aYearFromNow.format(dateFormat)}
            confirmBtnText={'Select'}
            cancelBtnText={'Cancel'}
            customStyles={{
              dateIcon: {
                alignSelf: 'center',
                marginLeft: 10,
              },
              dateInput: {
                marginLeft: 0,
              },
              dateText: {
                fontSize: 20,
              }
            }}
            onDateChange={this.onTimeSelected}
          />
        </TimePickerContainer>
      </Container>
    )
  }
}