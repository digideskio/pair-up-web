import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserFromServer } from '../../store';

import UserForm from './UserForm';

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value })
  }

  render() {
    const { users, deleteUser, count, pluralize } = this.props
    const { name } = this.state
    const { onChange } = this
    const matchingUsers = users.reduce((memo, user) => {
      const lowerFirst = user.firstName.toLowerCase()
      const lowerLast = user.lastName.toLowerCase()
      const lowerName = name.toLowerCase()
      if (lowerFirst.match(lowerName) || lowerLast.match(lowerName)) memo.push(user)
      return memo
    }, [])

    return (
      <div className="org-background">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" >
              <div className="card mt-4 card-body">
                <h2>Users</h2>
                <h4>Add a User</h4>
                <UserForm />
                <hr />
                <input className="form-control" onChange={onChange} value={name} placeholder="Search for a user" />
                <ol style={{ type: 1 }} className="list-group list-group-flush">
                  <h4 style={{ 'marginTop': '20px' }}>There {pluralize[0]} currently {count} User{pluralize[1]}:</h4>
                  {
                    matchingUsers.map(user => (
                      <li key={user.id} className="list-group-item">
                        {user.fullName}
                        <button className="btn2 btn-danger btn-sm" style={{ float: 'right' }} onClick={() => deleteUser(user.id)}>Delete user</button>
                        <span style={{ float: 'right' }}>&nbsp;</span>
                        <Link to={`/users/${user.id}`}><button className="btn2 btn-info btn-sm" style={{ float: 'right' }}>Edit user</button></Link>
                      </li>
                    ))
                  }
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ users }) => {
  const count = users.length;
  const pluralize = count === 1 ? ['is', ''] : ['are', 's']
  return { users, count, pluralize }
}

const mapDispatch = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUserFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(Users);
