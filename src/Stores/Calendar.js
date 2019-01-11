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
  }

  async addEvent(title, description, time, repeat, repeatTime) {
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
      if (repeat) {
        details.recurrence = RECURRENCE_RULE_DAILY,
        details.recurrenceRule = {
          frequency: RECURRENCE_RULE_DAILY,
          interval: repeatTime,
        }
      }
      const eventId = await CalendarEvents.saveEvent(title, details)
      
      return eventId
    } catch (error) {
      throw error
    }
  }
}