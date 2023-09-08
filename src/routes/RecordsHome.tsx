import { Stack, VStack, Select, Text, HStack, Switch, Divider } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getRegularGameDates } from '../api';
import { IRegularGameDate } from '../types';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NumOfBowlersChart from '../components/NumOfBowlersChart';

export default function RecordsHome() {
  const [selectValue, setSelectValue] = useState('');
  const navigate = useNavigate();
  const { isLoading, data } = useQuery<IRegularGameDate[]>(['regularGameDates'], getRegularGameDates);

  return (
    <Stack
      px={{ sm: 0, md: 40 }}
      py={5}
      justifyContent={'space-between'}
      alignItems={'center'}
      spacing={{ sm: 5, md: 0 }}
    >
      {!isLoading ? (
        <VStack w={'100%'} px={10}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Select
              value={selectValue}
              variant={'unstyled'}
              w={{ sm: '50%', md: '20%' }}
              placeholder="정기전 날짜 선택"
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectValue(event.target.value);
                navigate(`${event.target.value}`);
              }}
            >
              {data?.map(date => (
                <option key={date.id} value={date.id}>
                  {date.date} ({date.round_of_game}회차)
                </option>
              ))}
            </Select>
            <HStack spacing={5} w={{ sm: '50%', md: '20%' }} justifyContent={'right'}>
              <Text>표</Text>
              <Switch defaultChecked />
              <Text>차트</Text>
            </HStack>
          </HStack>
          <Divider marginTop={3} marginBottom={5} />
          {selectValue ? (
            <Outlet />
          ) : (
            <NumOfBowlersChart />
            // <Box mt={10}>
            //   <Heading>정기전 날짜를 선택해주세요.</Heading>
            // </Box>
          )}
        </VStack>
      ) : null}
    </Stack>
  );
}
