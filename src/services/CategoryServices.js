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
    return { success: true, data: parsedCategoryData, error: null };
  } catch (error) {
    console.error('Error reading category data:', error);
    return { success: false, data: null, error: error.message };
  }
};

export const updateCategoryData = async (categoryData) => {
  try {
    const categoryDataFile = RNFS.DocumentDirectoryPath + '/src/database/category.json';
    await RNFS.writeFile(categoryDataFile, JSON.stringify(categoryData), 'utf8');
    return { success: true, error: null };
  } catch (error) {
    console.error('Error writing category data:', error);
    return { success: false, error: error.message };
  }
};

// Attribute for the items
const CategoryServices = () => {
    try {
        const spendingData = require('../database/spending.json');
        return spendingData;
      } catch (error) {
        console.error('Error getting spending data:', error);
        return { success: false, message: 'Failed to get spending data' };
      }
};

export default CategoryServices;



