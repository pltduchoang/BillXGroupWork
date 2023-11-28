import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import RNFS from 'react-native-fs'; // Import React Native File System
import spendingData from '../database/spending.json';


function SettingApp() {
  const resetDatabase = async () => {
    const data = spendingData || [];
    try {
      let categoryId = 1;
      let accountId = 1;

      let spending = [];
      let accounts = {};
      let categories = {};

      data.forEach(transaction => {
        const { id, amount, type, time, description, category, budget, account } = transaction;

        // Creating spending object
        spending.push({ id, amount, type, time, description });

        // Creating categories
        if (!categories[category]) {
          categories[category] = { id: categoryId++, categoryName: category, budget: 0, record: [] };
        }
        categories[category].record.push(id);
        if (budget !== 0) {
          categories[category].budget = budget;
        }

        // Creating accounts
        if (!accounts[account]) {
          accounts[account] = { id: accountId++, accountName: account, record: [] };
        }
        accounts[account].record.push(id);
      });


      spending.forEach(spending => console.log(spending));
      Object.values(categories).forEach(category => console.log(category));
      Object.values(accounts).forEach(account => console.log(account));

      spending = JSON.stringify(spending, null, 2);
      accounts = JSON.stringify(Object.values(accounts), null, 2);
      categories = JSON.stringify(Object.values(categories), null, 2);

      const databaseFolderPath = RNFS.DocumentDirectoryPath + '/src/database/';

      console.log('RNFS.DocumentDirectoryPath:', RNFS.DocumentDirectoryPath);
      console.log('databaseFolderPath:', databaseFolderPath);
      const contents = await RNFS.readDir(databaseFolderPath);
      console.log('contents:', contents);



      await Promise.all([
        RNFS.writeFile(databaseFolderPath + 'spending.json', spending, 'utf8'),
        RNFS.writeFile(databaseFolderPath + 'account.json', accounts, 'utf8'),
        RNFS.writeFile(databaseFolderPath + 'category.json', categories, 'utf8')
      ]);

      console.log('JSON files generated successfully!');
    } catch (error) {
      console.error('Error generating JSON files:', error);
    }
  };
    
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to SettingApp!</Text>
      <Button title="Reset Database" onPress={resetDatabase} />
    </View>
  );
}

export default SettingApp;
