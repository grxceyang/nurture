import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, ScrollView } from 'react-native';

function HomeScreen() {
  const [goals, setGoals] = useState([]);
  const [goalInputs, setGoalInputs] = useState(['']);

  const handleGoalChange = (text, index) => {
    const newGoalInputs = [...goalInputs];
    newGoalInputs[index] = text;
    setGoalInputs(newGoalInputs);
  };

  const handleGoalAction = (index) => {
    const goal = goalInputs[index];
    if (goal.trim()) {
      setGoals([...goals, goal]);
      const newGoalInputs = goalInputs.filter((_, i) => i !== index);
      setGoalInputs(newGoalInputs.length ? newGoalInputs : ['']);
    } else {
      setGoalInputs([...goalInputs, '']);
    }
  };

  const removeGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
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
        {goalInputs.map((input, index) => (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter a new goal"
              value={input}
              onChangeText={(text) => handleGoalChange(text, index)}
              onSubmitEditing={() => handleGoalAction(index)}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={() => handleGoalAction(goalInputs.length - 1)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.PomodoroButton}>
        <Text style={styles.PomodoroButtonText}>POMODORO TIMER</Text>
      </TouchableOpacity>
      <Text style={styles.productiveSessionText}> Start a Productive Session Now! </Text>
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
    backgroundColor: '#f5f5f5'
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'palevioletred',
    marginBottom: 20,
  },
  goalsContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    alignSelf: 'center',
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
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 10,
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

export default HomeScreen;
