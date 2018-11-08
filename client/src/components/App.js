import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getOrganizationsFromServer, getDescriptionsFromServer, getUsersFromServer, getUserOrganizationsFromServer, getUserFromToken, getFormsFromServer, getOrganizationRequestsFromServer, getUserRequestsFromServer } from '../store';

import CheckMaster from './General/CheckMaster'
import CheckAuth from './General/CheckAuth'
import FourOhFour from './General/FourOhFour'
import Nav from './Nav';
import MasterNav from './Master/MasterNav';
import NotMaster from './Master/NotMaster';
import Users from './User/Users';
import UserInfo from './User/UserInfo';
import OrganizationList from './Organization/OrganizationList';
import AllOrganizationRequests from './Organization/AllOrganizationRequests';
import UserRequests from './Organization/UserRequests';
import OrganizationInfo from './Organization/OrganizationInfo';
import OrgUsers from './Organization/OrgUsers';
import OrganizationRequests from './Organization/OrganizationRequests';
import OrgCustomize from './Organization/OrgCustomize';
import LoginForm from './User/LoginForm';
import OrganizationForm from './Organization/OrganizationForm';
import Welcome from './General/Welcome';
import Home from './Home';

import OrgNav from './Organization/OrgNav';

class App extends React.Component {
  componentDidMount() {
    const { loadOrganizations, loadUsers, loadDescriptions, loadUserOrganizations, loadUser, loadForm, loadOrganizationRequests, loadUserRequests } = this.props;
    loadOrganizations();
    loadUsers();
    loadDescriptions();
    loadUserOrganizations();
    loadUser();
    loadForm();
    loadOrganizationRequests();
    loadUserRequests();
  }

  render() {
    const OrganizationsMaster = CheckMaster(OrganizationList);
    const UsersMaster = CheckMaster(Users);
    const UserInfoAuth = CheckAuth(UserInfo);
    const OrganizationInfoAuth = CheckAuth(OrganizationInfo);
    const OrgUsersAuth = CheckAuth(OrgUsers);
    const OrgRequestsAuth = CheckAuth(OrganizationRequests);
    const OrgCustomizeAuth = CheckAuth(OrgCustomize);
    const OrgFormAuth = CheckAuth(OrganizationForm);
    
    return (
      <Router>
        <div>
          <div>
            <Nav />
            <div>
              <MasterNav />
              <Switch>
                <Route exact path='/' component={Home} />
                {/* USER ROUTES */}
                <Route exact path='/users' component={UsersMaster} />
                <Route exact path='/users/:id' component={({ match }) => <UserInfoAuth id={match.params.id} />} />
                
                
                {/* ORGANIZATION ROUTES */}
                
                <Route exact path='/organizations' component={OrganizationsMaster} />
                <Route exact path='/organizations/create' component={OrgFormAuth} />
                
                {/* <Route path='/organizations/:id' component={OrgNav} /> */}
                <Route exact path='/organizations/:id' component={({ match, history }) => <OrganizationInfoAuth id={match.params.id} history={history} />} />

          

                <Route exact path='/organizations/:id/users' component={({ match, history }) => <OrgUsersAuth id={match.params.id} history={history} />} />
                <Route exact path='/organizations/:id/requests' component={({ match, history }) => <OrgRequestsAuth id={match.params.id} history={history} />} />
                <Route exact path='/organizations/:id/customize' component={({ match, history }) => <OrgCustomizeAuth id={match.params.id} history={history} />} />
                <Route exact path='/organizations/:id/account' component={({ match, history }) => <OrganizationInfoAuth id={match.params.id} history={history} />} />

                {/* MASTER ROUTES */}
                <Route exact path='/master' component={OrganizationsMaster} />
                <Route exact path='/master/organizationRequests' component={AllOrganizationRequests} />
                <Route exact path='/master/userRequests' component={UserRequests} />
                {/* AUTH ROUTES */}
                <Route exact path='/login' component={LoginForm} />
                <Route exact path='/signup' component={LoginForm} />
                {/* 404 & No Permission PAGE */}
                <Route path='/nopermission' component={NotMaster} />
                <Route path='/:id' component={FourOhFour} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapDisptach = (dispatch) => {
  return {
    loadOrganizations: () => dispatch(getOrganizationsFromServer()),
    loadUsers: () => dispatch(getUsersFromServer()),
    loadDescriptions: () => dispatch(getDescriptionsFromServer()),
    loadUserOrganizations: () => dispatch(getUserOrganizationsFromServer()),
    loadForm: () => dispatch(getFormsFromServer()),
    loadOrganizationRequests: () => dispatch(getOrganizationRequestsFromServer()),
    loadUserRequests: () => dispatch(getUserRequestsFromServer()),
    loadUser: () => {
      const token = window.localStorage.getItem('token')
      if (token) {
        dispatch(getUserFromToken(token))
      }
    }
  }
}

export default connect(null, mapDisptach)(App);
