import { HStack, Heading, Switch, Text, VStack } from '@chakra-ui/react';
import RegularGameChart from '../components/RegularGameChart';
import { useQuery } from '@tanstack/react-query';
import { IRegularGameDate } from '../types';
import { getRegularGameDate } from '../api';
import { useParams } from 'react-router-dom';
import RegularGameTable from '../components/RegularGameTable';
import { useState } from 'react';
import ProtectedPage from '../components/ProtectedPage';

export default function RecordsDetail() {
  const [swValue, setSwValue] = useState(true);
  const { datePk } = useParams();
  const { isLoading, data } = useQuery<IRegularGameDate>(['regularGameDates', datePk], getRegularGameDate);

  return (
    <ProtectedPage>
      <VStack w={'100%'}>
        {isLoading ? (
          <Heading>정기전 결과</Heading>
        ) : (
          <VStack w={'100%'} spacing={0}>
            <Heading>
              {data?.round_of_game}회차 정기전 결과 ({data?.date})
            </Heading>
            <HStack spacing={5} w={'100%'} justifyContent={'right'} mr={10}>
              <Text>표</Text>
              <Switch defaultChecked onChange={() => setSwValue(!swValue)} />
              <Text>차트</Text>
            </HStack>
          </VStack>
        )}
        {swValue ? <RegularGameChart /> : <RegularGameTable />}
      </VStack>
    </ProtectedPage>
  );
}
