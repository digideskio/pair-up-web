import axios from 'axios';

const GET_USER_REQUESTS = 'GET_USER_REQUESTS';
const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';

const getUserRequests = (userRequests) => ({ type: GET_USER_REQUESTS, userRequests });
export const deleteUserRequest = (id) => ({ type: DELETE_USER_REQUEST, id });

export const getUserRequestsFromServer = () => {
  return dispatch => {
    return axios.get('/api/userRequests')
      .then(result => result.data)
      .then(userRequests => dispatch(getUserRequests(userRequests)))
  }
}

export const deleteUserRequestFromServer = (id) => {
  console.log(id)
  return dispatch => {
    return axios.delete(`/api/userRequests/${id}`)
      .then(() => dispatch(deleteUserRequest(id)))
  }
}

const store = (state = [], action) => {
  let userRequests;
  switch(action.type) {
    case GET_USER_REQUESTS:
      return action.userRequests;
    case DELETE_USER_REQUEST:
      userRequests = state.filter(request => request.id !== action.id);
      return userRequests;
    default:
      return state;
  }
}

export default store;
