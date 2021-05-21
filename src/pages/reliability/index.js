import React from 'react';
import { Container, FormContainer, Input, Label, FormItem, Button, Title } from './styles';

function Reliability() {
  return (
    <Container>
      <Title>Reliability Definition</Title>
      <FormContainer>
        <FormItem>
          <Label for='projects-goal'>Reliability goal for projects</Label>
          <Input name='projects-goal' placeholder='Enter a value...' />
        </FormItem>
        <FormItem>
          <Label for='providers-goal'>Reliability goal for providers</Label>
          <Input name='providers-goal' placeholder='Enter a value...' />
        </FormItem>
        <Button>Register</Button>
      </FormContainer>
    </Container>
  );
}

export default Reliability;
