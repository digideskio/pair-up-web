import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Welcome = ({user, orgId, loggedIn}) => {
  // if (!loggedIn) { return  <Redirect to='/login' /> }
  return (
    <div>
      {user.userStatus === 'admin'?
      user.organizationId ?
      (
      <div>
      <h3>Welcome {user.firstName} to Pair Up!</h3>
      </div>
    ) : (
      <div>
      <h3>Welcome {user.firstName} to Pair Up!</h3>
      <button className="large ui primary basic button"><Link to={`/organizations/create`}>Click to Create Your Organization!</Link></button>
      </div>
    )
     : null
      }
    </div>
  )
}

const mapState = ({ user, userOrganizations}) => {
  const loggedIn = !!user.id;
  const entry = loggedIn && userOrganizations.find( (ent) => {
    return ent.userId === user.id
  });
  const orgId = entry && entry.organizationId;
  return { user, loggedIn, orgId }
}


export default connect(mapState, null)(Welcome)
