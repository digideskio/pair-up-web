import React from 'react';
import { connect } from 'react-redux';
import { deleteFormFromServer } from '../../store';
import AddForm from './AddForm';
import ColorPicker from './ColorPicker';
import OrgNav from './OrgNav';

const instructions = [
  'Here, you will create a way for your members to share their skill levels.',
  'For example, if your organization is a rock climbing gym, you can create fields for top-rope skill, bouldering-skill, how long you\'ve been climbing for, etc.',
  'This is also a way for your members to talk about themselves, so feel free to create an "about me" section, that lets them talk about themselves.',
  'Each category you create will have a place for your members to type and change their skill levels. They can describe themselves however they choose.'
];

const OrgCustomize = ({ organization, id, ownForms, deleteForm }) => {
  if (!organization) return null;
  return (
    <div className="org-background">
      <div className="container">
        <div className="row">
          <OrgNav id={id} />
          <div className="col-lg-9" >
            <div className="card mt-4 card-body">
              <h2>Member Skill Categories</h2>
              { instructions.map((line, i) => <p key={i} style={{ fontSize: '11pt'}}>{line}</p>) }
              <ul className="list-group list-group-flush">
                {
                  ownForms.map(form => (
                    <li className="list-group-item" key={form.id}>
                      {form.name}
                      &nbsp;
                      <button
                        className="btn2 btn-warning btn-sm"
                        style={{ float: 'right' }}
                        onClick={() => deleteForm(form.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))
                }
              </ul>
              <br />
              <AddForm organization={organization} />
              <ColorPicker organization={organization} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = ({ organizations, forms }, { id }) => {
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
