import {
  Button,
  HStack,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { INewRegularGameProps } from '../types';

export default function NewRegularGameModal({
  isOpen,
  onClose,
}: INewRegularGameProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={10}>
          <UnorderedList spacing={2}>
            <ListItem>
              <Text fontSize={'2xl'}>회차 : </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={'2xl'}>날짜 : </Text>
            </ListItem>
            <ListItem>
              <Text fontSize={'2xl'}>인원 : </Text>
            </ListItem>
          </UnorderedList>
        </ModalBody>

        <ModalFooter>
          <HStack>
            <Button colorScheme={'telegram'}>확인</Button>
            <Button onClick={onClose}>취소</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
