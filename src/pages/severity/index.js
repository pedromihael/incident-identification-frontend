import React from 'react';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title } from './styles';

function SeverityRegistration() {
  return (
    <>
      <Header title='Severity Registration' />
      <Container>
        <Title>Fill the fields with a numeric weight to each severity</Title>
        <FormContainer>
          <FormItem>
            <Label for='low'>Low</Label>
            <Input name='low' placeholder='Enter a weight for this severity...' />
          </FormItem>
          <FormItem>
            <Label for='medium'>Medium</Label>
            <Input name='medium' placeholder='Enter a weight for this severity...' />
          </FormItem>
          <FormItem>
            <Label for='high'>High</Label>
            <Input name='high' placeholder='Enter a weight for this severity...' />
          </FormItem>
          <FormItem>
            <Label for='critical'>Critical</Label>
            <Input name='critical' placeholder='Enter a weight for this severity...' />
          </FormItem>
          <Button>Register</Button>
        </FormContainer>
      </Container>
    </>
  );
}

export default SeverityRegistration;
