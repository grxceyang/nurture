import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function ProfileScreen() {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.aboutSection}>
        ABOUT SECTION: This will be the profile page, where the user's name and email are displayed.
      </Text>
      <Text style={styles.aboutSection}>
        This page may also have long-term target goals or motivational quotes for the user. 
      </Text>
      <Text style={styles.usernameSection}>
        USERNAME
      </Text>
      <Text style={styles.passwordSection}>
        PASSWORD
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'top',
    alignItems: 'left',
  },
  aboutSection: {
    fontSize: 14,
  },
  usernameSection: {
    alignItems: 'center',
    marginTop: 150,
    fontSize: 15,
  },
  passwordSection: {
    alignItems: 'center',
    marginTop: 20,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProfileScreen;
