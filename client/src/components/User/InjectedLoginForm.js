/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogin, signup } from '../../store'
import { Input, Progress } from 'mdbreact';
import { injectStripe, CardElement } from 'react-stripe-elements';

const emailRegex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
const passwordRegexMedium = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
const passwordRegexStrong = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

class InjectedLoginForm extends React.Component {
  constructor(props) {
    super(props)
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
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.validators = {
      firstName: (value) => {
        if (!value) return 'First name is required!'
      },
      lastName: (value) => {
        if (!value) return 'Last name is required!'
      },
      email: (value) => {
        if (!value) return 'Email is required'
        if (this.props.emails.includes(value)) return 'Email already exists!'
        if (!emailRegex.test(value)) return 'Email is not valid'
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
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change)
  }

  handlePaymentChange() {
    this.setState({ payment: true });
  }

  onSubmit(ev) {
    ev.preventDefault()
    const { firstName, lastName, email, password, userStatus, billingFirstName, billingLastName } = this.state
    const { attemptLogin, attemptSignup, url } = this.props
    if (url === '/signup') {
      const errors = Object.keys(this.validators).reduce((memo, key) => {
        const validator = this.validators[key]
        const value = this.state[key]
        const error = validator(value)
        if (error) memo[key] = error
        return memo
      }, {})
      this.setState({ errors })
      if (Object.keys(errors).length) return;
      const name = `${billingFirstName} ${billingLastName}`;
      this.props.stripe.createToken({ type: 'card', name })
        .then(({ token }) => {
          attemptSignup({ firstName, lastName, email, password, userStatus, token })
        })
    }
    else {
      attemptLogin({ email, password })
    }
  }

  render() {
    const url = location.hash.slice(1)
    const { onChange, onSubmit } = this
    const { user } = this.props
    const { firstName, lastName, password, email, errors, billingFirstName, billingLastName } = this.state
    const passwordTestStrong = passwordRegexStrong.test(password)
    const passwordTestMedium = passwordRegexMedium.test(password)
    return (
      <div className="login-form">
        {
          user.id ? (
            <div>
              <h4> You are already logged in </h4>
              <Link to='/'>
                <button className="btn btn-info">Back home</button>
              </Link>
              &nbsp;
              <Link to={`/users/${user.id}`}>
                <button className="btn btn-secondary">My Account</button>
              </Link>
            </div>
          ) : (
            <div>
              <h2>{url === '/signup' ? ('Sign up as an Admin to Create an Organization Account') : ('Log in to your account')}</h2>
              <div>
                {
                  url === '/signup' ? (
                    <div className="ui form error">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>First Name</label>
                          <Input
                            name="firstName"
                            onChange={onChange}
                            value={firstName}
                            type="text"
                          />
                          {
                            errors.firstName &&
                              <div className="ui error message">
                                <p>{errors.firstName}</p>
                              </div>
                          }
                        </div>
                        <div className="form-group col-md-6">
                          <label>Last Name</label>
                          <Input
                            name="lastName"
                            onChange={onChange}
                            value={lastName}
                            type="text"
                          />
                          {
                            errors.lastName &&
                              <div className="ui error message">
                                <p>{errors.lastName}</p>
                              </div>
                          }
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label>Email</label>
                          <Input
                            name="email"
                            onChange={onChange}
                            value={email}
                            type='email'
                          />
                          {
                            errors.email &&
                              <div className="ui error message">
                                <p>{errors.email}</p>
                              </div>
                          }
                        </div>
                        <div className="form-group col-md-6">
                          <div className="field">
                            <label>Password</label>
                            <Input
                              name="password"
                              onChange={onChange}
                              value={password}
                              type="password"
                            />
                            {
                              errors.password &&
                                <div className="ui error message">
                                  <p>{errors.password}</p>
                                </div>
                            }
                          </div>
                          <div className="progress-wrapper">
                            {
                              passwordTestStrong ? (
                                <Progress value={100} color={"success"} />
                              ) : (
                                passwordTestMedium ? (
                                  <Progress value={67} color={"warning"} />
                                ) : (
                                  password.length > 3 ? (
                                    <Progress value={33} color={"danger"} />
                                  ) : (
                                    <Progress value={0} color={"danger"} />
                                  )
                                )
                              )
                            }
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                        <label>Billing First Name</label>
                        <Input
                          name="billingFirstName"
                          onChange={onChange}
                          value={billingFirstName}
                          type="text"
                        />
                        {
                          errors.billingFirstName &&
                            <div className="ui error message">
                              <p>{errors.billingFirstName}</p>
                            </div>
                        }
                      </div>
                      <div className="form-group col-md-6">
                        <label>Billing Last Name</label>
                          <Input
                            name="billingLastName"
                            onChange={onChange}
                            value={billingLastName}
                            type="text"
                          />
                          {
                            errors.billingLastName &&
                              <div className="ui error message">
                                <p>{errors.billingLastName}</p>
                              </div>
                          }
                        </div>
                      </div>
                      <div style={{ 'marginTop': '20px' }}></div>
                      <div className='form-group'>
                        <CardElement onChange={this.handlePaymentChange} />
                      </div>
                      <div className="ui divider"></div>
                    </div>
                  ) : (
                    <div className="ui form">
                      <div className="field">
                        <label>Email</label>
                        <Input
                          name="email"
                          onChange={onChange}
                          value={email}
                          type='text'
                        />
                        { errors.email && <div className="help-block">{errors.email}</div> }
                      </div>
                      <div className="field">
                        <label>Password</label>
                        <Input
                          name="password"
                          onChange={onChange}
                          value={password}
                          type="password"
                        />
                      </div>
                    </div>
                  )
                }
              </div>
              <button onClick={onSubmit} className="btn btn-info" style={{ 'marginTop': '20px' }}>
                {url === '/signup' ? ('Create account') : ('Log in')}
              </button>
              <div style={{ 'marginTop': '20px' }}></div>
              {
                url === '/signup' ? (
                  <p className="margin-t-15">
                    Have an Account? <a href='#/login'>Log in Now &raquo;</a>
                  </p>
                ) : (
                  <p className="margin-t-15">
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

  const emails = users.reduce((memo, user) => {
    memo.push(user.email)
    return memo
  }, [])
  return { emails, user }
}

const mapDispatch = (dispatch, { history }) => {
  // console.log('HISTORY:', history)
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials, history)),
    attemptSignup: user => dispatch(signup(user, history)),
  }
}

export default connect(mapState, mapDispatch)(injectStripe(InjectedLoginForm));
