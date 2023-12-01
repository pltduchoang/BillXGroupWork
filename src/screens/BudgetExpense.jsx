// BudgetPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getBudgetData }  from '../services/BudgetServices';
import BudgetCard from '../components/BudgetCard';
import Spending from '../database/spending.json';
// import { ProgressChart } from 'react-native-chart-kit';

function BudgetPage() {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSpendCategory, setSelectedSpendCategory] = useState(null);
  const [selectedGainCategory, setSelectedGainCategory] = useState(null);

  const openModal = (category, type) => {
    if (type === 'spend') {
      setSelectedSpendCategory(category);
    } else if (type === 'gain') {
      setSelectedGainCategory(category);
    }

    setModalVisible(true);
  };
  
  const closeModal = () => {
      setSelectedSpendCategory(null);
      setSelectedGainCategory(null);
      setModalVisible(false);
    };

  const fetchCategoryData = async () => {
      setLoading(true);
      const result = await getBudgetData();
      setLoading(false);
      setCategoryData(result.data);
    };
    
  useEffect(() => {
    fetchCategoryData();
  }, []);

  // const calculatePercentage = (categoryName, spendingData) => {
  //   const categoryBudget = spendingData.find(
  //     (item) => item.category === categoryName
  //   ).budget;
  
  //   const categoryAmount = spendingData
  //     .filter(
  //       (item) => item.category === categoryName && item.type === 'spend'
  //     )
  //     .reduce((total, item) => total + item.amount, 0);
  
  //   return (categoryAmount / categoryBudget) * 100;
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Welcome to BudgetPage!</Text>
        {loading && <Text>Loading...</Text>}
        <View style={styles.block}>
          <Text style={styles.title}>Expense</Text>
          {categoryData && categoryData.map((item) => (
            <View key={item.id}>
              <TouchableOpacity onPress={() => openModal(item, 'spend')}>
                <Text style={styles.text}>{item.categoryName}</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          {selectedSpendCategory !== null && (
            <BudgetCard
              isVisible={modalVisible}
              onClose={closeModal}
              title={selectedSpendCategory.categoryName}
              content={
                <View>
                  {/* <ProgressPieChart
                    percentage={
                      selectedCategory &&
                      Spending &&
                      calculatePercentage(
                        selectedCategory.categoryName,
                        Spending
                      )
                    }/> */}
                    {Spending && Spending.filter((item) => (item.category == selectedSpendCategory.categoryName) && (item.type == "spend")).map((filteredItem) => (
                        <View key={filteredItem.id} style={styles.block}>
                          <Text>Amount: {filteredItem.amount}</Text>
                          <Text>Budget: {filteredItem.budget}</Text>
                          <Text>Description: {filteredItem.description}</Text>
                          <Text>Usage: {Math.round(filteredItem.amount/filteredItem.budget * 100)}%</Text>
                        </View>
                      ))}
                </View>
              }
            />
          )}
        </View>

        <View style={styles.block}>
          <Text style={styles.title}>Saving</Text>
          {categoryData && categoryData.map((item) => (
            <View key={item.id}>
              <TouchableOpacity onPress={() => openModal(item, 'gain')}>
                <Text style={styles.text}>{item.categoryName}</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          {selectedGainCategory !== null && (
            <BudgetCard
              isVisible={modalVisible}
              onClose={closeModal}
              title={selectedGainCategory.categoryName}
              content={
                <View>
                  {/* <ProgressPieChart
                    percentage={
                      selectedCategory &&
                      Spending &&
                      calculatePercentage(
                        selectedCategory.categoryName,
                        Spending
                      )
                    }/> */}
                    {Spending && Spending.filter((item) => (item.category == selectedGainCategory.categoryName) && (item.type == "gain")).map((filteredItem) => (
                        <View key={filteredItem.id} style={styles.block}>
                          <Text>Amount: {filteredItem.amount}</Text>
                          <Text>Budget: {filteredItem.budget}</Text>
                          <Text>Description: {filteredItem.description}</Text>
                          <Text>Target: {Math.round(filteredItem.amount/filteredItem.budget * 100)}%</Text>
                        </View>
                      ))}
                </View>
              }
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    backgroundColor: '#9BBEC8',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 250,
  },
  title: {
    padding: 5,
    marginBottom: 2,
    textAlign: 'center',
    backgroundColor: '#164863',
    fontSize: 20,
    color: 'white',
  },
  text: {
    padding: 16,
    margin: 2,
    backgroundColor: '#427D9D',
    fontSize: 16,
    color: 'white',
  },
});

export default BudgetPage;