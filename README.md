# Pair Up! - Web Application

### Deployed Page
- [Pair Up! - pair-up.herokuapp.com](https://pair-up.herokuapp.com/)

##### Mobile Application (React Native)
- [Pair Up! Mobile - github.com/jgrubard/pair-up-mobile](https://github.com/jgrubard/pair-up-mobile)

##### Video Presentation
- [Youtube Video](https://www.youtube.com/watch?v=oQXhNspw-pE)

### About Pair Up.

Pair Up is a project in which a web application and mobile application pair together.

If the owner of a gym wants to be able to have its members communicate with each other, he or she can create a new account. After creating this account, the admin user will need to create their organization. The admin user can then explore the dashboard, and customize their information. Once the organization exists in the database, it can be found by those using the mobile application.

On their mobile device, as user can search through the database looking for a specific organization by typing into a search bar, or panning around a map powered by Google. Once they find what they are looking for, they can send a request to join an organization.

Back to the web application, the admin user account will display all new member requests. They can choose to accept or decline the user.

Once accepted, users can then provide some information about themselves, specific to that organization, and check-in viewing all other users currently checked in. They can view other user profiles and send a pairing request.

If the pairing request is accepted, a live chat is be initiated so that the two users can find each other and get started.

### Using the web application.
* Hosted on Heroku, the database resets itself, so do not expect to retain your data for longer than a few hours.
* the provided login information below is pre-seeded each time the database resets, as well as other data within the app.

##### To test the page use the following login:
* email: admin@test.com
* password: admin

You can also sign up and create your own account and faux organization to test out how the application works. When prompted to enter a credit card number, enter: `4242 4242 4242 4242`. You can enter anything for the card expiration data and the CVC.

Once you have created a user with administrative privileges, go and and create an organization. Once created, you can start interacting with users on the mobile app.

#### Back End: Node.js

An Express server is used to create an API that communicates with a relational PostgreSQL database that stores Sequelize models. These models have many complex associations with each other.

#### Front End: React & Redux

React is used to render all of the views, and Redux is used for state management. React-Redux is used to easily grab data from the redux store in whichever component it's needed.