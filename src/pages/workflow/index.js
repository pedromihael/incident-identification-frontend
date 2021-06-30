import { useCallback, useState, useMemo } from 'react';
import { Container } from './styles';
import { Modal } from '../../components/Modal';
import { Header } from '../../components/Header';

import flow from '../../assets/flow-resized.jpg';

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activityInfo, setActivityInfo] = useState('');
  const [activity, setActivity] = useState(0);

  const activitiesDescription = useMemo(() => {
    return [
      {
        activity: 1,
        name: 'Request for Ticket',
        info: [
          { key: 'Input Criteria', value: 'N/A' },
          { key: 'Ouput Criteria', value: 'Evidence and detail data regarding the incident.' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'End-user' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description: 'A user requests for a incident ticket.',
      },
      {
        activity: 2,
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
        activity: 3,
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
        activity: 4,
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
        activity: 5,
        name: 'Incident Priorization',
        info: [
          { key: 'Input Criteria', value: 'Data information about the urgency and the impact.' },
          { key: 'Ouput Criteria', value: 'The incident data updated.' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'Service desk team' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to prioritize the incident. An incident’s priority is determined according to its impact and urgency using a priority matrix. Urgency is how quickly a resolution is required. The impact is the measure of the extent of the potential damage the incident may cause. Severity can be classified into four domains:',
        listItems: [
          {
            name: 'Low',
            desc: ' - services to users and customers can be maintained. These issues do not interrupt users or the business and can be worked around;',
          },
          {
            name: 'Medium',
            desc: ' - users may be slightly affected or inconvenienced. These issues affect a few staff and interrupt work to some degree;',
          },

          {
            name: 'High',
            desc: ' - disruptions of services and/or operations. These issues affect a large number of users, interrupt business, service delivery, but limited damage;',
          },
          {
            name: 'Critical',
            desc: ' - affect a large number of users, have financial losses, and significant reputation damage. Besides, the correction may demand a huge operational work.',
          },
        ],
      },
      {
        activity: 6,
        name: 'Incident Analysis',
        info: [
          { key: 'Input Criteria', value: 'All available data of incident.' },
          { key: 'Ouput Criteria', value: 'Knowledge base updated.' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'Sustaining triage team' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to analyze if the incident is valid. The sustaining triage team has skills and enough expertise to identify an invalid incident. In many cases, the tickets are opened due to a lack of knowledge of business rules by the users. In this scenario, the incident will be addressed to closure.',
      },
      {
        activity: 7,
        name: 'Incident closure',
        info: [
          { key: 'Input Criteria', value: 'Knowledge base' },
          { key: 'Ouput Criteria', value: 'Final documentation and lessons learned.' },
          { key: 'Responsible', value: 'Central organization' },
          {
            key: 'Participants',
            value:
              'Sustaining triage team, sustaining developers team, and sustaining software projects developers team.',
          },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to close the incident and the process ends. Final documentation and lessons learned are stored.',
      },
      {
        activity: 8,
        name: 'Feedback survey',
        info: [
          { key: 'Input Criteria', value: 'N/A' },
          { key: 'Ouput Criteria', value: 'Evaluation form' },
          { key: 'Responsible', value: 'Central organization' },
          {
            key: 'Participants',
            value: 'End-user',
          },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to collect end-user feedback. It is a way of evaluating the level of satisfaction with the service.',
      },
      {
        activity: 9,
        name: 'Initial diagnosis',
        info: [
          { key: 'Input Criteria', value: 'All available data of incident.' },
          { key: 'Ouput Criteria', value: 'Knowledge base updated.' },
          { key: 'Responsible', value: 'Central organization' },
          {
            key: 'Participants',
            value: 'Sustaining developers team',
          },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to understand the problem and comprises the entire process of searching by the sustaining developers team for a solution. The troubleshooting questions can be searched in the knowledge base. If the information is missing for a resolution, it should be requested to the user or the person in charge. In this phase, the sustaining developers team may identify if the incident is due to a recent (three months) software project deployment. Also in this phase, it is possible to request the incident escalation.',
      },
      {
        activity: 10,
        name: 'Severity Assignment',
        info: [
          { key: 'Input Criteria', value: 'N/A' },
          { key: 'Ouput Criteria', value: 'Incident assigned to a software project’s developer group' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'Sustaining developers team' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'List of incidents with their severities' },
        ],
        redirection: '/incident-identification',
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
      {
        activity: 11,
        name: 'Incident escalation',
        info: [
          { key: 'Input Criteria', value: 'All available data of incident.' },
          { key: 'Ouput Criteria', value: 'Knowledge base updated.' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'Sustaining developers team' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to delegate the incident to a higher level of specialists, in case of the first-level ones are unable to complete the diagnosis. It may happen when an incident requires advanced support. Most incidents should be resolved by the first-level support and should not make it to the escalation step.',
      },
      {
        activity: 12,
        name: 'Incident resolution',
        info: [
          { key: 'Input Criteria', value: 'Knowledge base' },
          { key: 'Ouput Criteria', value: 'Knowledge base updated.' },
          { key: 'Responsible', value: 'Central organization' },
          {
            key: 'Participants',
            value: 'Sustaining developers team, and sustaining software projects developers team.',
          },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        description:
          'This activity aims to resolve and reestablish the service. It happens. It happens when the user’s service has been restored.',
      },
      {
        activity: 13,
        name: 'Calculate Bugfree Goal',
        info: [
          { key: 'Input Criteria', value: 'N/A' },
          { key: 'Ouput Criteria', value: 'Database updated' },
          { key: 'Responsible', value: 'Central organization' },
          { key: 'Participants', value: 'IT Management Team' },
          { key: 'Required Artifacts', value: 'N/A' },
          { key: 'Produced Artifacts', value: 'N/A' },
        ],
        redirection: '/calculate-bugfree',
        description:
          'This activity aims to define a reliability goal to be used in the software projects and IT software providers evaluation. It will also be used in the reliability formula.',
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
    return activity === 10 || activity === 13;
  }, [activity]);

  return (
    <>
      <Header title='Workflow' />
      <Container className='App'>
        <img src={flow} useMap='#image_map' />
        <map name='image_map'>
          <area
            id='1'
            alt='ticket-request'
            title='ticket-request'
            coords='229,68,366,164'
            shape='rect'
            onClick={() => toggleModal(1)}
            onMouseOver={() => changeCursor(1)}
          ></area>
          <area
            id='2'
            alt='incident-identification'
            title='incident-identification'
            coords='226,190,364,276'
            shape='rect'
            onClick={() => toggleModal(2)}
            onMouseOver={() => changeCursor(2)}
          />
          <area
            id='3'
            alt='incident-log'
            title='incident-log'
            coords='383,187,509,275'
            shape='rect'
            onClick={() => toggleModal(3)}
            onMouseOver={() => changeCursor(3)}
          />
          <area
            id='4'
            alt='incident-categorization'
            title='incident-categorization'
            coords='533,188,660,278'
            shape='rect'
            onClick={() => toggleModal(4)}
            onMouseOver={() => changeCursor(4)}
          />
          <area
            id='5'
            alt='incident-priorization'
            title='incident-priorization'
            coords='681,184,822,278'
            shape='rect'
            onClick={() => toggleModal(5)}
            onMouseOver={() => changeCursor(5)}
          />
          <area
            id='6'
            alt='incident-analysos'
            title='incident-analysos'
            coords='224,317,367,401'
            shape='rect'
            onClick={() => toggleModal(6)}
            onMouseOver={() => changeCursor(6)}
          />
          <area
            id='7'
            alt='incident-closure'
            title='incident-closure'
            coords='847,317,1011,400'
            shape='rect'
            onClick={() => toggleModal(7)}
            onMouseOver={() => changeCursor(7)}
          />
          <area
            id='8'
            alt='feedback-survey'
            title='feedback-survey'
            coords='845,73,1012,167'
            shape='rect'
            onClick={() => toggleModal(8)}
            onMouseOver={() => changeCursor(8)}
          />
          <area
            id='9'
            alt='diagnosis'
            title='diagnosis'
            coords='374,465,513,536'
            shape='rect'
            onClick={() => toggleModal(9)}
            onMouseOver={() => changeCursor(9)}
          />
          <area
            id='10'
            alt='severity-assignment'
            title='severity-assignment'
            coords='538,593,661,676'
            shape='rect'
            onClick={() => toggleModal(10)}
            onMouseOver={() => changeCursor(10)}
          />
          <area
            id='11'
            alt='escalation'
            title='escalation'
            coords='538,593,661,676'
            shape='rect'
            onClick={() => toggleModal(11)}
            onMouseOver={() => changeCursor(11)}
          />
          <area
            id='12'
            alt='recovery'
            title='recovery'
            coords='855,463,1006,538'
            shape='rect'
            onClick={() => toggleModal(12)}
            onMouseOver={() => changeCursor(12)}
          />
          <area
            id='13'
            alt='calculate-bugfree'
            title='calculate-bugfree'
            coords='681,588,821,679'
            shape='rect'
            onClick={() => toggleModal(13)}
            onMouseOver={() => changeCursor(13)}
          />
          <area
            id='7'
            alt='closure'
            title='closure'
            coords='1063,453,1202,539'
            shape='rect'
            onClick={() => toggleModal(7)}
            onMouseOver={() => changeCursor(7)}
          />
          <area
            id='12'
            alt='recovery'
            title='recovery'
            coords='528,744,668,829'
            shape='rect'
            onClick={() => toggleModal(12)}
            onMouseOver={() => changeCursor(12)}
          />
          <area
            id='7'
            alt='closure'
            title='closure'
            coords='682,747,822,832'
            shape='rect'
            onClick={() => toggleModal(7)}
            onMouseOver={() => changeCursor(7)}
          />
        </map>
        {modalOpen && <Modal closeModal={() => setModalOpen(false)} data={activityInfo} hasButton={hasButton} />}
      </Container>
    </>
  );
}

export default Home;
