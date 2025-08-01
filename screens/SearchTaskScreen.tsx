import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTaskStore } from '../utils/stateManagement/useTaskStore';
import { OrdoEmptyState } from '../components/OrdoEmptyState';
import { format } from 'date-fns';
import { Workflow } from 'lucide-react-native';
import { AnimatedCheckbox } from '../components/AnimatedChecbox';

const SearchTaskScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const tasks = useTaskStore(state => state.tasks);

  const filteredTasks = tasks.filter(task =>
    task.task_name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.filler}> </Text>
        <Text style={styles.headerTitle}>Search</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search tasks..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={filteredTasks}
        ListEmptyComponent={
          <OrdoEmptyState
            text={
              query
                ? 'No matching tasks found.'
                : 'Start typing to search your tasks.'
            }
            image={require('../assets/images/OrdoSearch.png')}
          />
        }
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const completedSubtasks = item.subtasks.filter(
            sub => sub.completed,
          ).length;
          const totalSubtasks = item.subtasks.length;

          return (
            <TouchableOpacity style={styles.taskCard} activeOpacity={0.9}>
              <View style={styles.taskRow}>
                <AnimatedCheckbox
                  checked={item.completed}
                  onToggle={() =>
                    useTaskStore.getState().toggleTaskCompleted(item.id)
                  }
                />

                <View style={styles.taskContent}>
                  <View style={styles.taskTextGroup}>
                    <Text
                      style={[
                        styles.taskTitle,
                        item.completed && {
                          textDecorationLine: 'line-through',
                          color: '#aaa',
                        },
                      ]}
                    >
                      {item.task_name}
                    </Text>
                    {item.datetime && (
                      <Text style={styles.dateText}>
                        {format(new Date(item.datetime), 'dd MMM yyyy')}
                      </Text>
                    )}
                  </View>
                  {totalSubtasks > 0 && (
                    <View style={styles.subtaskBadge}>
                      <Workflow size={14} color="#666" />
                      <Text style={styles.subtaskText}>
                        {completedSubtasks}/{totalSubtasks} subtasks
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SearchTaskScreen;

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
  filler: {
    height: 28,
    width: 28,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  searchBar: {
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#000',
  },
  taskCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTextGroup: {
    flex: 1,
    marginLeft: 12,
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  dateText: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  subtaskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  subtaskText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
});
