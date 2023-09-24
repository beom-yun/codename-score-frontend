import { Avatar, Box, Divider, Grid, GridItem, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getMyRecords } from '../api';
import { IMyRecords } from '../types';
import ReactApexChart from 'react-apexcharts';
import ProtectedPage from '../components/ProtectedPage';
import useUser from '../lib/useUser';

export default function RecordsMe() {
  const { isLoading, data } = useQuery<IMyRecords>(['records', 'me'], getMyRecords);
  const { user } = useUser();

  return (
    <ProtectedPage>
      {!isLoading ? (
        <Grid
          py={10}
          w={'100%'}
          px={{ sm: 10, md: 20, lg: 40 }}
          h={'1050px'}
          gap={5}
          templateRows={'repeat(3, 1fr)'}
          templateColumns={'repeat(6, 1fr)'}
          rounded={'xl'}
        >
          <GridItem colSpan={3} border={'1px'} borderColor={'gray.200'} shadow={'md'} rounded={'xl'}>
            <VStack justifyContent={'center'} alignItems={'center'} h={'100%'} gap={5}>
              <Avatar size={{ sm: 'md', md: 'lg', lg: 'xl' }} src={user?.avatar} name={user?.name} />
              <VStack spacing={1}>
                <Heading>{user?.name}</Heading>
                <Text>
                  {user?.position === 'chairman'
                    ? '회장'
                    : user?.position === 'executive'
                    ? '운영진'
                    : user?.position === 'general'
                    ? '일반회원'
                    : '게스트'}
                </Text>
              </VStack>
            </VStack>
          </GridItem>

          <GridItem colSpan={3} border={'1px'} borderColor={'gray.200'} shadow={'md'} rounded={'xl'}>
            <VStack h={'100%'} py={4}>
              <Heading fontSize={26}>일반</Heading>
              <Divider />
              <HStack spacing={20} justifyContent={'center'} alignItems={'center'} h={'100%'}>
                <VStack alignItems={'flex-start'} spacing={5}>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.join_date}</Heading>
                    <Text>가입일</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.first_regular_game_date}</Heading>
                    <Text>첫 정기전 참여</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.continuous_days} 일</Heading>
                    <Text>함께한 날</Text>
                  </VStack>
                </VStack>
                <VStack alignItems={'flex-start'} spacing={4}>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.total_regular_game_count}</Heading>
                    <Text>정기전 참여 횟수</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.total_game_count}</Heading>
                    <Text>총 게임수</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.total_total_score}</Heading>
                    <Text>총 점수</Text>
                  </VStack>
                </VStack>
              </HStack>
            </VStack>
          </GridItem>

          <GridItem colSpan={2} border={'1px'} borderColor={'gray.200'} shadow={'md'} rounded={'xl'}>
            <VStack h={'100%'} py={4}>
              <Heading fontSize={26}>기록</Heading>
              <Divider />
              <HStack spacing={20} justifyContent={'center'} alignItems={'center'} h={'100%'}>
                <VStack alignItems={'flex-start'} spacing={5}>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.total_average}</Heading>
                    <Text>전체 에버리지</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>
                      {Math.max(...(data?.average_rank_change.map(x => x.score) as number[]))}
                    </Heading>
                    <Text>최고 에버</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>
                      {Math.min(...(data?.average_rank_change.map(x => x.score) as number[]))}
                    </Heading>
                    <Text>최저 에버</Text>
                  </VStack>
                </VStack>
                <VStack alignItems={'flex-start'} spacing={5}>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <HStack>
                      <Heading size={'md'}>{data?.max_rank}</Heading>
                      <Text fontSize={'sm'} fontWeight={'bold'}>
                        ({data?.max_rank_count}번)
                      </Text>
                    </HStack>
                    <Text>최고 등수</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.max_score}</Heading>
                    <Text>최고 점수</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.min_score}</Heading>
                    <Text>최저 점수</Text>
                  </VStack>
                  {/* <VStack alignItems={'flex-start'} spacing={1} h={'52px'}></VStack> */}
                </VStack>
              </HStack>
            </VStack>
          </GridItem>

          <GridItem
            p={5}
            paddingLeft={0}
            colSpan={4}
            border={'1px'}
            borderColor={'gray.200'}
            shadow={'md'}
            rounded={'xl'}
            w={'100%'}
            h={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <ReactApexChart
              type="area"
              height={'100%'}
              series={[
                { name: '에버리지', data: data?.average_rank_change.map(x => x.score) as number[], type: 'area' },
                { name: '순위', data: data?.average_rank_change.map(x => x.rank) as number[], type: 'line' },
              ]}
              options={{
                dataLabels: { enabled: false },
                xaxis: { labels: { show: false }, categories: data?.average_rank_change.map(x => x.date) },
                yaxis: [
                  { max: 300, min: 0, tickAmount: 3, decimalsInFloat: 0 },
                  { reversed: true, min: 1, labels: { show: false } },
                ],
                grid: { strokeDashArray: 5, xaxis: { lines: { show: true } } },
                plotOptions: { bar: { horizontal: true, dataLabels: { position: 'top' } } },
                legend: { show: false },
              }}
            />
          </GridItem>

          <GridItem colSpan={2}>
            <Box h={'100%'} bgColor={'red'} rounded={'xl'}></Box>
          </GridItem>

          <GridItem colSpan={4}>
            <Box h={'100%'} bgColor={'red'} rounded={'xl'}></Box>
          </GridItem>
        </Grid>
      ) : null}
    </ProtectedPage>
  );
}
