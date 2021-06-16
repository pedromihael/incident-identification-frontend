import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../../components/Header';
import projects from './utils/projects';
import incidents from './utils/incidents';
import MaterialTable from 'material-table';

import { Container } from './styles';

const columns = [
  { title: 'Project', field: 'name' },
  { title: 'Responsible', field: 'responsible' },
  { title: 'Effort (hours)', field: 'hour_effort' },
  { title: 'Incidents', field: 'totalIncidents' },
  { title: 'Reliability (%)', field: 'reliability' },
];

export const CalculateBugfree = () => {
  const history = useHistory();

  const [projectsReliability, setProjectsReliability] = useState([]);

  const [incidentsByProject, setIncidentsByProject] = useState([]);
  const [incidentGroupsByProject, setIncidentGroupsByProject] = useState([]);

  const [groupedIncidents, setGroupedIncidents] = useState([]);

  const handleRedirect = useCallback((data) => {
    history.push({
      pathname: `/projects/${data.id}/details`,
      state: data,
    });
  }, []);

  const getIncidentsWeightSum = useCallback(
    (projectIncidents, projectID) => {
      let incidentGroups = [];

      projectIncidents.forEach((incident) => {
        const thisIncidentGroup = incidentGroups.find((group) => group.weight === incident.fk_severity);
        const withoutCurrent = incidentGroups.filter((group) => group.weight !== incident.fk_severity);

        if (thisIncidentGroup) {
          const { quantity, weight } = thisIncidentGroup;
          incidentGroups = [...withoutCurrent, { weight, quantity: quantity + 1 }];
        } else {
          incidentGroups = [...withoutCurrent, { weight: incident.fk_severity, quantity: 1 }];
        }
      });

      const incidentsByProject = { project: projectID, incidents: incidentGroups };

      setIncidentGroupsByProject([...incidentGroupsByProject, incidentsByProject]);

      const incidentSums = incidentGroups.map((group) => {
        const product = group.quantity * group.weight;
        return product;
      });

      const totalSum = incidentSums.reduce((previousValue, currentValue) => previousValue + currentValue);

      return totalSum;
    },
    [projects, incidents],
  );

  const getIncidentsByProject = useCallback((projectID) => {
    let incidentTypesAndQuantities = [];

    incidents.forEach((incident) => {
      if (incident.fk_project === projectID) {
        const incidentGroup = incidentTypesAndQuantities.find((group) => group.type === incident.fk_severity);
        if (incidentGroup) {
          const { quantity } = incidentGroup;
          const newQuantityObject = Object.assign(incidentGroup, { quantity: quantity + 1 });
          const withoutMine = incidentTypesAndQuantities.filter((group) => group.type !== incident.fk_severity);

          incidentTypesAndQuantities = [...withoutMine, newQuantityObject];
        } else {
          incidentTypesAndQuantities = [...incidentTypesAndQuantities, { type: incident.fk_severity, quantity: 1 }];
        }
      }
    });

    return incidentTypesAndQuantities;
  }, []);

  const getProviderReliability = useCallback((providerID) => {
    let effortsAndReliabilities = [];

    projects.forEach((project) => {
      if (project.fk_provider === providerID) {
        const reliability = parseFloat(getReliability(project.id));
        effortsAndReliabilities.push({ effort: project.hour_effort, reliability });
      }
    });

    const reliabilityPerEffortSum =
      effortsAndReliabilities.length > 1
        ? effortsAndReliabilities.reduce((prev, curr) => {
            return prev.effort * prev.reliability + curr.effort * curr.reliability;
          })
        : effortsAndReliabilities[0].reliability * effortsAndReliabilities[0].effort;

    const totalEffort =
      effortsAndReliabilities.length > 1
        ? effortsAndReliabilities.reduce((prev, curr) => {
            return prev.effort + curr.effort;
          })
        : effortsAndReliabilities[0].effort;

    return reliabilityPerEffortSum / totalEffort;
  }, []);

  const getReliability = useCallback(
    (projectID) => {
      const project = projects.find((project) => project.id === projectID);

      const { hour_effort } = project;

      const projectIncidents = incidents.filter((incident) => incident.fk_project === projectID);

      const incidentsSum = getIncidentsWeightSum(projectIncidents, project.id);

      const quocient = incidentsSum / hour_effort;

      const reliabilityPercentage = (1 - quocient) * 100;

      const reliabilityFloor = reliabilityPercentage >= 0 ? reliabilityPercentage : 0;

      return reliabilityFloor.toPrecision(3);
    },
    [projects, incidents],
  );

  const getTotalIncidetsByProject = useCallback(
    (projectID) => {
      const found = incidentsByProject.find((incident) => incident.project === projectID);
      return found ? found.quantity : 0;
    },
    [incidentsByProject],
  );

  useEffect(() => {
    let incidentGroups = [];

    incidents.forEach((incident) => {
      const thisIncidentGroup = incidentGroups.find((group) => group.project === incident.fk_project);
      const withoutCurrent = incidentGroups.filter((group) => group.project !== incident.fk_project);

      if (thisIncidentGroup) {
        const { quantity, project } = thisIncidentGroup;
        incidentGroups = [...withoutCurrent, { project, quantity: quantity + 1 }];
      } else {
        incidentGroups = [...withoutCurrent, { project: incident.fk_project, quantity: 1 }];
      }
    });

    setIncidentsByProject(incidentGroups);
    // setGroupedIncidents;
  }, [projects, incidents]);

  useEffect(() => {
    const calculated = projects.map((project) => {
      const reliability = getReliability(project.id);
      const providerReliability = getProviderReliability(project.fk_provider);
      const totalIncidents = getTotalIncidetsByProject(project.id);
      const incidentsByProj = getIncidentsByProject(project.id);
      return { ...project, reliability, totalIncidents, providerReliability, incidentsByProject: incidentsByProj };
    });

    setProjectsReliability(calculated);
  }, [incidentsByProject, projects]);

  return (
    <>
      <Header title='Bugfree Goal by Project' />
      <Container>
        <MaterialTable
          columns={columns}
          data={projectsReliability}
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
