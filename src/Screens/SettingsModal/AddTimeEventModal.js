import React, { Component } from 'react'
import {
  View,
  Switch,
  Text,
  TextInput,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import glamorous from 'glamorous-native'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dropdown } from 'react-native-material-dropdown'

import Constants from '../../global/Constants'

const DEFAULT_DESCRIPTIONS = [
  'Feed the Dog',
  'Feed the Cat',
  'Feed the Fish',
]

const BOX_VERTICAL_PADDING = 20
const BOX_MARGIN_TOP = 10
const BOX_MARGIN_BOTTOM = 10
const PADDING_LEFT = 20
const PADDING_RIGHT = 20
const ROW_PADDING_VERTICAL = 5
const ROW_FONT_SIZE = 18
const ROW_HEIGHT = 30

const Container = glamorous(View)({
  flex: 1,
  backgroundColor: Constants.Colors.greyish,
})

const TimePickerContainer = glamorous(View)({
  alignItems: 'center',
  width: '100%',
  marginTop: 10,
  marginBottom: 10,
})

const ContentBox = glamorous(View)(({ noMarginTop }) => ({
  flexDirection: 'column',
  width: '100%',
  paddingVertical: BOX_VERTICAL_PADDING,
  paddingLeft: PADDING_LEFT,
  paddingRight: PADDING_RIGHT,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowRadius: 5,
  shadowOpacity: 1,
  backgroundColor: Constants.Colors.white,
  marginTop: noMarginTop ? 0 : BOX_MARGIN_TOP,
}))

const Row = glamorous(View)({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: ROW_PADDING_VERTICAL,
})

const RowText = glamorous(Text)(({ marginLeft, marginRight }) => ({
  fontSize: ROW_FONT_SIZE,
  color: Constants.Colors.blackTwo,
  marginLeft,
  marginRight,
}))

const RepeatTime = glamorous(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const RowInput = glamorous(TextInput)(({ width }) => ({
  width,
  paddingVertical: 0,
  fontSize: ROW_FONT_SIZE,
  borderColor: Constants.Colors.greyish,
  borderWidth: 1.5,
  borderRadius: 3,
}))

const Title = glamorous(RowInput)({
  paddingHorizontal: 15,
})

export default class AddTimeEventModal extends Component {
  constructor(props) {
    super(props)

    Navigation.events().bindComponent(this)
    this.onTimeSelected = this.onTimeSelected.bind(this)
    this.onChangeInterval = this.onChangeInterval.bind(this)
    this.onChangeTitle = this.onChangeTitle.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeRepeat = this.onChangeRepeat.bind(this)

    this.timeFormat = 'YYYY-MM-DD h:mm A'
    this.state = {
      date: (props.originData ? props.originData.date : moment()).format(this.timeFormat),
      interval: props.originData ? props.originData.repeatTime.toString() : '1',
      title: props.originData ? props.originData.title : '',
      description: props.originData ? props.originData.message : DEFAULT_DESCRIPTIONS[0],
      repeat: props.originData ? props.originData.repeat : true,
      dropdownDescriptions: Array.from(DEFAULT_DESCRIPTIONS).map(value => ({ value })),
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
    this.setState({
      date: time,
    })
  } 

  saveEvent() {
    const {
      onSave,
      onUpdate,
      originData,
    } = this.props

    if (originData && onUpdate) {
      onUpdate(
        originData.name,
        moment(this.state.date, this.timeFormat),
        this.state.title ? this.state.title : 'Untitled',
        this.state.description,
        +this.state.interval > 0 && this.state.repeat,
        'time',
        +this.state.interval,
      )
    } else {
      onSave(
        moment(this.state.date, this.timeFormat),
        this.state.title ? this.state.title : 'Untitled',
        this.state.description,
        +this.state.interval > 0 && this.state.repeat,
        'time',
        +this.state.interval,
      )
    }
    Navigation.dismissModal(this.props.componentId)
  }

  onChangeInterval(text) {
    const value = Math.floor(Math.abs(+text))

    this.setState({
      interval: value.toString(),
    })
  }

  onChangeTitle(text) {
    this.setState({
      title: text,
    })
  }

  // onChangeDescription(text) {
  //   this.setState({
  //     description: text,
  //   })
  // }

  onChangeDescription(value, index, data) {
    this.setState({
      description: value,
    })
  }

  onChangeRepeat(value) {
    this.setState({
      repeat: value,
    })
  }

  render() {
    const now = moment()
    const aYearFromNow = moment(now).add(1, 'years')
    const dateFormat = 'YYYY-MM-DD'

    return (
      <KeyboardAwareScrollView>
        <Container>
          <ContentBox noMarginTop>
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
          </ContentBox>
          <ContentBox>
            <Row>
              <RowText>Repeat</RowText>
              <Switch
                value={this.state.repeat}
                onValueChange={this.onChangeRepeat}
              />
            </Row>
            <Row>
              <RowText>Repeat Time</RowText>
              <RepeatTime>
                <RowText marginRight={10}>Every</RowText>
                <RowInput
                  value={this.state.interval}
                  onChangeText={this.onChangeInterval}
                  maxLength={3}
                  keyboardType={'decimal-pad'}
                  underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                  fontSize={ROW_FONT_SIZE}
                  textAlign={'center'}
                  width={45}
                  placeholder={'0'}
                  editable={this.state.repeat}
                />
                <RowText marginLeft={10}>Days</RowText>
              </RepeatTime>
            </Row>
          </ContentBox>
          <ContentBox>
            <Row>
              <RowText>Title</RowText>
              <Title
                value={this.state.title}
                onChangeText={this.onChangeTitle}
                maxLength={30}
                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                fontSize={ROW_FONT_SIZE}
                textAlign={'right'}
                width={250}
                placeholder={'Untitled'}
              />
            </Row>
            <Row>
              <RowText>Description</RowText>
            </Row>
              {/*<RowInput
                value={this.state.description}
                onChangeText={this.onChangeDescription}
                maxLength={256}
                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                fontSize={ROW_FONT_SIZE}
                width={'100%'}
                multiline={true}
                numberOfLines={5}
                placeholder={'Type the description here...'}
                textAlignVertical={'top'}
              />*/}
              <Dropdown
                label='Event type'
                data={this.state.dropdownDescriptions}
                animationDuration={200}
                fontSize={ROW_FONT_SIZE}
                labelFontSize={ROW_FONT_SIZE * 2 / 3}
                //textColor={Constants.Colors.greyish}
                value={this.state.description}
                onChangeText={this.onChangeDescription}
              />
          </ContentBox>
        </Container>
      </KeyboardAwareScrollView>
    )
  }
}