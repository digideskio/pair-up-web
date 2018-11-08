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
    const { organization: { id }, user } = this.props;
    const { updateOrganization, createOrganization } = this.props;
    if(id) updateOrganization(this.state);
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
      <div className="form-row">
        {
          columns.map((col, i) => (
            <div key={i} className="form-group col-md-6">
              <label>{fields[col]}</label>
              <input className="form-control" name={col} value={this.state[col]} onChange={handleChange} />
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
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Search Your Address</label>
                    <AutoComplete organization={organization} />
                  </div>
                </div>
            }
            { generateFormRow([ 'address', 'city' ]) }
            { generateFormRow([ 'state', 'zip' ]) }
            { generateFormRow([ 'contact_name', 'contact_phone' ]) }
            <div>Add Image<input type='file' onChange={addPhoto} /></div>
            <div><button className="btn btn-info" style={{ 'marginTop': '20px' }} onClick={onSave}>Submit</button></div>

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




/* 
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
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
  }

  componentDidMount() {
    const { organization } = this.props;
    this.setState(organization)
  }

  componentDidUpdate(prevProps) {
    if (this.props.organization && this.state.address !== this.props.organization.address) {
      this.setState({address: this.props.organization.address, city: this.props.organization.city, state: this.props.organization.state, zip:this.props.organization.zip,})
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
    if (organization && organization.id) {
      updateOrganization(this.state);
    } else {
      createOrganization(this.state, user.id);
    }
  }

  render() {
    const { handleChange, onSave, addPhoto } = this;
    const { name, organization_type, address, city, state, zip, contact_name, contact_phone } = this.state;
    const { organization } = this.props;
    const url = location.hash.slice(1)
    return (
      <div>
        {
          url === '/organizations/create' ? (
            <div className="org-background">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12" >
                    <div className="card mt-4 card-body">
                      <div>
                        <h2>Create Your Organization!</h2>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Organization Name</label><input className="form-control" name='name' value={name} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Organization Type</label><input className="form-control" name='organization_type' value={organization_type} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Address</label><input className="form-control" name='address' value={address} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                          <label>City</label><input className="form-control" name='city' value={city} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>State</label><input className="form-control" name='state' value={state} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Zip</label><input className="form-control" name='zip' value={zip} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Contact Name</label><input className="form-control" name='contact_name' value={contact_name} onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Contact Phone</label><input className="form-control" name='contact_phone' value={contact_phone} onChange={handleChange} />
                        </div>
                      </div>

                      <div>Add Image<input type='file' onChange={addPhoto} /></div>
                      <div><button className="btn btn-info" style={{ 'marginTop': '20px' }} onClick={onSave}>Submit</button></div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Organization Name</label><input className="form-control" name='name' value={name} onChange={handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <label>Organization Type</label><input className="form-control" name='organization_type' value={organization_type} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Search Your Address</label>
                  <AutoComplete organization={organization} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Address</label><input className="form-control" name='address' value={address} onChange={handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <label>City</label><input className="form-control" name='city' value={city} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>State</label><input className="form-control" name='state' value={state} onChange={handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <label>Zip</label><input className="form-control" name='zip' value={zip} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Contact Name</label><input className="form-control" name='contact_name' value={contact_name} onChange={handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <label>Contact Phone</label><input className="form-control" name='contact_phone' value={contact_phone} onChange={handleChange} />
                </div>
              </div>

              <div>Add Image<input type='file' onChange={addPhoto} /></div>
              <div><button className="btn btn-info" style={{ 'marginTop': '20px' }} onClick={onSave}>Submit</button></div>
            </div>
          )
        }
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

export default connect(mapState, mapDispatch)(OrganizationForm); */
