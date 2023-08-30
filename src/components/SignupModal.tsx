import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { FaComment } from 'react-icons/fa6';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="b">가입하기</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button my={4} w={'100%'} colorScheme="yellow" leftIcon={<FaComment />}>
            카카오로 가입하기
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
