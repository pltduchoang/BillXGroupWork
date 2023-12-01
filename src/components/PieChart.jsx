import React from 'react';
import { View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const AppPieChart = ({ data }) => {
  const chartConfig = {
    backgroundColor: '#427D9D',
    backgroundGradientFrom: '#427D9D',
    backgroundGradientTo: '#427D9D',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: () => '#DDF2FD'
  };

  return (
    <View>
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={chartConfig}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

export default AppPieChart;