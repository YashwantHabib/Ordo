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
import { Workflow } from 'lucide-react-native';
import { format } from 'date-fns';

const TaskListScreen = () => {
  const navigation = useNavigation();
  const selectedList = useCategoryStore(state => state.selectedList);
  const tasks = useTaskStore(state => state.tasks);
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
                  {hasSubtasks && (
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
    paddingHorizontal: 16,
    marginVertical: 10, // increased spacing between items
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    fontSize: 17, // increased from 16
    fontWeight: '600', // better contrast
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
