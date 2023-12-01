import RNFS from 'react-native-fs';



// Get spending data from the spending.json file
export const getSpending = async () => {
  try {
    const spendingDataFile = RNFS.DocumentDirectoryPath + '/src/database/spending.json';
    const spendingData = await RNFS.readFile(spendingDataFile, 'utf8');
    const parsedSpendingData = JSON.parse(spendingData);
    // Log or perform operations with the parsed spending data here
    return parsedSpendingData;
     // Return the parsed spending data if needed
  } catch (error) {
    console.error('Error reading spending data at service page:', error);
    return null; // Return null or handle the error accordingly
  }
};


// create spending data to the spending.json file
export const createSpending = async (dataToWrite) => {
  try {
    console.log('dataToWrite', dataToWrite);
    const spendingDataFile = RNFS.DocumentDirectoryPath + '/src/database/spending.json';
    const jsonData = JSON.stringify(dataToWrite); // Convert the data to a JSON string


    
    await RNFS.writeFile(spendingDataFile, jsonData, 'utf8'); // Write the JSON string to the file

    // Log or perform operations with the data if needed
    console.log('Spending data written!');

    return true; // Return true to indicate successful writing
  } catch (error) {
    console.error('Error writing spending data:', error);
    return false; // Return false or handle the error accordingly
  }
};


