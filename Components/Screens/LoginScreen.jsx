import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native'

import { Colors } from '../Styles'

export const LoginScreen = () => {
 
    return (
      <ScrollView style={MainStyles.scrollContainer}>
        <View style={MainStyles.container}>
            <View style={MainStyles.header}>
                <Image source={require('../../assets/Icons/logo-name.svg')} style={MainStyles.logo} />
            </View>
        </View>
        </ScrollView>
    )
}

const MainStyles = StyleSheet.create({
 container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 65,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 30,
  },
  header: {
    gap: 0
  },
  input: {
    gap: 5
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
 
})



