import React, { Component } from 'react'
import { 
  View, 
  Text,
  TouchableOpacity,
} from 'react-native'
import glamorous from 'glamorous-native'
import FIcon from 'react-native-vector-icons/Feather'

import Constants from '../../global/Constants';
import { showSettingsModal, hideSideMenu } from '../../global/App/Navigation'

const Container = glamorous(View)({
  flex: 1,
  justifyContent: 'space-around',
  width: 300,
  backgroundColor: Constants.Colors.softBlueThree,
})

const PADDING_LEFT = 35
const FONT_SIZE = 40
const ICON_SIZE = 40
const FONT_WEIGHT = '600'

const RowButtonContainer = glamorous(TouchableOpacity)({
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

    this.goToSettingsModal = this.goToSettingsModal.bind(this)
  }

  goToSettingsModal() {
    showSettingsModal()
    this.toggleDrawer()
  }

  toggleDrawer() {
    hideSideMenu(Constants.Screens.HOME_SCREEN.id)
  }

  render() {
    return (
      <Container>
        <RowButtonContainer
          onPress={this.goToSettingsModal}
        >
          <ButtonIcon name={'settings'} size={ICON_SIZE} color={Constants.Colors.white} />
          <ButtonText>Settings</ButtonText>
        </RowButtonContainer>
      </Container>
    )
  }
}