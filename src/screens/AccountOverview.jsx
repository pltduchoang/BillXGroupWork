// AccountOverView.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { getAccountData } from '../services/AccountServices';

function AccountOverView() {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const result = await getAccountData();
    setLoading(false);
    if (result.success) {
      setAccountData(result.data);
    } else {
      console.error('Error fetching account data:', result.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to AccountOverView!</Text>
      {loading && <Text>Loading...</Text>}
      {accountData && (
        <View>
          {/* Display the account data here */}
          <Text>Account Data:</Text>
          <Text>{JSON.stringify(accountData)}</Text>
        </View>
      )}
    </View>
  );
}

export default AccountOverView;
