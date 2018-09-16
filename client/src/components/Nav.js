import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store'

const Nav = ({ user, loggedIn, logout, orgId }) => {
  const url = location.hash.slice(1)
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-color fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">Pair Up!</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
      {
        loggedIn ? (
          <div>
            {
              user.userStatus === 'admin' ?
                user.organizationId ?
                (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={`/organizations/${orgId}/users`}>My Dashboard</Link>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" onClick={logout}>Log out</a>
                  </li>
                </div>
                )
                : (
                  <div>
                    <span>
                      <Link className="nav-item" to={`/organizations/create`}>Create Organization</Link>
                    </span>
                  </div>
                )
              : null
            }
          </div>
        ) : (
          <span className="active blue item">
            <Link to='/login'>Log In</Link>
          </span>
        )
      }
                  </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapState = ({ user, userOrganizations, logout }) => {
  const loggedIn = !!user.id;
  const orgId = user.organizationId;
  return { user, loggedIn, orgId }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Nav)
