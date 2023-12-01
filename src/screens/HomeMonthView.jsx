import React from 'react';
import { SafeAreaView, View, Text,  ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { createSpending, getSpending } from '../services/SpendingServices';
import SpendingCard from '../components/SpendingCard';
import EditExpenseForm from '../components/EditExpenseForm';
import AddExpenseForm from '../components/AddExpenseForm';
import { getCategoryData } from '../services/CategoryServices';
import { getAccountData } from '../services/AccountServices';
import BezierGraphChart from '../components/BezierGraphChart';
import AppPieChart from '../components/PieChart';


function HomeMonthView() {
  // Spending data control
  const [spendingData, setSpendingData] = useState([]);
  const [thisMonthSpending, setThisMonthSpending] = useState([]);
  const [lastMonthSpending, setLastMonthSpending] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // [1, 12]
  const [thisMonthTotal, setThisMonthTotal] = useState(0);
  const [lastMonthTotal, setLastMonthTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maxId, setMaxId] = useState();

  //Get account, category data
  const [accountData, setAccountData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  //Add expense control
  const [showAddModal, setShowAddModal] = useState(false);

  //Edit expense control
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  //Retractable list control
  const [thisMonthVisible, setThisMonthVisible] = useState(false);
  const [lastMonthVisible, setLastMonthVisible] = useState(false);


  // Bezier graph data
  const [graphData, setGraphData] = useState([]);
  const [graphLabel, setGraphLabel] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);



  // Fetch account data and category from persistent storage
  const fetchCategoryData = async () => {
    try {
      const result = await getCategoryData();
      if (result.success) {
        const parsedCategoryData = result.data || []; // Ensuring parsed data exists
        setCategoryData(parsedCategoryData);
      } else {
        console.error('Error fetching category data:', result.error);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };
  const fetchAccountData = async () => {
    try {
      const result = await getAccountData();
      if (result.success) {
        const parsedAccountData = result.data || []; // Ensuring parsed data exists
        setAccountData(parsedAccountData);
      } else {
        console.error('Error fetching account data:', result.error);
      }
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };


  // Fetch spending data from persistent storage
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
  
  // Month list
  const monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  // Process data and divide them into this month and last month
  const processSpendingData = () => {
    if (spendingData.length > 0) {
      const thisMonth = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth;
      });
  
      const thisMonthSpend = thisMonth.filter((expense) => expense.type === 'spend');
      const thisMonthGain = thisMonth.filter((expense) => expense.type === 'gain');
  
      const thisMonthSpendTotal = Math.round(
        thisMonthSpend.reduce((acc, expense) => acc + expense.amount, 0)
      );
  
      const thisMonthGainTotal = Math.round(
        thisMonthGain.reduce((acc, expense) => acc + expense.amount, 0)
      );
  
      setThisMonthSpending(thisMonthSpend.sort((a, b) => a.time - b.time));
      setThisMonthTotal(thisMonthSpendTotal - thisMonthGainTotal);
  
      const lastMonth = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth - 1;
      });
  
      const lastMonthSpend = lastMonth.filter((expense) => expense.type === 'spend');
      const lastMonthGain = lastMonth.filter((expense) => expense.type === 'gain');
  
      const lastMonthSpendTotal = Math.round(
        lastMonthSpend.reduce((acc, expense) => acc + expense.amount, 0)
      );
  
      const lastMonthGainTotal = Math.round(
        lastMonthGain.reduce((acc, expense) => acc + expense.amount, 0)
      );
  
      setLastMonthSpending(lastMonthSpend.sort((a, b) => a.time - b.time));
      setLastMonthTotal(lastMonthSpendTotal - lastMonthGainTotal);
    }
  };
  
  // Fetch data on initial render
  useEffect(() => {
    fetchData();
    // Find the maximum ID from the existing spendingData
    
    // Assign a new ID to the newExpense
    
  }, []);
  
  // Process spending data when spendingData changes
  useEffect(() => {
    processSpendingData();
    fetchAccountData();
    fetchCategoryData();
    const maxIdInDatabase = Math.max(...spendingData.map(expense => expense.id));
    setMaxId(maxIdInDatabase);
    processGraphData();
    createChartData();
  }, [spendingData]);

  

  //handle long press on expense card
  const handleLongPress = (spending) => {
    setSelectedExpense(spending);
    setEditModalVisible(true);
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

  //handle delete on edit expense form
  const handleDelete = async () => {
    setEditModalVisible(false);
    const updatedSpendingData = spendingData.filter((spending) => spending.id !== selectedExpense.id);
    await createSpending(updatedSpendingData);
    setSpendingData(updatedSpendingData);
  };


  //handle close on edit expense form and add expense form
  const handleClose = () => {
    setEditModalVisible(false);
    setShowAddModal(false);
  };

  //handle add expense button
  const handleAdd = () => {
    setShowAddModal(true);
  }

  //handle save on add expense form
  const handleSaveNewExpense = async (newExpense) => {
    setShowAddModal(false);
    
    const updatedNewExpense = {
      ...newExpense,
      id: maxId + 1 // Increment the maximum ID by 1 to assign a new ID
    };
    console.log(updatedNewExpense);
    // Create a new database by adding the updatedNewExpense to spendingData
    const newDatabase = [...spendingData, updatedNewExpense];
    
    // Update the persistent storage
    await createSpending(newDatabase);
    
    // Update the state with the new spending data after it's saved
    setSpendingData(newDatabase);
  };

  // [
  //   { name: 'Section 1', value: 30, color: '#FF5733' },
  //   { name: 'Section 2', value: 50, color: '#33FF57' },
  //   { name: 'Section 3', value: 20, color: '#3357FF' },
  // ];

  
  //Prepare pie chart data
  const colorListPieChart = ['#1f8ac5','#529bc3','#166692','#0e425e','#061e2b','#112029','#203d4f','#010102'];

  const createChartData = () => {
    const pieChartData = [];
    if (spendingData.length > 0) {
      categoryData.forEach((category, index) => {
        const catName = category.categoryName;
        let catSpendTotal = 0;
        let catGainTotal = 0;
  
        thisMonthSpending.forEach((expense) => {
          if (category.record.includes(expense.id)) {
            if (expense.type === 'spend') {
              catSpendTotal += expense.amount;
            } else if (expense.type === 'gain') {
              catGainTotal += expense.amount;
            }
          }
        });
  
        catSpendTotal = Math.round(catSpendTotal);
        catGainTotal = Math.round(catGainTotal);
  
        const catTotal = Math.round(catSpendTotal - catGainTotal);
  
        // Use modulo operator to cycle through the color list
        const color = colorListPieChart[index % colorListPieChart.length];
  
        pieChartData.push({ name: catName, value: catTotal, color });
      });
      setPieChartData(pieChartData);
    }
  };

  // Graph data for 4 recent months
  const processGraphData = () => {
    if (spendingData.length > 0) {
      const thisMonthSpend = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth && expense.type === 'spend';
      });
  
      const thisMonthGain = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth && expense.type === 'gain';
      });
  
      const lastMonthSpend = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth - 1 && expense.type === 'spend';
      });
  
      const lastMonthGain = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth - 1 && expense.type === 'gain';
      });
  
      const lastLastMonthSpend = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth - 2 && expense.type === 'spend';
      });
  
      const lastLastMonthGain = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth - 2 && expense.type === 'gain';
      });
  
      const lastLastLastMonthSpend = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth - 3 && expense.type === 'spend';
      });
  
      const lastLastLastMonthGain = spendingData.filter((expense) => {
        const expenseMonth = new Date(expense.time).getMonth() + 1;
        return expenseMonth === currentMonth - 3 && expense.type === 'gain';
      });
  
      const thisMonthSpendTotal = thisMonthSpend.reduce((acc, expense) => acc + expense.amount, 0);
      const thisMonthGainTotal = thisMonthGain.reduce((acc, expense) => acc + expense.amount, 0);
      const lastMonthSpendTotal = lastMonthSpend.reduce((acc, expense) => acc + expense.amount, 0);
      const lastMonthGainTotal = lastMonthGain.reduce((acc, expense) => acc + expense.amount, 0);
      const lastLastMonthSpendTotal = lastLastMonthSpend.reduce((acc, expense) => acc + expense.amount, 0);
      const lastLastMonthGainTotal = lastLastMonthGain.reduce((acc, expense) => acc + expense.amount, 0);
      const lastLastLastMonthSpendTotal = lastLastLastMonthSpend.reduce((acc, expense) => acc + expense.amount, 0);
      const lastLastLastMonthGainTotal = lastLastLastMonthGain.reduce((acc, expense) => acc + expense.amount, 0);
  
      const thisMonthTotal = thisMonthSpendTotal - thisMonthGainTotal;
      const lastMonthTotal = lastMonthSpendTotal - lastMonthGainTotal;
      const lastLastMonthTotal = lastLastMonthSpendTotal - lastLastMonthGainTotal;
      const lastLastLastMonthTotal = lastLastLastMonthSpendTotal - lastLastLastMonthGainTotal;
  
      setGraphData([
        lastLastLastMonthTotal,
        lastLastMonthTotal,
        lastMonthTotal,
        thisMonthTotal
      ]);
      setGraphLabel([
        monthList[currentMonth - 4],
        monthList[currentMonth - 3],
        monthList[currentMonth - 2],
        monthList[currentMonth - 1]
      ]);
    }
  };



