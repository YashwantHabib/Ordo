import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { ListFilter, X } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useCategoryStore } from '../utils/stateManagement/useCategoryStore';
import { OrdoEmptyState } from '../components/OrdoEmptyState';
import { useTaskStore } from '../utils/stateManagement/useTaskStore';
import { AnimatedCheckbox } from '../components/AnimatedChecbox';
import OrdoPill from '../components/OrdoPill';
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
  const toggleTaskCompleted = useTaskStore(state => state.toggleTaskCompleted);
  const [filter, setFilter] = React.useState<
    'All' | 'Completed' | 'Uncompleted'
  >('All');

  const filteredTasks = selectedList
    ? tasks.filter(task => task.category === selectedList.title)
    : tasks;

  const visibleTasks = filteredTasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Uncompleted') return !task.completed;
    return true; // All
  });

  const { title, emoji } = selectedList
    ? selectedList
    : { title: 'All Tasks', emoji: '📋' };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.filler}> </Text>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.pillContainer}>
        <ListFilter size={28} color="black" />
        {['All', 'Completed', 'Uncompleted'].map(type => {
          const count =
            type === 'All'
              ? filteredTasks.length
              : type === 'Completed'
              ? filteredTasks.filter(task => task.completed).length
              : filteredTasks.filter(task => !task.completed).length;

          return (
            <OrdoPill
              key={type}
              label={`${type} (${count})`}
              selected={filter === type}
              onPress={() => setFilter(type as typeof filter)}
            />
          );
        })}
      </View>

      <FlatList
        data={visibleTasks}
        ListEmptyComponent={
          <OrdoEmptyState
            text={
              filter === 'Completed'
                ? 'No completed tasks.'
                : filter === 'Uncompleted'
                ? 'No uncompleted tasks.'
                : 'No tasks yet in this list.'
            }
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
                <AnimatedCheckbox
                  checked={item.completed}
                  onToggle={() =>
                    useTaskStore.getState().toggleTaskCompleted(item.id)
                  }
                />

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
  filler: {
    height: 28,
    width: 28,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
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
