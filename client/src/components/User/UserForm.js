/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../../store';
import { withRouter } from 'react-router-dom';

class UserForm extends Component {
    constructor() {
      super();
      this.state = {
        id: undefined,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }
      this.onChange = this.onChange.bind(this);
      this.onSave = this.onSave.bind(this);
    }

    componentDidMount() {
      console.log(this.props.id)
      const { user: { id, firstName, lastName, email, password } } = this.props;
      this.setState({ id, firstName, lastName, email, password });
    }

    componentWillReceiveProps(nextProps) {
      const { user } = nextProps;
      if (user.id) {
        const { id, firstName, lastName, email, password } = user;
        this.setState({ id, firstName, lastName, email, password });
      }
    }

    onChange(ev) {
      const { name, value } = ev.target;
      this.setState({ [name]: value });
    }

    onSave(ev) {
      ev.preventDefault();
      const { updateUser, user } = this.props;
      const { id, firstName, lastName, email, password } = this.state;
      updateUser({ id, firstName, lastName, email, password }, user.orgId); // what is this second argument doing?
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
              <div key={field} className='form-group col-md-6'>
                <label>{fields[field]}</label>
                <input
                  className='form-control'
                  name={field}
                  placeholder={fields[field]}
                  onChange={onChange}
                  value={this.state[field]}
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                />
              </div>
            ))
          }
          <button style={{ marginLeft: '15px' }} className='btn btn-info' onClick={onSave}>Save</button>
        </div>
      )
    }
  }

  const mapState = (state, { user }) => {
    return { user }
  }

  const mapDispatch = (dispatch, { history }) => {
    return {
      updateUser: (user) => dispatch(updateUserOnServer(user, history))
    }
  }

  export default withRouter(connect(mapState, mapDispatch)(UserForm));
