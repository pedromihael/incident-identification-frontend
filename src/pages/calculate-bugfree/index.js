import React, { useCallback, useEffect, useState } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import MaterialTable from 'material-table';

import { Container } from './styles';

const projectsColumns = [
  { title: 'Project', field: 'name' },
  { title: 'Responsible', field: 'responsible' },
  { title: 'Effort (hours)', field: 'hours_effort' },
  { title: 'Incidents', field: 'totalIncidents' },
  { title: 'IT Service Provider', field: 'fk_provider' },
  { title: 'Reliability (%)', field: 'reliability_percentage' },
];

const providersColumns = [
  { title: 'Provider', field: 'name' },
  { title: 'Id. number', field: 'id' },
  { title: 'Total projects', field: 'projects' },
  { title: 'Reliability (%)', field: 'reliability_percentage' },
];

export const CalculateBugfree = () => {
  const history = useHistory();
  const apiConnection = useConnection();

  const [projectsData, setProjectsData] = useState([]);
  const [providersData, setProvidersData] = useState([]);

  const handleRedirect = useCallback((data) => {
    history.push({
      pathname: `/projects/${data.id}/details`,
      state: data,
    });
  }, []);

  const handleProjectsFetch = useCallback(async () => {
    const projectsResult = await apiConnection.get('/project');

    const projectsAndIncidents = [];
    if (projectsResult.data) {
      const projects = projectsResult.data;

      for await (const project of projects) {
        const { fk_provider, hours_effort, id, name, reliability_percentage, responsible } = project;

        const data = {
          fk_provider,
          hours_effort,
          id,
          name,
          reliability_percentage,
          responsible,
          tableData: { id },
        };

        const providersResult = await apiConnection.get(`/provider/${fk_provider}`);

        if (providersResult.data) {
          const provider = providersResult.data;
          Object.assign(data, { providerReliability: provider.reliability_percentage });
        }

        const incidentsResult = await apiConnection.get(`/incident/projects/${id}`);

        if (incidentsResult.data) {
          const incidents = incidentsResult.data;
          Object.assign(data, { incidentsByProject: incidents.groups, totalIncidents: incidents.total });
        }

        projectsAndIncidents.push(data);
      }
    }

    setProjectsData(projectsAndIncidents);
  }, []);

  const handleProvidersFetch = useCallback(async () => {
    const providersResult = await apiConnection('/provider');
    const providersAndProjects = [];

    if (providersResult.data) {
      const providers = providersResult.data;

      providers.forEach((provider) => {
        const { id, name, reliability_percentage } = provider;
        const projects = projectsData.filter((project) => project.fk_provider === provider.id);

        providersAndProjects.push({ id, name, reliability_percentage, projects: projects.length });
      });
    }

    setProvidersData(providersAndProjects);
  }, [projectsData]);

  useEffect(() => {
    (async () => {
      await handleProjectsFetch();
      await handleProvidersFetch();
    })();
  }, []);

  return (
    <>
      <Header title='Bugfree Goal by Project' />
      <Container>
        <MaterialTable
          columns={projectsColumns}
          data={projectsData}
          title='Projects Reliability - Global goal: 95%'
          actions={[
            {
              icon: 'north_east',
              tooltip: 'See Details',
              onClick: (event, rowData) => handleRedirect({ ...rowData }),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            rowStyle: (evt, rowData) => ({
              backgroundColor: parseFloat(evt.reliability) < 95 ? '#FF9999' : '#BDFFA4',
            }),
          }}
        />
        <MaterialTable
          columns={providersColumns}
          data={providersData}
          title='Providers Reliability - Global goal: 98%'
          options={{
            rowStyle: (evt, rowData) => ({
              backgroundColor: parseFloat(evt.reliability) < 98 ? '#FF9999' : '#BDFFA4',
            }),
          }}
        />
      </Container>
    </>
  );
};
