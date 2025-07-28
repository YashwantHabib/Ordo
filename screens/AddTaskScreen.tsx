import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AddTaskInput from '../components/addTaskComponents/AddTaskInput';
import OrdoPill from '../components/OrdoPill';
import Subtask from '../components/SubTask';
import AddTaskDateTime from '../components/addTaskComponents/AddTaskDateTime';
import { OrdoButton } from '../components/OrdoButton';
import { OrdoLink } from '../components/OrdoLink';
import { useCategoryStore } from '../utils/stateManagement/useCategoryStore';
import { useTaskStore } from '../utils/stateManagement/useTaskStore';
import { RootStackParamList } from '../navigation/RootStack';
import { Workflow } from 'lucide-react-native';

const recurrenceOptions = ['Daily', 'Weekly', 'Monthly'];

const taskSchema = z.object({
  task_name: z.string().min(1, 'Task name is required'),
  task_note: z.string().optional(),
  category: z.string(),
  recurrence: z.enum(['Daily', 'Weekly', 'Monthly']).nullable().optional(),
});

type TaskSchema = z.infer<typeof taskSchema>;

const AddTaskScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const categories = useCategoryStore(state => state.categories);
  const addTask = useTaskStore(state => state.addTask);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      task_name: '',
      task_note: '',
      category: 'Memory Pad',
      recurrence: null,
    },
  });

  const [subtasks, setSubtasks] = useState<
    { task_name: string; completed: boolean }[]
  >([]);
  const [subtaskText, setSubtaskText] = useState('');
  const [date, setDate] = useState(new Date());
  const [notify, setNotify] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const onSubmit = (data: TaskSchema) => {
    addTask({
      id: '', // Zustand auto-generates
      task_name: data.task_name.trim(),
      task_note: data.task_note?.trim() || '',
      category: data.category,
      recurrence: data.recurrence || null,
      datetime: date.toISOString(),
      completed: false,
      notify,
      subtasks,
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <OrdoLink
          text="Cancel"
          style={styles.cancelText}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>New Task</Text>
        <OrdoLink
          text="Create"
          style={styles.createText}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      {/* Task Name */}
      <Controller
        control={control}
        name="task_name"
        render={({ field }) => (
          <AddTaskInput
            placeholder="Task Name"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.task_name?.message}
          />
        )}
      />

      {/* Category Pills */}
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <View style={styles.pillContainer}>
            {categories.map(cat => (
              <OrdoPill
                key={cat.id}
                label={`${cat.emoji} ${cat.title}`}
                selected={field.value === cat.title}
                onPress={() => field.onChange(cat.title)}
              />
            ))}
          </View>
        )}
      />

      {/* DateTime */}
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

      {/* Task Note */}
      <Controller
        control={control}
        name="task_note"
        render={({ field }) => (
          <AddTaskInput
            placeholder="Task Note"
            value={field.value}
            onChangeText={field.onChange}
            multiline
          />
        )}
      />

      {/* Recurrence */}
      <Text style={styles.sectionLabel}>Repeat</Text>
      <Controller
        control={control}
        name="recurrence"
        render={({ field }) => (
          <View style={styles.pillContainer}>
            {[...recurrenceOptions, 'none'].map(option => (
              <OrdoPill
                key={option}
                label={option}
                selected={
                  field.value === option ||
                  (option === 'none' && field.value === null)
                }
                onPress={() =>
                  field.onChange(option === 'none' ? null : option)
                }
              />
            ))}
          </View>
        )}
      />

      {/* Subtasks */}

      <View style={styles.subtaskEntry}>
        <Workflow size={24} />
        <TextInput
          placeholder="Add a subtask"
          value={subtaskText}
          onChangeText={setSubtaskText}
          style={styles.subtaskInput}
          placeholderTextColor="#999"
        />
        <OrdoLink onPress={handleAddSubtask} text="Add" style={styles.addBtn} />
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
    gap: 8,
  },
  subtaskInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 8,
  },

  addBtn: {
    marginTop: 0,
    fontSize: 18,
    fontWeight: '500',
  },
});
