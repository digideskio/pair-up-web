import axios from 'axios';

const GET_FORMS = 'GET_FORMS';
const CREATE_FORM = 'CREATE_FORM'
const DELETE_FORM = 'DELETE_FORM'

const getForms = forms => ({ type: GET_FORMS, forms });
const createForm =form=>({ type: CREATE_FORM, form })
const deleteForm =id=>({ type: DELETE_FORM, id })

export const getFormsFromServer = () => {
  return dispatch => {
    return axios.get('/api/forms')
      .then(result => result.data)
      .then(forms => dispatch(getForms(forms)));
  };
};

export const createFormOnServer = (form) => {
  return dispatch => {
    return axios.post('/api/forms', form)
      .then(result => result.data)
      .then(form => dispatch(createForm(form)))
  };
};

export const deleteFormFromServer = (id) => {
  return dispatch => {
    return axios.delete(`/api/forms/${id}`)
      .then(() => dispatch(deleteForm(id)));
  };
};

const store = (state = [], action) => {
  let forms;
  switch (action.type) {
    case GET_FORMS:
      return action.forms;
    case CREATE_FORM:
      return [ ...state, action.form ];
    case DELETE_FORM:
      forms = state.filter(form => form.id !== action.id)
      return forms;
    default:
      return state;
  }
};

export default store;
