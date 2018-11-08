/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFormOnServer } from '../../store';

class AddForm extends Component {
  constructor() {
    super();
    this.state = { name: '' };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  onSave(ev) {
    ev.preventDefault();
    const { createForm, organization: { id }} = this.props;
    const { name } = this.state;
    createForm({ name, organizationId: id });
    this.setState({ name: '' });
  }

  render() {
    const { onChange, onSave } = this;
    const { name } = this.state;
    return (
      <div className="row">
        <div className="form-group col-md-6">
          <input name='name' value={name} onChange={onChange} className="form-control"></input>
        </div>
        <div className="col-md-4">
          <button className="field" onClick={onSave} className="btn btn-info">Add Category</button>
        </div>
      </div>
    );
  }
}

const mapState = ({ users }, { organization }) => {
  return { users, organization }
}

const mapDispatch = dispatch => {
  return {
    createForm: (form) => dispatch(createFormOnServer(form))
  }
}

export default connect(mapState, mapDispatch)(AddForm);
