import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "./styles";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Confirmação</ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onCancel} color="gray">
            Cancelar
          </Button>
          <Button onClick={onConfirm} color="#d9534f">
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
