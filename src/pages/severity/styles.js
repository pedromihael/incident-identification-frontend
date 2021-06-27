import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: #212121;
  margin-bottom: 52px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 10px 5px;
  border: none;
  border-bottom: 1px solid #313131;
  width: 520px;
  background: #dadada;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

export const FormItem = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background: #2c88d9;
  height: 32px;
  width: 520px;
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

export const RegisterResult = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: ${(props) => (props.success ? '#3Cb043' : '#FF0000')};
  font-size: 12px;
  margin-top: 16px;
`;

export const Select = styled.select`
  padding: 10px 5px;
  border: none;
  border-bottom: 1px solid #313131;
  width: 520px;
  background: #dadada;
  border-radius: 8px;
  margin-bottom: 10px;
`;
