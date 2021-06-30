import React, { useCallback, useState, createRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useConnection } from '../../hooks/useConnection';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, FormItem, Button, Title, RegisterResult, Select } from './styles';

function Reliability() {
  const apiConnection = useConnection();

  const [showWarning, setShowWarning] = useState(false);
  const [reliabilityAlreadySet, setReliabilityAlreadySet] = useState({});
  const [reliabilities, setReliabilities] = useState([]);
  const [registerSucess, setRegisterSucess] = useState({
    text: '',
  });

  const fieldRef = createRef({});
  const valueRef = createRef({});

  const handleRegistration = useCallback(async () => {
    const payload = {
      name: fieldRef.current.value,
      meta_percent: valueRef.current.value,
    };

    const response = await apiConnection.post(`/reliability`, payload);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Registrado com sucesso!', success: true });
    } else {
      setRegisterSucess({ text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo', success: false });
    }

    setTimeout(() => {
      setRegisterSucess({ text: '' });
    }, 2000);
  }, [fieldRef, valueRef]);

  useEffect(() => {
    (async () => {
      const response = await apiConnection.get('/reliability');
      if (response.data) {
        setReliabilities(response.data);
      }
    })();
  }, []);

  useEffect(() => {
    const hasSet = reliabilities.filter((rel) => rel.name === fieldRef.current.value);

    if (hasSet.length === 1) {
      const { name, meta_percent } = hasSet[0];
      setReliabilityAlreadySet({ name, meta_percent });
      setShowWarning(true);
    }
  }, [fieldRef]);

  return (
    <>
      <Header title='Reliability goals' />
      <Container>
        <Title>Fill the fields to set NEW reliability goals</Title>
        {showWarning && (
          <RegisterResult success={false}>
            <span>{`${reliabilityAlreadySet.name} is already set with ${reliabilityAlreadySet.meta_percent}%`}</span>
          </RegisterResult>
        )}
        <FormContainer>
          <FormItem>
            <Label htmlFor='field'>New Target (Project and Provider are already set)</Label>
            <Input ref={fieldRef} name='field' placeholder='Enter a value...' />
            <Label htmlFor='value'>New Value</Label>
            <Input ref={valueRef} name='value' placeholder='Enter a value...' />
          </FormItem>
          <Button kind='create' onClick={handleRegistration}>
            Register
          </Button>
          <RegisterResult success={registerSucess.success}>
            <span>{registerSucess.text}</span>
          </RegisterResult>
        </FormContainer>
      </Container>
    </>
  );
}

export default Reliability;
