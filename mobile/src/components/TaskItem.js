import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, onComplete, onDelete }) {
  return (
    <View style={[styles.card, task.completed && styles.cardCompleted]}>
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => onComplete(task._id, !task.completed)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxActive]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.textCompleted]}>
          {task.title}
        </Text>
        {task.description ? (
          <Text style={[styles.description, task.completed && styles.textCompletedDesc]} numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}
      </View>
      
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(task._id)}>
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2D3E',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  cardCompleted: {
    opacity: 0.75,
  },
  checkboxContainer: {
    marginRight: 15,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#7F5AF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#7F5AF0',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFE',
    marginBottom: 4,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A1B2',
  },
  description: {
    fontSize: 14,
    color: '#94A1B2',
    lineHeight: 20,
  },
  textCompletedDesc: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 80, 80, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    color: '#FF5050',
    fontSize: 14,
    fontWeight: 'bold',
  }
});
