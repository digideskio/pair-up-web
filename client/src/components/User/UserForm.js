/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../../store';
import { withRouter } from 'react-router-dom';

class UserForm extends Component {
    constructor(props) {
      super(props);
      const { user } = this.props;
      this.state = {
        id: user ? user.id : undefined,
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        email: user ? user.email : '',
        password: user ? user.password : '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSave = this.onSave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      const { user } = nextProps;
      if (user.id) {
        const { id, firstName, lastName, email, password } = user
        this.setState({ id, firstName, lastName, email, password })
      }
    }

    onChange(ev) {
      const change = {}
      change[ev.target.name] = ev.target.value
      this.setState(change);
    }

    onSave(ev) {
      ev.preventDefault();
      const { updateUser, user } = this.props;
      const { id, firstName, lastName, email, password } = this.state
      updateUser({ id, firstName, lastName, email, password }, user.orgId);
    }

    render() {
      const { onChange, onSave } = this;
      const fields = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        password: 'Password'
      }
      return (
        <div>
          {
            Object.keys(fields).map(field => (
              <div key={field} className="form-group col-md-6">
                <label>{fields[field]}</label>
                <input
                  className="form-control"
                  name={field}
                  onChange={onChange}
                  value={this.state[field]}
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text' }
                />
              </div>
            ))
          }
          <button style={{'marginLeft':'15px'}} className="btn btn-info" onClick={onSave}>Save</button>
        </div>
      )
    }
  }

  const mapState = ({ user }) => {
    return { user }
  }

  const mapDispatch = (dispatch, { history }) => {
    return {
      updateUser: (user) => dispatch(updateUserOnServer(user, history))
    }
  }

  export default withRouter(connect(mapState, mapDispatch)(UserForm));
