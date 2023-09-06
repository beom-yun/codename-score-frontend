import { Heading, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <VStack>
      <Heading>Home</Heading>
      <Link to={'/'}>레코드</Link>
    </VStack>
  );
}
