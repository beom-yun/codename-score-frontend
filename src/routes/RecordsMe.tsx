import {
  Avatar,
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
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
          h={1200 + (data?.regular_game_scores.length as number) * 33}
          gap={5}
          templateRows={'repeat(4, 1fr)'}
          templateColumns={'repeat(6, 1fr)'}
          rounded={'xl'}
        >
          <GridItem h={310} colSpan={2} border={'1px'} borderColor={'gray.200'} shadow={'md'} rounded={'xl'}>
            <VStack alignItems={'center'} h={'100%'} py={4}>
              <Heading fontSize={26}>프로필</Heading>
              <Divider />
              <VStack spacing={2} justifyContent={'center'} h={'100%'}>
                <Avatar size={{ sm: 'md', md: 'lg', lg: 'xl' }} src={user?.avatar} name={user?.name} mb={2} />
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

          <GridItem h={310} colSpan={2} border={'1px'} borderColor={'gray.200'} shadow={'md'} rounded={'xl'}>
            <VStack alignItems={'center'} h={'100%'} pt={4}>
              <Heading fontSize={26}>프로필</Heading>
              <Divider />
              <VStack spacing={2} justifyContent={'center'} h={'100%'}>
                <ReactApexChart
                  type="radar"
                  height={'100%'}
                  series={[{ data: [80, 60, 50, 70, 80, 90] }]}
                  options={{
                    xaxis: { categories: ['참여율', '최고 점수', '최고 에버', '전체 에버', '시드', '회비 납부'] },
                  }}
                />
              </VStack>
            </VStack>
          </GridItem>

          <GridItem h={310} colSpan={2} border={'1px'} borderColor={'gray.200'} shadow={'md'} rounded={'xl'}>
            <VStack h={'100%'} py={4}>
              <Heading fontSize={26}>일반</Heading>
              <Divider />
              <HStack spacing={12} justifyContent={'center'} alignItems={'center'} h={'100%'}>
                <VStack alignItems={'flex-start'} spacing={5}>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.join_date ? data?.join_date : '0000-00-00'}</Heading>
                    <Text>가입일</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>
                      {data?.first_regular_game_date ? data?.first_regular_game_date : '0000-00-00'}
                    </Heading>
                    <Text>첫 정기전 참여</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.continuous_days ? data?.continuous_days : '0'} 일</Heading>
                    <Text>함께한 날</Text>
                  </VStack>
                </VStack>
                <VStack alignItems={'flex-start'} spacing={5}>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'}>{data?.total_regular_game_count} 회</Heading>
                    <Text>정기전 참여</Text>
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

          <GridItem h={310} colSpan={2} border={'1px'} borderColor={'gray.200'} shadow={'md'} rounded={'xl'}>
            <VStack h={'100%'} py={4}>
              <Heading fontSize={26}>기록</Heading>
              <Divider />
              <HStack spacing={20} justifyContent={'center'} alignItems={'center'} h={'100%'}>
                <VStack alignItems={'flex-start'} spacing={5}>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'} color={(data?.total_average as number) >= 200 ? 'goldenrod' : 'current'}>
                      {data?.total_average}
                    </Heading>
                    <Text>전체 에버리지</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading
                      size={'md'}
                      color={
                        Math.max(...(data?.regular_game_scores.map(x => x.average) as number[])) >= 200
                          ? 'goldenrod'
                          : 'current'
                      }
                    >
                      {Math.max(...(data?.regular_game_scores.map(x => x.average) as number[]))}
                    </Heading>
                    <Text>최고 에버</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading
                      size={'md'}
                      color={
                        Math.min(...(data?.regular_game_scores.map(x => x.average) as number[])) >= 200
                          ? 'goldenrod'
                          : 'current'
                      }
                    >
                      {Math.min(...(data?.regular_game_scores.map(x => x.average) as number[]))}
                    </Heading>
                    <Text>최저 에버</Text>
                  </VStack>
                </VStack>
                <VStack alignItems={'flex-start'} spacing={5}>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <HStack>
                      <Heading size={'md'}>{data?.max_rank}</Heading>
                      <Text fontSize={'sm'} fontWeight={'bold'}>
                        ({data?.max_rank_count}회)
                      </Text>
                    </HStack>
                    <Text>최고 등수</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading
                      size={'md'}
                      color={
                        (data?.max_score as number) === 300
                          ? 'red'
                          : (data?.max_score as number) >= 200
                          ? 'goldenrod'
                          : 'current'
                      }
                    >
                      {data?.max_score}
                    </Heading>
                    <Text>최고 점수</Text>
                  </VStack>
                  <VStack alignItems={'flex-start'} spacing={1}>
                    <Heading size={'md'} color={(data?.min_score as number) >= 200 ? 'goldenrod' : 'current'}>
                      {data?.min_score}
                    </Heading>
                    <Text>최저 점수</Text>
                  </VStack>
                  {/* <VStack alignItems={'flex-start'} spacing={1} h={'52px'}></VStack> */}
                </VStack>
              </HStack>
            </VStack>
          </GridItem>

          <GridItem
            h={310}
            colSpan={4}
            border={'1px'}
            borderColor={'gray.200'}
            shadow={'md'}
            rounded={'xl'}
            w={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <VStack w={'100%'} h={'100%'} pt={4}>
              <Heading fontSize={26}>에버리지 / 등수 변화</Heading>
              <Divider />
              <Box w={'100%'} h={'100%'} pr={5}>
                <ReactApexChart
                  type="area"
                  height={228}
                  series={[
                    { name: '에버리지', data: data?.regular_game_scores.map(x => x.average) as number[], type: 'area' },
                    { name: '순위', data: data?.regular_game_scores.map(x => x.rank) as number[], type: 'line' },
                  ]}
                  options={{
                    dataLabels: { enabled: false },
                    xaxis: { labels: { show: false }, categories: data?.regular_game_scores.map(x => x.date.date) },
                    yaxis: [
                      { max: 300, min: 0, tickAmount: 3, decimalsInFloat: 0 },
                      { reversed: true, min: 1, labels: { show: false } },
                    ],
                    grid: { strokeDashArray: 5, xaxis: { lines: { show: true } } },
                    plotOptions: { bar: { horizontal: true, dataLabels: { position: 'top' } } },
                    legend: { show: false },
                  }}
                />
              </Box>
            </VStack>
          </GridItem>

          <GridItem
            h={310}
            colSpan={6}
            border={'1px'}
            borderColor={'gray.200'}
            shadow={'md'}
            rounded={'xl'}
            w={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <VStack w={'100%'} h={'100%'} pt={4}>
              <Heading fontSize={26}>점수대별 기록</Heading>
              <Divider />
              <Box w={'100%'} h={'100%'} pr={5} pl={3}>
                <ReactApexChart
                  type="bar"
                  height={228}
                  series={[{ data: data?.average_area as number[] }]}
                  options={{
                    dataLabels: { enabled: true },
                    xaxis: {
                      categories: [
                        0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
                        210, 220, 230, 240, 250, 260, 270, 280, 290, 300,
                      ],
                    },
                    yaxis: { labels: { show: false }, min: 0, tickAmount: 3, decimalsInFloat: 0 },
                    grid: { strokeDashArray: 5, xaxis: { lines: { show: true } } },
                    legend: { show: false },
                    tooltip: { enabled: false },
                    plotOptions: { bar: { borderRadius: 5, dataLabels: { position: 'top' } } },
                  }}
                />
              </Box>
            </VStack>
          </GridItem>

          <GridItem
            colSpan={6}
            border={'1px'}
            borderColor={'gray.200'}
            shadow={'md'}
            rounded={'xl'}
            w={'100%'}
            h={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <VStack w={'100%'} h={'100%'} pt={4}>
              <Heading fontSize={26}>과거 정기전 기록</Heading>
              <Divider />
              <Box w={'100%'} h={'100%'} p={5}>
                <TableContainer>
                  <Table variant={'striped'} size={'sm'}>
                    <Thead>
                      <Tr>
                        <Th textAlign={'center'}>회차</Th>
                        <Th textAlign={'center'}>날짜</Th>
                        <Th textAlign={'center'}>AVG</Th>
                        <Th textAlign={'center'}>RANK</Th>
                        <Th textAlign={'center'}>TOTAL</Th>
                        <Th textAlign={'center'}>1G</Th>
                        <Th textAlign={'center'}>2G</Th>
                        <Th textAlign={'center'}>3G</Th>
                        <Th textAlign={'center'}>4G</Th>
                        <Th textAlign={'center'}>HIGH LOW</Th>
                        <Th textAlign={'center'}>시드</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.regular_game_scores
                        .slice(0)
                        .reverse()
                        .map(score => (
                          <Tr key={score.date.id}>
                            <Td>
                              <Text textAlign={'center'}>{score.date.round_of_game}</Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>{score.date.date}</Text>
                            </Td>
                            <Td>
                              <Text
                                textColor={score.average >= 200 ? 'goldenrod' : 'current'}
                                fontWeight={score.average >= 200 ? 'bold' : 'current'}
                                textAlign={'center'}
                              >
                                {score.average}
                              </Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>{score.rank}</Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>{score.total_score}</Text>
                            </Td>
                            <Td>
                              <Text
                                textColor={score.score1 === 300 ? 'red' : score.score1 >= 200 ? 'goldenrod' : 'current'}
                                fontWeight={score.score1 >= 200 ? 'bold' : 'current'}
                                textAlign={'center'}
                              >
                                {score.score1}
                              </Text>
                            </Td>
                            <Td>
                              <Text
                                textColor={score.score2 === 300 ? 'red' : score.score2 >= 200 ? 'goldenrod' : 'current'}
                                fontWeight={score.score2 >= 200 ? 'bold' : 'current'}
                                textAlign={'center'}
                              >
                                {score.score2}
                              </Text>
                            </Td>
                            <Td>
                              <Text
                                textColor={score.score3 === 300 ? 'red' : score.score3 >= 200 ? 'goldenrod' : 'current'}
                                fontWeight={score.score3 >= 200 ? 'bold' : 'current'}
                                textAlign={'center'}
                              >
                                {score.score3}
                              </Text>
                            </Td>
                            <Td>
                              <Text
                                textColor={score.score4 === 300 ? 'red' : score.score4 >= 200 ? 'goldenrod' : 'current'}
                                fontWeight={score.score4 >= 200 ? 'bold' : 'current'}
                                textAlign={'center'}
                              >
                                {score.score4}
                              </Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>{score.high_low}</Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>0</Text>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      ) : null}
    </ProtectedPage>
  );
}
