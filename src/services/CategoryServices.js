import React, { useState } from 'react';
import fetchData from '../database/spending.json';
import { View, Text, Pressable, ScrollView, Modal } from 'react-native';



// DUC ADDED THIS, DO NOT DELETE
// CategoryServices.js
import RNFS from 'react-native-fs';

export const getCategoryData = async () => {
  try {
    const categoryDataFile = RNFS.DocumentDirectoryPath + '/src/database/category.json';
    const categoryData = await RNFS.readFile(categoryDataFile, 'utf8');
    const parsedCategoryData = JSON.parse(categoryData);
    console.log('parsedCategoryData:', parsedCategoryData);
    return { success: true, data: parsedCategoryData, error: null };
  } catch (error) {
    console.error('Error reading category data:', error);
    return { success: false, data: null, error: error.message };
  }
};

// Update category data to the category.json file
export const updateCategoryData = async (dataToWrite) => {
    try {
        const categoryDataFile = RNFS.DocumentDirectoryPath + '/src/database/category.json';
        const jsonData = JSON.stringify(dataToWrite); // Convert the data to a JSON string

        // Write the updated category data to the category.json file
        await RNFS.writeFile(categoryDataFile, jsonData, 'utf8');
        
        return { success: true, error: null };
    } catch (error) {
        console.error('Error updating category data:', error);
        return { success: false, error: error.message };
    }
};







// Buttons for the categories
const CategoryButtons = ({ categories, onClick }) => {
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
    </View>
  );
};

const CategoryServices = () => {
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [modalVisable, setModalVisable] = useState(false);

    
    // Attribute for the items
    const allItems = [...new Set(fetchData.map(item => ({ 
        category: item.category, 
        id: item.id, 
        amount: item.amount, 
        type: item.type, 
        time: item.time, 
        account: item.account, 
        description: item.description 
    })))];

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
        <CategoryButtons categories={uniqueCategories} onClick={handleCategoryClick} />

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
        </ScrollView>
    );
};

export default CategoryServices;



