import styled from "styled-components";

export const Container = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #337dc2;
  position: relative;

  > svg {
    position: absolute;
    left: 20px;
    color: white;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .navbar-brand {
    text-decoration: none;
  }

  .logo {
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;
