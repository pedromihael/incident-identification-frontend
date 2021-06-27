import React, { useCallback, useState, createRef } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, Select, FormItem, RegisterResult, Button, Title } from './styles';

function SeverityRegistration() {
  const weightRef = createRef({});
  const severityRef = createRef({});

  const apiConnection = useConnection();

  const [registerSucess, setRegisterSucess] = useState({
    text: '',
  });

  const handleRegistration = useCallback(async () => {
    const payload = {
      field: 'weight',
      value: weightRef.current.value,
      id: severityRef.current.value,
    };

    const response = await apiConnection.put('/severity', payload);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Registrado com sucesso!', success: true });
    } else {
      setRegisterSucess({ text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo', success: false });
    }
  }, [severityRef, weightRef]);

  return (
    <>
      <Header title='Severity Registration' />
      <Container>
        <Title>Fill the fields with a numeric weight to each severity</Title>
        <FormContainer>
          <Label htmlFor='impact'>Impact</Label>
          <Select ref={severityRef} name='impact'>
            <option value='1'>Low</option>
            <option value='2'>Medium</option>
            <option value='3'>High</option>
            <option value='4'>Critical</option>
          </Select>
          <FormItem>
            <Label htmlFor='value'>Value</Label>
            <Input ref={weightRef} name='value' placeholder='Enter a weight for this severity...' />
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

export default SeverityRegistration;
