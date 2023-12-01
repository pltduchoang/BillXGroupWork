import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


function CategoryMange() {
  const [newCategory, setNewCategory] = useState('');
  const [newCategories, setNewCategories] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();


  // UseEffect to update newCategories when the route changes
  useEffect(() => {
    const { params } = route;
    const updatedCategories = params && params.updatedCategories;
    if (Array.isArray(updatedCategories)) {
      setNewCategories(updatedCategories);
    }
  }, [route]);

  // Sends Data to CategoryOverview
  const addCategory = () => {
    if (newCategory) {
      // onCategoryAdded(newCategory);
      // navigation.navigate('CategoryOverview', { newCategories: [newCategory] });
      
      setNewCategories(prevCategories => [...prevCategories, newCategory]);
      navigation.navigate('CategoryOverview', { newCategories: [...newCategories, newCategory] });
      setNewCategory('');
    }
   
  };


  

  return (
    <ScrollView style={{backgroundColor: '#164863'}}>
      <Text style={{ color: 'white', fontSize: 20, margin: 10, textAlign: 'center' }}>Create a new Category</Text>
      {/* Textbox for new Category from User */}
      <TextInput 
        placeholder="New Category"
        value={newCategory}
        onChangeText={(text) => setNewCategory(text)}
        style={{ height: 60, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 10, backgroundColor: 'white' }}
        fontSize={20}
      />

      <Pressable onPress={addCategory} style={{ backgroundColor: '#427D9D', padding: 20, margin: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize:20 }}>Add Category</Text>
      </Pressable>

      
    </ScrollView>
  );
}

export default CategoryMange;