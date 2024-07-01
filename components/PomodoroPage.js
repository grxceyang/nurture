import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const growthKey = '@user:growth';

const PomodoroScreen = () => {
  const [seconds, setSeconds] = useState(1500); // 25 minutes in seconds
  const [breakSeconds, setBreakSeconds] = useState(300); // 5 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const intervalRef = useRef(null);

  const { width: screenWidth } = Dimensions.get('window');

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (isBreakActive) {
      intervalRef.current = setInterval(() => {
        setBreakSeconds((breakSeconds) => breakSeconds - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    if (seconds === 0 && isActive) {
      setIsActive(false);
      setIsBreakActive(true);
    }

    if (breakSeconds === 0 && isBreakActive) {
      setIsBreakActive(false);
      setSeconds(1500);
      setBreakSeconds(300);
      updateGrowthPoints(2); // Increment growth points by 2 for completing a pomodoro session
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isBreakActive, seconds, breakSeconds]);

  const toggle = () => {
    setIsActive(!isActive);
    setIsBreakActive(false);
  };

  const reset = () => {
    setSeconds(1500);
    setBreakSeconds(300);
    setIsActive(false);
    setIsBreakActive(false);
  };

  const updateGrowthPoints = async (increment) => {
    try {
      const growthValue = await AsyncStorage.getItem(growthKey);
      const currentGrowthPoints = growthValue ? parseInt(growthValue, 10) : 0;
      const updatedPoints = currentGrowthPoints + increment;
      await AsyncStorage.setItem(growthKey, updatedPoints.toString());
      console.log('Growth points updated:', updatedPoints);
    } catch (e) {
      console.log('Error updating growth points:', e);
    }
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const isSmallScreen = screenWidth < 400;

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={[styles.headerText, isSmallScreen && styles.headerTextSmall]}>Pomodoro Timer</Text>
        <Text style={[styles.timerText, isSmallScreen && styles.timerTextSmall]}>{formatTime(seconds)}</Text>
        <Text style={[styles.timerLabel, isSmallScreen && styles.timerLabelSmall]}>
          {isBreakActive ? "Break Time" : "Work Time"}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggle}>
          <Text style={[styles.buttonText, isSmallScreen && styles.buttonTextSmall]}>
            {isActive || isBreakActive ? "Pause" : "Start"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={[styles.buttonText, isSmallScreen && styles.buttonTextSmall]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    textAlign: 'left',
    padding: 20,
  },
  timerContainer: {
    backgroundColor: 'white',
    borderRadius: 40,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: '60%',
    alignSelf: 'center',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 32,
    padding: 10,
    color: 'palevioletred',
  },
  headerTextSmall: {
    fontSize: 22.4, // 70% of 32
  },
  timerText: {
    textAlign: 'center',
    fontSize: 48,
    color: 'black',
  },
  timerTextSmall: {
    fontSize: 33.6, // 70% of 48
  },
  timerLabel: {
    textAlign: 'center',
    fontSize: 24,
    color: 'grey',
    marginTop: 5,
  },
  timerLabelSmall: {
    fontSize: 16.8, // 70% of 24
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonTextSmall: {
    fontSize: 11.2,
  },
});

export default PomodoroScreen;
