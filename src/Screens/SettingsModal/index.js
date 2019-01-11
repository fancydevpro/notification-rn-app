import React, { Component } from 'react'
import {
  Text,
  View,
  Switch,
  Alert,
  ScrollView,
} from 'react-native'
import glamorous from 'glamorous-native'
import { Navigation } from 'react-native-navigation'
import Swipeout from 'react-native-swipeout'

import Constants from '../../global/Constants'
import { showAddTimeEventModal } from '../../global/App/Navigation'
import { getStores } from '../../Stores'
import moment from 'moment'

const BOX_VERTICAL_PADDING = 20
const BOX_MARGIN_TOP = 10
const BOX_MARGIN_BOTTOM = 10
const PADDING_LEFT = 20
const PADDING_RIGHT = 20
const ROW_PADDING_VERTICAL = 5
const ROW_FONT_SIZE = 18
const ROW_HEIGHT = 30

const Container = glamorous(ScrollView)({
  flex: 1,
  backgroundColor: Constants.Colors.greyish,
})

const Row = glamorous(View)(({ noBorderBottom }) => ({
  flexDirection: 'row-reverse',
  flex: 1,
  paddingLeft: PADDING_LEFT,
  paddingRight: PADDING_RIGHT,
  paddingVertical: BOX_VERTICAL_PADDING,
  borderBottomColor: Constants.Colors.greyish,
  borderBottomWidth: noBorderBottom ? 0 : 2,
}))

const Title = glamorous(View)({
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

const Time = glamorous(View)({
  justifyContent: 'center',
  marginLeft: 30,
})

const Toggle = glamorous(View)({
  justifyContent: 'center',
  marginLeft: 30,
})

const Txt = glamorous(Text)({
  fontSize: ROW_FONT_SIZE,
  color: Constants.Colors.blackTwo,
})

const NoData = glamorous(View)({
  alignItems: 'center',
  paddingVertical: BOX_VERTICAL_PADDING,
})

export default class SettingsModal extends Component {
  constructor(props) {
    super(props)

    Navigation.events().bindComponent(this)

    this.addTimeEvent = this.addTimeEvent.bind(this)
    this.onRemoveEvent = this.onRemoveEvent.bind(this)
    this.onEditEvent = this.onEditEvent.bind(this)

    const {
      EventTimes: {
        notiDataMap
      }
    } = getStores()

    const eventList = Array.from(notiDataMap.keys()).map(key => {
      const data = notiDataMap.get(key)
      return {
        name: key,
        ...data,
        date: moment(data.date)
      }
    })
    eventList.sort((a, b) => {
      if (a.date.isAfter(b.date)) return 1
      else if (a.date.isBefore(b.date)) return -1
      return 0
    })
    this.state = {
      eventList,
    }
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
      this.onAddTimeEvent()
    }
  }

  onAddTimeEvent() {
    showAddTimeEventModal({
      onSave: this.addTimeEvent,
    })
  }

  async addTimeEvent(date, title, message, repeat, repeatType, repeatTime) {
    try {
      const {
        EventTimes: {
          saveNotificationData,
          notiDataMap,
        },
        PushNotification: {
          addNotification,
        }
      } = getStores()
  
      const length = this.state.eventList.length
      let name = length ? `${+this.state.eventList[length - 1].name + 1}` : '0'
      if (+name > 1000) name = '0'
  
      await saveNotificationData(name, { 
        date: date.valueOf(),
        title, 
        message, 
        repeat, 
        repeatType, 
        repeatTime,
        enable: true,
      })
      addNotification(name, date, message, repeat, repeatType, repeatTime)
      const eventList = Array.from(notiDataMap.keys()).map(key => {
        const data = notiDataMap.get(key)
        return {
          name: key,
          ...data,
          date: moment(data.date),
          enable: true,
        }
      })
      eventList.sort((a, b) => {
        if (a.date.isAfter(b.date)) return 1
        else if (a.date.isBefore(b.date)) return -1
        return 0
      })
      this.setState({
        eventList,
      })
    } catch (error) {
      console.log('error: ', error)
      Alert.alert('Sorry, something went wrong!')
    }
  }

  async onRemoveEvent(name) {
    try {
      const {
        EventTimes: {
          removeNotificationData,
          notiDataMap,
        },
        PushNotification: {
          cancelNotification,
        }
      } = getStores()

      await removeNotificationData(name)
      cancelNotification(name)
      const eventList = Array.from(notiDataMap.keys()).map(key => {
        const data = notiDataMap.get(key)
        return {
          name: key,
          ...data,
          date: moment(data.date),
        }
      })
      this.setState({
        eventList,
      })
    } catch (error) {
      Alert.alert('Sorry, something went wrong!')
    }
  }

  onEditEvent(name) {}

  async onToggleEnable(name, value) {
    try {
      const {
        EventTimes: {
          notiDataMap,
          saveNotificationData,
        },
        PushNotification: {
          addNotification,
          cancelNotification,
        }
      } = getStores()

      const idx = this.state.eventList.findIndex(el => el.name === name)
      const originData = this.state.eventList[idx]
      console.log('originData: ', originData)
      await saveNotificationData(name, { 
        ...originData,
        enable: value,
      })
      if (value) addNotification(name, originData.date, originData.message, originData.repeat, originData.repeatType, originData.repeatTime)
      else cancelNotification(name)

      const eventList = Array.from(notiDataMap.keys()).map(key => {
        const data = notiDataMap.get(key)
        return {
          name: key,
          ...data,
          date: moment(data.date),
        }
      })
      this.setState({
        eventList,
      })
    } catch (error) {
      console.log('Error: ', error)
      Alert.alert('Sorry, something went wrong!')
    }
  }

  render() {
    const timeFormat = 'DD/MM/YY h:mm A'

    return (
      <Container>
        {this.state.eventList.length ?
          this.state.eventList.map(el => (
            <Swipeout
              key={el.name}
              autoClose
              right={[
                {
                  text: 'Remove',
                  backgroundColor: 'red',
                  onPress: () => this.onRemoveEvent(el.name),
                },
                {
                  text: 'Edit',
                  backgroundColor: 'green',
                  onPress: () => this.onEditEvent(el.name),
                },
              ]}
            >
              <Row>
                <Toggle>
                  <Switch 
                    value={el.enable}
                    onValueChange={(value) => this.onToggleEnable(el.name, value)}
                  />
                </Toggle>
                <Time>
                  <Txt>{el.date.format(timeFormat)}</Txt>
                </Time>
                <Title>
                 <Txt>{el.title}</Txt>  
                </Title>
              </Row>
            </Swipeout>
          ))
          :
          <NoData>
            <Txt>No Data</Txt>
          </NoData>
        }
      </Container>
    )
  }
}