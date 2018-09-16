import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer, deleteFormFromServer, deleteUserOrganizationFromServer, updateUserOnServer } from '../../store';
import OrganizationForm from './OrganizationForm';
import { Link } from 'react-router-dom';

const OrganizationInfo = ({ organization, deleteOrganization }) => {
  if (!organization) return null
  const { id } = organization;
  return (
    <div className="org-background">
      <div className="container">
        <div className="row">

          <div className="col-lg-3">
            <h3 className="my-4"></h3>
            <div className="list-group">
              <Link to={`/organizations/${id}/users`} className="list-group-item">Manage Members</Link>
              <Link to={`/organizations/${id}/requests`} href="#" className="list-group-item">Manage Requests</Link>
              <Link to={`/organizations/${id}/customize`} href="#" className="list-group-item">Customize My Page</Link>
              <Link to={`/organizations/${id}/account`} href="#" className="list-group-item active">Account Details</Link>
            </div>
          </div>

          <div className="col-lg-9" >
            <div className="card mt-4 card-body">
              <h2>{organization.name}</h2>
              {organization.image && <img src={organization.image} style={{ height: '200px', width: 'auto' }} />}
              <OrganizationForm organization={organization} />
              <br />
              <button className="btn btn-danger" onClick={() => deleteOrganization(id)}>Delete Organization</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = ({ organizations }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  return { organization }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteOrganization: (id) => dispatch(deleteOrganizationFromServer(id, history))
  }
}

export default connect(mapState, mapDispatch)(OrganizationInfo);
