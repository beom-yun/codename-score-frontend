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
  const kakaoParams = {
    client_id: '06acaa0ad678eefcbb78902fec710ad6',
    redirect_uri: 'http://127.0.0.1:3000/social/kakao/',
    response_type: 'code',
  };
  const params = new URLSearchParams(kakaoParams).toString();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="b">가입하기</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button
            as={'a'}
            href={`https://kauth.kakao.com/oauth/authorize?${params}`}
            my={4}
            w={'100%'}
            colorScheme="yellow"
            leftIcon={<FaComment />}
          >
            카카오로 가입하기
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
