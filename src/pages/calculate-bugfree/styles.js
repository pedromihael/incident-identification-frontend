import styled, { css } from 'styled-components';

export const Container = styled.div`
  height: auto;
  width: 100vw;
  position: relative;
  top: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  table {
    width: 90vw;
    th {
      z-index: 1;
    }

    th,
    td {
      &:last-child {
        padding-right: 24px;
      }
    }
  }
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background: #2c88d9;
  height: 40px;
  width: 136px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 20px;
  font-weight: bold;

  &:hover {
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25), 0 4px 4px rgba(0, 0, 0, 0.22);
  }

  ${(props) =>
    props.disabled &&
    css`
      background: #2c88d970;
      cursor: not-allowed;
      &:hover {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      }
    `}
`;
