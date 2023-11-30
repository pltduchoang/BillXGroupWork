import React from 'react';
import { SafeAreaView, View, Text,  ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { createSpending, getSpending } from '../services/SpendingServices';
import SpendingCard from '../components/SpendingCard';
import EditExpenseForm from '../components/EditExpenseForm';
import AddExpenseForm from '../components/AddExpenseForm';

function HomeAllTime() {
  const [spendingData, setSpendingData] = useState([]);
  const [thisMonthSpending, setThisMonthSpending] = useState([]);
  const [lastMonthSpending, setLastMonthSpending] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // [1, 12]
  const [thisMonthTotal, setThisMonthTotal] = useState(0);
  const [lastMonthTotal, setLastMonthTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);


  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const [thisMonthVisible, setThisMonthVisible] = useState(false);
  const [lastMonthVisible, setLastMonthVisible] = useState(false);


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
  
  const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // Process data
  const processSpendingData = () => {
    if (spendingData.length > 0) {
      const thisMonth = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth;
      });
      setThisMonthSpending(thisMonth.sort((a, b) => a.time - b.time));
      setThisMonthTotal(thisMonth.reduce((acc, expense) => acc + expense.amount, 0));
  
      const lastMonth = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth - 1;
      });
      setLastMonthSpending(lastMonth.sort((a, b) => a.time - b.time));
      setLastMonthTotal(lastMonth.reduce((acc, expense) => acc + expense.amount, 0));
    }
  };
  
  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);
  
  // Process spending data when spendingData changes
  useEffect(() => {
    processSpendingData();
  }, [spendingData]);

  

  //handle long press
  const handleLongPress = (expense) => {
    setSelectedExpense(expense);
    setEditModalVisible(true);
  };

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

  const handleDelete = async () => {
    setEditModalVisible(false);


    const updatedSpendingData = spendingData.filter((spending) => spending.id !== selectedExpense.id);
    await createSpending(updatedSpendingData);
    setSpendingData(updatedSpendingData);
  };

  const handleClose = () => {
    setEditModalVisible(false);
    setShowAddModal(false);
  };

  const handleAdd = () => {
    setShowAddModal(true);
  }

  const handleSaveNewExpense = async (newExpense) => {
    setShowAddModal(false);
    
    // Find the maximum ID from the existing spendingData
    const maxId = Math.max(...spendingData.map(expense => expense.id));
    
    // Assign a new ID to the newExpense
    const updatedNewExpense = {
      ...newExpense,
      id: maxId + 1 // Increment the maximum ID by 1 to assign a new ID
    };
    
    // Create a new database by adding the updatedNewExpense to spendingData
    const newDatabase = [...spendingData, updatedNewExpense];
    
    // Update the persistent storage
    await createSpending(newDatabase);
    
    // Update the state with the new spending data after it's saved
    setSpendingData(newDatabase);
  };


return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#164863' }}>
    <ScrollView>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#DDF2FD', marginBottom:50 }}>Welcome to Home Month View!</Text>
        <TouchableOpacity onPress={() => setThisMonthVisible(prevState => !prevState)} >
          <Text style={{ 
            color: '#164863',
            backgroundColor: '#9BBEC8', 
            width: 500, 
            textAlign: 'center',
            lineHeight: 50,
            }}>This month's record {monthList[currentMonth - 1]} - Balance: {thisMonthTotal}</Text>
        </TouchableOpacity>
        {thisMonthVisible && thisMonthSpending.map((expense) => (
          <SpendingCard key={expense.id} expense={expense} onLongPress={handleLongPress}/>
        ))}
        <TouchableOpacity onPress={() => setLastMonthVisible(prevState => !prevState)} style={{marginTop:50}}>
          <Text style={{ 
            color: '#164863',
            backgroundColor: '#9BBEC8', 
            width: 500, 
            textAlign: 'center',
            lineHeight: 50,
            }}>Last month's record {monthList[currentMonth - 2]} - Balance: {lastMonthTotal}</Text>
        </TouchableOpacity>
        {lastMonthVisible && lastMonthSpending.map((expense) => (
          <SpendingCard key={expense.id} expense={expense} onLongPress={handleLongPress}/>
        ))}
      </View>
    </ScrollView>
    {selectedExpense && (
        <EditExpenseForm
          expense={selectedExpense}
          isVisible={isEditModalVisible}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
     <TouchableOpacity
        style={styles.roundButton}
        onPress={handleAdd}
      >
        {/* You can add any content inside TouchableOpacity */}
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {showAddModal && (
        <AddExpenseForm
          isVisible={showAddModal}
          onSave={handleSaveNewExpense}
          onClose={handleClose}
        />
      )}
  </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  // Other styles...
  roundButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9BBEC8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeAllTime;


//Category
// id:
// catName:
// budget: !=0 
// record: [1,2,3,4,5]

//Account
// id:
// accName:
// balance:
// record: [1,2,3,4,5]

