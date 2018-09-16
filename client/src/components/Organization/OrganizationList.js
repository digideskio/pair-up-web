import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import OrganizationForm from './OrganizationForm';

const OrganizationList = ({ organizations, count, pluralize }) => {
  return (
    <div className="org-background">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" >
            <div className="card mt-4 card-body">
              <h2>Organizations</h2>
              <h4>Add an organization</h4>
              <OrganizationForm />


              <h4 style={{ 'marginTop': '20px' }}>There {pluralize[0]} currently {count} Organization{pluralize[1]}:</h4>
              <ol style={{ type: 1 }} className="list-group list-group-flush">
                {
                  organizations.map(org => (
                    <li className="list-group-item" key={org.id}>
                      <Link to={`/organizations/${org.id}`}>
                        {org.name}
                      </Link>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = ({ organizations }) => {
  const count = organizations.length;
  const pluralize = count === 1 ? ['is', ''] : ['are', 's']
  return {
    organizations,
    count,
    pluralize
  }
}

export default connect(mapState)(OrganizationList);
