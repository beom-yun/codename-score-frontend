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
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ILoginForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: ILoginModalProps) {
  const { register, handleSubmit } = useForm<ILoginForm>();
  const onSubmit = (data: ILoginForm) => {
    console.log(data);
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
          <Button type="submit" colorScheme={'teal'} w={'100%'}>
            로그인
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
