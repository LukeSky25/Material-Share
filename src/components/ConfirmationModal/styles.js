import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; // Garante que fique sobre a sidebar
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ModalHeader = styled.h2`
  margin-top: 0;
  color: #333;
`;

export const ModalBody = styled.div`
  margin-bottom: 20px;
  color: #555;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: ${(props) => props.color || "#007bff"};
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;
