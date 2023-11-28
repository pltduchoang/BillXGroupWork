import React from 'react';
import { SafeAreaView, View, Text, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { getSpendingData } from '../services/SpendingServices';
import  SpendingCard from '../components/SpendingCard';
import EditExpenseForm from '../components/EditExpenseForm';

function HomeMonthView() {
  const [spendingData, setSpendingData] = useState([]);
  const [thisMonthSpending, setThisMonthSpending] = useState([]);
  const [lastMonthSpending, setLastMonthSpending] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // [1, 12]
  const [thisMonthTotal, setThisMonthTotal] = useState(0);
  const [lastMonthTotal, setLastMonthTotal] = useState(0);
  const [loading, setLoading] = useState(false);


  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);




  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getSpendingData();
      if (result.success) {
        setSpendingData(result.data);
      } else {
        console.error('Error fetching spending data:', result.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  //get this month and last month data
  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const thisMonthData = spendingData.filter((expense) => {
      const expenseDate = new Date(expense.time);
      const expenseMonth = expenseDate.getMonth() + 1;
      const expenseYear = expenseDate.getFullYear();
      return expenseMonth === currentMonth && expenseYear === currentYear;
    });
    setThisMonthSpending(thisMonthData);
    setThisMonthTotal(thisMonthData.reduce((total, expense) => total + expense.amount, 0));

    const lastMonthData = spendingData.filter((expense) => {
      const expenseDate = new Date(expense.time);
      const expenseMonth = expenseDate.getMonth() + 1;
      const expenseYear = expenseDate.getFullYear();
      return (
        (expenseMonth === currentMonth - 1 && expenseYear === currentYear) ||
        (expenseMonth === 12 && currentMonth === 1 && expenseYear === currentYear - 1)
      );
    });
    setLastMonthSpending(lastMonthData);
    setLastMonthTotal(lastMonthData.reduce((total, expense) => total + expense.amount, 0));
  }, [spendingData]);

  //handle long press
  const handleLongPress = (expense) => {
    setSelectedExpense(expense);
    setEditModalVisible(true);
  };

  const handleSave = (editedExpense) => {
    // Implement save logic here
    setEditModalVisible(false);
  };

  const handleDelete = () => {
    // Implement delete logic here
    setEditModalVisible(false);
  };

  const handleClose = () => {
    setEditModalVisible(false);
  };

//calculate total spending of this month and last month

return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#164863' }}>
    <ScrollView>
      
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#DDF2FD' }}>Welcome to Home Month View!</Text>
        <Text style={{ 
          color: '#164863', 
          marginTop: 50, 
          backgroundColor: '#9BBEC8', 
          width: 500, 
          textAlign: 'center',
          lineHeight: 50,
          }}>This month's record {currentMonth} - Balance: {thisMonthTotal}</Text>
        {thisMonthSpending.map((expense) => (
          <SpendingCard key={expense.id} expense={expense} onLongPress={handleLongPress}/>
        ))}
        <Text style={{ 
          color: '#164863', 
          marginTop: 50, 
          backgroundColor: '#9BBEC8', 
          width: 500, 
          textAlign: 'center',
          lineHeight: 50,
          }}>Last month's record {currentMonth - 1} - Balance: {lastMonthTotal}</Text>
        {lastMonthSpending.map((expense) => (
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
  </SafeAreaView>
);
}

export default HomeMonthView;


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

