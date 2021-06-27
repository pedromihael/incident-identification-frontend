import React from 'react';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title } from './styles';

function RegisterProvider() {
  return (
    <>
      <Header title='Provider Registration' />
      <Container>
        <Title>Fill the fields to register a provider</Title>
        <FormContainer>
          <FormItem>
            <Label for='name'>Provider name</Label>
            <Input name='name' placeholder='Enter a value...' />
          </FormItem>
          <Button>Register</Button>
        </FormContainer>
      </Container>
    </>
  );
}

export default RegisterProvider;
