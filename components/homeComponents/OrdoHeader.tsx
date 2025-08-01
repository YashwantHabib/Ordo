import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStack';
import { useNavigation } from '@react-navigation/native';

export const OrdoHeader = () => {
  type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'HomeScreen'
  >;
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.header}>
      <Text style={styles.appTitle}>ordo</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchTaskScreen');
          }}
        >
          <Search size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileCircle}>
          <Text style={styles.profileInitials}>Y</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontWeight: '600',
  },
});
