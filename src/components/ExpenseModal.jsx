import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import { ScrollView } from 'react-native';
import { Button } from '@rneui/themed';
import EditExpenseForm from './EditExpenseForm';
import { getAccountData } from '../services/AccountServices';
import { getCategoryData } from '../services/CategoryServices';
import { getSpending, createSpending } from '../services/SpendingServices';
import { useAppContext } from '../utils/AppContext';
import { useNavigation } from '@react-navigation/native';

const ExpenseModal = ({ visible, expenses, closeModal}) => {

    const [spendingData, setSpendingData] = useState(expenses);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accountData, setAccountData] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const navigation = useNavigation();

    //Handle global state of database
    const { databaseVersion, setDatabaseVersion } = useAppContext();

    
    const handleLongPress = (spending) => {
        console.log("ExpenseModal: handleLongPress: spending: ", spending);
        setSelectedExpense(spending);
        setEditModalVisible(true);
      };

      const fetchData = async () => {
        setLoading(true);
        const result = await getSpending();
        if (result && result.length > 0) {
          setSpendingData(result);
        } else {
          console.error('Error fetching spending data:', result?.message);
        }
        setLoading(false);
      };

      const fetchAccountData = async () => {
        setLoading(true);
        const result = await getAccountData();
        setLoading(false);
        if (result.success) {
          setAccountData(result.data);
          console.log(result.data);
        } else {
          console.error('Error fetching account data:', result.error);
        }
      };
    
      const fetchCategoryData = async () => {
        setLoading(true);
        const result = await getCategoryData();
        setLoading(false);
        if (result.success) {
            setCategoryData(result.data);
            console.log(result.data);
        } else {
          console.error('Error fetching category data:', result.error);
        }
      };

      const handleClose = () => {
        setEditModalVisible(false);
      };

      const handleDelete = async () => {
        setEditModalVisible(false);
        const updatedSpendingData = spendingData.filter((spending) => spending.id !== selectedExpense.id);
        await createSpending(updatedSpendingData);
        setSpendingData(updatedSpendingData);
      };

    //handle save on edit expense form
    const handleSave = (editedSpending) => {
        const updatedSpendingData = spendingData.map((spending) => {
        if (spending.id === editedSpending.id) {
            return {
            ...spending,
            amount: editedSpending.amount,
            time: editedSpending.time,
            description: editedSpending.description,
            };
        }
        return spending;
        });
        setSpendingData(updatedSpendingData);
        createSpending(updatedSpendingData);
        setEditModalVisible(false);
    };

    useEffect(() => {
        fetchAccountData();
        fetchCategoryData();
        fetchData();
      }, []);

    useEffect(() => {
      fetchAccountData();
      fetchCategoryData();
      fetchData();
    }, [databaseVersion]);


    
    return (
      <Modal visible={visible} animationType="slide" >
        <ScrollView style={{backgroundColor:"#164863"}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  marginTop: 20, }}>
          <Text style={{color:"#DDF2FD", marginBottom: 20, fontSize: 20}}>Expenses This Month</Text>
          {expenses && expenses.map((spending) => (
            <TouchableOpacity style={{marginBottom: 20}} key={spending.id}
            onPress={() => handleLongPress(spending)}>
            <Card
              containerStyle={
                {
                  backgroundColor: spending.type === 'spend' ? "#427D9D" : "#9BBEC8",
                  width: 300,
                  height: 90,
                  borderRadius: 10,
                  borderColor: "#164863",
                  borderWidth: 2,
                  margin: 10,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }
              }>
                <Text style={{ color: "#DDF2FD", textAlign:'center'}}>{spending.amount}</Text>
                <Text style={{ color: "#DDF2FD", textAlign:'center'}}>{spending.description}</Text>
              </Card>
          </TouchableOpacity>
          ))}
          <TouchableOpacity style={{marginBottom: 40, backgroundColor: '#427D9D', padding: 20, borderRadius:10}} onPress={closeModal}>
              <Text style={{ color: '#DDF2FD', textAlign:'center'}}> Close </Text>
          </TouchableOpacity>
          
        </View>
        </ScrollView>
        {isEditModalVisible && selectedExpense && (
            <EditExpenseForm
            spending={selectedExpense}
            account={accountData}
            category={categoryData}
            isVisible={isEditModalVisible}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={handleClose}
            />
        )}
      </Modal>
    );
  };
  
  export default ExpenseModal;