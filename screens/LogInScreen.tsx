import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormInput } from '../components/AuthFormInput';
import { OrdoButton } from '../components/OrdoButton';
import { OrdoLink } from '../components/OrdoLink';

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

      <OrdoButton title="Log In" onPress={handleSubmit(onSubmit)} />
      <OrdoLink
        text="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('ForgotPassword')}
      />
      <OrdoLink
        text="Forgot Password?"
        onPress={() => navigation.navigate('ForgotPassword')}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: '30%' },
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
});
