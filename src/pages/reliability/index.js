import React, { useCallback, useEffect, useState, createRef } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, FormItem, Button, Title, RegisterResult } from './styles';

function Reliability() {
  const projectsRef = createRef({});
  const providersRef = createRef({});

  const apiConnection = useConnection();

  const [registerSucess, setRegisterSucess] = useState({
    text: '',
  });

  const handleRegistration = useCallback(async () => {
    let response;

    if (!!providersRef.current.value) {
      const payload = {
        id: 1,
        field: 'meta_percent',
        value: providersRef.current.value,
      };

      response = await apiConnection.put('/reliability', payload);
    }

    if (!!projectsRef.current.value) {
      const payload = {
        id: 2,
        field: 'meta_percent',
        value: projectsRef.current.value,
      };

      response = await apiConnection.put('/reliability', payload);
    }

    if (response.data.ok) {
      setRegisterSucess({ text: 'Registrado com sucesso!', success: true });
    } else {
      setRegisterSucess({ text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo', success: false });
    }
  }, [projectsRef, providersRef]);

  return (
    <>
      <Header title='Reliability goals' />
      <Container>
        <Title>Fill the fields to set reliability goals</Title>
        <FormContainer>
          <FormItem>
            <Label for='projects-goal'>Global reliability goal for projects</Label>
            <Input name='projects-goal' placeholder='Enter a value...' />
          </FormItem>
          <FormItem>
            <Label for='providers-goal'>Global reliability goal for providers</Label>
            <Input name='providers-goal' placeholder='Enter a value...' />
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

export default Reliability;
