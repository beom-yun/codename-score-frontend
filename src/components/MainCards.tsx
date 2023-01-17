import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';

export default function MainCards() {
  return (
    <SimpleGrid spacing={4} templateColumns={'repeat(3, minmax(200px, 1fr))'}>
      <Card minW={300} minH={450}>
        <CardHeader>
          <Heading>기록실</Heading>
        </CardHeader>
        <CardBody>
          <Text>Card body</Text>
        </CardBody>
        <CardFooter>
          <Button rightIcon={<FaChevronRight />}>이동하기</Button>
        </CardFooter>
      </Card>
      <Card minW={300} minH={450}>
        <CardHeader>
          <Heading>정기전</Heading>
        </CardHeader>
        <CardBody>
          <UnorderedList>
            <ListItem>새 정기전</ListItem>
            <ListItem>지난 정기전</ListItem>
          </UnorderedList>
        </CardBody>
        <CardFooter>
          <Button rightIcon={<FaChevronRight />}>이동하기</Button>
        </CardFooter>
      </Card>
      <Card minW={300} minH={450}>
        <CardHeader>
          <Heading>마이페이지</Heading>
        </CardHeader>
        <CardBody>
          <UnorderedList>
            <ListItem>비밀번호 변경</ListItem>
          </UnorderedList>
        </CardBody>
        <CardFooter>
          <Button rightIcon={<FaChevronRight />}>이동하기</Button>
        </CardFooter>
      </Card>
    </SimpleGrid>
  );
}
