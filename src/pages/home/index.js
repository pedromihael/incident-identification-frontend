import React from 'react';
import hero from '../../assets/home1.jpg';
import { Link } from 'react-router-dom';
import { Container, LeftContainer, RightContainer, ButtonGroup, Button } from './styles';

export default function Home() {
  return (
    <Container>
      <LeftContainer>
        <h1>Welcome to Proprietary Software Ecosystem Confidence Level tool</h1>
        <h3>
          Register projects and IT service providers, manage incidents and severities, and set confidence level goals.
        </h3>
        <p>Choose the overview option</p>
        <ButtonGroup>
          <Link to='/workflow'>
            <Button>See the Workflow</Button>
          </Link>
        </ButtonGroup>
        <p>Or choose other shortcuts options below:</p>
        <ButtonGroup>
          <Link to='/register-provider'>
            <Button>Register It Service Provider</Button>
          </Link>
          <Link to='/register-project'>
            <Button>Register Project</Button>
          </Link>
          <Link to='/incident-identification'>
            <Button>Log an Incident</Button>
          </Link>
          <Link to='/confidence-level'>
            <Button>Set Confidence Level Goals</Button>
          </Link>
          <Link to='/calculate-bugfree'>
            <Button>See Confidence Level Details</Button>
          </Link>
        </ButtonGroup>
        <p>Or manage important info</p>
        <ButtonGroup>
          <Link to='/admin/projects'>
            <Button>Access Admin</Button>
          </Link>
        </ButtonGroup>
      </LeftContainer>
      <RightContainer>
        <img src={hero} alt='home-hero' />
      </RightContainer>
    </Container>
  );
}
