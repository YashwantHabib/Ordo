import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface OrdoPillProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const OrdoPill = ({ label, selected, onPress }: OrdoPillProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.pill, selected && styles.pillSelected]}
    >
      <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
  },
  pillSelected: {
    backgroundColor: '#5e17eb',
  },
  pillText: {
    fontSize: 14,
    color: 'black',
  },
  pillTextSelected: {
    color: 'white',
    fontWeight: '500',
  },
});

export default OrdoPill;
