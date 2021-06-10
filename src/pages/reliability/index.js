import React from 'react';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, FormItem, Button, Title } from './styles';

function Reliability() {
  return (
    <>
      <Header title='Reliability goals' />
      <Container>
        <Title>Fill the fields to set reliability goals</Title>
        <FormContainer>
          <FormItem>
            <Label for='projects-goal'>Global reliability goal for projects</Label>
            <Input name='projects-goal' placeholder='Enter a value...' />
          </FormItem>
          <FormItem>
            <Label for='providers-goal'>Global reliability goal for providers</Label>
            <Input name='providers-goal' placeholder='Enter a value...' />
          </FormItem>
          <Button>Register</Button>
        </FormContainer>
      </Container>
    </>
  );
}

export default Reliability;
