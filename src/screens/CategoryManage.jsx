import React, { useState } from 'react';
import { ScrollView, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function CategoryMange({ onCategoryAdded }) {
  const [newCategory, setNewCategory] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const navigation = useNavigation();

  const addCategory = () => {
    if (newCategory) {
      // onCategoryAdded(newCategory);
      // navigation.navigate('CategoryOverview', { newCategories: [newCategory] });
      navigation.navigate('CategoryOverview', { newCategories: [...newCategories, newCategory] });
      setNewCategories(prevCategories => [...prevCategories, newCategory]);
      setNewCategory('');
    }
   
  };


  return (
    <ScrollView>
      {/* <CategoryOverview /> */}
      <TextInput 
        placeholder="New Category"
        value={newCategory}
        onChangeText={(text) => setNewCategory(text)}
        style={{ height: 60, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 10 }}
      />

      <Pressable onPress={addCategory} style={{ backgroundColor: '#427D9D', padding: 20, margin: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', fontSize:20 }}>Add Category</Text>
      </Pressable>

      
    </ScrollView>
  );
}

export default CategoryMange;