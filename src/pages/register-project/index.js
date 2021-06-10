import React from 'react';
import { Header } from '../../components/Header';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title } from './styles';

function RegisterProject() {
  return (
    <>
      <Header title='Project Registration' />
      <Container>
        <Title>Fill the fields to register a project</Title>
        <FormContainer>
          <FormItem>
            <Label for='name'>Project name</Label>
            <Input name='name' placeholder='Enter a value...' />
            <Label for='responsible'>Project responsible</Label>
            <Input name='responsible' placeholder='Enter a value...' />
            <Label for='reliability'>Project reliability percentage</Label>
            <Input name='reliability' placeholder='Enter a value...' />
            <Label for='effort'>Project effort (hours)</Label>
            <Input name='effort' placeholder='Enter a value...' />
            <Label for='provider'>Provider</Label>
            <Select name='provider'>
              <option value='abc'>abc</option>
              <option value='def'>def</option>
              <option value='ghi'>ghi</option>
            </Select>
          </FormItem>
          <Button>Register</Button>
        </FormContainer>
      </Container>
    </>
  );
}

export default RegisterProject;
