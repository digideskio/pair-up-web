import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SwatchesPicker } from 'react-color';
import { updateOrganizationOnServer } from '../../store';

class ColorPicker extends Component {
  constructor() {
    super();
    this.state = {
      backgroundColor: '#fff',
      textColor: '#000000',
      toggle: 'backgroundColor'
    }
    this.handleColorChange = this.handleColorChange.bind(this);
    this.toggleColors = this.toggleColors.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const { organization: { backgroundColor, textColor } } = this.props;
    this.setState({ backgroundColor, textColor });
  }

  handleColorChange(ev) {
    const { hex } = ev;
    const { toggle } = this.state;
    this.setState({ [toggle]: hex });
  }

  toggleColors(ev) {
    const { value } = ev.target;
    this.setState({ toggle: value });
  }

  onSave(ev) {
    ev.preventDefault();
    const { createOrUpdateOrganization, organization: { id } } = this.props;
    const { backgroundColor, textColor } = this.state;
    createOrUpdateOrganization({ id, backgroundColor, textColor });
  }

  render() {
    const { handleColorChange, toggleColors, onSave } = this;
    const { backgroundColor, textColor, toggle } = this.state;
    const toggled = toggle === 'backgroundColor' ? backgroundColor : textColor;
    return (
      <div>
        <h2>Select Your Color Theme</h2>
        <h4>This will appear on your mobile page</h4>
        <div className="row">
          <div className="col-md-6">
            <SwatchesPicker
              value={toggled}
              onChangeComplete={handleColorChange}
            />
          </div>
          <div className="form-group col-md-5">
            <select onChange={toggleColors} value={toggle} className="ui selection dropdown form-control" style={{ marginBottom: '10px' }}>
              <option value='backgroundColor'>Background Color</option>
              <option value='textColor'>Text Color</option>
            </select>
            <button onClick={onSave} style={{ background: backgroundColor, color: textColor }} className="btn">
              Save New Color Scheme
            </button>
          </div>
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
