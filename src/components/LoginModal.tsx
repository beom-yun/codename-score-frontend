import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaComment, FaLock, FaUser } from 'react-icons/fa6';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="b">로그인하기</Text>
        </ModalHeader>
        <ModalCloseButton />
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
              <Input variant={'filled'} placeholder="ID" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaLock />
                  </Box>
                }
              />
              <Input type="password" variant={'filled'} placeholder="PASSWORD" />
            </InputGroup>
          </VStack>

          <Button my={4} w={'100%'} colorScheme="linkedin">
            로그인
          </Button>

          <HStack>
            <Divider />
            <Text color={'gray.500'} fontSize={'xs'} as="b">
              OR
            </Text>
            <Divider />
          </HStack>
          <Button my={4} w={'100%'} colorScheme="yellow" leftIcon={<FaComment />}>
            카카오로 로그인하기
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
