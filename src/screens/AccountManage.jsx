import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getAccountData } from '../services/AccountServices';
import { getSpending } from '../services/SpendingServices';
import { useAppContext } from '../utils/AppContext';
import AccountCard from '../components/AccountCard';
import { ScreenWidth } from 'react-native-elements/dist/helpers';


function AccountManage() {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { databaseVersion, setDatabaseVersion } = useAppContext();
  const [accountAndSpending, setAccountAndSpending] = useState([]); // [ { account: { ... }, totalSpending: 0 }, ...

  //Handle show modal
  const [showAddModal, setShowAddModal] = useState(false);


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


  const handleAdd = () => {
    setShowAddModal(true);
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
      <ScrollView style={{width: ScreenWidth, padding: 40}}>
        <Text style={{ color:'#DDF2FD', textAlign: 'center' , fontSize: 20, marginTop: 20, marginBottom: 20}}>Welcome to Account Manage!</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={{textAlign:'center', color:'#DDF2FD', fontSize:25}}>+ Add New</Text>
        </TouchableOpacity>
        {accountData ? 
          (accountData.map((account) => (
            <TouchableOpacity key={account.id} style={styles.accountCard}>
              <Text style={{textAlign:'center', color:'#DDF2FD', fontSize:25}}>{account.accountName}</Text>
            </TouchableOpacity>
          )))
          : 
          (<Text style={{textAlign:'center', color:'#DDF2FD'}}>No account</Text>)}
          
      </ScrollView>

    {/* (showAddModal && (
      <AddAccountForm
        visible={showAddModal}
        closeModal={closeModal}
        onSave={handleSave}
      />
      )
    ); */}
  </SafeAreaView>
  );
}


export default AccountManage;


const styles = StyleSheet.create({
  accountCard: {
    backgroundColor: '#427D9D',
    padding: 30,
    margin: 20,
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: '#427D9D',
    opacity: 0.7,
    padding: 30,
    margin: 20,
    borderRadius: 10,
  }
});
