import { Box, HStack, Switch, Text } from '@chakra-ui/react';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { IRegularGameScore } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRegularGameScore } from '../api';

export default function RegularGameChart() {
  const { datePk } = useParams();
  const [swValue, setSwValue] = useState(true);
  const { isLoading, data } = useQuery<IRegularGameScore[]>(['regularGame', datePk], getRegularGameScore);

  return (
    <>
      {!isLoading ? (
        <Box w={'100%'}>
          <HStack w={'100%'} justifyContent={'flex-end'} py={5} px={5}>
            <Text>점수</Text>
            <Switch onChange={() => setSwValue(!swValue)} />
            <Text>평균</Text>
          </HStack>
          {swValue ? (
            <ReactApexChart
              type="bar"
              height={300}
              series={[
                { name: '1게임', data: data?.map(score => score.score1) as number[] },
                { name: '2게임', data: data?.map(score => score.score2) as number[] },
                { name: '3게임', data: data?.map(score => score.score3) as number[] },
                { name: '4게임', data: data?.map(score => score.score4) as number[] },
              ]}
              options={{
                grid: { strokeDashArray: 5, xaxis: { lines: { show: true } } },
                dataLabels: { offsetX: -5 },
                plotOptions: { bar: { horizontal: true, dataLabels: { position: 'top' } } },
                xaxis: { categories: data?.map(score => score.bowler.name), max: 300 },
                tooltip: { shared: true, intersect: false },
                legend: { show: true, horizontalAlign: 'right' },
              }}
            />
          ) : (
            <ReactApexChart
              type="bar"
              height={150}
              series={[{ name: '평균', data: data?.map(score => score.average) as number[] }]}
              options={{
                grid: { strokeDashArray: 5, xaxis: { lines: { show: true } } },
                dataLabels: { offsetX: -5 },
                plotOptions: { bar: { horizontal: true, dataLabels: { position: 'top' } } },
                xaxis: { categories: data?.map(score => score.bowler.name), max: 300 },
                tooltip: { shared: true, intersect: false },
                legend: { show: true, horizontalAlign: 'right' },
              }}
            />
          )}
        </Box>
      ) : null}
    </>
  );
}
