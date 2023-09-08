import { Heading, VStack } from '@chakra-ui/react';
import RegularGameChart from '../components/RegularGameChart';
import { useQuery } from '@tanstack/react-query';
import { IRegularGameDate } from '../types';
import { getRegularGameDate } from '../api';
import { useParams } from 'react-router-dom';

export default function RecordsDetail() {
  const { datePk } = useParams();
  const { isLoading, data } = useQuery<IRegularGameDate>(['regularGameDates', datePk], getRegularGameDate);

  return (
    <VStack w={'100%'}>
      {isLoading ? (
        <Heading>정기전 결과</Heading>
      ) : (
        <Heading>
          {data?.round_of_game}회차 정기전 결과 ({data?.date})
        </Heading>
      )}
      <RegularGameChart />
    </VStack>
  );
}
