import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

type Props = {
  title: string;
  closeButton: string;
  closeFn?: null | (() => any);
  actionButton?: string;
  actionFn?: null | (() => any);
};

const ModalTemplate: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>{props.title}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{props.children}</ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={props.actionButton ? 3 : 0}
              onClick={props.closeFn || onClose}
            >
              {props.closeButton}
            </Button>
            {props.actionButton && (
              <Button variant="ghost" onClick={props.actionFn || onClose}>
                {props.actionButton}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTemplate;
