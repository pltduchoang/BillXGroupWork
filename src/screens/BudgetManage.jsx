import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getBudgetData }  from '../services/BudgetServices';

function BudgetManage({ onBudgetCreate }) {
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState(['spend', 'gain']);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState('spend');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [description, setDescription] = useState('');

  const fetchedCategories = async () => {
    const result = await getBudgetData();
    setCategories(result.data);
  };

  useEffect(() => {
    fetchedCategories();
  }, []);

  const handleCreateBudget = () => {
    if (selectedCategory && budgetAmount && description) {
      const newBudgetData = {
        category: selectedCategory,
        type: selectedType,
        budget: budgetAmount,
        amount: 0,
        description: description,
      };

      onBudgetCreate(newBudgetData);

      setSelectedCategory(null);
      setSelectedType('spend');
      setBudgetAmount('');
      setDescription('');
    } else {
      alert('Please fill all the fields!')
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Budget Plan</Text>
      <View style={styles.rowContainer}>
        <View>
          <Text>Select Category:</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker1}
          >
            {categories.map((category) => (
              <Picker.Item key={category.id} label={category.categoryName} value={category.categoryName} />
            ))}
          </Picker>
        </View>

        <View>
          <Text>Select Type:</Text>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
            style={styles.picker2}
          >
            {types.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text>Enter Budget($):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={budgetAmount}
          onChangeText={(text) => setBudgetAmount(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Enter Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateBudget}>
          <Text>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#9BBEC8',
    padding: 10,
    borderRadius: 5,
  },
  picker1: {
    width: 200,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  picker2: {
    width: 150,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  title: {
    padding: 10,
    marginBottom: 50,
    textAlign: 'center',
    backgroundColor: '#164863',
    fontSize: 20,
    color: 'white',
  },
  text: {
    padding: 12,
    margin: 2,
    textAlign: 'left',
    backgroundColor: '#427D9D',
    fontSize: 16,
    color: 'white',
    width: 150,
  },
});

export default BudgetManage;
