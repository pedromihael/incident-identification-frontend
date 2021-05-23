import React from 'react';
import hero from '../../assets/home1.jpg';
import { Link } from 'react-router-dom';
import { Container, LeftContainer, RightContainer, ButtonGroup, Button } from './styles';

export default function Home() {
  return (
    <Container>
      <LeftContainer>
        <h1>Welcome to Incident Identification tool</h1>
        <h3>Register Projects and Providers, control Incidents and it's Severities, and set Reliability goals.</h3>
        <p>{`First of all, choose an option:`}</p>
        <ButtonGroup>
          <Link to='/workflow'>
            <Button>See the Workflow</Button>
          </Link>
          <Link to='/register-provider'>
            <Button>Register Provider</Button>
          </Link>
          <Link to='/register-project'>
            <Button>Register Project</Button>
          </Link>
          <Link to='/incident-identification'>
            <Button>Log an Incident</Button>
          </Link>
          <Link to='/reliability'>
            <Button>Set Reliability Goals</Button>
          </Link>
        </ButtonGroup>
      </LeftContainer>
      <RightContainer>
        <img src={hero} alt='home-hero' />
      </RightContainer>
    </Container>
  );
}
