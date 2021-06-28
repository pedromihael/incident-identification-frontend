import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, ButtonsGroup, Button } from './styles';

const tabs = [
  {
    name: 'Projects',
    pathname: '/admin/projects',
  },
  {
    name: 'Incidents',
    pathname: '/admin/incidents',
  },
  {
    name: 'It Service Providers',
    pathname: '/admin/providers',
  },
  {
    name: 'Severities',
    pathname: '/admin/severities',
  },
  {
    name: 'Reliabilities',
    pathname: '/admin/reliabilities',
  },
];

export const AdminHeader = ({ title = 'Admin' }) => {
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
