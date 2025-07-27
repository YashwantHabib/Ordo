import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Calendar, Clock, Bell } from 'lucide-react-native';

interface OrdoDateTimeProps {
  date: Date;
  notify: boolean;
  onNotifyToggle: (val: boolean) => void;
  onShowPicker: (mode: 'date' | 'time') => void;
}

const AddTaskDateTime = ({
  date,
  notify,
  onNotifyToggle,
  onShowPicker,
}: OrdoDateTimeProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <TouchableOpacity
          onPress={() => onShowPicker('date')}
          style={styles.button}
        >
          <Calendar size={20} />
          <Text style={styles.text}>{date.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onShowPicker('time')}
          style={styles.button}
        >
          <Clock size={20} />
          <Text style={styles.text}>
            {date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notify}>
        <Bell size={20} />
        <Text style={styles.text}>Notify me</Text>
        <Switch
          value={notify}
          onValueChange={onNotifyToggle}
          trackColor={{ false: '#ccc', true: '#5e17eb' }}
          thumbColor={notify ? '#fff' : '#eee'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 8,
    gap: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 8,
  },
  text: {
    marginLeft: 6,
    color: '#333',
    fontSize: 14,
  },
  notify: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddTaskDateTime;
