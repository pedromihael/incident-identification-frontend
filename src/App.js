import React from 'react';
import Home from './pages/home';
import Workflow from './pages/workflow';
import IncidentIdentification from './pages/incident-identification';
import SeverityRegistration from './pages/severity';
import Reliability from './pages/reliability';
import RegisterProject from './pages/register-project';
import RegisterProvider from './pages/register-provider';
import GlobalStyles from './styles/global';

import { Switch, BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/workflow' component={Workflow} />
          <Route path='/incident-identification' component={IncidentIdentification} />
          <Route path='/severity-registration' component={SeverityRegistration} />
          <Route path='/register-project' component={RegisterProject} />
          <Route path='/register-provider' component={RegisterProvider} />
          <Route path='/reliability' component={Reliability} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
