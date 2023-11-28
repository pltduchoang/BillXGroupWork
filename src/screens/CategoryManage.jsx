import React from 'react';
import { View, Text } from 'react-native';
import Test from '../screens/CategoryOverview';

function CategoryMange() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to CategoryMange!</Text>
      {/* Add your content for the Home Month View */}
      <Test />
    </View>
  );
}

export default CategoryMange;