import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  emoji: string;
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const ListItem = ({ emoji, title, onPress, style }: Props) => (
  <TouchableOpacity style={[styles.listItem, style]} onPress={onPress}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={styles.listText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  listText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
