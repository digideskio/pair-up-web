/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogin, signup } from '../../store'
import { Input, Progress } from 'mdbreact';
import { injectStripe, CardElement } from 'react-stripe-elements';

const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
const passwordRegexMedium = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const passwordRegexStrong = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

class InjectedLoginForm extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errors: {},
      userStatus: 'admin',
      billingFirstName: '',
      billingLastName: '',
      payment: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.generateInputAndErrors = this.generateInputAndErrors.bind(this);
    this.createErrorObject = this.createErrorObject.bind(this);
    this.renderPasswordStrength = this.renderPasswordStrength.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.validators = {
      firstName: (value) => {
        if (!value) return 'First name is required!'
      },
      lastName: (value) => {
        if (!value) return 'Last name is required!'
      },
      email: (value) => {
        const { allEmails } = this.props;
        if (!value) return 'Email is required'
        if (location.hash.slice(1) === '/signup' && allEmails.includes(value)) return 'Email already exists!'
        if (!emailRegex.test(value)) return 'Email is not valid!'
      },
      password: (value) => {
        if (!value) return 'Password is required'
        if (value.length < 4) return 'Password must be at least 4 characters'
      },
      billingFirstName: (value) => {
        if (!value) return 'First name is required.';
      },
      billingLastName: value => {
        if (!value) return 'Last name is required.';
      },
      payment: value => {
        if (!value) return 'Complete payment information is required.'
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: {} })
  }

  onChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

  handlePaymentChange() {
    this.setState({ payment: true });
  }

  createErrorObject() {
    let errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key]
      const value = this.state[key];
      const error = validator(value);
      if (error) memo[key] = error;
      return memo;
    }, {});
    if(location.hash.slice(1) === '/login') {
      const { email, password } = errors; 
      const loginErrors = {};
      if(email) loginErrors.email = email;
      if(password) loginErrors.password = password;
      errors = loginErrors;
    }
    this.setState({ errors });
    return errors;
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { firstName, lastName, email, password, userStatus, billingFirstName, billingLastName } = this.state
    const { attemptLogin, attemptSignup, url } = this.props;
    const { createErrorObject } = this;
    const errors = createErrorObject();
    if (Object.keys(errors).length) return;
    if (url === '/signup') {
      const name = `${billingFirstName} ${billingLastName}`;
      this.props.stripe.createToken({ type: 'card', name })
        .then(({ token }) => {
          attemptSignup({ firstName, lastName, email, password, userStatus, token });
        })
    }
    else {
      attemptLogin({ email, password });
    }
  }

  generateInputAndErrors(key) {
    const { errors, password } = this.state;
    const { url } = this.props;
    const fields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      password: 'Password',
      billingFirstName: 'Billing First Name',
      billingLastName: 'Billing Last Name'
    }
    let type = 'text'
    if(key === 'email') type = 'email';
    if(key === 'password') type = 'password';
    return (
      <div className='form-group col-md-6'>
        <label>{fields[key]}</label>
        <input
          className='form-control'
          name={key}
          placeholder={`Enter your ${fields[key].toLowerCase()}`}
          onChange={this.onChange}
          value={this.state[key]}
          type={type}
        />
        { url === '/signup' && key === 'password' && this.renderPasswordStrength(password) }
        {
          errors[key] &&
            <span style={{ marginLeft: '10px', fontSize: '14px', color: 'red' }}>{errors[key]}</span>
        }
      </div>
    );
  }

  renderPasswordStrength(password) {
    let values;
    const passwordTestStrong = passwordRegexStrong.test(password);
    const passwordTestMedium = passwordRegexMedium.test(password);
    if(password.length <= 3) values = [ 5, 'danger' ];
    if(password.length > 3) values = [ 33, 'danger' ];
    if(passwordTestMedium) values = [ 67, 'warning' ];
    if(passwordTestStrong) values = [ 100, 'success' ];
    const [ value, color ] = values;
    return (
      <div className='progress-wrapper'>
        <Progress value={value} color={color} />
      </div>
    );
  }

  render() {
    const url = location.hash.slice(1)
    const { onSubmit, generateInputAndErrors } = this
    const { user } = this.props
    return (
      <div className='login-form'>
        {
          user.id ? (
            <div>
              <h4> You are already logged in </h4>
              <Link to='/'>
                <button className='btn btn-info'>Back home</button>
              </Link>
              &nbsp;
              <Link to={`/users/${user.id}`}>
                <button className='btn btn-secondary'>My Account</button>
              </Link>
            </div>
          ) : (
            <div>
              <h2>{ url === '/signup' ? 'Sign up as an Admin to Create an Organization Account' : 'Log in to your account' }</h2>
              <div>
                {
                  url === '/signup' ? (
                    <div className='ui form error'>
                      <div className='form-row'>
                        { generateInputAndErrors('firstName') }
                        { generateInputAndErrors('lastName') }
                      </div>
                      <div className='form-row'>
                        { generateInputAndErrors('email') }
                        { generateInputAndErrors('password') }
                      </div>
                      <div className='form-row'>
                        { generateInputAndErrors('billingFirstName') }
                        { generateInputAndErrors('billingLastName') }
                      </div>
                      <div className='form-group'>
                        <label style={{ marginBottom: '10px' }}>Enter Credit Card Info Below</label>
                        <CardElement onChange={this.handlePaymentChange} />
                      </div>
                      <div className='ui divider'></div>
                    </div>
                  ) : (
                    <div className='form-row'>
                      { generateInputAndErrors('email') }
                      { generateInputAndErrors('password') }
                    </div>
                  )
                }
              </div>
              <button onClick={onSubmit} className='btn btn-info' style={{ 'marginTop': '20px' }}>
                { url === '/signup' ? 'Create account' : 'Log in' }
              </button>
              <div style={{ 'marginTop': '20px' }}></div>
              {
                url === '/signup' ? (
                  <p className='margin-t-15'>
                    Have an Account? <a href='#/login'>Log in Now &raquo;</a>
                  </p>
                ) : (
                  <p className='margin-t-15'>
                    Don't Have an Account for Your Organization? <a href='#/signup'>Create a New Organization &raquo;</a>
                  </p>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}
const mapState = ({ users, user }) => {
  const allEmails = users.reduce((memo, user) => {
    memo.push(user.email);
    return memo;
  }, []);
  return { allEmails, user }
}

const mapDispatch = (dispatch, { history }) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials, history)),
    attemptSignup: user => dispatch(signup(user, history)),
  }
}

export default connect(mapState, mapDispatch)(injectStripe(InjectedLoginForm));
