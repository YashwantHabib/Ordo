import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';

interface OrdoLinkProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: TextStyle;
}

export const OrdoLink = ({ text, onPress, style = {} }: OrdoLinkProps) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={[styles.link, style]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  link: {
    marginTop: 20,
    color: '#5e17eb',
    textAlign: 'center',
  },
});
