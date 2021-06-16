import React, { useMemo, useEffect } from 'react';
import close from '../../assets/close.svg';

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

export const ChartsModal = ({ closeModal, displayedData }) => {
  useEffect(() => {
    const closeModalByPressEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeModalByPressEscape, false);
    return;
  }, []);

  useEffect(() => {
    console.log('displayedData', displayedData);
  }, []);

  return (
    <Container>
      <ModalContainer>
        <CloseButton onClick={closeModal}>
          <img src={close} alt='close-button' />
        </CloseButton>

        <ModalBody></ModalBody>
      </ModalContainer>
    </Container>
  );
};
