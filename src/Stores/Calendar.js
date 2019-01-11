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

    this.saveEvent = this.saveEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
  }

  async saveEvent(time, title, description, repeat, repeatTime, eventId) {
    try {
      const authStatus = await CalendarEvents.authorizationStatus()
      if (authStatus !== STATUS_AUTHORIZED) throw new Error(`Permission is ${authStatus}!`)
      const details = {
        title,
        startDate: time.toISOString(),
        endDate: moment(time).add(1, 'years').toISOString(),
        notes: 'This event was created by Notification app',
        description,
        alarms: [{
          date: 0,
        }]
      }
      if (eventId) details.id = eventId
      if (repeat) {
        details.recurrence = RECURRENCE_RULE_DAILY,
        details.recurrenceRule = {
          frequency: RECURRENCE_RULE_DAILY,
          interval: repeatTime,
        }
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
      if (authStatus !== STATUS_AUTHORIZED) throw new Error(`Permission is ${authStatus}!`)
      await CalendarEvents.removeEvent(eventId)
    } catch (error) {
      throw error
    }
  }
}