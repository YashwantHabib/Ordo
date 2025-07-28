import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useCategoryStore } from '../utils/stateManagement/useCategoryStore';
import AddTaskInput from './addTaskComponents/AddTaskInput';

const emojiOptions = [
  '🧠',
  '💼',
  '🛒',
  '💡',
  '👤',
  '✈️',
  '🎯',
  '📚',
  '🎉',
  '🎵',
  '🎬',
  '🏀',
  '📖',
  '🍔',
  '💰',
  '📝',
  '🧘',
  '🌱',
  '💻',
  '📅',
  '🔧',
  '🛠️',
  '🧹',
  '🛏️',
  '🎮',
  '🎨',
  '🎓',
  '🪴',
  '🏡',
  '🐶',
];

type Props = {
  visible: boolean;
  onClose: () => void;
};

export const NewListModal = ({ visible, onClose }: Props) => {
  const [title, setTitle] = React.useState('');
  const [selectedEmoji, setSelectedEmoji] = React.useState<string | null>(null);
  const addCategory = useCategoryStore(state => state.addCategory);

  const handleCreate = () => {
    if (!title || !selectedEmoji) return;
    addCategory(title, selectedEmoji);
    setTitle('');
    setSelectedEmoji(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>New List</Text>

          <AddTaskInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Choose Emoji</Text>
          <FlatList
            data={emojiOptions}
            numColumns={6}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.emojiButton,
                  selectedEmoji === item && styles.selectedEmoji,
                ]}
                onPress={() => setSelectedEmoji(item)}
              >
                <Text style={styles.emojiText}>{item}</Text>
              </TouchableOpacity>
            )}
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreate}>
              <Text style={styles.create}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  emojiButton: {
    padding: 10,
    margin: 4,
    borderRadius: 8,
  },
  selectedEmoji: {
    backgroundColor: '#5e17eb',
  },
  emojiText: {
    fontSize: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancel: {
    color: 'red',
    fontSize: 16,
  },
  create: {
    color: 'blue',
    fontSize: 16,
  },
});
