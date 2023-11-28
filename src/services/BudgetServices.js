// CategoryServices.js
import RNFS from 'react-native-fs';

export const getBudgetData = async () => {
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
