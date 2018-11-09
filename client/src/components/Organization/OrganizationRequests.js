import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationRequestOnServer, deleteOrganizationRequestFromServer, createUserOrganizationOnServer } from '../../store';

import OrgNav from './OrgNav';

const instructions = [
  'Here, you can choose to accept, decline, or delete a users request to join your organization.',
  'Choose your own criteria to make this decision. You can cross reference your ond database to make sure this user is a member.'
];

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
    const { ownUsers, id, organizationRequests, deleteRequest } = this.props;
    const { accept, decline } = this;
    const { requestStatus } = this.state;
    return (
      <div className='org-background'>
        <div className='container'>
          <div className='row'>
            <OrgNav id={id} />
            <div className='col-lg-9'>
              <div className='card mt-4 card-body'>
                <h2>Pending Requests</h2>
                { instructions.map((line, i) => <p key={i} style={{ fontSize: '11pt'}}>{line}</p>) }
                {
                  ownUsers.length === 0 ? (
                    <h4>There are currently no pending requests</h4>
                  ) : (
                    ownUsers.map((user, index, array) => {
                      const ownRequest = organizationRequests.find(request => request.userId === user.id && request.organizationId === id);
                      const { id: reqId, userId, organizationId } = ownRequest;
                      const floatBtn = { float: 'right', margin: '2px' };
                      const bgColor = index % 2 === 0 ? '#F5F5F5' : 'white';
                      return (
                        ownRequest.status !== 'accepted' ? (
                          <div key={user.id} style={{ padding: '5px 15px', backgroundColor: bgColor }}>
                          <div>
                            {user.fullName}
                            <button className='btn2 btn-danger btn-sm' style={floatBtn} onClick={() => deleteRequest(id)}>
                              Delete Request
                            </button>
                            <button className='btn2 btn-warning btn-sm' style={floatBtn} disabled={requestStatus === 'declined'} onClick={() => decline(reqId, userId, organizationId)}>
                              Decline
                            </button>
                            <button className='btn2 btn-info btn-sm' style={floatBtn} onClick={() => accept(reqId, userId, organizationId)}>
                              Accept
                            </button>
                            </div>
                          </div>
                        ) : null
                      )
                    })
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ users, organizations, organizationRequests }, { id }) => {
  const ownUsers = organizationRequests.reduce((memo, request) => {
    users.forEach(user => {
      if(request.organizationId === id && request.userId === user.id) {
        if(!memo.includes(user)) {
          memo.push(user)
        }
      }
    })
    return memo;
  }, [])
  return {
    id,
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
