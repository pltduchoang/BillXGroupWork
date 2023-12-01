import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Button} from '@rneui/themed';
import { updateCategoryData } from '../services/CategoryServices';
import { updateAccountData } from '../services/AccountServices';


const EditExpenseForm = ({ spending, category, account, isVisible, onSave, onDelete, onClose }) => {
  const [editedExpense, setEditedExpense] = useState(spending);
  const [categoryList, setCategoryList] = useState(category);
  const [accountList, setAccountList] = useState(account);
  const [belongToCategory, setBelongToCategory] = useState();
  const [firstBelongToCategory, setFirstBelongToCategory] = useState();
  const [belongToAccount, setBelongToAccount] = useState();
  const [firstBelongToAccount, setFirstBelongToAccount] = useState();
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  const handleSave = async () => {
    if (belongToCategory && firstBelongToCategory && belongToCategory !== firstBelongToCategory) {
      const updatedCategories = categoryList.map((category) => {
        if (category === firstBelongToCategory) {
          category.record = category.record.filter((id) => id !== editedExpense.id);
        }
        if (category === belongToCategory) {
          category.record.push(editedExpense.id);
        }
        return category;
      });
      await updateCategoryData(updatedCategories);
    };

    if (belongToAccount && firstBelongToAccount && belongToAccount !== firstBelongToAccount) {
      const updatedAccounts = accountList.map((account) => {
        if (account === firstBelongToAccount) {
          account.record = account.record.filter((id) => id !== editedExpense.id);
        }
        if (account === belongToAccount) {
          account.record.push(editedExpense.id);
        }
        return account;
      });
      await updateAccountData(updatedAccounts);
    };

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

  const handleCategorySelection = (selectedCategory) => {
    setBelongToCategory(selectedCategory);
    // Perform actions or updates when a category is selected
  };

  const handleAccountSelection = (selectedAccount) => {
    setBelongToAccount(selectedAccount);
    // Perform actions or updates when an account is selected
  };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setEditedExpense({ ...editedExpense, type });
  };

  useEffect(() => {
    setEditedExpense(spending);
    setCategoryList(category);
    setAccountList(account);

    if (spending && categoryList){

      const foundCategory = categoryList.find(category => category.record.includes(editedExpense.id));
      setBelongToCategory(foundCategory);
      setFirstBelongToCategory(foundCategory);
      setCategoryList(category);
      console.log('Category changed:', category);
    }
    if (spending && accountList){
    const foundAccount = accountList.find(account => account.record.includes(editedExpense.id));
    setBelongToAccount(foundAccount);
    setFirstBelongToAccount(foundAccount);
    console.log('Account changed:', account);
    setAccountList(account);
    }
    setSelectedType(editedExpense.type);
  }, [spending]);

  return (
    <Modal visible={isVisible} animationType="slide">
      <ScrollView>

      
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
          {categoryList && categoryList.length > 0 ? (
            categoryList.map((category) => (
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
            ))
          ) : (
            <Text style={styles.label}>No category</Text>
          )}

          <Text style={styles.label}>Account</Text>
          {accountList && accountList.length > 0 ? (
            accountList.map((account) => (
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
            ))
          ) : (
            <Text style={styles.label}>No account</Text>
          )}

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
      </ScrollView>
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
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '50%',
    backgroundColor: '#DDF2FD',
  },
  selectedButton: {
    backgroundColor: '#427D9D',
    // Additional styles for the selected button
  },
  buttonText: {
    textAlign: 'center',
    color: '#000', // Set the text color for buttons
  },
});
export default EditExpenseForm;
