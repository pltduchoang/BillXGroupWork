// import React from 'react';
// import { View, Text } from 'react-native';
// import { SafeAreaView, ScrollView } from 'react-native';
// import { useState, useEffect } from 'react';
// import CategoryServices from '../services/CategoryServices';
import React, { useState, useEffect } from 'react';
import fetchData from '../services/CategoryServices';
import { View, Text, Pressable, ScrollView, Modal } from 'react-native';

import CategoryManage from './CategoryManage';
import { useNavigation, useRoute } from '@react-navigation/native';


// Buttons for the categories 
const CategoryButtons = ({ categories, onClick, newCategories }) => {
  return (
    <View>
        {/*Map for the buttons*/}
        {categories.map((category, index) => (
            <Pressable 
                key={index} 
                onPress={() => onClick(category)} 
                style={{ 
                    backgroundColor: '#427D9D',
                    padding: 20,
                    margin: 10,
                    borderRadius: 5 
                }}
            >
                {/*Text for the buttons*/}
                <Text style={{ color: 'white', fontSize:20 }}>
                    {category.category}
                </Text>
            </Pressable>
        ))}

        {/* Map for the new category buttons */}
        {newCategories.map((newCategory, index) => (
            <Pressable
            key={index}
            onPress={() => onClick(newCategory)}
            style={{
                backgroundColor: '#427D9D',
                padding: 20,
                margin: 10,
                borderRadius: 5,
            }}
            >
            {/* Text for the new category buttons */}
            <Text style={{ color: 'white', fontSize: 20 }}>{newCategory}</Text>
            </Pressable>
        ))}
    </View>
  );
};


function CategoryOverview() {
  const navigation = useNavigation();
  const route = useRoute();
  const { newCategories } = route.params || { newCategories: [] };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisable, setModalVisable] = useState(false);
  const [allItems, setAllItems] = useState([]);

  const fetchDataAndProccess = async () => {
    try {
      const data = await fetchData();
      const processedItems = [...new Set(data.map(item => ({ 
        category: item.category, 
        id: item.id, 
        amount: item.amount, 
        type: item.type, 
        time: item.time, 
        account: item.account, 
        description: item.description 
      })))];
      setAllItems(processedItems);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };
 
  useEffect(() => {
    fetchDataAndProccess();
  }, []);

  useEffect(() => {
    // Access the new categories from the route parameters
    const { params } = route;
    const categoriesFromParams = params && params.newCategories;
    if (Array.isArray(categoriesFromParams)) {
    //   console.log('old categories: ', allItems)
      console.log('New Categories:', categoriesFromParams);
    //   setAllItems([...allItems, ...categoriesFromParams]);
        // setAllItems([...categoriesFromParams])
    }
  }, [route]);



  // Filter for the unique categories (for buttons)
  const uniqueCategories = allItems.filter(
      (item, index, self) =>
      index === self.findIndex((t) => t.category === item.category)
  )


  // Handle the click of the category (opens the modal)
  const handleCategoryClick = category => {
      setSelectedCategory(category);
      setModalVisable(true);
  };

  // Close the modal (close pop up window)
  const closeModal = () => {
      setModalVisable(false);
      setSelectedCategory(null);
  };

  // Filter for the current month items
  const getCurrentMonthItems = () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      return allItems.filter(item => new Date(item.time).getMonth() === currentMonth);
  };

  // Filter for the last month items
  const getLastMonthItems = () => {
      const currentDate = new Date();
      const lastMonth = currentDate.getMonth();
      return allItems.filter(item => new Date(item.time).getMonth() + 1 === lastMonth);
  };

  // Calculate the total for the month, choosen category
  const calculateMonthTotal = (items, month, category) => {
      const total = items
          .filter(item => new Date(item.time).getMonth() === month && item.category === category)
          .reduce((sum, item) => {
              if (item.type === 'spend') {
                  return sum + item.amount;
              } else if (item.type === 'gain') {
                  return sum - item.amount;
              }
              return sum;
          }, 0);
      return parseFloat(total.toFixed(2));
  };

  // Array for Month Names
   const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  

  return (
      <ScrollView>
      <Text>Category Buttons</Text>
      <CategoryButtons categories={uniqueCategories} onClick={handleCategoryClick} newCategories={newCategories} />
     
      

      {/*Modal for the category*/}
      <Modal 
          animationType='slide'
          transparent={false}
          visible={modalVisable}
          onRequestClose={closeModal}
      >

          <ScrollView>
              {selectedCategory && (
                  <View>
                      {/*Close Modal*/}
                      <Pressable onPress={closeModal} style={{padding: 20, alignItems: 'center', backgroundColor: '#427D9D'}}>
                          <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
                      </Pressable>
                      {/*Name of the category selected*/}
                      <Text style={{padding: 20, textAlign: 'center', fontSize: 20, backgroundColor: '#9BBEC8', fontWeight: 'bold'}}>{selectedCategory.category}</Text>
                      {/*This Month*/}
                      <Text style={{marginTop: 20, fontSize: 25}}>This Month: {monthNames[new Date().getMonth()]}</Text>
                      {/*Total Spent for current month*/}
                      <Text style={{marginBottom: 5, fontSize: 25}}>Total Spent: ${calculateMonthTotal(allItems, new Date().getMonth(), selectedCategory.category)}</Text>

                      {/*Map for the current month items*/}
                      {getCurrentMonthItems()
                          .filter(item => item.category === selectedCategory.category)
                          .map((item, index) =>
                              <View 
                                  key={index} 
                                  style={{ 
                                      padding: 10, 
                                      backgroundColor: '#DDF2FD', 
                                      borderRadius: 5 
                                  }}>
                                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.description}</Text>
                                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>Amount: ${item.amount}</Text>
                                  <Text style={{fontSize: 20}}>Type: {item.type}</Text>
                                  <Text style={{fontSize: 20}}>Date & Time: {item.time}</Text>
                                  <Text style={{fontSize: 20}}>Account: {item.account}</Text>
                              </View>
                      )}

                      {/*Last Month*/}
                      <Text style={{marginTop: 20, fontSize: 25}}>Last Month: {monthNames[new Date().getMonth() - 1]}</Text>
                      {/*Total Spent for last month*/}
                      <Text style={{marginBottom: 5, fontSize: 25}}>Total: ${calculateMonthTotal(allItems, new Date().getMonth() - 1, selectedCategory.category)}</Text>

                      {/*Map for the last month items*/}
                      {getLastMonthItems()
                          .filter(item => item.category === selectedCategory.category)
                          .map((item, index) =>
                              <View 
                                  key={index} 
                                  style={{ 
                                      padding: 10, 
                                      backgroundColor: '#DDF2FD', 
                                      borderRadius: 5 
                                  }}>
                                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.description}</Text>
                                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>Amount: ${item.amount}</Text>
                                  <Text style={{fontSize: 20}}>Type: {item.type}</Text>
                                  <Text style={{fontSize: 20}}>Date & Time: {item.time}</Text>
                                  <Text style={{fontSize: 20}}>Account: {item.account}</Text>
                              </View>
                      )
                      }

                  </View>
              )}
          </ScrollView>    
      </Modal>

      {/* {newCategoryPageVisible && (
        <NewCategoryPage onCategoryAdded={(newCategory) => {
          setNewCategoryPageVisible(false);
          addNewCategory(newCategory);
        }} />
        
      )} */}

      </ScrollView>
  );
};

export default CategoryOverview;


