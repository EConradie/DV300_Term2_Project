import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ProfileScreen = ({ navigation }) => {
    return (
        <View style={ProfileStyles.container}>
            <Text>ProfileScreen</Text>
        </View>
    );
}

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})