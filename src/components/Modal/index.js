import React, { useMemo, useEffect } from 'react';
import close from '../../assets/close.svg';
import header1 from '../../assets/cut1.jpg';
import header2 from '../../assets/cut2.jpg';
import header3 from '../../assets/cut3.jpg';
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
  {
    activity: 5,
    image: header3,
  },
];

export const Modal = (props) => {
  const header = useMemo(() => {
    return headers.find((item) => item.activity === props.data.activity);
  }, [props]);

  useEffect(() => {
    const closeModalByPressEscape = (e) => {
      if (e.key === 'Escape') {
        props.closeModal();
      }
    };

    document.addEventListener('keydown', closeModalByPressEscape, false);
  }, []);

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

          {props.data.listItems &&
            props.data.listItems.map((item) => (
              <ul>
                <li>
                  <strong>{item.name}</strong>
                  {item.desc}
                </li>
              </ul>
            ))}
          <Data>
            {props.data.info.map((item, index) => (
              <DataItem key={index}>
                <strong>{item.key}: </strong>
                <p>{item.value}</p>
              </DataItem>
            ))}
          </Data>
        </ModalBody>
        {props.hasButton && (
          <ModalFooter>
            <Link to={props.data.redirection}>
              <Button>{/bugfree/.test(props.data.redirection) ? 'Calculate' : 'Register'}</Button>
            </Link>
          </ModalFooter>
        )}
      </ModalContainer>
    </Container>
  );
};
