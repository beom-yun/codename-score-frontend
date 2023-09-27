import { Button, Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <VStack>
      <Heading>Home</Heading>
      <Link to={'/records'}>
        <Button>메뉴 홈</Button>
      </Link>
    </VStack>
  );
}
