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
import { useTaskStore } from '../utils/stateManagement/useTaskStore';
import {
  Circle,
  CheckCircle,
  CalendarDays,
  ListTodo,
} from 'lucide-react-native';

const TaskListScreen = () => {
  const navigation = useNavigation();
  const selectedList = useCategoryStore(state => state.selectedList);
  const tasks = useTaskStore(state => state.tasks);

  const filteredTasks = selectedList
    ? tasks.filter(task => task.category === selectedList.title)
    : tasks;

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
        data={filteredTasks}
        ListEmptyComponent={
          <OrdoEmptyState
            text="No tasks yet in this list."
            image={require('../assets/images/OrdoEmptyBox.png')}
          />
        }
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const completedSubtasks = item.subtasks.filter(
            sub => sub.completed,
          ).length;
          const totalSubtasks = item.subtasks.length;
          const hasSubtasks = totalSubtasks > 0;

          return (
            <TouchableOpacity style={styles.taskCard} activeOpacity={0.8}>
              <View style={styles.taskHeader}>
                {item.completed ? (
                  <CheckCircle color="#5e17eb" size={22} />
                ) : (
                  <Circle color="#c4c4c4" size={22} />
                )}
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
              </View>

              {item.task_note ? (
                <Text style={styles.taskNote}>{item.task_note}</Text>
              ) : null}

              {hasSubtasks && (
                <View style={styles.subtaskBadge}>
                  <ListTodo size={14} color="#5e17eb" />
                  <Text style={styles.subtaskText}>
                    {completedSubtasks}/{totalSubtasks} subtasks
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
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
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },

  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flexShrink: 1,
  },

  taskNote: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
    lineHeight: 20,
  },

  subtaskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3edff',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },

  subtaskText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#5e17eb',
    fontWeight: '500',
  },
});
