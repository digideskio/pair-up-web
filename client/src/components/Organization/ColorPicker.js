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
    // this.handleTextChange = this.handleTextChange.bind(this);
    this.toggleColors = this.toggleColors.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    const { organization: { backgroundColor, textColor } } = this.props;
    this.setState({ backgroundColor, textColor });
  }

  handleColorChange(ev) {
    // const { hex, target: { name } } = ev;
    const { toggle } = this.state;
    this.setState({ [toggle]: ev.hex });
  }

  // handleTextChange(ev) {
  //   this.setState({ textColor: ev.target.value });
  // }

  toggleColors(ev) {
    const { value } = ev.target;
    // const { backgroundColor, textColor } = this.state;
    this.setState({ toggle: value });
    // if(value === 'bg') return backgroundColor;
    // else if(value === 'text') return textColor;
  }

  onSave(ev) {
    ev.preventDefault();
    const { createOrUpdateOrganization, organization: { id } } = this.props;
    const { backgroundColor, textColor } = this.state;
    createOrUpdateOrganization({ id, backgroundColor, textColor });
  }

  render() {
    const { handleColorChange, toggleColors, handleTextChange, onSave } = this;
    const { backgroundColor, textColor, toggle } = this.state;
    const toggled = toggle === 'backgroundColor' ? backgroundColor : textColor;
    console.log('toggle:', this.state.toggle)
    console.log('backgroundColor:', backgroundColor)
    console.log('textColor:', textColor)
    console.log('--------')
    return (
      <div>

        <h2>App's Background Color</h2>

        <SwatchesPicker
          // name={toggle}
          value={toggled}
          onChangeComplete={handleColorChange}
        />
        <br />

        <div>
          <select onChange={toggleColors} value={toggle} className="ui selection dropdown" style={{marginBottom: '10px'}}>
            <option value='backgroundColor'>Background Color</option>
            <option value='textColor'>Text Color</option>
          </select>
        </div>

        {/* <div>
          <button onClick={onSave} style={{ background: backgroundColor, color: textColor }} className="btn">
            Save New Color Scheme
          </button>
        </div>

 <br /> */}
        {/* <h2>App's Text Color</h2> */}

        {/* <div>
          <select onChange={handleTextChange} value={textColor} className="ui selection dropdown" style={{marginBottom: '10px'}}>
            <option value='#000000'>Black</option>
            <option value='#fff'>White</option>
            <option value='#969696'>Grey</option>
          </select>
        </div> */}

        <div>
          <button onClick={onSave} style={{ background: backgroundColor, color: textColor }} className="btn">
            Save New Color Scheme
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
