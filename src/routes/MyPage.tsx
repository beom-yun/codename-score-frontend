import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  ToastId,
  VStack,
  useToast,
} from '@chakra-ui/react';
import useUser from '../lib/useUser';
import ProtectedPage from '../components/ProtectedPage';
import { FaCalendarCheck, FaCalendarDay, FaEnvelope, FaPhone, FaUser, FaUsers } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import { IEditMyPage } from '../types';
import { useMutation } from '@tanstack/react-query';
import { editMyPage } from '../api';
import { useRef } from 'react';

export default function MyPage() {
  const { user, userLoading } = useUser();
  const { register, handleSubmit } = useForm<IEditMyPage>();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(editMyPage, {
    onMutate: () => {
      toastId.current = toast({ title: '수정 중...', position: 'bottom-right', status: 'loading' });
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, { title: '수정 성공', position: 'bottom-right', status: 'success' });
      }
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, { title: '수정 실패', position: 'bottom-right', status: 'error' });
      }
    },
  });
  const onSubmit = (data: IEditMyPage) => {
    mutation.mutate(data);
  };

  return (
    <ProtectedPage>
      {!userLoading ? (
        <Box py={10} px={{ sm: 10, md: 20, lg: 40 }}>
          <Heading textAlign={'center'} pb={10}>
            마이 페이지
          </Heading>
          <VStack as="form" spacing={8} px={60} onSubmit={handleSubmit(onSubmit)}>
            <HStack w={'100%'} spacing={20}>
              <VStack w={'100%'} spacing={8}>
                <FormControl>
                  <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                    이름
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon children={<FaUser />} />
                    <Input type="text" defaultValue={user?.name} isReadOnly {...register('name', { required: true })} />
                  </InputGroup>
                </FormControl>
                <HStack w={'100%'} alignItems={'flex-start'}>
                  <FormControl>
                    <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                      성별
                    </FormLabel>
                    <RadioGroup>
                      <HStack spacing={10} pl={5}>
                        <Radio isChecked={user?.gender === 'male'}>남</Radio>
                        <Radio isChecked={user?.gender === 'female'}>여</Radio>
                      </HStack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                      직책
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon children={<FaUsers />} />
                      <Input
                        type="text"
                        defaultValue={
                          user?.position === 'chairman'
                            ? '회장'
                            : user?.position === 'executive'
                            ? '운영진'
                            : user?.position === 'general'
                            ? '일반회원'
                            : '게스트'
                        }
                        isReadOnly
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>
              </VStack>
              <Avatar name={user?.name} src={user?.avatar} size={'2xl'} />
            </HStack>
            <FormControl>
              <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                핸드폰
              </FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaPhone />} />
                <Input
                  type="text"
                  defaultValue={user?.phone_number}
                  {...register('phone_number', { required: true })}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                이메일
              </FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaEnvelope />} />
                <Input type="text" defaultValue={user?.email} {...register('email', { required: true })} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                생년월일
              </FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaCalendarDay />} />
                <Input type="text" defaultValue={user?.birth_date} {...register('birth_date', { required: true })} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel fontWeight={'bold'} fontSize={'xl'}>
                가입일
              </FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaCalendarCheck />} />
                <Input
                  type="text"
                  defaultValue={user?.join_date}
                  isReadOnly
                  {...register('join_date', { required: true })}
                />
              </InputGroup>
            </FormControl>
            <Button isLoading={mutation.isLoading} colorScheme="linkedin" w={'100%'} type="submit" size={'lg'}>
              수정하기
            </Button>
          </VStack>
        </Box>
      ) : null}
    </ProtectedPage>
  );
}
