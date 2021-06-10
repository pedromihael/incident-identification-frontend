import React, { useCallback, useEffect, useState } from 'react';
import { useConnection } from '../../hooks/useConnection';
import { Header } from '../../components/Header';
import projects from './utils/projects';
import incidents from './utils/incidents';
import MaterialTable from 'material-table';

import { Container, Button } from './styles';

const columns = [
  { title: 'Project', field: 'name' },
  { title: 'Responsible', field: 'responsible' },
  { title: 'Effort (hours)', field: 'hour_effort' },
  { title: 'Reliability (%)', field: 'reliability' },
];

const getIncidentsWeightSum = (projectIncidents) => {
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

  const incidentSums = incidentGroups.map((group) => {
    const product = group.quantity * group.weight;
    return product;
  });

  const totalSum = incidentSums.reduce((previousValue, currentValue) => previousValue + currentValue);

  return totalSum;
};

function CalculateBugfree() {
  const apiConnection = useConnection();

  const [projectsReliability, setProjectsReliability] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const getReliability = useCallback(
    (projectID) => {
      const project = projects.find((project) => project.id === projectID);

      const { hour_effort } = project;

      const projectIncidents = incidents.filter((incident) => incident.fk_project === projectID);

      const incidentsSum = getIncidentsWeightSum(projectIncidents);

      const quocient = incidentsSum / hour_effort;

      const reliabilityPercentage = (1 - quocient) * 100;

      const reliabilityFloor = reliabilityPercentage >= 0 ? reliabilityPercentage : 0;

      return reliabilityFloor.toPrecision(3);
    },
    [projects, incidents],
  );

  useEffect(() => {
    const calculated = projects.map((project) => {
      const reliability = getReliability(project.id);
      return { ...project, reliability };
    });

    setProjectsReliability(calculated);
  }, [projects, incidents]);

  return (
    <>
      <Header title='Bugfree Goal by Project' />
      <Container>
        <MaterialTable
          columns={columns}
          data={projectsReliability}
          title='Projects Reliability'
          onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.id)}
          options={{
            rowStyle: (rowData) => ({
              backgroundColor: selectedRow === rowData.id ? '#dadada' : '#FFF',
            }),
          }}
        />
        <Button disabled={!selectedRow}>See details</Button>
      </Container>
    </>
  );
}

export default CalculateBugfree;
