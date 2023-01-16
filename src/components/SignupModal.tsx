import {
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SignupModalProps } from '../types';

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <VStack py={8}>
            <Heading>환영합니다</Heading>
          </VStack>
        </ModalHeader>
        <ModalBody paddingBottom={8}>
          <VStack>
            <Text>코드네임 스코어 회원가입 페이지입니다.</Text>
            <Text>가입을 희망하시는 분께서는</Text>
            <Text>아래 번호 또는 가까운 운영진에게 문의 바랍니다.</Text>
          </VStack>
        </ModalBody>
        <Divider />
        <ModalFooter paddingTop={6} paddingBottom={8}>
          <VStack alignItems={'flex-end'}>
            <Text>회장 가나다 010-1234-5678</Text>
            <Text>운영진 라마바 010-1234-5678</Text>
          </VStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
