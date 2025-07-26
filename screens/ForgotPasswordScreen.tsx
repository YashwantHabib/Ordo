import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormInput } from '../components/AuthFormInput';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordScreen = ({ navigation }: any) => {
  const { control, handleSubmit } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordData) => {
    console.log('Forgot Password Email:', data.email);
    // Handle password reset logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Reset Password</Text>
        <Image
          source={require('../assets/images/Ordo.png')}
          style={styles.image}
        />
      </View>

      <Text style={styles.subtitle}>
        Enter your email and we’ll send you a link to reset your password.
      </Text>

      <AuthFormInput control={control} name="email" placeholder="Email" />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.goBack()}>
        Back to Login
      </Text>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, marginTop: '30%' },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#5e17eb',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#5e17eb',
    textAlign: 'center',
  },
});
