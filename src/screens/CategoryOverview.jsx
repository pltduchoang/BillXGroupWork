import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import CategoryServices from '../services/CategoryServices';

import { getSpendingData } from '../services/SpendingServices';


function CategoryOverview() {
  return (
    <SafeAreaView>
      <CategoryServices />
    </SafeAreaView>
  );
}

export default CategoryOverview;


// function CategoryOverview() {
//   const processCategoryTotals = (spendingData) => {
//     const currentDate = new Date();
//     const lastMonth = currentDate.getMonth() - 1;
//     const categoryTotals = {};
  
//     spendingData.forEach((expense) => {
//       const { category, amount, type, time } = expense;
//       const expenseDate = new Date(time);
  
//       if (expenseDate.getMonth() === lastMonth) {
//         if (!categoryTotals[category]) {
//           categoryTotals[category] = { thisMonth: 0, lastMonth: 0 };
//         }
  
//         if (type === 'gain') {
//           categoryTotals[category].lastMonth -= amount;
//         } else {
//           categoryTotals[category].lastMonth += amount;
//         }
//       } else if (expenseDate.getMonth() === currentDate.getMonth()) {
//         if (!categoryTotals[category]) {
//           categoryTotals[category] = { thisMonth: 0, lastMonth: 0 };
//         }
  
//         if (type === 'gain') {
//           categoryTotals[category].thisMonth -= amount;
//         } else {
//           categoryTotals[category].thisMonth += amount;
//         }
//       }
//     });
  
//     return categoryTotals;
//   };

//   const [categoryTotals, setCategoryTotals] = useState({});

//   useEffect(() => {
//     // Fetch spending data when component mounts
//     async function fetchSpendingData() {
//       const result = await getSpendingData();
//       if (result.success) {
//         const processedData = processCategoryTotals(result.data);
//         setCategoryTotals(processedData);
//       } else {
//         // Handle error while fetching data
//         console.error('Error fetching spending data:', result.message);
//       }
//     }

//     fetchSpendingData();
//   }, []);

//   // Function to process category totals (Same as provided previously)

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <View style={{ padding: 16 }}>

//         <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
//             This Month
//           </Text>
//           {Object.keys(categoryTotals).map((category, index) => (
//             <View key={index} style={{ marginBottom: 10 }}>
//               <Text>{category}</Text>
//               <Text>This Month: {categoryTotals[category].thisMonth}</Text>
//             </View>
//           ))}
          
//           <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
//             Last Month
//           </Text>
//           {Object.keys(categoryTotals).map((category, index) => (
//             <View key={index} style={{ marginBottom: 10 }}>
//               <Text>{category}</Text>
//               <Text>Last Month: {categoryTotals[category].lastMonth}</Text>
//             </View>
//           ))}
          
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default CategoryOverview;

