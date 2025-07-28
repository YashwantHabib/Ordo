import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { OrdoHeader } from '../components/homeComponents/OrdoHeader';
import { ListItem } from '../components/homeComponents/ListItem';
import { FloatingButton } from '../components/homeComponents/FloatingButton';
import { OrdoButton } from '../components/homeComponents/OrdoButton';
import { OrdoLink } from '../components/OrdoLink';
import { useCategoryStore } from '../utils/stateManagement/useCategoryStore';
import { NewListModal } from '../components/NewListModal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootStack';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const categories = useCategoryStore(state => state.categories);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setSelectedList = useCategoryStore(state => state.setSelectedList);

  return (
    <View style={styles.container}>
      <OrdoHeader />

      <View style={styles.topSection}>
        <ListItem
          emoji="📋"
          title="All Tasks"
          onPress={() => {
            setSelectedList(null);
            navigation.navigate('TaskListScreen');
          }}
        />
        <ListItem emoji="📅" title="Calendar" />
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.title}>Lists</Text>
        <OrdoLink
          style={styles.action}
          onPress={() => setModalVisible(true)}
          text="+ New List"
        />
      </View>

      <FlatList
        style={styles.categories}
        data={categories}
        renderItem={({ item }) => (
          <ListItem
            emoji={item.emoji}
            title={item.title}
            onPress={() => {
              setSelectedList(item);
              navigation.navigate('TaskListScreen');
            }}
          />
        )}
        keyExtractor={item => item.id}
      />

      <OrdoButton />
      <FloatingButton
        onPress={() => {
          navigation.navigate('AddTaskScreen');
        }}
      >
        <Plus size={24} color="white" />
      </FloatingButton>

      <NewListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
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
  topSection: {
    paddingTop: '10%',
  },
  categories: {
    paddingVertical: 20,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: 'gray',
  },
  action: {
    marginTop: 0,
    fontSize: 16,
  },
});
