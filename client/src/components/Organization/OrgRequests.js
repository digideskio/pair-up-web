import React from 'react';
import { connect } from 'react-redux';
import OrganizationRequests from './OrganizationRequests';
import { Link } from 'react-router-dom';

const OrgRequests = ({ organization, id }) => {
  if (!organization) return null
  var orgId = id;
  return (
    <div className="org-background">
      <div className="container">
        <div className="row">

          <div className="col-lg-3">
            <h3 className="my-4"></h3>
            <div className="list-group">
              <Link to={`/organizations/${orgId}/users`} className="list-group-item">Manage Members</Link>
              <Link to={`/organizations/${orgId}/requests`} href="#" className="list-group-item active">Manage Requests</Link>
              <Link to={`/organizations/${orgId}/customize`} href="#" className="list-group-item">Customize My Page</Link>
              <Link to={`/organizations/${orgId}/account`} href="#" className="list-group-item">Account Details</Link>
            </div>
          </div>

          <div className="col-lg-9" >
            <div className="card mt-4 card-body">
              <h2>Pending Requests</h2>
              <span>&nbsp;</span>
              <OrganizationRequests organization={organization} />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

const mapState = ({ organizations, users }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  return { organization }
}

export default connect(mapState, null)(OrgRequests);
