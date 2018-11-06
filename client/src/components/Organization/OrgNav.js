import React from 'react';
import { Link } from 'react-router-dom';

const isActive = (id, page) => {
  let active = '';
  const url = location.hash.slice(1);
  if(url === `/organizations/${id}/${page}`) {
    active = ' active';
  }
  return active;
}

const OrgNav = ({ id }) => {
  return (
    <div className='col-lg-3'>
      <h3 className='my-4'></h3>
      <div className='list-group'>
        <Link
          to={`/organizations/${id}/users`}
          className={`list-group-item${isActive(id, 'users')}`}
        >
          Manage Members
        </Link>
        <Link
          to={`/organizations/${id}/requests`}
          className={`list-group-item${isActive(id, 'requests')}`}
        >
          Manage Requests
        </Link>
        <Link
          to={`/organizations/${id}/customize`}
          className={`list-group-item${isActive(id, 'customize')}`}
        >
          Customize My Page
        </Link>
        <Link
          to={`/organizations/${id}/account`}
          className={`list-group-item${isActive(id, 'account')}`}
        >
          Account Details
        </Link>
      </div>
    </div>
  );
}

export default OrgNav;