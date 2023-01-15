import { Button, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getRegularGameDates } from '../api';

interface IRegularGameDate {
  round_of_game: number;
  date: number;
}

export default function Home() {
  const { isLoading, data } = useQuery<IRegularGameDate[]>(['dates'], getRegularGameDates);

  return (
    // <VStack>
    //   <Link to="scores/1/">
    //     <Button>regular Game #1</Button>
    //   </Link>
    //   <Link to="scores/2/">
    //     <Button>regular Game #2</Button>
    //   </Link>
    // </VStack>

    <Menu>
      <MenuButton as={Button} rightIcon={<FaChevronDown />}>
        정기전 회차
      </MenuButton>
      <MenuList>
        {data?.map(date => (
          <MenuItem>
            <Text>
              {date.date} ({date.round_of_game}회차)
            </Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
