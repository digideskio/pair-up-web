import axios from 'axios';

const GET_ORGANIZATION_REQUESTS = 'GET_ORGANIZATION_REQUESTS';
const CREATE_ORGANIZATION_REQUEST = 'CREATE_ORGANIZATION_REQUEST';
const UPDATE_ORGANIZATION_REQUEST = 'UPDATE_ORGANIZATION_REQUEST';
const DELETE_ORGANIZATION_REQUEST = 'DELETE_ORGANIZATION_REQUEST';

const getOrganizationRequests = organizationRequests => ({ type: GET_ORGANIZATION_REQUESTS, organizationRequests });
export const createOrganizationRequest = organizationRequest => ({ type: CREATE_ORGANIZATION_REQUEST, organizationRequest });
const updateOrganizationRequest = organizationRequest => ({ type: UPDATE_ORGANIZATION_REQUEST, organizationRequest });
const deleteOrganizationRequest = id => ({ type: DELETE_ORGANIZATION_REQUEST, id });

export const getOrganizationRequestsFromServer = () => {
  return dispatch => {
    return axios.get('/api/organizationRequests')
      .then(result => result.data)
      .then(organizationRequests => dispatch(getOrganizationRequests(organizationRequests)));
  };
};

export const createOrganizationRequestOnServer = (organizationRequest) => {
  return dispatch => {
    return axios.post('/api/organizationRequests', organizationRequest)
      .then(result => result.data)
      .then(organizationRequest => dispatch(createOrganizationRequest(organizationRequest)));
  };
};

export const updateOrganizationRequestOnServer = (organizationRequest) => {
  const { id } = organizationRequest;
  return dispatch => {
    return axios.put(`/api/organizationRequests/${id}`, organizationRequest)
      .then(result => result.data)
      .then(organizationRequest => dispatch(updateOrganizationRequest(organizationRequest)));
  };
};

export const deleteOrganizationRequestFromServer = (id) => {
  return dispatch => {
    return axios.delete(`/api/organizationRequests/${id}`)
      .then(() => dispatch(deleteOrganizationRequest(id)))
  }
}

const store = (state = [], action) => {
  let organizationRequests;
  switch (action.type) {
    case GET_ORGANIZATION_REQUESTS:
      return action.organizationRequests;
    case CREATE_ORGANIZATION_REQUEST:
      return [ ...state, action.organizationRequest ];
    case UPDATE_ORGANIZATION_REQUEST:
      organizationRequests = state.filter(request => request.id !== action.organizationRequest.id)
      return [ ...organizationRequests, action.organizationRequest ];
    case DELETE_ORGANIZATION_REQUEST:
      organizationRequests = state.filter(request => request.id !== action.id)
      return organizationRequests;
    default:
      return state;
  }
};

export default store;
