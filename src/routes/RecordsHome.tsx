import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function RecordsHome() {
  return (
    <>
      <Link to={'regular-games'}>
        <Button>정기전 레코드</Button>
      </Link>
      <Link to={'me'}>
        <Button>내 레코드</Button>
      </Link>
    </>
  );
}
