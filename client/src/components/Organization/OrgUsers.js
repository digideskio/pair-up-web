import React from 'react';
import { connect } from 'react-redux';
import { deleteUserOrganizationFromServer } from '../../store';
import AddUserForm from '../User/AddUserForm';
import { Link } from 'react-router-dom';

import OrgNav from './OrgNav';

const instructions = [
  'This is a list of all the members that belong to your organization. You can remove members, or you can edit their info if they need a new password.'
];

const OrgUsers = ({ organization, id, ownUsers, removeUser, userOrganizations }) => {
  if (!organization) return null
  var orgId = id;
  return (
    <div className="org-background">
      <div className="container">
        <div className="row">
          <OrgNav id={orgId} />
          <div className="col-lg-9" >
            <div className="card mt-4 card-body">
              <h2>{organization.name}: Members</h2>
              { instructions.map((line, i) => <p key={i} style={{ fontSize: '11pt'}}>{line}</p>) }
              <ul className="list-group list-group-flush">
                {
                  ownUsers.length === 0 ? (
                    <h4>There are currently no members</h4>
                  ) : (
                    ownUsers.map(user => (
                      <li className="list-group-item" key={user.id}>
                        {user.fullName}
                        <Link to={`/users/${user.id}`}>
                          <button className="btn2 btn-info btn-sm" style={{ float: 'right' }}>
                            Edit
                          </button>
                        </Link>
                        <span style={{ float: 'right' }}>&nbsp;</span>
                        <button className="btn2 btn-warning btn-sm" style={{ float: 'right' }} onClick={() => removeUser(user.id, organization.id, userOrganizations)}>
                          Remove
                        </button>
                      </li>
                    ))
                  )
                }
              </ul>
              <AddUserForm organization={organization}/>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const mapState = ({ organizations, users, userOrganizations }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const ownUsers = userOrganizations.reduce((memo, userOrg) => {
    const user = users.find(user => user.id === userOrg.userId && id === userOrg.organizationId)
    if (!memo.includes(user) && user) {
      memo.push(user)
    }
    return memo;
  }, [])
  return { organization, ownUsers, userOrganizations }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    removeUser: (userId, organizationId, userOrgs) => {
      const userOrg = userOrgs.find(userOrg => userOrg.userId === userId && userOrg.organizationId === organizationId)
      dispatch(deleteUserOrganizationFromServer(userOrg.id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrgUsers);
