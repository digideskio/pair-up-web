import axios from 'axios';

const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

const getUsers = users => ({ type: GET_USERS, users });
const createUser = user => ({ type: CREATE_USER, user });
export const updateUser = user => ({ type: UPDATE_USER, user });
const deleteUser = id => ({ type: DELETE_USER, id });

export const getUsersFromServer = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(result => result.data)
      .then(users => dispatch(getUsers(users)));
  };
};

export const updateUserOnServer = (user) => {
  const { id } = user;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/users/${id}` : '/api/users';
  const action = id ? updateUser : createUser;
  return dispatch => {
    return axios[method](url, user)
      .then(result => result.data)
      .then(user => dispatch(action(user)))
  };
};

export const deleteUserFromServer = (id) => {
  return dispatch => {
    return axios.delete(`/api/users/${id}`)
      .then(() => dispatch(deleteUser(id)));
  };
};

const store = (state = [], action) => {
  let users;
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case CREATE_USER:
      return [ ...state, action.user ];
    case UPDATE_USER:
      users = state.filter(user => user.id !== action.user.id)
      return [ ...users, action.user ];
    case DELETE_USER:
      users = state.filter(user => user.id !== action.id)
      return users;
    default:
      return state;
  }
};

export default store;
