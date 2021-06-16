import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
  width: 100vw;
  position: relative;
  top: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const FirstRow = styled.div`
  display: flex;
  flex: row;
  padding-bottom: 24px;
`;

export const CircularProgressbarWrapper = styled.div`
  position: relative;
  height: 80%;
  width: 80%;
`;

export const ReliabilityWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h4 {
    margin: 12px 0;
  }

  span {
    margin-top: 12px;
  }
`;

export const BarWrapper = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;
