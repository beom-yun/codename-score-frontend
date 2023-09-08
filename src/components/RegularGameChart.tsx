import { Box, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import ReactApexChart from 'react-apexcharts';
import { IRegularGameDate, IRegularGameScore } from '../types';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRegularGameDate, getRegularGameScore } from '../api';
import { useState } from 'react';

export default function RegularGameChart() {
  const { datePk } = useParams();
  const [radioValue, setRadioValue] = useState('1');
  const { isLoading, data } = useQuery<IRegularGameScore[]>(['regularGame', datePk], getRegularGameScore);
  const { data: dateData } = useQuery<IRegularGameDate>(['regularGameDates', datePk], getRegularGameDate);

  return (
    <>
      {!isLoading ? (
        <Box w={'100%'} textAlign={'center'}>
          <RadioGroup defaultValue="1" value={radioValue} onChange={setRadioValue}>
            <HStack w={'100%'} justifyContent={'flex-end'} p={5} spacing={5}>
              <Radio value="1">평균</Radio>
              <Radio value="2">점수</Radio>
              <Radio value="3">총점</Radio>
            </HStack>
          </RadioGroup>

          {data && radioValue === '1' ? (
            <ReactApexChart
              type="bar"
              height={dateData ? (dateData?.num_of_bowlers < 2 ? 150 : 50 * dateData?.num_of_bowlers) : 0}
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
          ) : data && radioValue === '2' ? (
            <ReactApexChart
              type="bar"
              height={dateData ? (dateData?.num_of_bowlers < 2 ? 300 : 100 * dateData?.num_of_bowlers) : 0}
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
                legend: { show: true, horizontalAlign: 'right', onItemClick: { toggleDataSeries: false } },
              }}
            />
          ) : data && radioValue === '3' ? (
            <ReactApexChart
              type="bar"
              height={dateData ? (dateData?.num_of_bowlers < 2 ? 150 : 50 * dateData?.num_of_bowlers) : 0}
              series={[{ name: '총점', data: data?.map(score => score.total_score) as number[] }]}
              options={{
                grid: { strokeDashArray: 5, xaxis: { lines: { show: true } } },
                dataLabels: { offsetX: -5 },
                plotOptions: { bar: { horizontal: true, dataLabels: { position: 'top' } } },
                xaxis: { categories: data?.map(score => `${score.bowler.name} (${score.game_count}게임)`), max: 1200 },
                tooltip: { shared: true, intersect: false },
                legend: { show: true, horizontalAlign: 'right' },
              }}
            />
          ) : null}
        </Box>
      ) : null}
    </>
  );
}
