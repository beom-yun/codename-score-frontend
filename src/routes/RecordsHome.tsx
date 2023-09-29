import { Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function RecordsHome() {
  return (
    <HStack justifyContent={'center'}>
      <Link to={'regular-games/new'}>
        <Button>새 정기전</Button>
      </Link>
      <Link to={'regular-games/edit'}>
        <Button>정기전 수정</Button>
      </Link>
      <Link to={'regular-games'}>
        <Button>정기전 레코드</Button>
      </Link>
      <Link to={'me'}>
        <Button>내 레코드</Button>
      </Link>
    </HStack>
  );
}
