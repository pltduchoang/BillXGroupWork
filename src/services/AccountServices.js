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
