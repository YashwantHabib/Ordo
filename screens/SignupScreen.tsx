import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormInput } from '../components/AuthFormInput';

const signupSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
});

type SignupData = z.infer<typeof signupSchema>;

const SignupScreen = ({ navigation }: any) => {
  const { control, handleSubmit } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupData) => {
    console.log('Signup Data:', data);
    // Handle sign up logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Create Account</Text>
        <Image
          source={require('../assets/images/Ordo.png')}
          style={styles.image}
        />
      </View>
      <AuthFormInput control={control} name="name" placeholder="Name" />
      <AuthFormInput control={control} name="email" placeholder="Email" />
      <AuthFormInput
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Log In
      </Text>
    </View>
  );
};

export default SignupScreen;

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
