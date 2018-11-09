import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import InjectedLoginForm from './InjectedLoginForm';

const LoginForm = ({ history }) => {

  return (
    <div className='org-background'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12' >
            <div className='card mt-4 card-body'>
              <StripeProvider apiKey='pk_test_L5BNU52HtQupz1A0XX4pzElV'>
                <Elements>
                  <InjectedLoginForm history={history} url={location.hash.slice(1)} />
                </Elements>
              </StripeProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;
