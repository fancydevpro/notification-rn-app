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

const NoDataTxt = glamorous(Txt)({
  marginHorizontal: 20,
  textAlign: 'center',
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
    this.onToggleEnable = this.onToggleEnable.bind(this)
    this.updateTimeEvent = this.updateTimeEvent.bind(this)

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

  componentDidMount() {
    if (this.props.firstLaunch) {
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
        },
        Calendar: {
          saveEvent,
        }
      } = getStores()
  
      const length = this.state.eventList.length
      let name = length ? `${+this.state.eventList[length - 1].name + 1}` : '0'
      if (+name > 1000) name = '0'
  
      const eventId = await saveEvent(date, title, message, repeat, repeatTime)
      addNotification(name, date, title, message, repeat, repeatType, repeatTime * 1000 * 3600 * 24)
      await saveNotificationData(name, {
        eventId,
        date: date.valueOf(),
        title, 
        message, 
        repeat, 
        repeatType, 
        repeatTime,
        enable: true,
      })
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
      //console.log('error: ', error)
      if (error.errType !== 'permission') Alert.alert('Sorry, something went wrong!')
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
        },
        Calendar: {
          removeEvent,
        }
      } = getStores()

      const eventId = notiDataMap.get(name).eventId
      const enable = notiDataMap.get(name).enable
      enable && eventId && await removeEvent(eventId)
      enable && cancelNotification(name)
      await removeNotificationData(name)
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
      if (error.errType !== 'permission') Alert.alert('Sorry, something went wrong!')
    }
  }

  async updateTimeEvent(name, date, title, message, repeat, repeatType, repeatTime) {
    try {
      const {
        EventTimes: {
          saveNotificationData,
          notiDataMap,
        },
        PushNotification: {
          addNotification,
        },
        Calendar: {
          saveEvent,
        }
      } = getStores()
  
      const newEventId = await saveEvent(date, title, message, repeat, repeatTime, notiDataMap.get(name).eventId)
      addNotification(name, date, title, message, repeat, repeatType, repeatTime * 1000 * 3600 * 24)
      await saveNotificationData(name, {
        eventId: newEventId,
        date: date.valueOf(),
        title, 
        message, 
        repeat, 
        repeatType, 
        repeatTime,
        enable: true,
      })
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
      //console.log('error: ', error)
      if (error.errType !== 'permission') Alert.alert('Sorry, something went wrong!')
    }
  }

  onEditEvent(name) {
    const idx = this.state.eventList.findIndex(el => el.name === name)

    showAddTimeEventModal({
      onUpdate: this.updateTimeEvent,
      originData: this.state.eventList[idx]
    })
  }

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
        },
        Calendar: {
          removeEvent,
          saveEvent,
        }
      } = getStores()

      const idx = this.state.eventList.findIndex(el => el.name === name)
      const originData = this.state.eventList[idx]
      
      if (value) {
        const eventId = await saveEvent(originData.date, originData.title, originData.message, originData.repeat, originData.repeatTime)
        addNotification(name, originData.date, originData.title, originData.message, originData.repeat, originData.repeatType, originData.repeatTime * 1000 * 3600 * 24)
        await saveNotificationData(name, { 
          ...originData,
          eventId,
          enable: value,
        })
      }
      else {
        const eventId = notiDataMap.get(name).eventId
        eventId && await removeEvent(eventId)
        cancelNotification(name)
        await saveNotificationData(name, { 
          ...originData,
          eventId: null,
          enable: value,
        })
      }

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
      //console.log('Error: ', error)
      if (error.errType !== 'permission') Alert.alert('Sorry, something went wrong!')
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
            <NoDataTxt>Please click (+) button on top bar to add a new event.</NoDataTxt>
          </NoData>
        }
      </Container>
    )
  }
}