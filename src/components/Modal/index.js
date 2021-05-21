import React, { useMemo } from 'react';
import close from '../../assets/close.svg';
import header1 from '../../assets/cut1.jpg';
import header2 from '../../assets/cut2.jpg';
import { Link } from 'react-router-dom';

import {
  Container,
  ModalContainer,
  CloseButton,
  ModalHeader,
  Title,
  ModalBody,
  Description,
  ModalFooter,
  Button,
  Data,
  DataItem,
} from './styles';

const headers = [
  {
    activity: 1,
    image: header1,
  },
  {
    activity: 2,
    image: header1,
  },
  {
    activity: 3,
    image: header1,
  },
  {
    activity: 4,
    image: header2,
  },
];

export const Modal = (props) => {
  console.log('props', props);
  const header = useMemo(() => {
    return headers.find((item) => item.activity === props.data.activity);
  }, [props]);
  return (
    <Container>
      <ModalContainer>
        <CloseButton onClick={props.closeModal}>
          <img src={close} alt='close-button' />
        </CloseButton>
        <ModalHeader>
          <img src={header.image} alt='activity' />
        </ModalHeader>
        <ModalBody>
          <Title>{props.data.name}</Title>
          <Description>{props.data.description}</Description>
          <Data>
            {props.data.info.map((item, index) => (
              <DataItem key={index}>
                <strong>{item.key}: </strong>
                <p>{item.value}</p>
              </DataItem>
            ))}
          </Data>
        </ModalBody>
        <ModalFooter>
          <Link to='/incident-identification'>
            <Button>Register</Button>
          </Link>
        </ModalFooter>
      </ModalContainer>
    </Container>
  );
};
