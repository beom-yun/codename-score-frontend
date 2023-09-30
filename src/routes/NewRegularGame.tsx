import {
  Box,
  Heading,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  HStack,
  useSteps,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  VStack,
  Grid,
  GridItem,
  Checkbox,
  CheckboxGroup,
  Avatar,
  Divider,
  Button,
  useToast,
  ToastId,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaAngleLeft, FaAngleRight, FaBowlingBall, FaCalendarCheck, FaMinus, FaPlus } from 'react-icons/fa6';
import { IBowler, ICreateRegularGameDate } from '../types';
import { createRegularGameDate, createRegularGameScore, getUsers } from '../api';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ProtectedPage from '../components/ProtectedPage';

export default function NewRegularGame() {
  const steps = [
    { title: 'Step 1', description: '회차, 날짜 입력' },
    { title: 'Step 2', description: '참여인원, 게스트 선택' },
    { title: 'Step 3', description: '시드 핸디 입력' },
    { title: 'Step 4', description: '레인 선택' },
    { title: 'Step 5', description: '확인' },
  ];
  const [participants, setParticipants] = useState<number[]>([]);
  const [guests, setGuests] = useState<{ name: string; average: string }[]>([]);
  const [lanes, setLanes] = useState<number[]>([]);
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length });
  const { isLoading, data: bowlers } = useQuery<IBowler[]>(['bowlers'], getUsers);
  const { register, handleSubmit, reset } = useForm<ICreateRegularGameDate>();
  const navigate = useNavigate();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const createMutation = useMutation(createRegularGameScore, {
    // onSuccess: data => console.log(data),
  });
  const mutation = useMutation(createRegularGameDate, {
    onMutate: () => {
      toastId.current = toast({ title: '정기전 생성 중...', status: 'loading', position: 'bottom-right' });
    },
    onSuccess: ({ id }: { id: number; round_of_game: number; date: string; num_of_bowlers: number }) => {
      if (toastId.current) {
        toast.update(toastId.current, { title: '정기전 생성 성공', status: 'success', position: 'bottom-right' });
        participants.map(bowler_pk => createMutation.mutate({ date_pk: id, bowler_pk }));
        reset();
        navigate('/');
      }
    },
    onError: (e: { response: { data: { detail: string } } }) => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: '정기전 생성 실패',
          status: 'error',
          description: e.response.data.detail,
          position: 'bottom-right',
        });
      }
    },
  });
  const onSubmit = ({ round_of_game, date }: ICreateRegularGameDate) => {
    mutation.mutate({ round_of_game, date, lanes: lanes.toString() });
  };

  return (
    <ProtectedPage>
      <Box py={10} px={{ sm: 5, md: 10, lg: 20 }}>
        <Heading textAlign={'center'}>새 정기전 생성</Heading>
        <Stepper index={activeStep} px={20} colorScheme="linkedin" py={20}>
          {steps.map((step, index) => (
            <Step key={index} onClick={() => setActiveStep(index)}>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
              </StepIndicator>
              <Box>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <HStack h={'100%'}>
          <Button
            variant={'ghost'}
            w={'min'}
            h={100}
            mr={2}
            leftIcon={<FaAngleLeft />}
            iconSpacing={0}
            onClick={() => {
              if (activeStep > 0) {
                setActiveStep(activeStep - 1);
              }
            }}
            isDisabled={activeStep <= 0}
          />
          <VStack w={'100%'} as="form" onSubmit={handleSubmit(onSubmit)}>
            {activeStep === 0 ? (
              <HStack spacing={20} w={'70%'}>
                <FormControl>
                  <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                    회차
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon children={<FaBowlingBall />} />
                    <NumberInput>
                      <NumberInputField {...register('round_of_game', { required: true })} />
                    </NumberInput>
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                    날짜
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon children={<FaCalendarCheck />} />
                    <Input type="date" {...register('date', { required: true })} />
                  </InputGroup>
                </FormControl>
              </HStack>
            ) : activeStep === 1 && !isLoading ? (
              <>
                <Box w={'100%'} alignItems={'flex-start'} pb={2}>
                  <Heading fontWeight={'bold'} fontSize={'2xl'}>
                    회원
                  </Heading>
                </Box>
                <CheckboxGroup>
                  <Grid templateColumns={'repeat(5, 1fr)'} w={'100%'} gap={5}>
                    {bowlers?.map(bowler => (
                      <GridItem key={bowler.pk} border={'1px'} borderColor={'gray.200'} shadow={'sm'} rounded={'xl'}>
                        <HStack w={'100%'} justifyContent={'center'} h={70} spacing={10}>
                          <Checkbox
                            colorScheme="linkedin"
                            spacing={5}
                            isChecked={participants.includes(bowler.pk)}
                            onChange={event => {
                              if (event.target.checked) {
                                setParticipants(participants.concat(bowler.pk).sort((a, b) => a - b));
                              } else {
                                setParticipants(participants.filter(p => p !== bowler.pk).sort((a, b) => a - b));
                              }
                            }}
                          >
                            <HStack spacing={4}>
                              <VStack spacing={0}>
                                <Text fontWeight={'bold'} fontSize={'lg'}>
                                  {bowler.name}
                                </Text>
                                <Text fontSize={'sm'}>
                                  {bowler.position === 'chairman'
                                    ? '회장'
                                    : bowler.position === 'executive'
                                    ? '운영진'
                                    : bowler.position === 'general'
                                    ? '일반회원'
                                    : null}
                                </Text>
                              </VStack>
                              <Avatar name={bowler.name} src={bowler.avatar} size={'md'} />
                            </HStack>
                          </Checkbox>
                        </HStack>
                      </GridItem>
                    ))}
                  </Grid>
                </CheckboxGroup>

                <Divider my={5} />

                <Box w={'100%'} alignItems={'flex-start'} pb={2}>
                  <Heading fontWeight={'bold'} fontSize={'2xl'}>
                    게스트
                  </Heading>
                </Box>
                <Grid templateColumns={'repeat(5, 1fr)'} w={'100%'} gap={5}>
                  {guests.map((guest, index) => (
                    <GridItem
                      key={index}
                      pl={5}
                      pr={8}
                      border={'1px'}
                      borderColor={'gray.200'}
                      shadow={'sm'}
                      rounded={'xl'}
                      h={70}
                    >
                      <HStack h={'100%'}>
                        <Button
                          onClick={() => {
                            setGuests(guests.filter((_, idx) => idx !== index));
                          }}
                          variant={'ghost'}
                          leftIcon={<FaMinus />}
                          iconSpacing={0}
                        />
                        <VStack spacing={1} justifyContent={'center'}>
                          <Input
                            value={guests[index].name}
                            onChange={event => {
                              const newGuests = guests.map((g, idx) =>
                                idx === index ? { ...g, ...{ name: event.target.value } } : g
                              );
                              setGuests(newGuests);
                            }}
                            textAlign={'center'}
                            variant={'unstyled'}
                            type="text"
                            placeholder="이름"
                          />
                          <Divider />
                          <Input
                            value={guests[index].average}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              const newGuests = guests.map((g, idx) =>
                                idx === index ? { ...g, ...{ average: event.target.value } } : g
                              );
                              setGuests(newGuests);
                            }}
                            textAlign={'center'}
                            variant={'unstyled'}
                            type="number"
                            placeholder="에버리지"
                          />
                        </VStack>
                      </HStack>
                    </GridItem>
                  ))}

                  <GridItem borderColor={'gray.200'} shadow={'sm'} rounded={'xl'} h={70}>
                    <Button
                      rounded={'xl'}
                      w={'100%'}
                      h={'100%'}
                      variant={'outline'}
                      leftIcon={<FaPlus />}
                      onClick={() => {
                        setGuests(guests.concat({ name: '', average: '' }));
                      }}
                    >
                      추가하기
                    </Button>
                  </GridItem>
                </Grid>
              </>
            ) : activeStep === 2 ? null : activeStep === 3 ? (
              <Grid rowGap={5} columnGap={2} templateColumns={'repeat(7, 1fr)'} w={'100%'}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((table, index) => (
                  <GridItem
                    p={2}
                    key={index}
                    border={'1px'}
                    borderColor={'gray.200'}
                    shadow={'sm'}
                    rounded={'xl'}
                    h={150}
                  >
                    <VStack h={'100%'}>
                      <Button
                        variant={'ghost'}
                        w={'100%'}
                        h={'45%'}
                        onClick={() => {
                          if (lanes.includes(table * 2 - 1) && lanes.includes(table * 2)) {
                            setLanes(
                              lanes
                                .filter(lane => lane !== table * 2 - 1)
                                .filter(lane => lane !== table * 2)
                                .sort((a, b) => a - b)
                            );
                          } else {
                            setLanes(
                              lanes
                                .filter(lane => lane !== table * 2 - 1)
                                .filter(lane => lane !== table * 2)
                                .concat(...[table * 2 - 1, table * 2])
                                .sort((a, b) => a - b)
                            );
                          }
                        }}
                      >
                        {table} 테이블
                      </Button>
                      <HStack w={'100%'} h={'55%'}>
                        <Button
                          w={'100%'}
                          h={'100%'}
                          colorScheme={lanes.includes(table * 2 - 1) ? 'linkedin' : 'gray'}
                          onClick={() => {
                            if (lanes.includes(table * 2 - 1)) {
                              setLanes(lanes.filter(lane => lane !== table * 2 - 1).sort((a, b) => a - b));
                            } else {
                              setLanes(lanes.concat(table * 2 - 1).sort((a, b) => a - b));
                            }
                          }}
                        >
                          {table * 2 - 1}
                        </Button>
                        <Button
                          w={'100%'}
                          h={'100%'}
                          colorScheme={lanes.includes(table * 2) ? 'linkedin' : 'gray'}
                          onClick={() => {
                            if (lanes.includes(table * 2)) {
                              setLanes(lanes.filter(lane => lane !== table * 2).sort((a, b) => a - b));
                            } else {
                              setLanes(lanes.concat(table * 2).sort((a, b) => a - b));
                            }
                          }}
                        >
                          {table * 2}
                        </Button>
                      </HStack>
                    </VStack>
                  </GridItem>
                ))}
              </Grid>
            ) : activeStep === 4 ? (
              <Button isLoading={mutation.isLoading} w={'70%'} size={'lg'} colorScheme="linkedin" type="submit">
                생성하기
              </Button>
            ) : null}
          </VStack>
          <Button
            variant={'ghost'}
            w={'min'}
            h={100}
            ml={2}
            leftIcon={<FaAngleRight />}
            iconSpacing={0}
            onClick={() => {
              if (activeStep < steps.length - 1) {
                setActiveStep(activeStep + 1);
              }
            }}
            isDisabled={activeStep >= steps.length - 1}
          />
        </HStack>
      </Box>
    </ProtectedPage>
  );
}
