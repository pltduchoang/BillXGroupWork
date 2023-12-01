import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const ProgressPieChart = ({ percentage }) => {
  const chartConfig = {
    backgroundGradientFrom: '#ECECEC',
    backgroundGradientTo: '#ECECEC',
    color: (opacity = 1) => `rgba(155, 190, 200, ${opacity})`,
  };

  const data = {
    labels: ['Progress'],
    data: [[percentage / 100]],
  };

  return (
    <View style={styles.container}>
      <ProgressChart
        data={data}
        width={200}
        height={200}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProgressPieChart;