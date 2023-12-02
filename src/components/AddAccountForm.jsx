import { useAppContext } from "../utils/AppContext"
import { updateAccountData,getAccountData } from "../services/AccountServices"

import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useState } from "react";




export const AddAccountForm = ({isVisible,newAccount}) => {
    const [accountData, setAccountData] = useState(null);
    const { databaseVersion, setDatabaseVersion } = useAppContext();
    const [newAccount, setNewAccount] = useState({
        accountName: '',
        record: [],
    });
    const handleSave = async () => {

    

    return (
        <Modal visible={isVisible} animationType="slide">
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.title}>Add Account</Text>
            <Text style={styles.label}>Account Name</Text>
            <TextInput
                value={newAccount.accountName}
                onChangeText={(text) => setNewAccount({ ...newExpense, accountName: text })}
                placeholder="Enter A Name"
                style={styles.input}
            />
        
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSave} style={styles.buttonEnd}><Text style={{textAlign: 'center'}}>Save</Text></TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.buttonEnd}><Text style={{textAlign: 'center'}}>Delete</Text></TouchableOpacity>
            </View>
            </View>
        </ScrollView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#164863',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#DDF2FD',
    },
    label: {
      color: '#DDF2FD',
      marginTop: 10,
      width: 350,
      textAlign: 'left',
      lineHeight: 50,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      width: '100%',
      backgroundColor: '#DDF2FD',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 15,
    },
    button: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      width: '50%',
      backgroundColor: '#DDF2FD',
    },
    buttonEnd: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
      width: '50%',
      backgroundColor: '#DDF2FD',
    },
    selectedButton: {
      backgroundColor: '#427D9D',
      // Additional styles for the selected button
    },
    buttonText: {
      textAlign: 'center',
      color: '#000', // Set the text color for buttons
    },
  });