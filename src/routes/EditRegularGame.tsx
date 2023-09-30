import {
  Button,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { IRegularGameScore } from '../types';
import { useParams } from 'react-router-dom';
import { getRegularGameScore } from '../api';

export default function EditRegularGame() {
  const { datePk } = useParams();
  const { isLoading, data } = useQuery<IRegularGameScore[]>(['regularGame', datePk], getRegularGameScore);
  return (
    <>
      <Tabs w={'100%'}>
        <TabList>
          <Tab>점수</Tab>
          <Tab>레인</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableContainer w={'100%'} mt={5}>
              <Table variant={'striped'} size={'sm'}>
                <Thead>
                  <Tr h={10}>
                    <Th textAlign={'center'}>RANK</Th>
                    <Th textAlign={'center'}>이름</Th>
                    <Th textAlign={'center'}>시드</Th>
                    <Th textAlign={'center'}>1G</Th>
                    <Th textAlign={'center'}>2G</Th>
                    <Th textAlign={'center'}>3G</Th>
                    <Th textAlign={'center'}>4G</Th>
                    <Th textAlign={'center'}>AVG</Th>
                    <Th textAlign={'center'}>TOTAL</Th>
                    <Th textAlign={'center'}>HIGH LOW</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {!isLoading
                    ? data
                        ?.sort((a, b) => a.rank - b.rank)
                        .map(score => (
                          <Tr key={score.bowler.pk}>
                            <Td>
                              <Text textAlign={'center'}>{score.rank}</Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>{score.bowler.name}</Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>0</Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>
                                <Input
                                  max={300}
                                  type="number"
                                  defaultValue={score.score1}
                                  variant="unstyled"
                                  textAlign={'center'}
                                />
                              </Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}></Text>
                              <Input
                                max={300}
                                type="number"
                                defaultValue={score.score2}
                                variant="unstyled"
                                textAlign={'center'}
                              />
                            </Td>
                            <Td>
                              <Text textAlign={'center'}></Text>
                              <Input
                                max={300}
                                type="number"
                                defaultValue={score.score3}
                                variant="unstyled"
                                textAlign={'center'}
                              />
                            </Td>
                            <Td>
                              <Text textAlign={'center'}></Text>
                              <Input
                                max={300}
                                type="number"
                                defaultValue={score.score4}
                                variant="unstyled"
                                textAlign={'center'}
                              />
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>{score.average}</Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>{score.total_score}</Text>
                            </Td>
                            <Td>
                              <Text textAlign={'center'}>{score.high_low}</Text>
                            </Td>
                          </Tr>
                        ))
                    : null}
                </Tbody>
              </Table>
            </TableContainer>
            <Button size={'lg'} w={'100%'} my={10} colorScheme="linkedin">
              저장하기
            </Button>
          </TabPanel>
          <TabPanel>
            <Text>레인</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
