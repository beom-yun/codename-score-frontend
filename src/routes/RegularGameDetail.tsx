import { Heading, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRegularGame } from '../api';
import { IRegularGameScore } from '../types';

export default function RegularGameDetail() {
  const { regularGamePk } = useParams();
  const { isLoading, data } = useQuery<IRegularGameScore[]>(['regularGame', regularGamePk], getRegularGame);

  return (
    <TableContainer>
      <Table size={'md'} variant={'simple'}>
        <TableCaption placement="top" mb={4}>
          <Heading>정기전 {regularGamePk}회차</Heading>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>이름</Th>
            <Th>전회평균</Th>
            <Th>평균</Th>
            <Th>변동</Th>
            <Th>총점</Th>
            <Th>1게임</Th>
            <Th>2게임</Th>
            <Th>3게임</Th>
            <Th>4게임</Th>
            <Th>편차</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map(score => (
            <Tr>
              <Td>{score.bowler.name}</Td>
              <Td>{score.last_average}</Td>
              <Td>{score.average}</Td>
              <Td>{score.average_change}</Td>
              <Td>{score.total_score}</Td>
              <Td>{score.first}</Td>
              <Td>{score.second}</Td>
              <Td>{score.third}</Td>
              <Td>{score.fourth}</Td>
              <Td>{score.high_low}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
