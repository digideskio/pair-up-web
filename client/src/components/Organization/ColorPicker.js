import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwatchesPicker } from 'react-color';
import { updateOrganizationOnServer } from '../../store';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    const { organization } = props;
    this.state = {
      backgroundColor: organization ? organization.backgroundColor : '#fff'
    }
    this.handleColorChange = this.handleColorChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  handleColorChange(ev) {
    this.setState({backgroundColor: ev.hex});
  }

  onSave(ev) {
    ev.preventDefault();
    const { createOrUpdateOrganization, organization } = this.props;
    const { id, name, organization_type, address, city, state, zip, contact_name, contact_phone, image, textColor, latitude, longitude } = organization;
    const { backgroundColor } = this.state;
    createOrUpdateOrganization({ id, name, organization_type, address, city, state, zip, contact_name, contact_phone, image, textColor, backgroundColor, latitude, longitude });
  }

  render() {
    const { handleColorChange, onSave } = this;
    const { organization } = this.props
    const { backgroundColor } = this.state;
    return (
      <div>
        <SwatchesPicker
          name='backgroundColor' value={backgroundColor}
          onChangeComplete={this.handleColorChange}
        />
        <br />
        <div>
          <button className="btn" onClick={onSave} style={{ background: backgroundColor, color: organization.textColor }}>
            Save Background Color
          </button>
        </div>
      </div>
    )
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

export default connect(mapState, mapDispatch)(ColorPicker);
