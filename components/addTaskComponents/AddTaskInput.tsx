import React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TextInputProps,
} from 'react-native';

interface AddTaskInputProps extends TextInputProps {
  error?: string;
}

const AddTaskInput: React.FC<AddTaskInputProps> = ({
  error,
  style,
  ...rest
}) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={[styles.input, style, error && styles.errorBorder]}
        {...rest}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  errorBorder: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default AddTaskInput;
