import React, { useCallback, useEffect, useState, createRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useConnection } from '../../../hooks/useConnection';
import { AdminHeader } from '../../../components/AdminHeader';
import { ToastContainer, toast } from 'react-toastify';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title, RegisterResult } from '../styles';

const fields = [
  {
    id: 'name',
    name: 'Severity Name',
  },
  {
    id: 'weight',
    name: 'Severity Weight',
  },
];

function Severities() {
  const location = useLocation();
  const apiConnection = useConnection();

  const [severities, setSeverities] = useState([]);
  const [registerSucess, setRegisterSucess] = useState({
    text: '',
  });

  const idRef = createRef({});
  const fieldRef = createRef({});
  const valueRef = createRef({});

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
    valueRef.current.value = '';
  }, [registerSucess]);

  const handleRegistration = useCallback(async () => {
    const payload = {
      id: idRef.current.value,
      field: fieldRef.current.value,
      value: valueRef.current.value,
    };

    const response = await apiConnection.put(`/severity`, payload);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Editado com sucesso!', success: true });
    } else {
      setRegisterSucess({ text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo', success: false });
    }

    setTimeout(() => {
      setRegisterSucess({ text: '' });
    }, 2000);
  }, [idRef, fieldRef, valueRef]);

  useEffect(() => {
    (async () => {
      const response = await apiConnection.get('/severity');
      if (response.data) {
        setSeverities(response.data);
      }
    })();
  }, []);

  return (
    <>
      <ToastContainer />
      <AdminHeader title='Edit Severities' />
      <Container>
        <Title>Edit Severities information</Title>
        <FormContainer>
          <FormItem>
            <Label htmlFor='severity'>Severity (weight - name)</Label>
            <Select ref={idRef} name='severity'>
              {severities.map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  defaultValue={location.state?.name ? item.name === location.state.name : false}
                >
                  {item.weight} - {item.name}
                </option>
              ))}
            </Select>
            <Label htmlFor='field'>Property to edit</Label>
            <Select ref={fieldRef} name='field'>
              {fields.map((field, index) => (
                <option key={index} value={field.id}>
                  {field.name}
                </option>
              ))}
            </Select>
            <Label htmlFor='value'>New Value</Label>
            <Input ref={valueRef} name='value' placeholder='Enter a value...' />
          </FormItem>
          <Button kind='update' onClick={handleRegistration}>
            Update
          </Button>
        </FormContainer>
      </Container>
    </>
  );
}

export default Severities;
