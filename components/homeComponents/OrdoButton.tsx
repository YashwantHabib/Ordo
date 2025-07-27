import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export const OrdoButton = () => (
  <TouchableOpacity style={styles.container}>
    <Image
      source={require('../../assets/images/Ordo.png')}
      style={styles.image}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 180,
    right: 24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  image: {
    width: 40,
    height: 40,
  },
});
