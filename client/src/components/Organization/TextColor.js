import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';

class TextColor extends Component {
  constructor() {
    super();
    this.state = {
      textColor: '#000000'
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount() {
    const { organization: { textColor } } = this.props;
    this.setState({ textColor });
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
    const { createOrUpdateOrganization, organization: { id } } = this.props;
    const { textColor } = this.state;
    createOrUpdateOrganization({ id, textColor });
  }

  render() {
    const { handleChange, onSave } = this;
    const { organization: { backgroundColor } } = this.props
    const { textColor } = this.state;
    return (
      <div>
        <div>
          <select onChange={handleChange} value={textColor} className="ui selection dropdown" style={{marginBottom: '10px'}}>
            <option value='#000000'>Black</option>
            <option value='#fff'>White</option>
            <option value='#969696'>Grey</option>
          </select>
        </div>
        <div>
          <button onClick={onSave} style={{ background: backgroundColor, color: textColor }} className="btn">
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
