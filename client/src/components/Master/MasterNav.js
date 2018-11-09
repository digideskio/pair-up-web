import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store'

const MasterNav = ({ user, isMaster, logout }) => {
  const url = location.hash.slice(1)
  return (
    <div>
      {
        isMaster ? (
          <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-color fixed-top'>
              <div className='container'>
                <a className='navbar-brand' href='#'>Pair Up!</a>
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarResponsive' aria-controls='navbarResponsive' aria-expanded='false' aria-label='Toggle navigation'>
                  <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarResponsive'>
                  <ul className='navbar-nav ml-auto'>
                    <div className='navbar-nav ml-auto'>

                      <li className='nav-item'>
                        <Link className='nav-link' to='/organizations'>Organizations</Link>
                      </li>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/users'>Users</Link>
                      </li>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/master/organizationRequests'>Organization Requests</Link>
                      </li>
                      <li className='nav-item'>
                        <Link className='nav-link' to='/master/userRequests'>User Requests</Link>
                      </li>
                      <li className='nav-item'>
                        <a className='nav-link' onClick={logout}>Log out</a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

        ) : null
      }
    </div>
  );
}


const mapState = ({ user }) => {
  const isMaster = user.userStatus === 'master'
  return { user, isMaster }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(MasterNav)
