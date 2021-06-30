import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MaterialTable from 'material-table';
import { Container, CircularProgressbarWrapper, ReliabilityWrapper, FirstRow, SecondRow } from './styles';

const columns = [
  { title: 'Weight', field: 'weight' },
  { title: 'Quantity', field: 'count' },
];

const detailedColumns = [
  { title: 'Id', field: 'id' },
  { title: 'Weight', field: 'name' },
  { title: 'Description', field: 'description' },
];

function ProjectDetails() {
  const location = useLocation();

  const percentage = !!location.state.reliability_percentage ? location.state.reliability_percentage : 100;
  const reachedProportionProject = parseFloat(percentage).toPrecision(3);
  const text = reachedProportionProject > 100 ? 100 : reachedProportionProject;

  const providerPercentage = !!location.state.providerReliability ? location.state.providerReliability : 100;
  const reachedProportionProvider = parseFloat(providerPercentage).toPrecision(3);
  const textProvider = reachedProportionProvider > 100 ? 100 : reachedProportionProvider;

  const colorByReachedProportion = text < location.state.projectRel ? '#FF9999' : '#3Cb043';
  const colorByReachedProportionProvider = textProvider < location.state.providerRel ? '#FF9999' : '#3Cb043';

  const sorted = useMemo(() => {
    const { incidentsByProject } = location.state;
    let array = [];

    const lows = incidentsByProject.find((incident) => incident.fk_severity === 1);
    const mediums = incidentsByProject.find((incident) => incident.fk_severity === 2);
    const highs = incidentsByProject.find((incident) => incident.fk_severity === 3);
    const criticals = incidentsByProject.find((incident) => incident.fk_severity === 4);

    array[0] = lows ? lows.count : 0;
    array[1] = mediums ? mediums.count : 0;
    array[2] = highs ? highs.count : 0;
    array[3] = criticals ? criticals.count : 0;

    return array;
  }, []);

  const tableData = useMemo(() => {
    return [
      {
        weight: 'Low',
        count: sorted[0],
      },
      {
        weight: 'Medium',
        count: sorted[1],
      },
      {
        weight: 'High',
        count: sorted[2],
      },
      {
        weight: 'Critical',
        count: sorted[3],
      },
    ];
  }, [sorted]);

  const detailedTableData = useMemo(() => {
    return location.state.detailedIncidents;
  }, []);

  return (
    <>
      <Header title={`Details of project`} />
      <Container>
        <FirstRow>
          <ReliabilityWrapper>
            <h4>Project Reliability</h4>
            <CircularProgressbarWrapper>
              <CircularProgressbar
                value={text}
                text={`${text}%`}
                styles={buildStyles({
                  pathColor: colorByReachedProportion,
                  textColor: colorByReachedProportion,
                })}
              />
            </CircularProgressbarWrapper>
            <span>
              Expected: {location.state.projectRel}% - Calculated: {percentage}%
            </span>
          </ReliabilityWrapper>
          <ReliabilityWrapper>
            <h4>It Service Provider Reliability</h4>
            <CircularProgressbarWrapper>
              <CircularProgressbar
                value={textProvider}
                text={`${textProvider}%`}
                styles={buildStyles({
                  pathColor: colorByReachedProportionProvider,
                  textColor: colorByReachedProportionProvider,
                })}
              />
            </CircularProgressbarWrapper>
            <span>
              Expected: {location.state.providerRel}% - Calculated: {providerPercentage}%
            </span>
          </ReliabilityWrapper>
        </FirstRow>
        <SecondRow>
          <MaterialTable columns={columns} data={tableData} title='Quantity of Incidents in this Project' />
        </SecondRow>
        <SecondRow>
          <MaterialTable
            columns={detailedColumns}
            data={detailedTableData}
            title='Detailed Incidents in this Project'
          />
        </SecondRow>
      </Container>
    </>
  );
}

export default ProjectDetails;
