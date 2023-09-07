import { Stack, Heading, VStack, Select, Text, HStack, Switch } from '@chakra-ui/react';
import RegularGameChart from '../components/RegularGameChart';
import { useQuery } from '@tanstack/react-query';
import { getRegularGameDates } from '../api';
import { IRegularGameDate } from '../types';

export default function RecordsHome() {
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
        <VStack w={'100%'}>
          <HStack w={'100%'} justifyContent={'space-between'} px={10}>
            <Select variant={'unstyled'} w={{ sm: '50%', md: '20%' }} placeholder="정기전 날짜 선택">
              {data?.map(date => (
                <option value={date.id}>
                  <Text>
                    {date.date} ({date.round_of_game}회차)
                  </Text>
                </option>
              ))}
            </Select>
            <HStack spacing={5} w={{ sm: '50%', md: '20%' }} justifyContent={'right'}>
              <Text>표</Text>
              <Switch />
              <Text>차트</Text>
            </HStack>
          </HStack>
          {/* <Heading mt={5}>정기전 결과</Heading> */}
        </VStack>
      ) : null}
    </Stack>
  );
}
