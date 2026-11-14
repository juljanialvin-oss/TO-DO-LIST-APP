import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
import { getTasks, updateTask, deleteTask } from '../api';
import TaskItem from '../components/TaskItem';

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // All, Active, Completed

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTasks();
    });
    return unsubscribe;
  }, [navigation]);

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      // Optimistic update for snappy UI
      setTasks(tasks.map(t => t._id === id ? { ...t, completed: currentStatus } : t));
      await updateTask(id, { completed: currentStatus });
    } catch (err) {
      console.error(err);
      fetchTasks(); // Revert on failure
    }
  };

  const handleDelete = async (id) => {
    try {
      setTasks(tasks.filter(t => t._id !== id));
      await deleteTask(id);
    } catch (err) {
      console.error(err);
      fetchTasks();
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#16161A" />
      <View style={styles.webWrapper}>
        <View style={styles.header}>
          <Text style={styles.dateText}>{new Date().toDateString()}</Text>
          <Text style={styles.title}>Your Tasks</Text>
        </View>

        <View style={styles.filterContainer}>
          {['All', 'Active', 'Completed'].map(f => (
            <TouchableOpacity 
              key={f} 
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
              onPress={() => setFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#7F5AF0" style={{marginTop: 50}} />
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
               <TaskItem task={item} onComplete={handleToggleComplete} onDelete={handleDelete} />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>No tasks found</Text>
                <Text style={styles.emptyText}>Enjoy your free time!</Text>
              </View>
            }
          />
        )}

        <TouchableOpacity 
          style={styles.fab}
          onPress={() => navigation.navigate('AddTask')}
          activeOpacity={0.9}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#16161A' },
  webWrapper: { flex: 1, width: '100%', maxWidth: 600, alignSelf: 'center' },
  header: { paddingHorizontal: 24, paddingTop: 30, paddingBottom: 20 },
  dateText: { fontSize: 14, color: '#94A1B2', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5 },
  title: { fontSize: 34, fontWeight: 'bold', color: '#FFFFFE' },
  
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 15,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#2A2D3E',
  },
  filterBtnActive: {
    backgroundColor: '#7F5AF0',
  },
  filterText: {
    color: '#94A1B2',
    fontWeight: '600',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#FFFFFE',
  },

  listContainer: { paddingHorizontal: 24, paddingBottom: 120, paddingTop: 10 },
  
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyTitle: { color: '#FFFFFE', fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  emptyText: { color: '#94A1B2', fontSize: 16 },
  
  fab: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#2CB67D',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#2CB67D',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12
  },
  fabIcon: { fontSize: 32, color: '#FFFFFE', fontWeight: '300', marginTop: -2 }
});
