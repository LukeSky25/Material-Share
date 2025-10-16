import styled from "styled-components";

export const Container = styled.div`
  background-color: #2f6da7ff;
  position: fixed;
  height: 100%;
  top: 0;
  left: ${(props) => (props.$isOpen ? "0" : "-100%")};
  width: 300px;
  animation: showSidebar 0.4s;
  z-index: 1000;

  > svg {
    position: absolute;
    left: 20px;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    cursor: pointer;
  }

  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 300px;
    }
  }
`;

export const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 25px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ffffff30;
  color: white;

  span {
    font-size: 16px;
  }
`;

export const Content = styled.div`
  margin-top: 100px;
`;
