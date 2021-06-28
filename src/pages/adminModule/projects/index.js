import React, { useCallback, useEffect, useState, createRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useConnection } from '../../../hooks/useConnection';
import { AdminHeader } from '../../../components/AdminHeader';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title, RegisterResult } from './styles';

const fields = [
  {
    id: 'name',
    name: 'Project Name',
  },
  {
    id: 'responsible',
    name: 'Responsible',
  },
  {
    id: 'hours_effort',
    name: 'Effort (in hours)',
  },
];

function Projects() {
  const location = useLocation();
  const apiConnection = useConnection();

  const [projects, setProjects] = useState([]);
  const [registerSucess, setRegisterSucess] = useState({
    text: '',
  });

  const idRef = createRef({});
  const fieldRef = createRef({});
  const valueRef = createRef({});

  const handleRegistration = useCallback(async () => {
    const payload = {
      id: idRef.current.value,
      field: fieldRef.current.value,
      value: valueRef.current.value,
    };

    const response = await apiConnection.put(`/project`, payload);

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

    const response = await apiConnection.delete(`/project/${id}`);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Deletado com sucesso!', success: true });
      const newData = projects.filter((project) => project.id !== id);
      setProjects(newData);
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
      const response = await apiConnection.get('/project');
      if (response.data) {
        setProjects(response.data);
      }
    })();
  }, []);

  console.log('location.state.name', location.state.name);

  return (
    <>
      <AdminHeader title='Edit Projects' />
      <Container>
        <Title>Edit projects information</Title>
        <FormContainer>
          <FormItem>
            <Label htmlFor='project'>Project</Label>
            <Select ref={idRef} name='project'>
              {projects.map((project, index) => (
                <option key={index} value={project.id} selected={project.name === location.state.name}>
                  {project.name}
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
          <RegisterResult success={registerSucess.success}>
            <span>{registerSucess.text}</span>
          </RegisterResult>
        </FormContainer>
      </Container>
    </>
  );
}

export default Projects;
