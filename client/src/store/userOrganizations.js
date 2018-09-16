import axios from 'axios';

const GET_USER_ORGANIZATIONS = 'GET_USER_ORGANIZATIONS';
const CREATE_USER_ORGANIZATION = 'CREATE_USER_ORGANIZATION';
const DELETE_USER_ORGANIZATION = 'DELETE_USER_ORGANIZATION';

const getUserOrganizations = userOrganizations => ({ type: GET_USER_ORGANIZATIONS, userOrganizations });
const createUserOrganization = userOrganization => ({ type: CREATE_USER_ORGANIZATION, userOrganization });
const deleteUserOrganization = id => ({ type: DELETE_USER_ORGANIZATION, id });

export const getUserOrganizationsFromServer = () => {
  return dispatch => {
    return axios.get('/api/userOrganizations')
      .then(result => result.data)
      .then(userOrganizations => dispatch(getUserOrganizations(userOrganizations)));
  };
};

export const createUserOrganizationOnServer = (userOrganization) => {
  // console.log('thunk:', userOrganization)
  return dispatch => {
    return axios.post('/api/userOrganizations', userOrganization)
      .then(result => result.data)
      .then(userOrganization => dispatch(createUserOrganization(userOrganization)))
  };
};

export const deleteUserOrganizationFromServer = (id) => {
  return dispatch => {
    return axios.delete(`/api/userOrganizations/${id}`)
      .then(() => dispatch(deleteUserOrganization(id)));
  };
};

const store = (state = [], action) => {
  let userOrganizations;
  switch (action.type) {
    case GET_USER_ORGANIZATIONS:
      return action.userOrganizations;
    case CREATE_USER_ORGANIZATION:
      return [ ...state, action.userOrganization ];
    case DELETE_USER_ORGANIZATION:
      userOrganizations = state.filter(userOrganization => userOrganization.id !== action.id)
      return userOrganizations;
    default:
      return state;
  }
};

export default store;
