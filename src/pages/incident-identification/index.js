import React from 'react';
import { Container, FormContainer, Input, Label, FormItem, Select, Button, Title } from './styles';

function IncidentIdentification() {
  return (
    <Container>
      <Title>Incident Identification</Title>
      <FormContainer>
        <FormItem>
          <Label for='incident-number'>Incident number</Label>
          <Input name='incident-number' placeholder='Enter a value...' />

          <Label for='project'>Project</Label>
          <Select name='project'>
            <option value='abc'>abc</option>
            <option value='def'>def</option>
            <option value='ghi'>ghi</option>
          </Select>
          <Label for='impact'>Impact</Label>
          <Select name='impact'>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
            <option value='Critical'>Critical</option>
          </Select>
        </FormItem>
        <Button>Register</Button>
      </FormContainer>
    </Container>
  );
}

export default IncidentIdentification;
