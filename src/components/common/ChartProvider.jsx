import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const seriesA = {
  data: [2, 3, 1, 4, 5],
  label: 'Reviews',
  color: '#813ffb'
};
const seriesB = {
  data: [3, 1, 4, 2, 1],
  label: 'My service',
  color: '#e6523a'
};

export default function ChartProvider() {
  return (
    <BarChart
      width={700}
      height={350}
      series={[
        { ...seriesA, stack: 'total' },
        { ...seriesB, stack: 'total' },
      ]}
    />
  );
}