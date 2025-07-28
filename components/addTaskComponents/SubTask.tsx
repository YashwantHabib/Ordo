import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckSquare, Square } from 'lucide-react-native';

interface OrdoSubtaskProps {
  task_name: string;
  completed: boolean;
  onToggle: () => void;
}

const Subtask = ({ task_name, completed, onToggle }: OrdoSubtaskProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle}>
        {completed ? (
          <CheckSquare color="#5e17eb" size={20} />
        ) : (
          <Square color="#888" size={20} />
        )}
      </TouchableOpacity>
      <Text
        style={[
          styles.text,
          completed && { textDecorationLine: 'line-through', color: '#aaa' },
        ]}
      >
        {task_name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
    paddingLeft: 28,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default Subtask;
