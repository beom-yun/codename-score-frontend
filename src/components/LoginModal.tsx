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
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { FaLock, FaUser } from 'react-icons/fa';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
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
        <ModalBody>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUser />
                  </Box>
                }
              />
              <Input variant={'filled'} placeholder="아이디" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaLock />
                  </Box>
                }
              />
              <Input variant={'filled'} placeholder="비밀번호" />
            </InputGroup>
          </VStack>
        </ModalBody>
        <ModalFooter paddingBottom={8}>
          <Button colorScheme={'teal'} w={'100%'}>
            로그인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