return (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#164863' }}>
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#DDF2FD', marginBottom:30, fontSize:20, marginTop: 10 }}>Welcome to Home Month View!</Text>
        
        
        {/* <Text style={{ color: '#DDF2FD'}}>Spending trend</Text>
        <View style={{marginBottom:30}}>
          <BezierGraphChart labelList={graphLabel} graphData={graphData} />
        </View>
        
        <Text style={{ color: '#DDF2FD', marginTop: 20}}>Category Spending</Text>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom:20 }}>
          <AppPieChart data={pieChartData} />
        </View> */}
        
        
        <TouchableOpacity onPress={() => setThisMonthVisible(prevState => !prevState)} >
          <Text style={{ 
            color: '#164863',
            backgroundColor: '#9BBEC8', 
            width: 500, 
            textAlign: 'center',
            lineHeight: 100,
            fontWeight: 'bold',
            fontSize: 15,
            }}>This month's record {monthList[currentMonth - 1]} - Balance: ${thisMonthTotal}</Text>
        </TouchableOpacity>
        {thisMonthVisible && thisMonthSpending.map((expense) => (
          <SpendingCard key={expense.id} spending={expense} onLongPress={handleLongPress}/>
        ))}
        <TouchableOpacity onPress={() => setLastMonthVisible(prevState => !prevState)} style={{marginTop:50}}>
          <Text style={{ 
            color: '#164863',
            backgroundColor: '#9BBEC8', 
            width: 500, 
            textAlign: 'center',
            lineHeight: 100,
            fontWeight: 'bold',
            fontSize: 15,
            }}>Last month's record {monthList[currentMonth - 2]} - Balance: ${lastMonthTotal}</Text>
        </TouchableOpacity>
        {lastMonthVisible && lastMonthSpending.map((expense) => (
          <SpendingCard key={expense.id} spending={expense} onLongPress={handleLongPress}/>
        ))}
      </View>
    </ScrollView>
    {selectedExpense && (
        <EditExpenseForm
          spending={selectedExpense}
          category={categoryData}
          account={accountData}
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
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>

      {showAddModal && (
        <AddExpenseForm
          isVisible={showAddModal}
          category={categoryData}
          account={accountData}
          nextID={maxId + 1}
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

