/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { createUserOrganizationOnServer } from '../../store';

class AddUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      findUser: null,
      errormessage: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSearch = this.onSearch.bind(this)
  }

  // componentWillReceiveProps(nextProps) {
  //   const { user } = nextProps;
  //   if (user.id) {
  //     const { id, firstName, lastName, email, password } = user
  //     this.setState({ id, firstName, lastName, email, password })
  //   }
  // }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change);
  }

  onSearch(ev) {
    const findUser = this.props.users.find(user => user.email === this.state.email)
    if (findUser) { this.setState({ findUser: findUser }); }
    else { this.setState({ errormessage: true }) }
  }

  onSave(ev) {
    ev.preventDefault()
    const { createUserOrganization, organization } = this.props;
    const { findUser } = this.state;
    createUserOrganization({ userId: findUser.id, organizationId: organization.id });
    this.setState({ errormessage: false, findUser: null });
  }

  render() {
    const { onChange, onSave, onSearch } = this;
    const { user, users, organization } = this.props
    const { email, findUser, errormessage } = this.state;
    return (

      <div className="row">
        <div className="form-group col-md-6">
          <input name='email' value={email} onChange={onChange} className="form-control"></input>
        </div>
        <div className="col-md-4">
          <button onClick={onSearch} className='btn btn-info'>Search by email</button>
        </div>

        {/* <button onClick={onSave}>Save</button> */}
        {findUser ? <span style={{ paddingLeft: '1.25em' }}>{findUser.fullName + '  '}<button onClick={onSave} className='btn2 btn-info btn-sm'>Add {findUser.firstName}</button></span> : errormessage ? <p style={{ paddingLeft: '1.25em' }}>Can't find this user</p> : null}
      </div>

    )
  }
}

const mapState = ({ user, users }, { organization }) => {
  return { users, organization }
}

const mapDispatch = (dispatch) => {
  return {
    createUserOrganization: (userOrganization) => dispatch(createUserOrganizationOnServer(userOrganization))
  }
}

export default connect(mapState, mapDispatch)(AddUserForm);
