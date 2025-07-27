import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { OrdoHeader } from '../components/homeComponents/OrdoHeader';
import { ListItem } from '../components/homeComponents/ListItem';
import { SectionHeader } from '../components/homeComponents/SectionHeader';
import { FloatingButton } from '../components/homeComponents/FloatingButton';
import { OrdoButton } from '../components/homeComponents/OrdoButton';

const categories = [
  { id: '3', title: 'Memory Pad', emoji: '🧠' },
  { id: '4', title: 'Work', emoji: '💼' },
  { id: '5', title: 'Shopping', emoji: '🛒' },
  { id: '6', title: 'Ideas', emoji: '💡' },
  { id: '7', title: 'Personal', emoji: '👤' },
  { id: '8', title: 'Travel', emoji: '✈️' },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <OrdoHeader />

      <View style={styles.topSection}>
        <ListItem emoji="📋" title="All Tasks" />
        <ListItem emoji="📅" title="Calendar" />
      </View>

      <SectionHeader title="Lists" actionLabel="＋ New List" />

      <FlatList
        style={styles.categories}
        data={categories}
        renderItem={({ item }) => (
          <ListItem emoji={item.emoji} title={item.title} />
        )}
        keyExtractor={item => item.id}
      />

      <OrdoButton />
      <FloatingButton>
        <Plus size={24} color="white" />
      </FloatingButton>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '20%',
    paddingHorizontal: 20,
  },
  topSection: {
    paddingTop: '10%',
  },
  categories: {
    paddingVertical: 20,
  },
});
