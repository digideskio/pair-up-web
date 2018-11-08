import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationFromServer } from '../../store';
import OrganizationForm from './OrganizationForm';

import OrgNav from './OrgNav';

const OrganizationInfo = ({ organization, deleteOrganization }) => {
  if (!organization) return null
  const { id } = organization;
  return (
    <div className="org-background">
      <div className="container">
        <div className="row">

          <OrgNav id={id} />

          <div className="col-lg-9" >
            <div className="card mt-4 card-body">
              <h2 style={{ textAlign: 'center' }}>{organization.name}</h2>
              {
                organization.image && 
                  <img src={organization.image} style={{ width: '75%', margin: 'auto auto 15px auto', borderRadius: '5px', boxShadow: '0px 0px 5px gray' }} />
              }
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
