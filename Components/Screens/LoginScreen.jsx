import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import { Colors } from '../Styles'

export const LoginScreen = () => {
 
    return (
      <ScrollView style={MainStyles.scrollContainer}>
        <View style={MainStyles.container}>
            <View style={MainStyles.header}>
                <Text style={MainStyles.title}>Login</Text>
            </View>
        </View>
        </ScrollView>
    )
}

const MainStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
},
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
  cardContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 25
  }
})



