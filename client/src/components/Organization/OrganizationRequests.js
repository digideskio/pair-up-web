import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationRequestOnServer, deleteOrganizationRequestFromServer, createUserOrganizationOnServer } from '../../store';

class OrganizationRequests extends Component {
  constructor() {
    super();
    this.state = { requestStatus: '' }
    this.accept = this.accept.bind(this);
    this.decline = this.decline.bind(this);
  }

  accept(id, userId, organizationId) {
    const { updateRequest, createUserOrganization } = this.props;
    this.setState({ requestStatus: 'accepted' });
    createUserOrganization({ userId, organizationId });
    updateRequest({ id, userId, organizationId, status: 'accepted' })
  }

  decline(id, userId, organizationId) {
    const { updateRequest } = this.props;
    this.setState({ requestStatus: 'declined' });
    updateRequest({ id, userId, organizationId, status: 'declined' })
  }

  render() {
    const { ownUsers, organization, organizationRequests, deleteRequest } = this.props;
    const { accept, decline } = this;
    const { requestStatus } = this.state;
    return (
      <div className="col-lg-9" >
      <div className="card mt-4 card-body">
        <h2>Pending Requests</h2>
        <span>&nbsp;</span>
        {
          ownUsers.length === 0 ? (
            <h4>There are currently no pending requests</h4>
          ) : (
            ownUsers.map(user => {
              const ownRequest = organizationRequests.find(request => request.userId === user.id && request.organizationId === organization.id);
              const { id, userId, organizationId } = ownRequest;
              return (
                ownRequest.status !== 'accepted' ? (
                  <div key={user.id}>
                    {user.fullName}
                    <button className="btn2 btn-danger btn-sm" style={{ float: 'right' }} onClick={() => deleteRequest(id)}>Delete Request</button>
                    <span style={{ float: 'right' }}>&nbsp;</span>
                    <button className="btn2 btn-warning btn-sm" style={{ float: 'right' }} disabled={requestStatus === 'declined'} onClick={() => decline(id, userId, organizationId)}>Decline</button>
                    <span style={{ float: 'right' }}>&nbsp;</span>
                    <button className="btn2 btn-info btn-sm" style={{ float: 'right' }} onClick={() => accept(id, userId, organizationId)}>Accept</button>
                    <br />
                    <br />
                  </div>
                ) : null
              )
            })
          )
        }
        

        
      </div>
      </div>
    );
  }
}

const mapState = ({ users, organizations, organizationRequests }, { organization }) => {
  const ownUsers = organizationRequests.reduce((memo, request) => {
    users.forEach(user => {
      if(request.organizationId === organization.id && request.userId === user.id) {
        if(!memo.includes(user)) {
          memo.push(user)
        }
      }
    })
    return memo;
  }, [])
  return {
    organization,
    ownUsers,
    organizationRequests
  }
}

const mapDispatch = dispatch => {
  return {
    createUserOrganization: (userOrg) => dispatch(createUserOrganizationOnServer(userOrg)),
    updateRequest: (orgReq) => dispatch(updateOrganizationRequestOnServer(orgReq)),
    deleteRequest: (id) => dispatch(deleteOrganizationRequestFromServer(id)),
  }
}

export default connect(mapState, mapDispatch)(OrganizationRequests)
