import React, { Component } from 'react'
import { 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'
import glamorous from 'glamorous-native'
import FIcon from 'react-native-vector-icons/Feather'

import Constants from '../../global/Constants';

const Container = glamorous(View)({
  flex: 1,
  justifyContent: 'space-around',
  width: 300,
  backgroundColor: Constants.Colors.softBlueThree,
})

const PADDING_LEFT = 30
const FONT_SIZE = 20
const ICON_SIZE = 20
const FONT_WEIGHT = '600'

const RowButtonContainer = glamorous(TouchableOpacity)({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: PADDING_LEFT,
})

const ButtonIcon = glamorous(FIcon)({
  marginRight: 15,
  fontWeight: '300',
})

const ButtonText = glamorous(Text)({
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  color: Constants.Colors.white,
})

export default class SideMenuLeft extends Component {
  constructor(props) {
    super(props)
    console.log('navigation: ', {...props})
  }

  render() {
    return (
      <Container>
        <RowButtonContainer>
          <ButtonIcon name={'settings'} size={ICON_SIZE} color={Constants.Colors.white} />
          <ButtonText>Settings</ButtonText>
        </RowButtonContainer>
      </Container>
    )
  }
}