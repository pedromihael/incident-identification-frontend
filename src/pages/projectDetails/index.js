import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/Header';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Bar } from 'react-chartjs-2';
import { Container, CircularProgressbarWrapper, ReliabilityWrapper, FirstRow, BarWrapper } from './styles';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function ProjectDetails() {
  const location = useLocation();
  const percentage = location.state.reliability;
  const reachedProportionProject = parseFloat((percentage / 95) * 100).toPrecision(3);
  const text = reachedProportionProject > 100 ? 100 : reachedProportionProject;

  const providerPercentage = location.state.providerReliability;
  const reachedProportionProvider = parseFloat((providerPercentage / 98) * 100).toPrecision(3);
  const textProvider = reachedProportionProvider > 100 ? 100 : reachedProportionProvider;

  const colorByReachedProportion = text < 100 ? '#FF9999' : '#3Cb043';
  const colorByReachedProportionProvider = textProvider < 100 ? '#FF9999' : '#3Cb043';

  const getSortedIncidents = useCallback(() => {
    const { incidentsByProject } = location.state;
    let sorted = [];

    const lows = incidentsByProject.find((incident) => incident.type === 1);
    const mediums = incidentsByProject.find((incident) => incident.type === 5);
    const highs = incidentsByProject.find((incident) => incident.type === 10);
    const criticals = incidentsByProject.find((incident) => incident.type === 100);

    sorted[0] = lows ? lows.quantity : 0;
    sorted[1] = mediums ? mediums.quantity : 0;
    sorted[2] = highs ? highs.quantity : 0;
    sorted[3] = criticals ? criticals.quantity : 0;

    return sorted;
  }, []);

  const data = {
    labels: ['Low', 'Medium', 'High', 'Critical'],
    datasets: [
      {
        label: 'Incidents',
        data: getSortedIncidents(),
        backgroundColor: ['#2c88d9', '#2c88d9', '#2c88d9', '#2c88d9'],
        borderColor: ['#2c88d9', '#2c88d9', '#2c88d9', '#2c88d9'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header title={`Details of ${location.state.name}`} />
      <Container>
        <FirstRow>
          <ReliabilityWrapper>
            <h4>Reached Project Reliability</h4>
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
            <span>Expected: 95% - Calculated: {percentage}%</span>
          </ReliabilityWrapper>
          <ReliabilityWrapper>
            <h4>Reached Provider Reliability</h4>
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
            <span>Expected: 98% - Calculated: {providerPercentage}%</span>
          </ReliabilityWrapper>
        </FirstRow>
        <BarWrapper>
          <h4>Incidents in this project</h4>
          <Bar data={data} options={options} />
        </BarWrapper>
      </Container>
    </>
  );
}

export default ProjectDetails;
