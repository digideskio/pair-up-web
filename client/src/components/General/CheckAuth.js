import React from 'react';
import { connect } from 'react-redux';

const CheckAuth = (Component) => {
  class AuthComponent extends React.Component {
    componentDidMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      const { isAuthenticated } = this.props;
      if(!isAuthenticated) {
        location.hash = '/login';
      }
    }

    render() {
      const { isAuthenticated } = this.props;
      return (
        <div>
          { isAuthenticated ? <Component { ...this.props } /> : null }
        </div>
      );
    }
  }

  const mapState = ({user}) => {
    const token = window.localStorage.getItem('token');
    // const isAuthenticated = token && user.userStatus !== 'user' ? true : false;
    const isAuthenticated = token && user.userStatus !== 'user';
    return { isAuthenticated }
  }

  return connect(mapState)(AuthComponent);
}

export default CheckAuth;
