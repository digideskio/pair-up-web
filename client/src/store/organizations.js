import axios from 'axios';

const GET_ORGANIZATIONS = 'GET_ORGANIZATIONS';
const CREATE_ORGANIZATION = 'CREATE_ORGANIZATION';
const UPDATE_ORGANIZATION = 'UPDATE_ORGANIZATION';
const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION';

const getOrganizations = organizations => ({ type: GET_ORGANIZATIONS, organizations });
const createOrganization = organization => ({ type: CREATE_ORGANIZATION, organization });
const updateOrganization = organization => ({ type: UPDATE_ORGANIZATION, organization });
const deleteOrganization = id => ({ type: DELETE_ORGANIZATION, id });

export const getOrganizationsFromServer = () => {
  return dispatch => {
    return axios.get('/api/organizations')
      .then(result => result.data)
      .then(organizations => dispatch(getOrganizations(organizations)));
  };
};

export const updateOrganizationOnServer = (organization) => {
  const { id } = organization;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/organizations/${id}` : '/api/organizations';
  const action = id ? updateOrganization : createOrganization;
  return dispatch => {
    return axios[method](url, organization)
      .then(result => result.data)
      .then(organization => {
        dispatch(action(organization));
        return organization;
      })
  };
};

export const deleteOrganizationFromServer = (id, history) => {
  return dispatch => {
    return axios.delete(`/api/organizations/${id}`)
      .then(() => dispatch(deleteOrganization(id)))
      .then(() => history.push('/organizations'))
  };
};

const store = (state = [], action) => {
  let organizations;
  switch (action.type) {
    case GET_ORGANIZATIONS:
      return action.organizations;
    case CREATE_ORGANIZATION:
      return [ ...state, action.organization ];
    case UPDATE_ORGANIZATION:
      organizations = state.filter(org => org.id !== action.organization.id);
      return [ ...organizations, action.organization ];
    case DELETE_ORGANIZATION:
      organizations = state.filter(org => org.id !== action.id);
      return organizations;
    default:
      return state;
  }
};

export default store;

