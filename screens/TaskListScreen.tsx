import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategoryStore } from '../utils/stateManagement/useCategoryStore';
import { OrdoEmptyState } from '../components/OrdoEmptyState';

const TaskListScreen = () => {
  const navigation = useNavigation();
  const selectedList = useCategoryStore(state => state.selectedList);
  const allCategories = useCategoryStore(state => state.categories);
  const tasksToShow = selectedList ? [selectedList] : allCategories;

  const { title, emoji } = selectedList
    ? selectedList
    : { title: 'All Tasks', emoji: '📋' };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{emoji} </Text>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={28} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={[]}
        ListEmptyComponent={
          <OrdoEmptyState
            text="No tasks yet in this list."
            image={require('../assets/images/OrdoEmptyBox.png')}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.taskItem}>{item}</Text>}
      />
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 40,
  },
  taskItem: {
    fontSize: 18,
    marginBottom: 12,
  },
});
