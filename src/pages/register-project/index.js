import React, { useCallback, useEffect, useState, createRef } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title, RegisterResult } from './styles';

function RegisterProject() {
  const nameRef = createRef({});
  const responsibleRef = createRef({});
  const effortRef = createRef({});
  const providerRef = createRef({});

  const apiConnection = useConnection();

  const [providers, setProviders] = useState([]);
  const [registerSucess, setRegisterSucess] = useState({
    text: '',
  });

  const handleRegistration = useCallback(async () => {
    const payload = {
      name: nameRef.current.value,
      responsible: responsibleRef.current.value,
      hours_effort: effortRef.current.value,
      fk_provider: providerRef.current.value,
    };

    const response = await apiConnection.post('/project', payload);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Registrado com sucesso!', success: true });
    } else {
      setRegisterSucess({ text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo', success: false });
    }
  }, [nameRef, responsibleRef, effortRef, providerRef]);

  useEffect(() => {
    (async () => {
      const response = await apiConnection.get('/provider');
      if (response.data) {
        setProviders(response.data);
      }
    })();
  }, []);

  return (
    <>
      <Header title='Project Registration' />
      <Container>
        <Title>Fill the fields to register a project</Title>
        <FormContainer>
          <FormItem>
            <Label htmlFor='name'>Project name</Label>
            <Input ref={nameRef} name='name' placeholder='Enter a value...' />

            <Label htmlFor='responsible'>Project responsible</Label>
            <Input ref={responsibleRef} name='responsible' placeholder='Enter a value...' />

            <Label htmlFor='effort'>Project effort (hours)</Label>
            <Input ref={effortRef} name='effort' placeholder='Enter a value...' />

            <Label htmlFor='provider'>It Service Provider</Label>
            <Select ref={providerRef} name='provider'>
              {providers.map((provider, index) => (
                <option key={index} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </Select>
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

export default RegisterProject;
