import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, ButtonsGroup, Button } from './styles';

const tabs = [
  {
    name: 'Log an Incident',
    pathname: '/incident-identification',
  },
  {
    name: 'Register Project',
    pathname: '/register-project',
  },
  {
    name: 'Register Provider',
    pathname: '/register-provider',
  },
  {
    name: 'Set Reliability Goals',
    pathname: '/reliability',
  },
];

export const Header = ({ title = 'Incident Identification' }) => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState({});

  useEffect(() => {
    const { location } = history;
    tabs.map((tab) => {
      location.pathname === tab.pathname && setActiveTab(tab);
    });
  }, [history]);

  return (
    <Container>
      <h1 onClick={() => history.push('/')}>{title}</h1>
      <ButtonsGroup>
        {tabs.map((tab, index) => (
          <Button key={index} isActive={tab.pathname === activeTab.pathname} onClick={() => history.push(tab.pathname)}>
            {tab.name}
          </Button>
        ))}
      </ButtonsGroup>
    </Container>
  );
};
