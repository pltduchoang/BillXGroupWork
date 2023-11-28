import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Card } from '@rneui/themed';


const SpendingCard = ({ expense, onLongPress }) => {
    const handleLongPress = () => {
      onLongPress(expense);
    };
  
    return (
      <TouchableOpacity onLongPress={handleLongPress}>
        <Card
          containerStyle={
            {
              backgroundColor: expense.type === 'spend' ? "#427D9D" : "#9BBEC8",
              width: 300,
              height: 90,
              borderRadius: 10,
              borderColor: "#164863",
              borderWidth: 2,
              margin: 10,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }
          }>
            <Text style={{ color: "#DDF2FD" }}>{expense.time}</Text>
            <Text style={{ color: "#DDF2FD" }}>{expense.amount}</Text>
            <Text style={{ color: "#DDF2FD" }}>{expense.category}</Text>
          </Card>
      </TouchableOpacity>
    );
  };
  
  export default SpendingCard;