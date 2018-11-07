import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwatchesPicker } from 'react-color';
import { updateOrganizationOnServer } from '../../store';

class ColorPicker extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: '#fff'
    }
    this.handleColorChange = this.handleColorChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const { organization: { backgroundColor } } = this.props;
    this.setState({ backgroundColor });
  }

  handleColorChange(ev) {
    this.setState({backgroundColor: ev.hex});
  }

  onSave(ev) {
    ev.preventDefault();
    const { createOrUpdateOrganization, organization: { id } } = this.props;
    const { backgroundColor } = this.state;
    createOrUpdateOrganization({ id, backgroundColor });
  }

  render() {
    const { handleColorChange, onSave } = this;
    const { organization: { textColor } } = this.props
    const { backgroundColor } = this.state;
    return (
      <div>
        <SwatchesPicker
          name='backgroundColor' value={backgroundColor}
          onChangeComplete={handleColorChange}
        />
        <br />
        <div>
          <button className="btn" onClick={onSave} style={{ background: backgroundColor, color: textColor }}>
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
