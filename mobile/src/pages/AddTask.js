import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { addTask } from '../api';

export default function AddTask({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    if (!title.trim()) return;
    try {
      await addTask({ title, description });
      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.webWrapper}>
        <View style={styles.formCard}>
          <Text style={styles.header}>New Task</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>What do you need to do?</Text>
            <TextInput
              style={styles.input}
              placeholder="E.g., Buy groceries..."
              placeholderTextColor="#94A1B2"
              value={title}
              onChangeText={setTitle}
              autoFocus
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Details (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Any extra notes..."
              placeholderTextColor="#94A1B2"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <TouchableOpacity 
            style={[styles.submitBtn, !title.trim() && styles.submitBtnDisabled]} 
            onPress={handleSave}
            disabled={!title.trim()}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#16161A', padding: 20, justifyContent: 'center' },
  webWrapper: { width: '100%', maxWidth: 600, alignSelf: 'center' },
  formCard: {
    backgroundColor: '#2A2D3E',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 10,
  },
  header: { fontSize: 26, fontWeight: 'bold', color: '#FFFFFE', marginBottom: 25 },
  inputGroup: { marginBottom: 24 },
  label: { color: '#94A1B2', fontSize: 13, marginBottom: 8, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#16161A',
    color: '#FFFFFE',
    padding: 16,
    borderRadius: 14,
    fontSize: 16,
  },
  textArea: { height: 110, textAlignVertical: 'top' },
  submitBtn: {
    backgroundColor: '#7F5AF0',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10
  },
  submitBtnDisabled: {
    backgroundColor: '#4A4C5E'
  },
  submitText: { color: '#FFFFFE', fontSize: 16, fontWeight: 'bold' }
});
