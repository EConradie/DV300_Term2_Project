import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Picker, Alert } from 'react-native';
import { addChallenge } from '../../services/dbService';
import { getAuth } from "firebase/auth";
import { getCurrentUserInfo } from '../../services/authService';


export const CreateChallengeScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    
    const currentUser = getCurrentUserInfo();

    const userId = currentUser.uid;
    const username = currentUser.displayName;

    const handleSubmit = async () => {
        if (!title || !description || !category) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        const success = await addChallenge(title, description, category, userId, username);
        if (success) {
            Alert.alert('Success', 'Challenge created successfully');
            navigation.goBack();
        } else {
            Alert.alert('Error', 'Failed to create challenge');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title:</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} />
            <Text style={styles.label}>Description:</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />
            <Text style={styles.label}>Category:</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} />
            <Button title="Create Challenge" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});
