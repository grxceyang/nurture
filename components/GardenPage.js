import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const plantImages = [
  require('../assets/stage1.png'),
  require('../assets/stage2.png'),
  require('../assets/stage3.png'),
  require('../assets/stage4.png'),
];

const growthKey = '@user:growth';

function GardenPage() {
  const [growthPoints, setGrowthPoints] = useState(0);
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false); // State to trigger re-render

  useEffect(() => {
    if (isFocused) {
      getGrowthPoints();
    }
  }, [isFocused, refresh]);

  const getGrowthPoints = async () => {
    try {
      const growthValue = await AsyncStorage.getItem(growthKey);
      if (growthValue !== null) {
        setGrowthPoints(parseInt(growthValue, 10));
      }
    } catch (e) {
      console.log('Error reading growth points from AsyncStorage:', e);
    }
  };

  const calculatePlantStages = () => {
    const plants = [];
    let remainingGrowthPoints = growthPoints;

    while (remainingGrowthPoints > 0) {
      for (let i = 0; i < 10; i++) {
        if (remainingGrowthPoints > 0) {
          const stage = Math.min(remainingGrowthPoints, 4);
          plants.push(stage);
          remainingGrowthPoints -= stage;
        } else {
          break;
        }
      }
    }

    return plants;
  };

  const plantStages = calculatePlantStages();

  return (
    <View style={styles.pageContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topSpacer} />
        {[...Array(5)].map((_, shelfIndex) => (
          <View key={shelfIndex} style={styles.shelfContainer}>
            {plantStages.slice(shelfIndex * 2, shelfIndex * 2 + 2).map((stage, plantIndex) => (
              <View key={plantIndex} style={styles.plantWrapper}>
                <Image
                  source={plantImages[stage - 1]}
                  style={styles.plantImage}
                />
              </View>
            ))}
            <View style={styles.shelf} />
          </View>
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
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the top
    paddingVertical: 20,
  },
  topSpacer: {
    height: 20, // Add space at the top to prevent overlap
  },
  shelfContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end', // Align items to the bottom of the shelf
    marginVertical: 35, // Adjust vertical margin to create space between shelves
    position: 'relative', // Ensure relative positioning for absolute positioning of plantImage
    height: 130, // Ensure enough height to contain the plant images
  },
  shelf: {
    width: 300,
    height: 25,
    backgroundColor: 'burlywood',
    borderRadius: 1,
    position: 'absolute',
    bottom: 0,
  },
  plantWrapper: {
    position: 'relative',
    width: 100, // Width of the plant image container
    marginHorizontal: 10,
    height: 130, // Ensure enough height to contain the plant images
  },
  plantImage: {
    position: 'absolute',
    bottom: 25, // Align bottom of the plant image with the top of the shelf
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default GardenPage;
