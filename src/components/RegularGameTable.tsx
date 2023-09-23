import { Avatar, Badge, HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { IRegularGameScore } from '../types';
import { getRegularGameScore } from '../api';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';

export default function RegularGameTable() {
  const { datePk } = useParams();
  const { isLoading, data } = useQuery<IRegularGameScore[]>(['regularGame', datePk], getRegularGameScore);

  return (
    <TableContainer w={'100%'} mt={5}>
      <Table variant={'striped'} size={'sm'}>
        {/* <TableCaption>caption</TableCaption> */}
        <Thead>
          <Tr h={10}>
            <Th textAlign={'center'}>순위</Th>
            <Th textAlign={'center'}>이름</Th>
            <Th textAlign={'center'}>시드</Th>
            <Th textAlign={'center'}>전회AVG</Th>
            <Th textAlign={'center'}>AVG</Th>
            <Th textAlign={'center'}>TOTAL</Th>
            <Th textAlign={'center'}>1G</Th>
            <Th textAlign={'center'}>2G</Th>
            <Th textAlign={'center'}>3G</Th>
            <Th textAlign={'center'}>4G</Th>
            <Th textAlign={'center'}>HIGH LOW</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!isLoading
            ? data
                ?.sort((a, b) => b.average - a.average)
                .map(score => (
                  <Tr key={score.bowler.pk}>
                    <Td>
                      <Text textAlign={'center'}>{score.rank}</Text>
                    </Td>
                    <Td>
                      <HStack alignItems={'center'} justifyContent={'center'}>
                        <Avatar src={score.bowler.avatar} size={'xs'} />
                        <Text>{score.bowler.name}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Text textAlign={'center'}>0</Text>
                    </Td>
                    <Td>
                      <Text
                        textAlign={'center'}
                        textColor={score.prev_average >= 200 ? 'goldenrod' : 'current'}
                        fontWeight={score.prev_average >= 200 ? 'bold' : 'current'}
                      >
                        {score.prev_average}
                      </Text>
                    </Td>
                    <Td>
                      <HStack justifyContent={'center'} alignItems={'center'} spacing={2}>
                        <HStack w={'50%'} justifyContent={'right'} alignItems={'center'}>
                          <Text
                            // textAlign={'right'}
                            textColor={score.average >= 200 ? 'goldenrod' : 'current'}
                            fontWeight={score.average >= 200 ? 'bold' : 'current'}
                          >
                            {score.average}
                          </Text>
                        </HStack>
                        <HStack w={'50%'} justifyContent={'flex-start'} alignItems={'center'}>
                          <Badge
                            colorScheme={
                              score.average - score.prev_average === 0
                                ? 'current'
                                : score.average - score.prev_average > 0
                                ? 'green'
                                : 'red'
                            }
                          >
                            {
                              <HStack spacing={0.5}>
                                {score.average - score.prev_average === 0 ? (
                                  <Text>-</Text>
                                ) : score.average - score.prev_average >= 0 ? (
                                  <FaCaretUp />
                                ) : (
                                  <FaCaretDown />
                                )}
                                <Text>{Math.abs(score.average - score.prev_average)}</Text>
                              </HStack>
                            }
                          </Badge>
                        </HStack>
                      </HStack>
                    </Td>
                    <Td>
                      <Text textAlign={'center'}>{score.total_score}</Text>
                    </Td>
                    <Td>
                      <Text
                        textAlign={'center'}
                        textColor={score.score1 === 300 ? 'red' : score.score1 >= 200 ? 'goldenrod' : 'current'}
                        fontWeight={score.score1 >= 200 ? 'bold' : 'current'}
                      >
                        {score.score1}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        textAlign={'center'}
                        textColor={score.score2 === 300 ? 'red' : score.score2 >= 200 ? 'goldenrod' : 'current'}
                        fontWeight={score.score2 >= 200 ? 'bold' : 'current'}
                      >
                        {score.score2}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        textAlign={'center'}
                        textColor={score.score3 === 300 ? 'red' : score.score3 >= 200 ? 'goldenrod' : 'current'}
                        fontWeight={score.score3 >= 200 ? 'bold' : 'current'}
                      >
                        {score.score3}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        textAlign={'center'}
                        textColor={score.score4 === 300 ? 'red' : score.score4 >= 200 ? 'goldenrod' : 'current'}
                        fontWeight={score.score4 >= 200 ? 'bold' : 'current'}
                      >
                        {score.score4}
                      </Text>
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
  );
}
