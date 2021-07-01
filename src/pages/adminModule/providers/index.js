import React, { useCallback, useEffect, useState, createRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useConnection } from '../../../hooks/useConnection';
import { AdminHeader } from '../../../components/AdminHeader';
import { ToastContainer, toast } from 'react-toastify';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title, RegisterResult } from '../styles';

const fields = [
  {
    id: 'name',
    name: 'Provider Name',
  },
];

function Providers() {
  const location = useLocation();
  const apiConnection = useConnection();

  const [providers, setProviders] = useState([]);
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

    const response = await apiConnection.put(`/provider`, payload);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Editado com sucesso!', success: true });
    } else {
      setRegisterSucess({ text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo', success: false });
    }

    setTimeout(() => {
      setRegisterSucess({ text: '' });
    }, 2000);
  }, [idRef, fieldRef, valueRef]);

  const handleDeletion = useCallback(async () => {
    const id = idRef.current.value;

    const response = await apiConnection.delete(`/provider/${id}`);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Deletado com sucesso!', success: true });
      const newData = providers.filter((provider) => provider.id !== id);
      setProviders(newData);
    } else {
      setRegisterSucess({
        text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo',
        success: false,
      });
    }

    setTimeout(() => {
      setRegisterSucess({ text: '' });
    }, 2000);
  }, [idRef]);

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
      <ToastContainer />
      <AdminHeader title='Edit It Service Providers' />
      <Container>
        <Title>Edit IT Service Providers information</Title>
        <FormContainer>
          <FormItem>
            <Label htmlFor='provider'>Provider</Label>
            <Select ref={idRef} name='provider'>
              {providers.map((item, index) => (
                <option
                  key={index}
                  value={item.id}
                  defaultValue={location.state?.name ? item.name === location.state.name : false}
                >
                  {item.name}
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
          <Button kind='delete' onClick={handleDeletion}>
            Delete
          </Button>
        </FormContainer>
      </Container>
    </>
  );
}

export default Providers;
