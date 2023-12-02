// import React from 'react';
// import { View, Text } from 'react-native';
// import { SafeAreaView, ScrollView } from 'react-native';
// import { useState, useEffect } from 'react';
// import CategoryServices from '../services/CategoryServices';
import React, { useState, useEffect } from 'react';
import fetchData, { getCategoryData } from '../services/CategoryServices';
import { View, Text, Pressable, ScrollView, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateCategoryData } from '../services/CategoryServices';
import { useAppContext } from '../utils/AppContext';



const CategoryButtons = ({ categories, onClick, onDelete, newCategories }) => {
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
  
    // Delete confirmation modal
    const showDeleteConfirmation = (category) => {
      setCategoryToDelete(category);
      setDeleteConfirmationVisible(true);
    };
  
    // When the User confirms the delete
    const confirmDelete = () => {
      if (categoryToDelete) {
        onDelete(categoryToDelete);
        setDeleteConfirmationVisible(false);
      }
    };
  
    // When the User cancels the delete
    const cancelDelete = () => {
      setCategoryToDelete(null);
      setDeleteConfirmationVisible(false);
    };
  
    return (
      <View>
        {/* Map for the buttons */}
        {categories.map((category, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              onPress={() => onClick(category)}
              style={{
                backgroundColor: '#427D9D',
                padding: 20,
                marginBottom: 10,
                marginTop: 10,
                marginLeft: 20,
                width: '80%',
              }}
            >
              {/* Text for the buttons */}
              <Text style={{ color: 'white', fontSize: 20 }}>{category.category}</Text>
            </Pressable>
  
            {/* Delete button */}
            <Pressable
              onPress={() => showDeleteConfirmation(category)}
              style={{
                backgroundColor: '#9BBEC8',
                padding: 15,
                height: 67,
                textAlign: 'center',
                textAlignVertical: 'center',
                width: '10%',
                marginBottom: 10,
                marginTop: 10,
                marginRight: 20,
              }}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>X</Text>
            </Pressable>
          </View>
        ))}
  
        {/* Map for the new category buttons */}
        {newCategories.map((newCategory, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable
              onPress={() => onClick(newCategory)}
              style={{
                backgroundColor: '#427D9D',
                padding: 20,
                marginBottom: 10,
                width: '80%',
                marginTop: 10,
                marginLeft: 20,
              }}
            >
              {/* Text for the new category buttons */}
              <Text style={{ color: 'white', fontSize: 20 }}>{newCategory}</Text>
            </Pressable>
  
            {/* Delete button for new categories */}
            <Pressable
              onPress={() => showDeleteConfirmation(newCategory)}
              style={{
                backgroundColor: '#9BBEC8',
                padding: 15,
                height: 67,
                textAlign: 'center',
                textAlignVertical: 'center',
                width: '10%',
                marginBottom: 10,
                marginTop: 10,
                marginRight: 20,
              }}
            >
              <Text style={{ color: 'white', fontSize: 20 }}>X</Text>
            </Pressable>
          </View>
        ))}
  
        {/* Delete confirmation modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteConfirmationVisible}
          onRequestClose={cancelDelete}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Are you sure you want to delete this category?
              </Text>
              <Pressable
                onPress={confirmDelete}
                style={{
                  backgroundColor: 'red',
                  padding: 15,
                  borderRadius: 5,
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Delete</Text>
              </Pressable>
              <Pressable
                onPress={cancelDelete}
                style={{
                  backgroundColor: '#427D9D',
                  padding: 15,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };


function CategoryOverview() {
  const navigation = useNavigation();
  const route = useRoute();
  const { newCategories } = route.params || { newCategories: [] }; // allows receiving new categories from CategoryManage
  const [spendingData, setSpendingData] = useState([]); // I dont think I need this anymore
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisable, setModalVisable] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [categoryData, setCateGoryData] = useState([]);
  const { databaseVersion, setDatabaseVersion } = useAppContext();

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
 
  const processData = async () => {
    try {
      const organizedData = spendingData.map(item => ({
        id: item.id,
        categoryName: item.catagoryName,
        budget: item.budget,
        record: item.record,
      }));
      setAllItems(organizedData);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };


  // UseEffect to fetch intial data already in the database
  useEffect(() => {
    fetchDataAndProccess();
    fetchCategoryData();
    processData();
  }, [databaseVersion]);

  // UseEffect to update allItems when the route changes
  useEffect(() => {
    // Access the new categories from the route parameters
    const { params } = route;
    const categoriesFromParams = params && params.newCategories;
    if (Array.isArray(categoriesFromParams)) {
    //   console.log('old categories: ', allItems)
      console.log('New Categories:', categoriesFromParams);
      setSpendingData(prevCategories => [...prevCategories, categoriesFromParams]);
      saveToSpending();
    //   setAllItems([...allItems, ...categoriesFromParams]);
        // setAllItems([...categoriesFromParams])
    }
  }, [route]);

  //Get category data from services
  const fetchCategoryData = async () => {
    try {
      const response = await getCategoryData();
      if (response.success){
        const data = response.data || [];
        setCateGoryData(data);

      }
      console.log('Category data fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

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

  // Delete the category
  const handleCategoryDelete = (categoryToDelete) => {
    const updateCategories = allItems.filter((item) => item.category !== categoryToDelete.category);
    setAllItems(updateCategories);
    // for new categories deletion
    const isDeletedNewCategory = newCategories.includes(categoryToDelete);
    if (isDeletedNewCategory) {
        const updatedNewCategories = newCategories.filter((newCat) => newCat !== categoryToDelete);
        // Deletes the category in CategoryOverview
        navigation.setParams({ newCategories: updatedNewCategories });
        // Deletes the category in CategoryManage
        navigation.navigate('CategoryMange', { updatedCategories: updatedNewCategories });
    }
  };

 
  const navigateToCategoryManage = () => {
    navigation.navigate('CategoryMange');
  };

  const generateNewId = () => {
    const totalItems = allItems.length + spendingData.length;
    return totalItems + 1;
  };

  const lastOfArray = () => {
    const lastItem = newCategories[newCategories.length - 1];
    // const lastItem = lastArray && lastArray[lastArray.length - 1];
    console.log('Last Item:', lastItem)
    return lastItem;
  };



  const saveToSpending = () => {
    const lastCategory = lastOfArray();
    const newCategoryToSave = {
      id: generateNewId(),
      categoryName: lastCategory,
      budget: 0,
      record: [],   
    };
    console.log(newCategories)
    console.log('New Category to save:', newCategoryToSave)
    const newDataThingy = [...categoryData, newCategoryToSave];
    // Call the method to save to spending using updateCategoryData
    updateCategoryData(newDataThingy)
      .then((response) => {
        // Handle the response if needed
        console.log('Category data updated successfully:', response);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error updating category data:', error);
      });
  };

  return (
      <ScrollView style={{backgroundColor: '#164863'}}>
      <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', padding: 10}}>Categories of your Expenses</Text>
      <CategoryButtons 
        categories={uniqueCategories} 
        onClick={handleCategoryClick}
        onDelete={handleCategoryDelete} 
        newCategories={newCategories} />
     
      {/* Send to CategoryManage to create new Category */}
      <Pressable 
        onPress={navigateToCategoryManage}
        style={{backgroundColor: '#9BBEC8', padding: 20, marginTop: 10, marginBottom: 10, marginLeft: 20, marginRight: 20,}}>
        <Text style={{ color: 'white', fontSize: 20 }}>
          Create New Category
        </Text>
      </Pressable>

      {/*Modal for the category*/}
      <Modal 
          animationType='slide'
          transparent={false}
          visible={modalVisable}
          onRequestClose={closeModal}
      >

          <ScrollView>
              {selectedCategory && (
                  <View style={{backgroundColor: '#9BBEC8'}}>
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

      </ScrollView>
  );
};

export default CategoryOverview;


