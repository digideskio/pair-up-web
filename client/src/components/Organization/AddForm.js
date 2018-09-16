/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { createUserOrganizationOnServer, createFormOnServer } from '../../store';

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault()
    const { createForm } = this.props;
    const name = this.state.name;
    const organizationId = this.props.organization.id;
    createForm({ name: name, organizationId: organizationId });
    this.setState({ name: '' });
  }

  render() {
    const { onChange, onSave } = this;
    const { organization } = this.props
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
    )
  }
}

const mapState = ({ users }) => {
  return { users }
}

const mapDispatch = dispatch => {
  return {
    createForm: (form) => dispatch(createFormOnServer(form))
  }
}

export default connect(mapState, mapDispatch)(AddForm);
