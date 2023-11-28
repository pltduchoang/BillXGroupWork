



// Service to get spending data from JSON file
export const getSpendingData = async () => {
  try {
    const spendingData = require('../database/spending.json');
    return { success: true, data: spendingData };
  } catch (error) {
    console.error('Error getting spending data:', error);
    return { success: false, message: 'Failed to get spending data' };
  }
};