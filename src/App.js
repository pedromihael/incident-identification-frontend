import React from 'react';
import Home from './pages/home';
import Workflow from './pages/workflow';
import IncidentIdentification from './pages/incident-identification';
import SeverityRegistration from './pages/severity';
import Reliability from './pages/reliability';
import RegisterProject from './pages/register-project';
import RegisterProvider from './pages/register-provider';
import GlobalStyles from './styles/global';
import ProjectDetails from './pages/projectDetails';
import { CalculateBugfree } from './pages/calculate-bugfree';

import Incidents from './pages/adminModule/incidents';
import Projects from './pages/adminModule/projects';

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
          <Route exact path='/register-project' component={RegisterProject} />
          <Route exact path='/register-provider' component={RegisterProvider} />
          <Route path='/reliability' component={Reliability} />
          <Route exact path='/calculate-bugfree' component={CalculateBugfree} />
          <Route exact path='/projects/:id/details' component={ProjectDetails} />

          <Route exact path='/admin/incidents' component={Incidents} />
          <Route exact path='/admin/projects' component={Projects} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
