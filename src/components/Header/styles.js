import styled from 'styled-components';

export const Container = styled.section`
  width: 100vw;
  height: 10vh;
  background: #2c88d9;
  padding: 10px 30px;
  color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    cursor: pointer;
  }
`;

export const ButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-items: flex-end;
  gap: 12px;
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background: transparent;
  color: ${(props) => (props.isActive ? '#c4c4c4' : '#f1f1f1')};
  text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
  font-size: 16px;
  cursor: pointer;
`;
