import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.8);
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  height: 200vh;
`;

export const ModalContainer = styled.div`
  height: fit-content;
  width: 800px;
  border-radius: 16px;
  background-color: #f1f1f1;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.19), 0 8px 8px rgba(0, 0, 0, 0.23);
  position: absolute;
  top: 5%;
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
`;

export const CloseButton = styled.div`
  background: white;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const ModalHeader = styled.div`
  width: 100%;

  img {
    border-radius: 16px 16px 0 0;
    width: 100%;
  }
`;

export const ModalBody = styled.div`
  padding: 16px 32px;
  width: 100%;
  height: 100%;
`;

export const Title = styled.h2`
  color: #212112;
`;

export const Description = styled.p`
  color: #212112;
  font-size: 16px;
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background: #2c88d9;
  height: 32px;
  width: 128px;
  color: white;
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25), 0 4px 4px rgba(0, 0, 0, 0.22);
  }
`;

export const Data = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 10px;

  strong,
  p {
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: #212121;
  }
`;
