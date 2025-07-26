import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const pages = [
  {
    title: 'Welcome to Ordo',
    description:
      'Ordo helps you create, manage, and complete tasks without the clutter. Stay on top of everything.',
    image: require('../assets/images/Ordo.png'),
  },
  {
    title: 'Talk, Don’t Type',
    description:
      'Say things like:\n "Remind me to call mom at 5pm"\n "Add gym workout every Friday"',
    image: require('../assets/images/OrdoListening.png'),
  },
  {
    title: 'Plan Your Days Clearly',
    description:
      'View upcoming tasks, set due times, and get a better sense of your schedule with Ordo’s smart calendar.',
    image: require('../assets/images/OrdoCalendar.png'),
  },
];

export default function OnboardingScreen() {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    if (page < pages.length - 1) {
      setPage(page + 1);
    } else {
      // Navigate to Home or mark onboarding complete
    }
  };

  return (
    <View style={styles.container}>
      {/* Indicators at top left */}
      <View style={styles.indicatorContainer}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, page === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Center Content */}
      <View style={styles.centerContent}>
        <Image
          source={pages[page].image}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{pages[page].title}</Text>
        <Text style={styles.description}>{pages[page].description}</Text>
      </View>

      {/* Bottom Right Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {page === pages.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 24,
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: 20,
    top: 50,
    left: 24,
    zIndex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginRight: 6,
  },
  activeDot: {
    backgroundColor: '#5e17eb',
    width: 40,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  image: {
    width: width * 0.7,
    height: height * 0.3,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    paddingHorizontal: 10,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    backgroundColor: '#5e17eb',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});
