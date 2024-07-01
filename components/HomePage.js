import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const storageKey = '@goals:list';
const growthKey = '@user:growth';

function HomePage({ navigation }) {
  // State variables
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState('');
  const [growthPoints, setGrowthPoints] = useState(0);

  // Fetch data on component mount
  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey);
      if (jsonValue !== null) {
        setGoals(JSON.parse(jsonValue));
      }

      const growthValue = await AsyncStorage.getItem(growthKey);
      if (growthValue !== null) {
        setGrowthPoints(parseInt(growthValue, 10));
      }
    } catch (e) {
      console.log('Error reading data from AsyncStorage:', e);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(storageKey, JSON.stringify(value));
      console.log('Data stored successfully:', JSON.stringify(value));
    } catch (e) {
      console.log('Error storing data in AsyncStorage:', e);
    }
  };

  const storeGrowthPoints = async (points) => {
    try {
      await AsyncStorage.setItem(growthKey, points.toString());
      console.log('Growth points stored successfully:', points);
      setGrowthPoints(points);
    } catch (e) {
      console.log('Error storing growth points in AsyncStorage:', e);
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.removeItem(storageKey);
      await AsyncStorage.removeItem(growthKey);
      console.log('Data cleared successfully');
      setGoals([]);
      setGrowthPoints(0);
    } catch (e) {
      console.log('Error clearing data from AsyncStorage:', e);
    }
  };

  const handleGoalChange = (text) => {
    setGoalInput(text);
  };

  const handleGoalAction = () => {
    if (goalInput.trim()) {
      const newGoals = [...goals, goalInput];
      setGoals(newGoals);
      storeData(newGoals);
      setGoalInput('');
    }
  };

  const removeGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    storeData(updatedGoals);
    updateGrowthPoints(1); // Increment growth points by 1 for completing a goal
  };

  const updateGrowthPoints = async (increment) => {
    const updatedPoints = growthPoints + increment;
    await storeGrowthPoints(updatedPoints);
  };

  // Assuming handlePomodoroCompletion will be called when a pomodoro session is completed
  const handlePomodoroCompletion = () => {
    updateGrowthPoints(1); // Increment growth points by 1 for completing a pomodoro session
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Welcome Grace!</Text>
      <View style={styles.goalsContainer}>
        <Text style={styles.goalsHeader}>Current Goals:</Text>
        <FlatList
          data={goals}
          renderItem={({ item, index }) => (
            <View style={styles.goalContainer}>
              <Text style={styles.goal}> ⧆ {item}</Text>
              <TouchableOpacity style={styles.doneButton} onPress={() => removeGoal(index)}>
                <Text style={styles.doneButtonText}>Mark as done</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter a new goal"
            value={goalInput}
            onChangeText={handleGoalChange}
            onSubmitEditing={handleGoalAction}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleGoalAction}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.PomodoroButton} onPress={() => navigation.navigate('Pomodoro Timer')}>
        <Text style={styles.PomodoroButtonText}>POMODORO TIMER</Text>
      </TouchableOpacity>
      <Text style={styles.productiveSessionText}>Start a Productive Session Now!</Text>
      <Text>ABOUT SECTION: This is the main Home Page that will contain the goal list and pomodoro timer button.</Text>
      <Text>The user can add new goals and then mark them as done, which will make the plants in their garden grow.</Text>
      <Text>When the pink pomodoro button is clicked, it will navigate you to the pomodoro page where the user can do pomodoro sessions.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'palevioletred',
    marginBottom: 20,
  },
  goalsContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  goalsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  goal: {
    fontSize: 18,
  },
  doneButton: {
    marginLeft: 10,
    backgroundColor: 'mediumslateblue',
    padding: 5,
    borderRadius: 5,
  },
  doneButtonText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: 'palevioletred',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  PomodoroButton: {
    width: 270,
    height: 270,
    borderRadius: 135,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  PomodoroButtonText: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
  },
  productiveSessionText: {
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 50,
    color: '#000',
  },
});

export default HomePage;
