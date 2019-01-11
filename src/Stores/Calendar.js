import CalendarEvents from 'react-native-calendar-events'
import moment from 'moment'

const STATUS_AUTHORIZED = 'authorized'
const STATUS_DENIED = 'authorized'
const STATUS_RESTRICTED = 'restricted'
const STATUS_UNDETERMINED = 'undetermined'
const RECURRENCE_RULE_DAILY = 'daily'

export default class Calendar {
  constructor(getStores) {
    this.getStores = getStores

    this.initCalendar = this.initCalendar.bind(this)
    this.saveEvent = this.saveEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
  }

  fetch = () => this.initCalendar()

  async initCalendar() {
    try {
      const authStatus = await CalendarEvents.authorizeEventStore()
      if (authStatus !== STATUS_AUTHORIZED) {
        const e = new Error(`Permission is ${authStatus}!`)
        e.errType = 'permission'
        throw e
      }
    } catch (error) {
      this.isAvailable = false
      throw error
    }
  }

  async saveEvent(time, title, description, repeat, repeatTime, eventId) {
    try {
      const authStatus = await CalendarEvents.authorizationStatus()
      if (authStatus !== STATUS_AUTHORIZED) {
        const e = new Error(`Permission is ${authStatus}!`)
        e.errType = 'permission'
        throw e
      }

      const details = {
        startDate: moment(time).toISOString(),
        //endDate: moment(time).add(1, 'hours').toISOString(),
        notes: 'This event was created by Notification app',
        description,
        alarms: [{
         date: moment(time).toISOString(),
        }]
      }
      if (eventId) details.id = eventId
      if (repeat) {
        // details.recurrence = RECURRENCE_RULE_DAILY,
        details.recurrenceRule = {
          frequency: RECURRENCE_RULE_DAILY,
          interval: repeatTime,
          endDate: moment(time).add(30, 'days').toISOString(),
        }
      } else {
        details.endDate = moment(time).add(1, 'hours').toISOString()
      }
      const newId = await CalendarEvents.saveEvent(title, details)

      return newId
    } catch (error) {
      throw error
    }
  }

  async removeEvent(eventId) {
    try {
      const authStatus = await CalendarEvents.authorizationStatus()
      if (authStatus !== STATUS_AUTHORIZED) {
        const e = new Error(`Permission is ${authStatus}!`)
        e.errType = 'permission'
        throw e
      }
      await CalendarEvents.removeEvent(eventId)
    } catch (error) {
      throw error
    }
  }
}