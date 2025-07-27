import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { Search, Plus } from 'lucide-react-native';

const otherLists = [
  { id: '3', title: 'Memory Pad', emoji: '🧠' },
  { id: '4', title: 'Work', emoji: '💼' },
  { id: '5', title: 'Shopping', emoji: '🛒' },
  { id: '6', title: 'Ideas', emoji: '💡' },
  { id: '7', title: 'Personal', emoji: '👤' },
  { id: '8', title: 'Travel', emoji: '✈️' },
];

const HomeScreen = () => {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.listItem}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.listText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>ordo</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Search size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileCircle}>
            <Text style={styles.profileInitials}>Y</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.topSection}>
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.emoji}>📋</Text>
          <Text style={styles.listText}>All Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.emoji}>📅</Text>
          <Text style={styles.listText}>Calendar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Lists</Text>
        <TouchableOpacity>
          <Text style={styles.newListText}>＋ New List</Text>
        </TouchableOpacity>
      </View>

      {/* Other Lists */}
      <FlatList
        style={styles.categories}
        data={otherLists}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      {/* Floating Buttons */}
      <TouchableOpacity style={styles.ordoButton}>
        <Image
          source={require('../assets/images/Ordo.png')}
          style={styles.ordoImage}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.floatingButton}>
        <Plus size={24} color="white" />
      </TouchableOpacity>
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
  icon: {
    fontSize: 20,
    marginRight: 12,
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
  topSection: {
    marginTop: '10%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  categories: {
    paddingVertical: 20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listText: {
    fontSize: 18,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 22,
    color: 'gray',
  },
  newListText: {
    color: '#5e17eb',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    backgroundColor: '#7047eb',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  ordoButton: {
    position: 'absolute',
    bottom: 180,
    right: 24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  ordoImage: {
    width: 40,
    height: 40,
  },
});
