import React, { Component } from 'react'
import {
  View,
  Text,
  AsyncStorage
} from 'react-native'
import glamorous from 'glamorous-native'

import { goToHome } from '../../global/App/Navigation'

//import { USER_KEY } from './config'

const Container = glamorous(View)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
})

const LoadingTxt = glamorous(Text)({
  fontSize: 28,
})

export default class LoadingScreen extends Component {
  async componentDidMount() {
    console.log('did mounted')
    try {
      //const user = await AsyncStorage.getItem(USER_KEY)
      //console.log('user: ', user)
      //if (user) {
        setTimeout(() => goToHome(), 1000)
      //} else {
      //  goToAuth()
      //}
    } catch (err) {
      console.log('error: ', err)
      //goToAuth()
    }
  }

  render() {
    return (
      <Container>
        <LoadingTxt>Loading</LoadingTxt>
      </Container>
    )
  }
}