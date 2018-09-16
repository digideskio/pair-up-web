import React from 'react';
import { connect } from 'react-redux';

const CheckAuth = (Component) => {
  class AuthComponent extends React.Component {
    componentDidMount() {
      this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.isAuthenticated) location.hash = '/login'
    }

    render() {
      const { isAuthenticated } = this.props
      return (
        <div>{ isAuthenticated ? <Component {...this.props} /> : null }</div>
      )
    }
  }

  const mapState = ({user}) => {
    const token = window.localStorage.getItem('token')
    const isAuthenticated = token && user.userStatus !== 'user' ? true : false
    // console.log(isAuthenticated)
    return { isAuthenticated }
  }

  return connect(mapState)(AuthComponent);
}

export default CheckAuth;
