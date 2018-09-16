import React from 'react';
import { connect } from 'react-redux';
import NotMaster from '../Master/NotMaster';

const CheckMaster = (Component) => {
  class AdminComponent extends React.Component {
    render() {
      const { user } = this.props
      return (
        <div>
          {
            user.userStatus === 'master' ?
              <Component {...this.props } />
              :
              <NotMaster />
          }
        </div>
      )
    }
  }

  const mapState = ({ user }) => {
    return { user }
  }

  return connect(mapState)(AdminComponent);
}

export default CheckMaster;