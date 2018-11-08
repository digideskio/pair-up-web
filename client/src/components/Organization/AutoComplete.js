import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';
import axios from 'axios';

class AutoComplete extends Component {
  constructor() {
    super();
    this.state = {
      predictions: [],
      // fullAddress: '',
      input: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      latitude: '',
      longitude: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const { value } = ev.target;
    this.setState({ input: value });
    if(value.length <= 3) {
      this.setState({ predictions: [] });
    } else {
      axios.post('/api/autoComplete/getpredictions', { input: value })
        .then(res => res.data)
        .then(predictions => this.setState({ predictions }))
    }
  }

  onSelect(placeId) {
    axios.post('/api/autoComplete/getplace', { query: placeId })
      .then(res => res.data)
      .then(locusData => {
        const fullAddress = locusData[0].formatted_address;
        const addressArr = fullAddress.split(', ');
        const [ address, city, stateZip, country ] = addressArr;
        const [ state, zip ] = stateZip.split(' ');
        const { lat, lng } = locusData[0].geometry.location;
        this.setState({
          input: fullAddress,
          address,
          city,
          state,
          zip,
          latitude: lat,
          longitude: lng,
          predictions: []
        })
      })
      .catch(err => console.log(err))
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { address, city, state, zip, latitude, longitude } = this.state;
    const { createOrUpdateOrganization, id } = this.props;
    createOrUpdateOrganization({ id, address, city, state, zip, latitude, longitude });
    this.setState({ input: '' });
  }

  render() {
    const { predictions, input } = this.state;
    const { onChange, onSelect, onSubmit } = this;
    return (
      <div className='row'>
        <div className='col'>
          <input
            onChange={onChange}
            value={input}
            placeholder='Search your Address'
            className='form-control'
          />
          {
            predictions.length ? (
              <ul className='list-group'>
              {
                predictions.map(pred => {
                  return (
                    <li className='list-group-item' key={pred.place_id}
                    onClick={() => onSelect(pred.place_id)}>
                    {pred.description}
                  </li>
                  );
                })
              }
            </ul>
            ) : null
          }
        </div>
        <div className='col'>
          <button
            className="btn btn-info"
            onClick={onSubmit}
          >
            Change Address
          </button>
        </div>
      </div>
    )
  }
}

const mapState = ({}, { organization }) => {
  const id = organization.id;
  return { id }
}

const mapDispatch = (dispatch) => {
  return {
    createOrUpdateOrganization: (organization) => dispatch(updateOrganizationOnServer(organization))
  }
}

export default connect(mapState, mapDispatch)(AutoComplete);
