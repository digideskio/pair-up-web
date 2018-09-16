const Description = require('./models/Description');
const Organization = require('./models/Organization');
const UserOrganization = require('./models/UserOrganization')
const OrganizationRequest = require('./models/OrganizationRequest')
const UserRequest = require('./models/UserRequest')
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');
const User = require('./models/User');
const Form = require('./models/Form')
const conn = require('./conn');

Description.belongsTo(User);
Description.belongsTo(Organization);
Description.belongsTo(Form);
Form.hasMany(Description);

User.belongsTo(Organization, { as: 'checkedIn' })

Form.belongsTo(Organization);

UserOrganization.belongsTo(User);
UserOrganization.belongsTo(Organization);

OrganizationRequest.belongsTo(Organization);
OrganizationRequest.belongsTo(User);
User.belongsTo(Organization);

UserRequest.belongsTo(User, { as: 'requester' });
UserRequest.belongsTo(User, { as: 'responder' });
UserRequest.belongsTo(Organization);

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  conn,
  models: {
    Description,
    Organization,
    UserOrganization,
    User,
    Form,
    OrganizationRequest,
    UserRequest,
    Conversation,
    Message
  }
};
