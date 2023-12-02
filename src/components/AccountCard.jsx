import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Card } from '@rneui/themed';


export default function AccountCard({accountAndSpending, onLongPress}) {
    
    
    const handleLongPress = () => {
        console.log("AccountCard: handleLongPress: accountAndSpending: ", accountAndSpending);
        onLongPress(accountAndSpending);
    };


    return (
        <TouchableOpacity onPress={handleLongPress} style={{
            marginBottom: 10,
        }}>
            <Card 
            
            containerStyle={ 
            {
                backgroundColor: "#427D9D",
                width: 300,
                height: 90,
                borderRadius: 10,
                borderColor: "#164863",
                borderWidth: 2,
                margin: 10,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                flexDirection: "row",
            }
          }>
            <Text style={{ color: "#DDF2FD", textAlign: 'center', fontSize: 20}}>{accountAndSpending.account}</Text>
            <Text style={{ color: "#DDF2FD", textAlign: 'center', fontSize: 24}}>${accountAndSpending.totalSpending}</Text>
          </Card>
        </TouchableOpacity>
    )
}