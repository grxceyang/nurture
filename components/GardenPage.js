import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

function GardenPage() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.aboutSection}>
        ABOUT SECTION: This page contains shelves for the plants in the user's garden to grow.
      </Text>
      <Text style={styles.aboutSection}>
        As the user completes more goals and more pomodoro sessions, the user's plants will grow more and be able to unlock new plant varieties.
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        {[...Array(10)].map((_, index) => (
          <View key={index} style={styles.shelf} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  aboutSection: {
    fontSize: 14,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  shelf: {
    width: 300, 
    height: 25,
    backgroundColor: 'burlywood',
    marginVertical: 70,
    borderRadius: 1,
  },
});

export default GardenPage;
