import { Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getRegularGameDates } from '../api';
import MainCards from '../components/MainCards';
import useUser from '../lib/useUser';

interface IRegularGameDate {
  round_of_game: number;
  date: number;
}

export default function Home() {
  const { isLoading, data } = useQuery<IRegularGameDate[]>(
    ['dates'],
    getRegularGameDates
  );
  const { userLoading, user, isLoggedIn } = useUser();

  return (
    <VStack h={'100vh'} pt={20}>
      {userLoading ? null : isLoggedIn ? (
        <MainCards />
      ) : (
        <Text>로그인 해주세요</Text>
      )}
    </VStack>
    //   <Menu>
    //   <MenuButton as={Button} rightIcon={<FaChevronDown />}>
    //     정기전 회차
    //   </MenuButton>
    //   <MenuList>
    //     {data?.map(date => (
    //       <MenuItem>
    //         <Text>
    //           {date.date} ({date.round_of_game}회차)
    //         </Text>
    //       </MenuItem>
    //     ))}
    //   </MenuList>
    // </Menu>
  );
}
