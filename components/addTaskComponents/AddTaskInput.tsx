import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

const AddTaskInput = (props: TextInputProps) => {
  return (
    <TextInput style={styles.input} placeholderTextColor="#999" {...props} />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },
});

export default AddTaskInput;
