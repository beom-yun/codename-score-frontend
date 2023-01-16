import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';
import { login } from '../api';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ILoginForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: ILoginModalProps) {
  const { register, handleSubmit, reset } = useForm<ILoginForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(login, {
    onSuccess: data => {
      toast({
        title: '로그인 성공',
        status: 'success',
        position: 'bottom-right',
      });
      onClose();
      queryClient.refetchQueries(['me']);
      reset();
    },
    onError: error => {
      toast({
        title: '로그인 실패',
        description: '아이디 또는 비밀번호를 확인하세요',
        status: 'error',
        position: 'bottom-right',
      });
    },
  });
  const onSubmit = ({ username, password }: ILoginForm) => {
    mutation.mutate({ username, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <VStack py={8}>
            <Heading>로그인하기</Heading>
          </VStack>
        </ModalHeader>
        <ModalBody
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          paddingBottom={10}
        >
          <VStack paddingBottom={5}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUser />
                  </Box>
                }
              />
              <Input
                {...register('username', {
                  required: '아이디를 입력하세요',
                })}
                variant={'filled'}
                placeholder="아이디"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                {...register('password', {
                  required: true,
                })}
                type="password"
                variant={'filled'}
                placeholder="비밀번호"
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            colorScheme={'teal'}
            w={'100%'}
          >
            로그인
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
