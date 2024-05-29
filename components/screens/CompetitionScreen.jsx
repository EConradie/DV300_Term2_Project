import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CompetitionScreen = ({ navigation }) => {
    return (
        <View style={CompetitionStyles.container}>
            <Text>CompetitionScreen</Text>
        </View>
    );
}

const CompetitionStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})