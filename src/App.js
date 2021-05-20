import { useCallback, useState, useMemo } from 'react';
import GlobalStyles from './styles/global';
import { Container } from './styles/App.styles';
import { Modal } from './components/Modal';

import flow from './assets/flow2.png';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activityInfo, setActivityInfo] = useState('');

  const activitiesDescription = useMemo(() => {
    return [
      {
        activity: 1,
        name: 'Incident Identification',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id nisl urna. Donec ullamcorper sapien ac arcu ornare, ac ornare justo mollis. Mauris ut posuere leo, ultrices feugiat lacus. ',
      },
      {
        activity: 2,
        name: 'Incident Logging',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id nisl urna. Donec ullamcorper sapien ac arcu ornare, ac ornare justo mollis. Mauris ut posuere leo, ultrices feugiat lacus. ',
      },
      {
        activity: 3,
        name: 'Incident Categorization',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id nisl urna. Donec ullamcorper sapien ac arcu ornare, ac ornare justo mollis. Mauris ut posuere leo, ultrices feugiat lacus. ',
      },
      {
        activity: 4,
        name: 'Severity Assignment',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id nisl urna. Donec ullamcorper sapien ac arcu ornare, ac ornare justo mollis. Mauris ut posuere leo, ultrices feugiat lacus. ',
      },
    ];
  }, []);

  const getActivityData = useCallback((activity) => {
    return activitiesDescription.find((item) => item.activity === activity);
  });

  const toggleModal = useCallback((activity) => {
    const activityData = getActivityData(activity);
    setActivityInfo(activityData);
    setModalOpen(true);
  }, []);

  const changeCursor = useCallback((activity) => {
    const area = document.getElementById(activity);
    area.style.cursor = 'pointer';
  }, []);

  return (
    <Container className='App'>
      <GlobalStyles isScrollLocked={modalOpen} />

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
      {modalOpen && <Modal closeModal={() => setModalOpen(false)} data={activityInfo} />}
    </Container>
  );
}

export default App;
