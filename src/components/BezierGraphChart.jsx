import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const BezierGraphChart = ({ labelList, graphData }) => {
  const screenWidth = Dimensions.get('window').width;

  // Sample data for the chart (x-axis labels and corresponding values)
  const chartData = {
    labels: labelList,
    datasets: [
      {
        data: graphData,
      },
    ],
  };

  return (
    <LineChart
      data={chartData}
      width={screenWidth} // from react-native
      height={220}
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#427D9D',
        backgroundGradientFrom: '#427D9D',
        backgroundGradientTo: '#9BBEC8',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#164863',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
};

export default BezierGraphChart;