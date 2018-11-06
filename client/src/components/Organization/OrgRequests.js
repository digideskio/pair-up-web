import React from 'react';
import { connect } from 'react-redux';
import OrganizationRequests from './OrganizationRequests';

import OrgNav from './OrgNav';

const OrgRequests = ({ organization, id }) => {
  if (!organization) return null
  var orgId = id;
  return (
    <div className="org-background">
      <div className="container">
        <div className="row">
          <OrgNav id={orgId}/>
          <OrganizationRequests organization={organization} />
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
