import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, StyleSheet, TouchableOpacity } from 'react-native';


export default function EditAccountForm ({ editedAccount, isVisible, onSave, onClose, onDelete }) {
    const [newAccount, setNewAccount] = useState({
      id: editedAccount.id,
      accountName: editedAccount.accountName, // Use the correct variable here
      record: editedAccount.record,
    });
  
    const handleSave = () => {
      onSave(newAccount);
    };
  
    const handleDelete = () => {
      onDelete(newAccount);
    };

    useEffect(() => {
        setNewAccount(editedAccount);
        }, [editedAccount]);

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add Account</Text>
          <Text style={styles.label}>Account Name</Text>
          <TextInput
            value={newAccount.accountName}
            onChangeText={(text) => setNewAccount({ ...newAccount, accountName: text })}
            placeholder="Enter An Account Name"
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.button}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
            <TouchableOpacity onPress={handleDelete} style={styles.button}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: '#164863',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
    paddingLeft: 30,
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
    width: '45%', // Adjusted width to fit both buttons
    backgroundColor: '#DDF2FD',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000', // Set the text color for buttons
  },
});
