import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Colors } from "../Styles"; // Ensure this import path is correct

export const ProfileScreen = ({ navigation }) => {
    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('User signed out!');
        }).catch((error) => {
            console.error('Sign out error', error);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.userInfoSection}>
                <Text style={styles.title}>Profile</Text>
                <Text style={styles.userInfo}>Email: {auth.currentUser?.email}</Text>
                <Text style={styles.userInfo}>Username: {auth.currentUser?.displayName || 'Not set'}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 75,
        backgroundColor: Colors.gray,
    },
    userInfoSection: {
        marginBottom: 32,
        alignItems: 'center',
        width: '100%', // Ensure full width utilization
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 20,
    },
    userInfo: {
        fontSize: 18,
        color: Colors.white,
        marginVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: Colors.darkGray,
        paddingBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: Colors.orange,
        borderRadius: 10,
        width: '100%',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
});
