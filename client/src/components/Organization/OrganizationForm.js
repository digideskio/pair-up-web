import React, { Component } from 'react'; // start @ 189 lines
import { connect } from 'react-redux';
import { updateOrganizationOnServer, createNewOrg } from '../../store';

import AutoComplete from './AutoComplete';

class OrganizationForm extends Component {
  constructor() {
    super();
    this.state = {
      id: undefined,
      name: '',
      organization_type: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      contact_name: '',
      contact_phone: '',
      image: ''
    }
    this.onSave = this.onSave.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateFormRow = this.generateFormRow.bind(this);
  }

  componentDidMount() {
    const { organization } = this.props;
    if(organization) this.setState(organization);
  }

  componentDidUpdate() {
    const { organization } = this.props;
    if (organization) {
      const { address, city, state, zip } = organization;
      if(this.state.address !== address) {
        this.setState({ address, city, state, zip });
      }
    }
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  addPhoto(ev) {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ image: reader.result });
    }
    reader.readAsDataURL(file);
  }

  onSave(ev) {
    ev.preventDefault();
    const { organization, user } = this.props;
    const { updateOrganization, createOrganization } = this.props;
    if(organization) updateOrganization(this.state);
    else createOrganization(this.state, user.id);
  }

  generateFormRow(columns) {
    const fields = {
      name: 'Organization Name', organization_type: 'Organization Type',
      address: 'Address', city: 'City', state: 'State', zip: 'Zip Code',
      contact_name: 'Contact Name', contact_phone: 'Contact Phone'
    }
    const { handleChange } = this;
    return (
      <div className='form-row'>
        {
          columns.map((col, i) => (
            <div key={i} className='form-group col-md-6'>
              <label>{fields[col]}</label>
              <input className='form-control' name={col} value={this.state[col]} onChange={handleChange} />
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    const { onSave, addPhoto, generateFormRow } = this;
    const { id } = this.state;
    const { organization } = this.props;
    return (
      <div className={ !id ? 'org-background' : ''}>
        <div className={ !id ? 'container' : ''}>
          <div className={ !id ? 'card mt-4 card-body' : ''}>
            {
              !id && 
                <div>
                  <h2>Create Your Organization!</h2>
                </div>
            }
            { generateFormRow([ 'name', 'organization_type' ]) }
            {
              id &&
                <div className='form-row'>
                  <div className='form-group col-md'>
                    <label>Search Your Address using Google AutoFill</label>
                    <AutoComplete organization={organization} />
                  </div>
                </div>
            }
            { generateFormRow([ 'address', 'city' ]) }
            { generateFormRow([ 'state', 'zip' ]) }
            { generateFormRow([ 'contact_name', 'contact_phone' ]) }
            <div>Add Image<input type='file' onChange={addPhoto} /></div>
            <div><button className='btn btn-info' style={{ 'marginTop': '20px' }} onClick={onSave}>Submit</button></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ user }, { organization, id }) => {
  return { organization, user, id }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    updateOrganization: (organization) => dispatch(updateOrganizationOnServer(organization)),
    createOrganization: (organization, userId) => dispatch(createNewOrg(organization, userId, history))
  }
}

export default connect(mapState, mapDispatch)(OrganizationForm);
