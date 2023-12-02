import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getAccountData } from '../services/AccountServices';
import { updateAccountData } from '../services/AccountServices';
import { getSpending } from '../services/SpendingServices';
import { useAppContext } from '../utils/AppContext';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import AddAccountForm from '../components/AddAccountForm';
import EditAccountForm from '../components/EditAccountForm';


function AccountManage() {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { databaseVersion, setDatabaseVersion } = useAppContext();


  //Handle show modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [accountToEdit, setAccountToEdit] = useState(null);

  const fetchAccountData = async () => {
    setLoading(true);
    const result = await getAccountData();
    setLoading(false);
    if (result.success) {
      setAccountData(result.data);
    } else {
      console.error('Error fetching account data:', result.error);
    }
  };


  //handle edit account
  const handleSaveEdit = async (newAccountToUpdate) => {
    // Assuming accountData is an array of accounts
    const updatedAccounts = accountData.map((account) => {
      if (account.id === newAccountToUpdate.id) {
        return newAccountToUpdate; // Replace the edited account in the array
      }
      return account;
    });

    const result = await updateAccountData(updatedAccounts);
    if (result.success) {
      setDatabaseVersion(databaseVersion + 1);
    } else {
      console.error('Error saving edited account:', result.error);
    }
    setShowEditModal(false);
  };
  

  //Handle delete account
  const handleDelete = async (accountToDelete) => {
    const updatedAccounts = accountData.filter((account) => account.id !== accountToDelete.id);
    const result = await updateAccountData(updatedAccounts);
    if (result.success) {
      setDatabaseVersion(databaseVersion + 1);
    } else {
      console.error('Error deleting account:', result.error);
    }
    setShowEditModal(false);
  };
  

  //Account edit form
  const handleEdit = (account) => {
    setAccountToEdit(account);
    console.log(accountToEdit);
    setShowEditModal(true);
  };


  //Handle new account create form
  const handleAdd = () => {
    setShowAddModal(true);
  };

  //Handle close modal
  const handleClose = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };



  //Handle save new account
  const handleSave = async (toCreateAccount) => {
    const maxId = accountData.reduce((max, account) => (account.id > max ? account.id : max), 0);
    const newAccountWithId = { ...toCreateAccount, id: maxId + 1 };
    const result = await updateAccountData([...accountData, newAccountWithId]);
    if (result.success) {
      setDatabaseVersion(databaseVersion + 1);
      
    } else {
      console.error('Error saving new account:', result.error);
    }
    setShowAddModal(false);
  };


  useEffect(() => {
    fetchAccountData();
  }, []);

  useEffect(() => {
    fetchAccountData();
  }, [databaseVersion]);



  return (
    <SafeAreaView style={{ 
      flex: 1, 
      backgroundColor: '#164863',
      justifyContent: 'center', 
      alignItems: 'center'
      }}>
      <ScrollView style={{width: ScreenWidth, padding: 40 }}>
        <Text style={{ color:'#DDF2FD', textAlign: 'center' , fontSize: 20, marginTop: 20, marginBottom: 20}}>Welcome to Account Manage!</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={{textAlign:'center', color:'#DDF2FD', fontSize:20}}>+ Add New</Text>
        </TouchableOpacity>
        <View style={{paddingBottom: 40}}>
          {accountData ? 
          (accountData.map((account) => (
            <TouchableOpacity key={account.id} style={styles.accountCard} onPress={()=>{handleEdit(account)}}>
              <Text style={{textAlign:'center', color:'#DDF2FD', fontSize:20}}>{account.accountName}</Text>
            </TouchableOpacity>
          )))
          : 
          (<Text style={{textAlign:'center', color:'#DDF2FD'}}>No account</Text>)}
          
        </View>
      </ScrollView>
      {showAddModal && <AddAccountForm visible={showAddModal} onClose={handleClose} onSave={handleSave} />}
      {showEditModal && <EditAccountForm editedAccount={accountToEdit} visible={showEditModal} onClose={handleClose} onSave={handleSaveEdit} onDelete={handleDelete}/>}
  </SafeAreaView>
  );
}


export default AccountManage;


const styles = StyleSheet.create({
  accountCard: {
    backgroundColor: '#427D9D',
    padding: 30,
    margin: 10,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#427D9D',
    opacity: 0.7,
    padding: 30,
    margin: 10,
    borderRadius: 10,
  }
});
