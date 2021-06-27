import React, { useCallback, useState, createRef } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, FormItem, Button, Title, RegisterResult } from './styles';

function RegisterProvider() {
  const nameRef = createRef({});

  const apiConnection = useConnection();

  const [registerSucess, setRegisterSucess] = useState({
    text: '',
  });

  const handleRegistration = useCallback(async () => {
    const payload = {
      name: nameRef.current.value,
    };

    const response = await apiConnection.post('/provider', payload);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Registrado com sucesso!', success: true });
    } else {
      setRegisterSucess({ text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo', success: false });
    }
  }, [nameRef]);

  return (
    <>
      <Header title='Provider Registration' />
      <Container>
        <Title>Fill the fields to register a provider</Title>
        <FormContainer>
          <FormItem>
            <Label for='name'>Provider name</Label>
            <Input ref={nameRef} name='name' placeholder='Enter a value...' />
          </FormItem>
          <Button onClick={handleRegistration}>Register</Button>
          <RegisterResult success={registerSucess.success}>
            <span>{registerSucess.text}</span>
          </RegisterResult>
        </FormContainer>
      </Container>
    </>
  );
}

export default RegisterProvider;
