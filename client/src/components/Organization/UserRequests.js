import React from 'react';
import { connect } from 'react-redux';
import { deleteUserRequestFromServer } from '../../store';

const UserRequests = ({ users, userRequests, deleteRequest, organizations }) => {
  return (
    <div className='org-background'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12' >
            <div className='card mt-4 card-body'>
              <h4>User Requests</h4>
              {
                userRequests.map(request => {
                  const requester = users.find(user => user.id === request.requesterId);
                  const responder = users.find(user => user.id === request.responderId);
                  const organization = organizations.find(org => org.id === request.organizationId);
                  return (
                    <div key={request.id}>
                      {requester.fullName} wants to pair with {responder.fullName} @ {organization.name} ({request.status})&nbsp;
                      <button onClick={() => deleteRequest(request.id)}>delete</button>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = ({ users, userRequests, organizations }) => {
  return { users, userRequests, organizations }
}

const mapDispatch = (dispatch) => {
  return {
    deleteRequest: (requestId) => dispatch(deleteUserRequestFromServer(requestId))
  }
}

export default connect(mapState, mapDispatch)(UserRequests);
