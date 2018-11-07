import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrganizationOnServer, createNewOrg } from '../../store';

import AutoComplete from './AutoComplete';

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    const { organization } = props;
    this.state = {
      id: organization ? organization.id : undefined,
      name: organization ? organization.name : '',
      organization_type: organization ? organization.organization_type : '',
      typeId: organization ? organization.typeId : null,
      address: organization ? organization.address : '',
      city: organization ? organization.city : '',
      state: organization ? organization.state : '',
      zip: organization ? organization.zip : '',
      contact_name: organization ? organization.contact_name : '',
      contact_phone: organization ? organization.contact_phone : '',
      image: organization ? organization.image : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.organization && this.state.address !== this.props.organization.address) {
      this.setState({address: this.props.organization.address, city: this.props.organization.city, state: this.props.organization.state, zip:this.props.organization.zip,})
    }
  }

  handleChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value;
    this.setState(change);
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
        {url === '/organizations/create' ?
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
          :
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

export default connect(mapState, mapDispatch)(OrganizationForm);
