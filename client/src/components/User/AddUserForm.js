/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUserOrganizationOnServer } from '../../store';

class AddUserForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      findUser: null,
      errorMessage: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  onSearch(ev) {
    ev.preventDefault();
    const { users } = this.props;
    const { email } = this.state;
    const findUser = users.find(user => user.email === email);
    if (findUser) {
      this.setState({ findUser });
    } else {
      this.setState({ errorMessage: true });
    }
    this.setState({ email: '' });
  }

  onSave(ev) {
    ev.preventDefault()
    const { createUserOrganization, organization } = this.props;
    const { findUser } = this.state;
    createUserOrganization({ userId: findUser.id, organizationId: organization.id });
    this.setState({ errorMessage: false, findUser: null });
  }

  render() {
    const { onChange, onSave, onSearch } = this;
    const { email, findUser, errorMessage } = this.state;
    return (
      <div className='row' style={{ marginTop: '20px' }}>
        <div className='form-group col-md-6'>
          <input placeholder='Enter Email' name='email' value={email} onChange={onChange} className='form-control'></input>
        </div>
        <div className='col-md-4'>
          <button onClick={onSearch} className='btn btn-info'>Search by email</button>
        </div>
        {
          findUser ? (
            <span style={{ marginLeft: '1.25em' }}>
              {findUser.fullName}
              <button onClick={onSave} style={{ marginLeft: '10px'}} className='btn2 btn-info btn-sm'>
                Add {findUser.firstName}
              </button>
            </span>
          ) : (
            errorMessage &&
              <p style={{ paddingLeft: '1.25em' }}>Sorry, we can't find this user. Please try again.</p>
          )
        }
      </div>

    )
  }
}

const mapState = ({ users }, { organization }) => {
  return { users, organization }
}

const mapDispatch = (dispatch) => {
  return {
    createUserOrganization: (userOrganization) => dispatch(createUserOrganizationOnServer(userOrganization))
  }
}

export default connect(mapState, mapDispatch)(AddUserForm);
