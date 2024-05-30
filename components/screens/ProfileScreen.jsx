import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

export const ProfileScreen = (navigation) => {
    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('User signed out!');
        }).catch((error) => {
            console.error('Sign out error', error);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.userInfo}>Email: {auth.currentUser?.email}</Text>
                <Text style={styles.userInfo}>Username: {auth.currentUser?.displayName || 'Not set'}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Sign Out"
                    color="#d9534f"
                    onPress={handleLogout}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5', 
    },
    userInfoSection: {
        marginBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 10,
    },
    userInfo: {
        fontSize: 18,
        color: '#666',
        marginVertical: 4,
    },
    buttonContainer: {
        width: '80%', 
        margin: 20,
    }
});

