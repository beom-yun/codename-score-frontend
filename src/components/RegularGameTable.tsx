import { Avatar, HStack, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { IRegularGameScore } from '../types';
import { getRegularGameScore } from '../api';

export default function RegularGameTable() {
  const { datePk } = useParams();
  const { isLoading, data } = useQuery<IRegularGameScore[]>(['regularGame', datePk], getRegularGameScore);

  return (
    <TableContainer w={'100%'} mt={5}>
      <Table variant={'striped'} size={'sm'}>
        {/* <TableCaption>caption</TableCaption> */}
        <Thead>
          <Tr h={10}>
            <Th textAlign={'center'} fontSize={'md'}>
              순위
            </Th>
            <Th textAlign={'center'} fontSize={'md'}>
              이름
            </Th>
            <Th textAlign={'center'} fontSize={'md'}>
              시드
            </Th>
            <Th textAlign={'center'} fontSize={'md'}>
              1게임
            </Th>
            <Th textAlign={'center'} fontSize={'md'}>
              2게임
            </Th>
            <Th textAlign={'center'} fontSize={'md'}>
              3게임
            </Th>
            <Th textAlign={'center'} fontSize={'md'}>
              4게임
            </Th>
            <Th textAlign={'center'} fontSize={'md'}>
              총점
            </Th>
            <Th textAlign={'center'} fontSize={'md'}>
              평균
            </Th>
            <Th textAlign={'center'} fontSize={'md'}>
              하이로우
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {!isLoading
            ? data
                ?.sort((a, b) => b.average - a.average)
                .map((score, index) => (
                  <Tr key={index}>
                    <Td>
                      <Text textAlign={'center'}>{index + 1}</Text>
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
                      <Text textAlign={'center'}>{score.total_score}</Text>
                    </Td>
                    <Td>
                      <Text
                        textAlign={'center'}
                        textColor={score.average >= 200 ? 'goldenrod' : 'current'}
                        fontWeight={score.average >= 200 ? 'bold' : 'current'}
                      >
                        {score.average}
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
