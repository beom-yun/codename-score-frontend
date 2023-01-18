import { Button, Card, CardBody, CardFooter, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function MainCards() {
  return (
    <Card direction={'row'} overflow="hidden" minW={800} variant={'filled'}>
      <Image
        objectFit="cover"
        maxW={'200px'}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
      />
      <VStack px={4} w={'100%'}>
        <CardBody w={'100%'}>
          <Heading size={'md'} mb={2}>
            정기전
          </Heading>
          <Text>정기전을 생성, 진행하며 기록을 수정할 수 있습니다.</Text>
        </CardBody>
        <CardFooter w={'100%'} justifyContent={'flex-end'}>
          <Link to={'regular-game/new/'}>
            <Button colorScheme={'facebook'} mr={2} size={'sm'} rightIcon={<FaChevronRight />}>
              새로운 정기전 생성
            </Button>
          </Link>
          <Button colorScheme={'facebook'} mr={2} size={'sm'} rightIcon={<FaChevronRight />}>
            현재 진행중 정기전
          </Button>
          <Button colorScheme={'facebook'} size={'sm'} rightIcon={<FaChevronRight />}>
            정기전 기록 수정
          </Button>
        </CardFooter>
      </VStack>
    </Card>
  );
}
