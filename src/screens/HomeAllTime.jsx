import React from 'react';
import { SafeAreaView, View, Text, Button, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { getSpendingData } from '../services/SpendingServices';
import { Card } from '@rneui/themed';

function HomeAllTime() {
  const [spendingData, setSpendingData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchSpendingData() {
    setLoading(true);
    const result = await getSpendingData();
    if (result.success) {
      setSpendingData(result.data);
    } else {
      // Handle error while fetching data
      console.error('Error fetching spending data:', result.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSpendingData();
  }, []);

return (
  <SafeAreaView style={{ flex: 1, backgroundColor: "#164863" }}>
    <ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: "#DDF2FD" }}>Welcome to Home All Time View!</Text>

        <Text style={{ color: "#DDF2FD" }}>All Time Record</Text>
        {spendingData && spendingData.map((expense) => (
          <Card key={expense.id}
          containerStyle={
            {
              backgroundColor: expense.type === 'spend' ? "#427D9D" : "#9BBEC8",
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
            <Text style={{ color: "#DDF2FD" }}>{expense.time}</Text>
            <Text style={{ color: "#DDF2FD" }}>{expense.amount}</Text>
            <Text style={{ color: "#DDF2FD" }}>{expense.category}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}


export default HomeAllTime;