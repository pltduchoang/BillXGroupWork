// AccountOverView.js
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { getAccountData } from '../services/AccountServices';
import { getSpending } from '../services/SpendingServices';
import { getCategoryData } from '../services/CategoryServices';
import AccountCard from '../components/AccountCard';
import { ScrollView } from 'react-native';
import ExpenseModal from '../components/ExpenseModal';
import { useAppContext } from '../utils/AppContext';

function AccountOverView() {
  const [accountData, setAccountData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [spendingList, setSpendingList] = useState([]);
  const [accountAndSpending, setAccountAndSpending] = useState([]); // [ { account: { ... }, totalSpending: 0 }, ...

  //handle show modal
  const [showModal, setShowModal] = useState(false);
  const [expenseListForCategory, setExpenseListForCategory] = useState([]);

  //Handle global state of database
  const { databaseVersion, setDatabaseVersion } = useAppContext();

  const fetchAccountData = async () => {
    setLoading(true);
    const result = await getAccountData();
    setLoading(false);
    if (result.success) {
      setAccountData(result.data);
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
    } else {
      console.error('Error fetching category data:', result.error);
    }
  };

  const fetchSpending = async () => {
    setLoading(true);
    try {
      const allSpendingData = await getSpending(); // Fetch all spending data
  
      if (allSpendingData) {
        const currentMonth = new Date().getMonth() + 1;
        const filteredSpending = allSpendingData.filter(expense => {
          const expenseMonth = new Date(expense.time).getMonth() + 1;
          return expenseMonth === currentMonth;
        });
  
        setSpendingList(filteredSpending); // Set filtered spending data
        setLoading(false);
      } else {
        console.error('Error fetching spending data at account page:', 'No data received');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching spending data at account page:', error);
      setLoading(false);
    }
  };


// Calculate the total spending from account record that links to spending for the current month
  const accountSpendingCalculation = () => {
    const updatedAccountAndSpending = [];

    accountData && accountData.forEach((account) => {
      let accountTotalSpending = 0;

      account.record.forEach((spendingID) => {
        const foundExpense = spendingList.find((expense) => expense.id === spendingID);

        if (foundExpense) {
          accountTotalSpending += foundExpense.amount;
        }
      });

      updatedAccountAndSpending.push({
        id: account.id,
        account: account.accountName,
        totalSpending: Math.round(accountTotalSpending),
      });
    });

    setAccountAndSpending(updatedAccountAndSpending);
  };
  
  //Modal control
  // Handler to open the modal and set the selected account
  const handleLongPress = (accountAndSpending) => {
    const findAccount = accountData.find((account) => account.id === accountAndSpending.id);
    const expenseListThisMonthForCategory = findAccount.record
      .map((expenseID) => {
        return spendingList.find((expense) => expense.id === expenseID);
      })
      .filter((expense) => expense !== undefined); // Filter out undefined expenses
  
    setExpenseListForCategory(expenseListThisMonthForCategory);
    setShowModal(true);
  };

  // Handler to close the modal
  const closeModal = () => {
    setExpenseListForCategory(null);
    setShowModal(false);
  };



  useEffect(() => {
    fetchAccountData();
    fetchCategoryData();
    fetchSpending();
  }, []);

  useEffect(() => {
    fetchAccountData();
    fetchCategoryData();
    fetchSpending();
  }, [databaseVersion]);

  useEffect(() => {
    if (accountData && spendingList) {
      accountSpendingCalculation();
    }
  }, [spendingList]);


  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: '#164863',
      justifyContent: 'center', 
      alignItems: 'center'
      }}>
      <ScrollView>
        <Text style={{ color:'#DDF2FD', textAlign: 'center' , fontSize: 20, marginTop: 10, marginBottom: 20}}>Welcome to AccountOverView!</Text>
        {loading && <Text>Loading...</Text>}
        {accountAndSpending ? (
          accountAndSpending.map((accountAndSpending) => (
            <AccountCard key={accountAndSpending.account} accountAndSpending={accountAndSpending} onLongPress={handleLongPress} />
          ))
        ) : (
          <Text>No account data</Text>
        )}
      
      </ScrollView>
      {showModal && (
        <ExpenseModal
          visible={showModal}
          expenses={expenseListForCategory}
          closeModal={closeModal}
        />
      )}
    </SafeAreaView>

  );
}

export default AccountOverView;
