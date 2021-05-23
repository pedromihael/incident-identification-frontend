import { useCallback, useState, useMemo } from 'react';
import { Container } from './styles';
import { Modal } from '../../components/Modal';
import { Header } from '../../components/Header';

import flow from '../../assets/flow2.png';

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activityInfo, setActivityInfo] = useState('');
  const [activity, setActivity] = useState(0);

  const activitiesDescription = useMemo(() => {
    return [
      {
        activity: 1,
        name: 'Incident Identification',
        info: [
          { key: 'Input Criteria', value: 'Evidence and detail data regarding the incident' },
          { key: 'Ouput Criteria', value: 'The ticket is opened and identified as an incident' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'Service desk team' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to recognize and report the incident to the service desk team. Incidents come from users in whatever forms the organization allows. The service desk then decides if the issue is truly an incident or if it is another type of request.',
      },
      {
        activity: 2,
        name: 'Incident Logging',
        info: [
          { key: 'Input Criteria', value: 'The incident identification.' },
          { key: 'Ouput Criteria', value: 'The incident data logged.' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'Service desk team' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to log the incident reported in a ticket system or other tool used by the organization. The ticket should contain information such as the user’s name, contact details, incident description, and other related details.',
      },
      {
        activity: 3,
        name: 'Incident Categorization',
        info: [
          { key: 'Input Criteria', value: 'The incident data logged' },
          { key: 'Ouput Criteria', value: 'The incident data updated' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'Service desk team' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to classify the incident to determine how the issue has to be handled. It allows the service desk to sort and model incidents based on their categories and subcategories. Some of the issues may be automatically prioritized. The process makes it easier for the service desk team to track and identify the incidents.',
      },
      {
        activity: 4,
        name: 'Severity Assignment',
        info: [
          { key: 'Input Criteria', value: 'N/A' },
          { key: 'Ouput Criteria', value: 'Incident assigned to a software project’s developer group' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'Sustaining developers team' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'List of incidents with their severities' },
        ],
        description:
          'Accounting in the group of software project development team and verifying the incident severity. Severity can be reclassified into four domains:',
        listItems: [
          {
            name: 'Low',
            desc: ' - are those that do not interrupt users or the business and can be worked around;',
          },
          {
            name: 'Medium',
            desc: ' - affect a few staff and interrupt work to some degree;',
          },

          {
            name: 'High',
            desc: ' - affect a large number of users, interrupt business, and service delivery;',
          },
          {
            name: 'Critical',
            desc: ' - affect a large number of users and have financial losses and significant reputation damage. Besides, the correction may demand a huge operational work.',
          },
        ],
      },
    ];
  }, []);

  const getActivityData = useCallback((activity) => {
    return activitiesDescription.find((item) => item.activity === activity);
  });

  const toggleModal = useCallback((activity) => {
    const activityData = getActivityData(activity);
    setActivity(activity);
    setActivityInfo(activityData);
    setModalOpen(true);
  }, []);

  const changeCursor = useCallback((activity) => {
    const area = document.getElementById(activity);
    area.style.cursor = 'pointer';
  }, []);

  const hasButton = useMemo(() => {
    return activity === 4;
  }, [activity]);

  return (
    <>
      <Header title='Workflow' />
      <Container className='App'>
        <img src={flow} useMap='#image_map' />
        <map name='image_map'>
          <area
            id='1'
            alt='incident-identification'
            title='incident-identification'
            coords='219,181,375,265'
            shape='rect'
            onClick={() => toggleModal(1)}
            onMouseOver={() => changeCursor(1)}
          />
          <area
            id='2'
            alt='incident-log'
            title='incident-log'
            coords='388,179,515,267'
            shape='rect'
            onClick={() => toggleModal(2)}
            onMouseOver={() => changeCursor(2)}
          />
          <area
            id='3'
            alt='incident-categorization'
            title='incident-categorization'
            coords='530,181,666,267'
            shape='rect'
            onClick={() => toggleModal(3)}
            onMouseOver={() => changeCursor(3)}
          />
          <area
            id='4'
            alt='severity-assignment'
            title='severity-assignment'
            coords='526,572,670,668'
            shape='rect'
            onClick={() => toggleModal(4)}
            onMouseOver={() => changeCursor(4)}
          />
        </map>
        {modalOpen && <Modal closeModal={() => setModalOpen(false)} data={activityInfo} hasButton={hasButton} />}
      </Container>
    </>
  );
}

export default Home;
