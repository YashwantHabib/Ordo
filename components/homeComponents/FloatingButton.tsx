import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export const FloatingButton = ({ children, onPress, style }: Props) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    {children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    backgroundColor: '#7047eb',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
});
