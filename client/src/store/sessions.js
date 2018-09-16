import axios from 'axios';
import socket from './sockets';

const GOT_USER = 'GOT_USER';
const gotUser = user => ({ type: GOT_USER, user });

export const attemptLogin = (credentials, history) => {
  return dispatch => {
    return axios.post('/api/sessions', credentials)
      .then(result => result.data)
      .then(token => {
        window.localStorage.setItem('token', token);
        return token;
      })
      .then(token => dispatch(getUserFromToken(token, history)))
      .catch(err => {
        // window.localStorage.removeItem('token');
        return err;
      });
  };
};

export const signup = (userInfo, history) => {
  return dispatch => {
    return axios.post('/api/sessions/signup', userInfo)
      .then(result => result.data)
      .then(token => {
        window.localStorage.setItem('token', token);
        return token;
      })
      .then(token => dispatch(getUserFromToken(token)))
      .then(() => history.push('/organizations/create'))
      .catch(err => {
        // window.localStorage.removeItem('token');
        return err;
      })
  }
}

export const getUserFromToken = (token, history) => {
  return dispatch => {
    return axios.get(`/api/sessions/${token}`)
      .then(result => result.data)
      .then(user => {
        dispatch(gotUser(user));
        if(user.organizationId) {
          socket.emit('webAppOnline', user.organizationId);
          if(history) {
            history.push(`/organizations/${user.organizationId}/users`);
          }
        }
      })
      .catch(err => {
        window.localStorage.removeItem('token');
        return err;
      });
  };
};

export const updateUserOrganizationId = (userId, organizationId) => {
  return dispatch => {
    return axios.post(`/api/sessions/${userId}/organizations/${organizationId}`)
      .then(result => result.data)
      .then(user => dispatch(gotUser(user)));
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('token');
    dispatch(gotUser({}));
    location.hash='/login'
  }
}

const store = (state = {}, action) => {
  switch (action.type) {
  case GOT_USER:
    return action.user;
  default:
    return state;
  }
};

export default store;
