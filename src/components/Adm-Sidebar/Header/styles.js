import styled from "styled-components";

export const Container = styled.div`
  height: 70px;
  display: flex;
  background-color: #203874;
  box-shadow: 0 0 20px 3px;
  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 20px;
    margin-left: 20px;
    cursor: pointer;
  }
`;
