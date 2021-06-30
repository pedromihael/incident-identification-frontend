import React, { useCallback, useEffect, useState, createRef, useMemo } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title, RegisterResult } from './styles';

function IncidentIdentification() {
  const apiConnection = useConnection();

  const [projects, setProjects] = useState([]);
  const [incidents, setIncidents] = useState([]);

  const [registerSucess, setRegisterSucess] = useState({
    text: '',
  });

  const incidentNumberRef = createRef({});
  const incidentDescriptionRef = createRef({});
  const projectRef = createRef({});
  const severityRef = createRef({});

  const handleRegistration = useCallback(async () => {
    const payload = {
      id: incidentNumberRef.current.value,
      description: incidentDescriptionRef.current.value,
      fk_project: projectRef.current.value,
      fk_severity: severityRef.current.value,
    };

    const response = await apiConnection.post('/incident', payload);

    if (response.data.ok) {
      setRegisterSucess({ text: 'Registrado com sucesso!', success: true });
    } else {
      setRegisterSucess({ text: 'Opa, algo deu errado! Confira seus dados certinho e tente denovo', success: false });
    }
  }, [incidentNumberRef, incidentDescriptionRef, projectRef, severityRef]);

  useEffect(() => {
    (async () => {
      const response = await apiConnection.get('/project');

      if (response.data) {
        setProjects(response.data);
      }

      const incidentsResponse = await apiConnection.get('/incidents');
      console.log('incidentsResponse');

      if (incidentsResponse.data) {
        setIncidents(incidentsResponse.data);
      }
    })();
  }, []);

  const lastIncident = useMemo(() => {
    const last = incidents.length ? incidents[incidents.length - 1].id : 'none';
    const last2 =
      incidentNumberRef.current &&
      incidentNumberRef.current.value !== last &&
      incidentNumberRef.current.value !== 'none'
        ? incidentNumberRef.current.value
        : last;
    return last2;
  }, [incidents, incidentNumberRef]);

  return (
    <>
      <Header title='Incident Identification' />
      <Container>
        <Title>Fill the fields to register an incident in a software project</Title>
        <FormContainer>
          <FormItem>
            <Label htmlFor='incident-number'>Incident number - Last incident: {lastIncident}</Label>
            <Input ref={incidentNumberRef} name='incident-number' placeholder='Enter a value...' />

            <Label htmlFor='incident-description'>Incident description</Label>
            <Input ref={incidentDescriptionRef} name='incident-description' placeholder='Enter a value...' />

            <Label htmlFor='project'>Project</Label>
            <Select ref={projectRef} name='project'>
              {projects.map((project, index) => (
                <option key={index} value={project.id}>
                  {project.name}
                </option>
              ))}
            </Select>
            <Label htmlFor='impact'>Impact</Label>
            <Select ref={severityRef} name='impact'>
              <option value='1'>Low</option>
              <option value='2'>Medium</option>
              <option value='3'>High</option>
              <option value='4'>Critical</option>
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

export default IncidentIdentification;
