import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getBowlers } from '../api';
import BowlersCheckbox from '../components/BowlersCheckbox';
import { IBowler } from '../types';

export default function NewRegularGame() {
  const { isLoading, data } = useQuery<IBowler[]>(['bowlers'], getBowlers);

  return (
    <Tabs pt={20} minW={800}>
      <TabList>
        <Tab>기본정보</Tab>
        <Tab>참여인원</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <VStack spacing={8} w={'100%'} alignItems={'flex-start'}>
            <Text>정기전 회차, 날짜를 입력합니다.</Text>
            <HStack spacing={8} px={8} w={'100%'}>
              <FormControl isRequired>
                <FormLabel>회차</FormLabel>
                <NumberInput min={1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>일자</FormLabel>
                <Input type={'date'} />
              </FormControl>
            </HStack>
          </VStack>
        </TabPanel>
        <TabPanel>
          <Text>정기전 참여 인원을 선택합니다.</Text>
          <BowlersCheckbox />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
