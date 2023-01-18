import {
  Button,
  Checkbox,
  CheckboxGroup,
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
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { FaRegCalendarAlt, FaRegPlusSquare, FaUserCheck } from 'react-icons/fa';
import { getBowlers } from '../api';
import NewRegularGameModal from '../components/NewRegularGameModal';
import { IPublicBowler } from '../types';

export default function NewRegularGame() {
  const { isLoading, data } = useQuery<IPublicBowler[]>(
    ['bowlers'],
    getBowlers
  );
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <>
      {isLoading ? null : (
        <VStack minW={800} alignItems={'center'}>
          <Tabs variant={'enclosed'} w={'100%'} minH={400}>
            <TabList>
              <Tab>
                <HStack>
                  <FaRegCalendarAlt />
                  <Text>기본정보</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <FaUserCheck />
                  <Text>참여인원</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <FaRegPlusSquare />
                  <Text>추가정보</Text>
                </HStack>
              </Tab>
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
                <VStack spacing={8} w={'100%'} alignItems={'flex-start'}>
                  <Text>정기전 참여 인원을 선택합니다.</Text>
                  <VStack width={'100%'} alignItems={'flex-start'} px={8}>
                    {data ? (
                      <CheckboxGroup>
                        {data.map(bowler => (
                          <Checkbox key={bowler.pk}>{bowler.name}</Checkbox>
                        ))}
                      </CheckboxGroup>
                    ) : null}
                  </VStack>
                </VStack>
              </TabPanel>
              <TabPanel>
                <Text>추가 정보를 입력합니다.</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Button onClick={onModalOpen} w={'90%'} colorScheme={'telegram'}>
            정기전 생성하기
          </Button>

          <NewRegularGameModal isOpen={isModalOpen} onClose={onModalClose} />
        </VStack>
      )}
    </>
  );
}
