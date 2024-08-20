import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const seriesA = {
  data: [2, 3, 1, 4, 5],
  label: 'Reviews',
  color: '#813ffb'
};
const seriesB = {
  data: [3, 1, 4, 2, 1],
  label: 'Users',
  color: '#e6523a'
};
const seriesC = {
  data: [3, 2, 4, 5, 1],
  label: 'Providers',
  color: '#4787ff'
};
const seriesD = {
  data: [3, 2, 4, 5, 1],
  label: 'Services',
  color: '#00b8da'
};
export default function BasicStacking() {
  return (
    <BarChart
      width={700}
      height={350}
      series={[
        { ...seriesA, stack: 'total' },
        { ...seriesB, stack: 'total' },
        { ...seriesC, stack: 'total' },
        { ...seriesD, stack: 'total' },
      ]}
    />
  );
}