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
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaBowlingBall, FaCalendarCheck, FaMinus, FaPlus } from 'react-icons/fa6';
import { IBowler, ICreateRegularGameDate } from '../types';
import { createRegularGameDate, getUsers } from '../api';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NewRegularGame() {
  const steps = [
    { title: 'Step 1', description: '회차, 날짜 입력' },
    { title: 'Step 2', description: '참여인원, 게스트 선택' },
    { title: 'Step 3', description: '시드 핸디 입력' },
    { title: 'Step 4', description: '확인' },
  ];
  const [participants, setParticipants] = useState<number[]>([]);
  const [guests, setGuests] = useState<{ name: string; average: string }[]>([]);
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length });
  const { isLoading, data: bowlers } = useQuery<IBowler[]>(['bowlers'], getUsers);
  const { register, handleSubmit } = useForm<ICreateRegularGameDate>();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(createRegularGameDate, {
    onMutate: () => {
      toastId.current = toast({ title: '정기전 생성 중...', status: 'loading', position: 'bottom-right' });
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, { title: '정기전 생성 성공', status: 'success', position: 'bottom-right' });
        console.log(participants, guests);
        // 해당 인원들 레코드 생성하기
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
    mutation.mutate({ round_of_game, date });
  };

  return (
    <Box py={10} px={{ sm: 10, md: 20, lg: 40 }}>
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
      <VStack w={'100%'} as="form" onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 ? (
          <HStack spacing={20} w={'70%'}>
            <FormControl>
              <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                회차
              </FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBowlingBall />} />
                <Input type="number" {...register('round_of_game', { required: true })} />
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
                기존 회원
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
                            setParticipants(participants.concat(bowler.pk).sort());
                          } else {
                            setParticipants(participants.filter(p => p !== bowler.pk).sort());
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
          <Button isLoading={mutation.isLoading} w={'70%'} size={'lg'} colorScheme="linkedin" type="submit">
            생성하기
          </Button>
        ) : null}
      </VStack>
    </Box>
  );
}
