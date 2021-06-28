import styled from 'styled-components';

export const Container = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  overflow: hidden;
`;

export const LeftContainer = styled.section`
  height: 100vh;
  width: 55vw;
  padding: 24px 42px;

  h1 {
    font-size: 40px;
    color: #2c88d9;
  }

  h3 {
    width: 70%;
  }

  p {
    margin-top: 16px;
    margin-bottom: 0;
  }
`;

export const RightContainer = styled.section`
  height: 100vh;
  width: 45vw;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: grid;
  flex: 1;
  grid-template-columns: repeat(4, 1fr);
  align-items: flex-start;
  gap: 12px;
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background: #2c88d9;
  height: 32px;
  width: 160px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 20px;
  font-weight: bold;

  &:hover {
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25), 0 4px 4px rgba(0, 0, 0, 0.22);
  }
`;
