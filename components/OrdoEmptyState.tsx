import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  image?: ImageSourcePropType; // optional, defaults to Ordo image
  text: string;
};

export const OrdoEmptyState = ({ image, text }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={image || require('../assets/images/Ordo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    paddingTop: '50%',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
});
