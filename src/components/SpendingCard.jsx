import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Card } from '@rneui/themed';


const SpendingCard = ({ spending, onLongPress }) => {
    const handleLongPress = () => {
      onLongPress(spending);
    };

    useEffect(() => {
      console.log('SpendingCard: useEffect: spending: ', spending);
      }, []);
  
    return (
      <TouchableOpacity onPress={handleLongPress}>
        <Card
          containerStyle={
            {
              backgroundColor: spending.type === 'spend' ? "#427D9D" : "#9BBEC8",
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
            <Text style={{ color: "#DDF2FD" }}>{spending.time.toLocaleString()}</Text>
            <Text style={{ color: "#DDF2FD" }}>{spending.amount}</Text>
            <Text style={{ color: "#DDF2FD" }}>{spending.description}</Text>
          </Card>
      </TouchableOpacity>
    );
  };
  
  export default SpendingCard;