import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';

interface AuthFormInputProps {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

export const AuthFormInput = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
}: AuthFormInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, error && styles.errorBorder]}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 12,
  },
  errorBorder: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    marginTop: 4,
    marginLeft: 8,
  },
});
