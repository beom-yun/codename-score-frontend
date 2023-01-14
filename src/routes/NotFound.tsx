import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <VStack minH={'100vh'} justifyContent={'center'}>
      <Heading>Page not found</Heading>
      <Text>It seems that you're lost</Text>
      <Link to="/">
        <Button colorScheme={'red'} variant={'ghost'}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
