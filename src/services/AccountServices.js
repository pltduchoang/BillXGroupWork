// AccountServices.js
import RNFS from 'react-native-fs';

export const getAccountData = async () => {
  try {
    const accountDataFile = RNFS.DocumentDirectoryPath + '/src/database/account.json';
    const accountData = await RNFS.readFile(accountDataFile, 'utf8');
    const parsedAccountData = JSON.parse(accountData);

    return { success: true, data: parsedAccountData, error: null };
  } catch (error) {
    console.error('Error reading account data:', error);
    return { success: false, data: null, error: error.message };
  }
};

// Update account data to the account.json file
export const updateAccountData = async (dataToWrite) => {
    try {
        const accountDataFile = RNFS.DocumentDirectoryPath + '/src/database/account.json';
        const jsonData = JSON.stringify(dataToWrite); // Convert the data to a JSON string

        // Write the updated account data to the account.json file
        await RNFS.writeFile(accountDataFile, jsonData, 'utf8');
        
        return { success: true, error: null };
    } catch (error) {
        console.error('Error updating account data:', error);
        return { success: false, error: error.message };
    }
};