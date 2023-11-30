import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Button} from '@rneui/themed';

const EditExpenseForm = ({ expense, isVisible, onSave, onDelete, onClose }) => {
  const [editedExpense, setEditedExpense] = useState(expense);
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);

  const handleSave = () => {
    onSave(editedExpense);
  };

  const handleDelete = () => {
    onDelete(editedExpense);
  };

  const handleDateTimeConfirm = (dateTime) => {
    setEditedExpense({ ...editedExpense, time: dateTime });
    setDateTimePickerVisible(false);
  };

  const showDateTimePicker = () => {
    setDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible(false);
  };

  useEffect(() => {
    console.log('Expense changed:', expense);
    setEditedExpense(expense);
  }, [expense]);

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Edit Expense</Text>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          value={editedExpense.amount.toString()}
          onChangeText={(text) => setEditedExpense({ ...editedExpense, amount: parseFloat(text) })}
          placeholder="Enter amount"
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.label}>Time</Text>
        <Button title="Pick Date and Time" onPress={showDateTimePicker} buttonStyle={{backgroundColor:'#9BBEC8'}}/>
        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="datetime"
          onConfirm={handleDateTimeConfirm}
          onCancel={hideDateTimePicker}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={editedExpense.description}
          onChangeText={(text) => setEditedExpense({ ...editedExpense, description: text })}
          placeholder="Enter description"
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} buttonStyle={{backgroundColor:'#9BBEC8'}}/>
          <Button title="Delete" onPress={handleDelete} buttonStyle={{backgroundColor:'#9BBEC8'}} />
          <Button title="Close" onPress={onClose} buttonStyle={{backgroundColor:'#9BBEC8'}}/>
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
  label: {
    color: '#DDF2FD',
    marginTop: 10,
    width: 350,
    textAlign: 'left',
    lineHeight: 50,
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
