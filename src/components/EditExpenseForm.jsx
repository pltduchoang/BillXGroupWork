import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

const EditExpenseForm = ({ expense, isVisible, onSave, onDelete, onClose }) => {
  const [editedExpense, setEditedExpense] = useState(expense);

  const handleSave = () => {
    onSave(editedExpense);
  };

  const handleDelete = () => {
    onDelete(editedExpense);
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Edit Expense</Text>
        <Text style={
            {
                color: '#DDF2FD',
                marginTop: 50,
                width: 350,
                textAlign: 'left',
                lineHeight: 50,
            }
        }>Amount</Text>
        <TextInput
          value={editedExpense.amount.toString()}
          onChangeText={(text) => setEditedExpense({ ...editedExpense, amount: parseFloat(text) })}
          placeholder="Enter amount"
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={
            {
                color: '#DDF2FD',
                marginTop: 0,
                width: 350,
                textAlign: 'left',
                lineHeight: 50,
            }
        }>Category</Text>
        <TextInput
          value={editedExpense.category}
          onChangeText={(text) => setEditedExpense({ ...editedExpense, category: text })}
          placeholder="Enter category"
          style={styles.input}
        />
        {/* Other input fields */}
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Delete" onPress={handleDelete} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#164863',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#DDF2FD',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#DDF2FD',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
});

export default EditExpenseForm;