import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from '@rneui/themed';// Assuming you have a service for creating expenses
import { updateCategoryData } from '../services/CategoryServices';
import { updateAccountData } from '../services/AccountServices';

const AddExpenseForm = ({ category, account, nextID, isVisible, onSave, onClose }) => {
  const [newExpense, setNewExpense] = useState({
    amount: '',
    type: '',
    time: '',
    description: '',
  });
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const [categoryList, setCategoryList] = useState(category);
  const [accountList, setAccountList] = useState(account);
  const [belongToCategory, setBelongToCategory] = useState();
  const [belongToAccount, setBelongToAccount] = useState();



  const handleSave = async () => {
    const updatedCategories = categoryList.map((category) => {
      if (category === belongToCategory) {
        category.record.push(nextID);
      }
      return category;
    });
    await updateCategoryData(updatedCategories);

    const updatedAccounts = accountList.map((account) => {
      if (account === belongToAccount) {
        account.record.push(nextID);
      }
      return account;
    });

    await updateAccountData(updatedAccounts);
    onSave(newExpense); // Trigger callback to inform the parent component about the save action
  };

  const handleDateTimeConfirm = (dateTime) => {
    setNewExpense({ ...newExpense, time: dateTime });
    setDateTimePickerVisible(false);
  };

  const showDateTimePicker = () => {
    setDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisible(false);
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setNewExpense({ ...newExpense, type });
  };

  const handleCategorySelection = (selectedCategory) => {
    setBelongToCategory(selectedCategory);
    // Perform actions or updates when a category is selected
  };

  const handleAccountSelection = (selectedAccount) => {
    setBelongToAccount(selectedAccount);
    // Perform actions or updates when an account is selected
  };

  useEffect(() => {
    setCategoryList(category);
    setAccountList(account);
  },[]);

  return (
    <Modal visible={isVisible} animationType="slide">
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Add Expense</Text>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            value={newExpense.amount.toString()}
            onChangeText={(text) => setNewExpense({ ...newExpense, amount: parseFloat(text) })}
            placeholder="Enter amount"
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Time</Text>
          <Button title="Pick Date and Time" onPress={showDateTimePicker} buttonStyle={{ backgroundColor: '#9BBEC8' }} />
          <DateTimePickerModal
            isVisible={isDateTimePickerVisible}
            mode="datetime"
            onConfirm={handleDateTimeConfirm}
            onCancel={hideDateTimePicker}
          />
          <Text style={styles.label}>Type</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedType === 'gain' ? styles.selectedButton : null,
              ]}
              onPress={() => handleTypeSelection('gain')}
            >
              <Text style={styles.buttonText}>Gain</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedType === 'spend' ? styles.selectedButton : null,
              ]}
              onPress={() => handleTypeSelection('spend')}
            >
              <Text style={styles.buttonText}>Spend</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Category</Text>
          {categoryList.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.button,
                belongToCategory === category ? styles.selectedButton : null,
              ]}
              onPress={() => handleCategorySelection(category)}
            >
              <Text style={styles.buttonText}>{category.categoryName}</Text>
            </TouchableOpacity>
          ))}

          <Text style={styles.label}>Account</Text>
          {accountList.map((account) => (
            <TouchableOpacity
              key={account.id}
              style={[
                styles.button,
                belongToAccount === account ? styles.selectedButton : null,
              ]}
              onPress={() => handleAccountSelection(account)}
            >
              <Text style={styles.buttonText}>{account.accountName}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={newExpense.description}
            onChangeText={(text) => setNewExpense({ ...newExpense, description: text })}
            placeholder="Enter description"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleSave} buttonStyle={{ backgroundColor: '#9BBEC8' }} />
            <Button title="Close" onPress={onClose} buttonStyle={{ backgroundColor: '#9BBEC8' }} />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

// Styles...



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
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#DDF2FD',
  },
  selectedButton: {
    backgroundColor: '#9BBEC8',
    // Additional styles for the selected button
  },
  buttonText: {
    textAlign: 'center',
    color: '#000', // Set the text color for buttons
  },
});
export default AddExpenseForm;
