import React from 'react';
import { connect } from 'react-redux';
import { deleteFormFromServer } from '../../store';
import AddForm from './AddForm';
import ColorPicker from './ColorPicker';
import TextColor from './TextColor';

import OrgNav from './OrgNav';

const OrgCustomize = ({ organization, id, ownForms, forms, deleteForm }) => {
  if (!organization) return null
  var orgId = id;
  return (
    <div className="org-background">
      <div className="container">
        <div className="row">

          <OrgNav id={id} />

          <div className="col-lg-9" >
            <div className="card mt-4 card-body">
              <h2>Categories That Members Can Answer</h2>
              <span>&nbsp;</span>
              <ul className="list-group list-group-flush">
                {
                  ownForms.map(form => (
                    <li className="list-group-item" key={form.id}>
                      {form.name}&nbsp;
              <button className="btn2 btn-warning btn-sm" style={{ float: 'right' }} onClick={() => deleteForm(form.id)}>Delete</button>
                    </li>
                  ))
                }
              </ul>
              <span>&nbsp;</span>
              <AddForm organization={organization} />
              <span>&nbsp;</span>
              <span>&nbsp;</span>



              <h2>App's Background Color</h2>
              <span>&nbsp;</span>
              <ColorPicker organization={organization} />
              <span>&nbsp;</span>
              <span>&nbsp;</span>


              <h2>App's Text Color</h2>
              <span>&nbsp;</span>
              <TextColor organization={organization} />
              <span>&nbsp;</span>
              <span>&nbsp;</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const mapState = ({ organizations, users, userOrganizations, forms }, { id }) => {
  const organization = organizations.find(org => org.id === id);
  const ownForms = forms.filter(form => form.organizationId === id)
  return { organization, ownForms, forms }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    deleteForm: (id) => dispatch(deleteFormFromServer(id, history)),
  }
}

export default connect(mapState, mapDispatch)(OrgCustomize);
