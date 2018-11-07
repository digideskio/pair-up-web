import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer } from '../../store';
import axios from 'axios';

class AutoComplete extends Component {
  constructor() {
    super();
    this.state = {
      predictions: [],
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
        const addressArr = locusData[0].formatted_address.split(', ');
        const [ address, city, stateZip, country ] = addressArr;
        const [ state, zip ] = stateZip.split(' ');
        const { lat, lng } = locusData[0].geometry.location;
        this.setState({
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
  }

  render() {
    const { predictions } = this.state;
    const { onChange, onSelect, onSubmit } = this;
    return (
      <div>
        <input
          onChange={onChange}
          placeholder='Search your Address'
          className='form-control'
        />
        <button
          className="btn btn-info"
          style={{ 'marginTop': '20px' }}
          onClick={onSubmit}
        >
          Change Address
        </button>
        <ul className='list-group'>
          {
            predictions.length ? (
              predictions.map(pred => {
                return (
                  <li className='list-group-item' key={pred.place_id}
                  onClick={() => onSelect(pred.place_id)}>
                  {pred.description}
                </li>
                );
              })
            ) : null
          }
        </ul>
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
