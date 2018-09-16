import React from 'react';
import { connect } from 'react-redux';
import { deleteOrganizationRequestFromServer, updateUserOnServer } from '../../store';

const AllOrganizationRequests = ({ users, organizations, organizationRequests, deleteOrganizationRequest }) => {
  return (
    <div className="org-background">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" >
            <div className="card mt-4 card-body">
              <h2>All Organization Requests</h2>
              {
                organizationRequests.map(request => {
                  const user = users.find(user => user.id === request.userId)
                  const organization = organizations.find(organization => organization.id === request.organizationId)
                  const checkedOrg = user.checkedInId ? organizations.find(org => org.id === user.checkedInId) : null
                  // console.log(user, checkedOrg, request)
                  return (
                    <div key={request.id}>
                      {organization.name} requested by {user.fullName} ({request.status}) - {user.checkedInId ? `Checked into ${checkedOrg.name}` : 'Not Checked In'}
                      <button style={{ float: 'right' }} onClick={() => deleteOrganizationRequest(request.id, user, checkedOrg)}>delete</button>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = ({ users, organizations, organizationRequests }) => {
  return {
    organizationRequests,
    users,
    organizations
  }
}

const mapDispatch = dispatch => {
  return {
    deleteOrganizationRequest: (requestId, user, checkedOrg) => {
      if (checkedOrg && user.checkedInId === checkedOrg.id) {
        const { id, firstName, lastName, email, password, userStatus } = user;
        dispatch(updateUserOnServer({ id, firstName, lastName, email, password, userStatus, checkedInId: null }))
      }
      dispatch(deleteOrganizationRequestFromServer(requestId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllOrganizationRequests);
