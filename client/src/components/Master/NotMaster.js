import React from 'react';
import { Link } from 'react-router-dom';

const NotMaster = () => {
  return (
    <div>
      <h3>You are not authorized to view this page.</h3>
      <Link to='/login'><button className='btn btn-info'>Back to Login</button></Link>
    </div>
  )
}

export default NotMaster;
