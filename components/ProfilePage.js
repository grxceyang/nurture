import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useValue } from './ValueContext';

function ProfileScreen() {
  const { currentValue, setCurrentValue } = useValue();

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.aboutSection}>
        ABOUT SECTION: This will be the profile page, where the user's name and email are displayed.
      </Text>
      <Text style={styles.aboutSection}>
        This page may also have long-term target goals or motivational quotes for the user.
      </Text>
      <View style={styles.inputSection}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={currentValue['username']}
          onChangeText={(text) => {
            setCurrentValue({ ...currentValue, username: text });
          }}
        />
      </View>
      <View style={styles.inputSection}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={currentValue['password']}
          secureTextEntry
          onChangeText={(text) => {
            setCurrentValue({ ...currentValue, password: text });
          }}
        />
      </View>
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
    marginBottom: 10,
  },
  inputSection: {
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
