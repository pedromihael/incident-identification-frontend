import React from 'react';
import { Container } from './styles';

export const Header = ({ title = 'Incident Identification' }) => {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
};
