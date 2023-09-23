import { Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <VStack>
      <Heading>Home</Heading>
      <Link to={'/records'}>레코드 홈</Link>
    </VStack>
  );
}
