import React, { useCallback, useEffect, useState, createRef } from 'react';
import { useConnection } from '../../../hooks/useConnection';
import { AdminHeader } from '../../../components/AdminHeader';
import { ToastContainer, toast } from 'react-toastify';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title, RegisterResult } from '../styles';

function Incidents() {
  const apiConnection = useConnection();

  const [incidents, setIncidents] = useState([]);
  const [registerSucess, setRegisterSucess] = useState({
    text: '',
  });

  const notify = useCallback(() => {
    if (registerSucess.text !== '') {
      if (registerSucess.success) {
        return toast.success(registerSucess.text, { autoClose: 3000, pauseOnHover: false });
      } else {
        return toast.error(registerSucess.text, { autoClose: 3000, pauseOnHover: false });
      }
    }
  }, [registerSucess]);

  useEffect(() => {
    notify();
    incidentDescRef.current.value = '';
  }, [registerSucess]);

  const incidentIdRef = createRef({});
  const incidentDescRef = createRef({});

  const handleRegistration = useCallback(async () => {
    const payload = {
      id: incidentIdRef.current.value,
      field: 'description',
      value: incidentDescRef.current.value,
    };

    const response = await apiConnection.put(`/incident`, payload);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Editado com sucesso!', success: true });
    } else {
      setRegisterSucess({ text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo', success: false });
    }

    setTimeout(() => {
      setRegisterSucess({ text: '' });
    }, 3000);
  }, [incidentIdRef, incidentDescRef]);

  const handleDeletion = useCallback(async () => {
    const id = incidentIdRef.current.value;

    const response = await apiConnection.delete(`/incident/${id}`);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Deletado com sucesso!', success: true });
      const newData = incidents.filter((incident) => incident.id !== id);
      setIncidents(newData);
    } else {
      setRegisterSucess({
        text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo',
        success: false,
      });
    }

    setTimeout(() => {
      setRegisterSucess({ text: '' });
    }, 2000);
  }, [incidentIdRef]);

  useEffect(() => {
    (async () => {
      const response = await apiConnection.get('/incidents');
      if (response.data) {
        setIncidents(response.data);
      }
    })();
  }, []);

  return (
    <>
      <ToastContainer />
      <AdminHeader title='Edit Incidents' />
      <Container>
        <Title>Edit incidents information</Title>
        <FormContainer>
          <FormItem>
            <Label htmlFor='incident'>Incident</Label>
            <Select ref={incidentIdRef} name='incident'>
              {incidents.map((incident, index) => (
                <option key={index} value={incident.id}>
                  {incident.id}
                </option>
              ))}
            </Select>
            <Label htmlFor='incident-desc'>Incident description</Label>
            <Input ref={incidentDescRef} name='incident-desc' placeholder='Enter a value...' />
          </FormItem>
          <Button kind='update' onClick={handleRegistration}>
            Update
          </Button>
          <Button kind='delete' onClick={handleDeletion}>
            Delete
          </Button>
        </FormContainer>
      </Container>
    </>
  );
}

export default Incidents;
