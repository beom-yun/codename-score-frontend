import { Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <VStack>
      <Link to="scores/1/">
        <Button>regular Game #1</Button>
      </Link>
      <Link to="scores/2/">
        <Button>regular Game #2</Button>
      </Link>
    </VStack>
  );
}
