import React, { useCallback, useEffect, useState } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import MaterialTable from 'material-table';

import { Container } from './styles';

const columns = [
  { title: 'Project', field: 'name' },
  { title: 'Responsible', field: 'responsible' },
  { title: 'Effort (hours)', field: 'hours_effort' },
  { title: 'Incidents', field: 'totalIncidents' },
  { title: 'IT Service Provider', field: 'fk_provider' },
  { title: 'Reliability (%)', field: 'reliability_percentage' },
];

export const CalculateBugfree = () => {
  const history = useHistory();
  const apiConnection = useConnection();

  const [projectsData, setProjectsData] = useState([]);

  const handleRedirect = useCallback((data) => {
    history.push({
      pathname: `/projects/${data.id}/details`,
      state: data,
    });
  }, []);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <>
      <Header title='Bugfree Goal by Project' />
      <Container>
        <MaterialTable
          columns={columns}
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
      </Container>
    </>
  );
};
