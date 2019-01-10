import React, { Component } from 'react'
import { View, Text } from 'react-native'
import glamorous from 'glamorous-native'

const Container = glamorous(View)({
  flex: 1,
  width: 300,
  backgroundColor: '#FFFFFF',
})

export default class SideMenuLeft extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Text>Side Menu</Text>
      </Container>
    )
  }
}