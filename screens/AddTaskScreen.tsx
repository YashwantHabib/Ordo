import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AddTaskInput from '../components/addTaskComponents/AddTaskInput';
import OrdoPill from '../components/OrdoPill';
import Subtask from '../components/SubTask';
import AddTaskDateTime from '../components/addTaskComponents/AddTaskDateTime';
import { OrdoButton } from '../components/OrdoButton';
import { OrdoLink } from '../components/OrdoLink';

const categories = [
  { id: '3', title: 'Memory Pad', emoji: '🧠' },
  { id: '4', title: 'Work', emoji: '💼' },
  { id: '5', title: 'Shopping', emoji: '🛒' },
  { id: '6', title: 'Ideas', emoji: '💡' },
  { id: '7', title: 'Personal', emoji: '👤' },
  { id: '8', title: 'Travel', emoji: '✈️' },
];
const recurrenceOptions = ['Daily', 'Weekly', 'Monthly'];

const AddTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Memory Pad');
  const [date, setDate] = useState(new Date());
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notify, setNotify] = useState(false);
  const [taskNote, setTaskNote] = useState('');
  const [recurrence, setRecurrence] = useState<string | null>(null);
  const [subtaskText, setSubtaskText] = useState('');
  const [subtasks, setSubtasks] = useState<
    { task_name: string; completed: boolean }[]
  >([]);

  const handleAddSubtask = () => {
    if (subtaskText.trim()) {
      setSubtasks(prev => [
        ...prev,
        { task_name: subtaskText.trim(), completed: false },
      ]);
      setSubtaskText('');
    }
  };

  const toggleSubtask = (index: number) => {
    setSubtasks(prev =>
      prev.map((s, i) => (i === index ? { ...s, completed: !s.completed } : s)),
    );
  };

  const showPicker = (mode: 'date' | 'time') => {
    setPickerMode(mode);
    setShowDatePicker(true);
  };

  const onDateTimeChange = (_: any, selectedValue?: Date) => {
    setShowDatePicker(false);
    if (selectedValue) setDate(selectedValue);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <OrdoLink text="Cancel" style={styles.cancelText} onPress={() => {}} />
        <Text style={styles.title}>New Task</Text>
        <OrdoLink text="Create" style={styles.createText} onPress={() => {}} />
      </View>

      <AddTaskInput
        placeholder="Task Name"
        value={taskName}
        onChangeText={setTaskName}
      />

      <View style={styles.pillContainer}>
        {categories.map(cat => (
          <OrdoPill
            key={cat.id}
            label={`${cat.emoji} ${cat.title}`}
            selected={selectedCategory === cat.title}
            onPress={() => setSelectedCategory(cat.title)}
          />
        ))}
      </View>

      <AddTaskDateTime
        date={date}
        notify={notify}
        onNotifyToggle={setNotify}
        onShowPicker={showPicker}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode={pickerMode}
          onChange={onDateTimeChange}
        />
      )}

      <AddTaskInput
        placeholder="Task Note"
        value={taskNote}
        onChangeText={setTaskNote}
        multiline
      />

      <Text style={styles.sectionLabel}>Repeat</Text>
      <View style={styles.pillContainer}>
        {[...recurrenceOptions, 'none'].map(option => (
          <OrdoPill
            key={option}
            label={option}
            selected={
              recurrence === option ||
              (option === 'none' && recurrence === null)
            }
            onPress={() => setRecurrence(option === 'none' ? null : option)}
          />
        ))}
      </View>

      <View style={styles.subtaskEntry}>
        <AddTaskInput
          placeholder="Add a subtask"
          value={subtaskText}
          onChangeText={setSubtaskText}
          style={styles.subtaskInput}
          placeholderTextColor="#999"
        />
        <OrdoButton
          style={styles.addBtn}
          onPress={handleAddSubtask}
          title="Add"
        />
      </View>

      {subtasks.map((sub, idx) => (
        <Subtask
          key={idx}
          task_name={sub.task_name}
          completed={sub.completed}
          onToggle={() => toggleSubtask(idx)}
        />
      ))}
    </ScrollView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: '15%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  cancelText: {
    marginTop: 0,
    color: 'gray',
    fontSize: 16,
  },
  createText: {
    marginTop: 0,
    fontSize: 16,
    fontWeight: '600',
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
  },
  subtaskEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  subtaskInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 16,
  },
  addBtn: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
});
