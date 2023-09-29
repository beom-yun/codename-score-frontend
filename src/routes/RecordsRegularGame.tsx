import { Stack, VStack, Select, HStack, Divider } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRegularGameDates } from '../api';
import { IRegularGameDate } from '../types';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NumOfBowlersChart from '../components/NumOfBowlersChart';

export default function RecordsRegularGame() {
  const [selectValue, setSelectValue] = useState('');
  const navigate = useNavigate();
  const { isLoading, data } = useQuery<IRegularGameDate[]>(['regularGameDates'], getRegularGameDates);
  const queryClient = useQueryClient();

  return (
    <Stack py={5} justifyContent={'space-between'} alignItems={'center'} spacing={{ sm: 5, md: 0 }}>
      {!isLoading ? (
        <VStack w={'100%'} px={{ sm: 10, md: 20, lg: 40 }}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Select
              value={selectValue}
              variant={'unstyled'}
              w={{ sm: '50%', md: '20%' }}
              placeholder="정기전 날짜 선택"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectValue(event.target.value);
                navigate(`${event.target.value}`);
                queryClient.resetQueries();
              }}
            >
              {data?.map(date => (
                <option key={date.id} value={date.id}>
                  {date.date} ({date.round_of_game}회차)
                </option>
              ))}
            </Select>
          </HStack>
          <Divider marginTop={3} marginBottom={5} />
          {selectValue ? <Outlet /> : <NumOfBowlersChart />}
        </VStack>
      ) : null}
    </Stack>
  );
}
