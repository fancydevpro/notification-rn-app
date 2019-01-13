import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import glamorous from 'glamorous-native'

import { goToHome } from '../../global/App/Navigation'
import { initStore } from '../../Stores'

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
    try {
      await initStore()
      goToHome()
    } catch (err) {
      //console.log('error: ', err)
      goToHome()
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