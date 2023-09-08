import { Box, Heading } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { IRegularGameDate } from '../types';
import { getRegularGameDates } from '../api';
import ReactApexChart from 'react-apexcharts';

export default function NumOfBowlersChart() {
  const { isLoading, data } = useQuery<IRegularGameDate[]>(['regularGameDates'], getRegularGameDates);
  return (
    <Box w={'100%'} textAlign={'center'}>
      <Heading mb={5}>정기전 참여인원</Heading>
      {!isLoading ? (
        <ReactApexChart
          type="line"
          height={300}
          series={[{ name: '참가인원', data: data?.map(date => date.num_of_bowlers) as number[] }]}
          options={{
            stroke: { curve: 'smooth' },
            // tooltip: { enabled: false },
            xaxis: { categories: data?.map(date => date.date) },
            yaxis: { tickAmount: 1, min: 0 },
            markers: { size: 0 },
            // dataLabels: { enabled: true },
            legend: { show: true, horizontalAlign: 'right', onItemClick: { toggleDataSeries: false } },
          }}
        />
      ) : null}
    </Box>
  );
}
