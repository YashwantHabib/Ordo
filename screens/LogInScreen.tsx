import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormInput } from '../components/AuthFormInput';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginScreen = ({ navigation }: any) => {
  const { control, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    console.log('Login Data:', data);
    // Handle sign in logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Welcome Back</Text>
        <Image
          source={require('../assets/images/OrdoWaving.png')}
          style={styles.image}
        />
      </View>

      <AuthFormInput control={control} name="email" placeholder="Email" />
      <AuthFormInput
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, marginTop: '30%' },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  image: {
    width: 50,
    height: 50,
    marginBottom: 24,
  },
  forgotText: {
    color: '#5e17eb',
    textAlign: 'right',
    marginBottom: 8,
  },
  link: { marginTop: 20, color: '#5e17eb', textAlign: 'center' },
  button: {
    backgroundColor: '#5e17eb',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});
