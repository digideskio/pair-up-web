import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';

class TextColor extends Component {
  constructor(props) {
    super(props);
    const { organization } = props;
    this.state = {
      textColor: organization ? organization.textColor : '#000000'
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { textColor } = nextProps;
    this.setState(textColor);
  }

  handleChange(ev) {
    this.setState({ textColor: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();
    const { createOrUpdateOrganization, organization } = this.props;
    const { id, name, organization_type, address, city, state, zip, contact_name, contact_phone, image, backgroundColor } = organization;
    const { textColor } = this.state;
    createOrUpdateOrganization({ id, name, organization_type, address, city, state, zip, contact_name, contact_phone, image, backgroundColor, textColor });
  }

  render() {
    const { handleChange, onSave } = this;
    const { organization } = this.props
    const { textColor } = this.state;
    const colors = { Black: '#000000', White: '#fff', Grey: '#969696' }
    return (
      <div>
        <div>
          <select onChange={handleChange} value={textColor} className="ui selection dropdown" style={{marginBottom: '10px'}}>
            <option value='#000000'> Black </option>
            <option value='#fff'> White </option>
            <option value='#969696'> Grey </option>
          </select>
        </div>
        <div>
          <button onClick={onSave} style={{ background: organization.backgroundColor, color: textColor }} className="btn">
            Save Text Color
          </button>
        </div>
      </div>
    );
  }
}

const mapState = (state, { organization }) => {
  return { organization }
}

const mapDispatch = (dispatch) => {
  return {
    createOrUpdateOrganization: (organization) => dispatch(updateOrganizationOnServer(organization))
  }
}

export default connect(mapState, mapDispatch)(TextColor);
