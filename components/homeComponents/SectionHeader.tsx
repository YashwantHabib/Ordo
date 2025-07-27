import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

export const SectionHeader = ({ title, actionLabel, onActionPress }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {actionLabel && (
      <TouchableOpacity onPress={onActionPress}>
        <Text style={styles.action}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: 'gray',
  },
  action: {
    color: '#5e17eb',
    fontSize: 16,
  },
});
