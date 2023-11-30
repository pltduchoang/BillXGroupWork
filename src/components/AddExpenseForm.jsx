import React, { useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from 'react-native-elements';

const AddExpenseForm = ({ isVisible, onSave, onClose }) => {
  const [newExpense, setNewExpense] = useState({
    amount: '',
    time: '',
    description: '',
  });

  const [isDateTimePickerVisible, setDateTimePickerVisibility] = useState(false);

  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleDateTimeConfirm = (date) => {
    setNewExpense({ ...newExpense, time: date });
    hideDateTimePicker();
  };

  const isFloat = (value) => {
    // Parse the value as a float
    const floatValue = parseFloat(value);
    
    // Check if the parsed value is a number and not NaN (Not a Number)
    return !isNaN(floatValue) && Number.isFinite(floatValue) && Number(floatValue) === floatValue;
  };


  const handleSave = () => {
    if (!newExpense.time) {
      setNewExpense((prevExpense) => {
        const updatedExpense = { ...prevExpense, time: new Date().toISOString() };
        onSave(updatedExpense);
      });
    } else if (!isFloat(newExpense.amount || !newExpense.amount)) {
      alert('Please enter a valid amount');
      return;
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.title}>Add Expense</Text>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          value={newExpense.amount}
          onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
          placeholder="Enter amount"
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.label}>Time</Text>
        <Button
          title="Pick Date and Time"
          onPress={showDateTimePicker}
          buttonStyle={styles.datePickerButton}
        />
        <DateTimePickerModal
          isVisible={isDateTimePickerVisible}
          mode="datetime"
          onConfirm={handleDateTimeConfirm}
          onCancel={hideDateTimePicker}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          value={newExpense.description}
          onChangeText={(text) => setNewExpense({ ...newExpense, description: text })}
          placeholder="Enter description"
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} buttonStyle={styles.button}/>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
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
    marginTop: 20,
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
  datePickerButton: {
    backgroundColor: '#9BBEC8',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#9BBEC8',
    borderRadius: 5,
    padding: 10,
    width: '48%', // Adjust the width as per your preference
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddExpenseForm;
