import { Heading, VStack } from '@chakra-ui/react';
import RegularGameChart from '../components/RegularGameChart';

export default function RecordsDetail() {
  return (
    <VStack w={'100%'}>
      <Heading mt={5}>정기전 결과</Heading>
      <RegularGameChart />
    </VStack>
  );
}
