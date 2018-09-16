import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';
import axios from 'axios';


class AutoComplete extends Component {
  constructor() {
    super();
    this.state = {
      predictions: [],
      input: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this)
  }

  onChange(ev) {
    (ev.target.value.length <= 3) ?
      (this.setState({ predictions: [] }))
      : (
        ev.target.value.length > 3 &&
        axios.post('/api/autoComplete/getpredictions', { input: ev.target.value })
          .then(res => res.data)
          .then(predictions => {
            this.setState({ predictions })
          })
      );

  };

  onSelect(placeId) {
    const { createOrUpdateOrganization, organization } = this.props;
    axios.post('/api/autoComplete/getplace', { query: placeId })
      .then(res => res.data)
      .then((_address) => {
        _address = _address[0];
        let address = _address.formatted_address.split(', ');
        address[2] = address[2].split(' ');
        const { lat, lng } = _address.geometry.location;
        organization.address = address[0],
          organization.city = address[1],
          organization.state = address[2][0],
          organization.zip = address[2][1],
          organization.latitude = lat,
          organization.longitude = lng
        createOrUpdateOrganization(organization);
        this.setState({ predictions: [] })
      }
      )
      .catch(err => console.log(err))
  }

  render() {
    const { predictions } = this.state;
    const { onChange, onSelect } = this;
    return (
      <div>
        <input
          onChange={onChange}
          placeholder='Search your Address'
          className='form-control'
        />

        <ul className='list-group'>
          {predictions.length ? predictions.map(pred => (
            <li className='list-group-item' key={pred.place_id}
              onClick={() => onSelect(pred.place_id)}>{pred.description}</li>
          )) : null}
        </ul>
      </div>
    )
  }
}

const mapState = ({}, { organization }) => {
  return { organization }
}

const mapDispatch = (dispatch) => {
  return {
    createOrUpdateOrganization: (organization) => dispatch(updateOrganizationOnServer(organization))
  }
}

export default connect(mapState, mapDispatch)(AutoComplete);
