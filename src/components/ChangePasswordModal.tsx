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
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { changePassword } from '../api';
import { IChangePasswordForm, IChangePasswordModalProps } from '../types';

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: IChangePasswordModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<IChangePasswordForm>();
  const mutation = useMutation(changePassword, {
    onSuccess: data => {
      toast({
        title: '비밀번호 변경 성공',
        status: 'success',
        description: '다시 로그인하세요',
        position: 'bottom-right',
      });
      onClose();
      queryClient.refetchQueries(['me']);
      reset();
    },
    onError: error => {
      toast({
        title: '비밀번호 변경 실패',
        status: 'error',
        description: '비밀번호를 확인하세요',
        position: 'bottom-right',
      });
    },
  });
  const onSubmit = ({ old_password, new_password }: IChangePasswordForm) => {
    mutation.mutate({ old_password, new_password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <VStack py={8}>
            <Heading>비밀번호 변경</Heading>
          </VStack>
        </ModalHeader>
        <ModalBody as={'form'} onSubmit={handleSubmit(onSubmit)} pb={10}>
          <VStack pb={5}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaLockOpen />
                  </Box>
                }
              />
              <Input
                {...register('old_password', { required: true })}
                type={'password'}
                variant={'filled'}
                placeholder="기존 비밀번호"
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
                {...register('new_password', { required: true })}
                type={'password'}
                variant={'filled'}
                placeholder="새로운 비밀번호"
              />
            </InputGroup>
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type={'submit'}
            colorScheme={'teal'}
            w={'100%'}
          >
            변경하기
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
