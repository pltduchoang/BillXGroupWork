// BudgetPage.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getBudgetData }  from '../services/BudgetServices';

function BudgetPage() {
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await getBudgetData();
    setLoading(false);
    if (result.success) {
      setCategoryData(result.data);
    } else {
      console.error('Error fetching category data:', result.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to BudgetPage!</Text>
      {loading && <Text>Loading...</Text>}
      {categoryData && (
        <View>
          {/* Display the category data here */}
          <Text>Category Data:</Text>
          <Text>{JSON.stringify(categoryData)}</Text>
        </View>
      )}
    </View>
  );
}

export default BudgetPage;
