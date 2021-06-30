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
  { title: 'IT Service Provider', field: 'provider' },
  { title: 'Proj. Reliability (%)', field: 'reliability_percentage' },
];

const providersColumns = [
  { title: 'Provider', field: 'name' },
  { title: 'Total projects', field: 'projects' },
  { title: 'Reliability (%)', field: 'reliability_percentage' },
];

export const CalculateBugfree = () => {
  const history = useHistory();
  const apiConnection = useConnection();

  const [projectsData, setProjectsData] = useState([]);
  const [providersData, setProvidersData] = useState([]);

  const [projectRel, setProjectRel] = useState(0);
  const [providerRel, setProviderRel] = useState(0);

  useEffect(() => {
    (async () => {
      const rels = await apiConnection('/reliability');
      if (rels.data) {
        const proj = rels.data.find((rel) => rel.name === 'Project');
        proj.meta_percent && setProjectRel(proj.meta_percent);

        const prov = rels.data.find((rel) => rel.name === 'Provider');
        prov.meta_percent && setProviderRel(prov.meta_percent);
      }
    })();
  }, []);

  const handleRedirect = useCallback((data) => {
    history.push({
      pathname: `/projects/${data.id}/details`,
      state: data,
    });
  }, []);

  const handleRedirectToAdmin = useCallback((data) => {
    history.push({
      pathname: `/admin/projects`,
      state: data,
    });
  }, []);

  const handleProjectsFetch = useCallback(async () => {
    const projectsResult = await apiConnection.get('/project');

    const projectsAndIncidents = [];
    if (projectsResult.data) {
      const projects = projectsResult.data;

      for await (const project of projects) {
        const {
          fk_provider,
          hours_effort,
          id,
          name,
          reliability_percentage,
          responsible,
          provider_id,
          provider,
          provider_reliability_percentage,
        } = project;

        const data = {
          fk_provider,
          hours_effort,
          id,
          name,
          reliability_percentage: reliability_percentage || 100,
          responsible,
          tableData: { id },
          provider_id,
          provider,
          provider_reliability_percentage,
          projectRel,
          providerRel,
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

        const detailedIncidentsResult = await apiConnection.get(`/incident/projects/${id}/detailed`);

        if (detailedIncidentsResult.data) {
          const detailed = detailedIncidentsResult.data;
          Object.assign(data, { detailedIncidents: detailed });
        }

        projectsAndIncidents.push(data);
      }
    }

    setProjectsData(projectsAndIncidents);
  }, []);

  const handleProvidersFetch = useCallback(() => {
    const providersAndProjects = [];

    projectsData.forEach((projectData) => {
      const { provider_id, provider, provider_reliability_percentage } = projectData;
      const projects = projectsData.filter((project) => project.fk_provider === provider_id);

      providersAndProjects.push({
        id: provider_id,
        name: provider,
        reliability_percentage: provider_reliability_percentage || 100,
        projects: projects.length,
      });
    });

    setProvidersData(providersAndProjects);
  }, [projectsData]);

  useEffect(() => {
    (async () => {
      await handleProjectsFetch();
    })();
  }, []);

  useEffect(() => {
    handleProvidersFetch();
  }, [projectsData]);

  return (
    <>
      <Header title='Bugfree Goal by Project' />
      <Container>
        <MaterialTable
          columns={projectsColumns}
          data={projectsData}
          title={`Projects Reliability - Global goal: ${projectRel}%`}
          actions={[
            {
              icon: 'north_east',
              tooltip: 'See Details',
              onClick: (event, rowData) => handleRedirect({ ...rowData }),
            },
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event, rowData) => handleRedirectToAdmin({ ...rowData }),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            rowStyle: (evt, rowData) => ({
              backgroundColor: parseFloat(evt.reliability) < projectRel ? '#FF9999' : '#BDFFA4',
            }),
          }}
        />
        <MaterialTable
          columns={providersColumns}
          data={providersData}
          title={`It Service Providers Reliability - Global goal: ${providerRel}%`}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event, rowData) => handleRedirect({ ...rowData }),
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            rowStyle: (evt, rowData) => ({
              backgroundColor: parseFloat(evt.reliability) < providerRel ? '#FF9999' : '#BDFFA4',
            }),
          }}
        />
      </Container>
    </>
  );
};
