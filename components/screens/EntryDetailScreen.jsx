import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, Button, StyleSheet } from 'react-native';
import { addVote } from '../../services/dbService';
import { getCurrentUserInfo } from '../../services/authService';

export const EntryDetailScreen = ({ route, navigation }) => {
    const { entry, challenge } = route.params;
    const currentUser = getCurrentUserInfo(); 

    const handleVote = async () => {
      const success = await addVote(currentUser.uid, challenge.id, entry.id);
      if (success) {
        navigation.goBack();
      }
    };
  
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>{entry.username}</Text>
        <Text style={styles.description}>{entry.description}</Text>
        {entry.images?.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.fullImage} />
        ))}
        <Button title="Vote" onPress={handleVote} />
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  fullImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

