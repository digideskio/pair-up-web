import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = () => {

  return (
    <div id="page-top">

      <header className="masthead">
        <div className="container h-100">

          <div className="row h-100">

            <div className="col-lg-7 my-auto">
              <div className="header-content mx-auto">
                <h1 className="mb-5">Pair Up! is an app that will help you create a strong community within your organization!</h1>
                <a href="#signup" className="btn btn-outline btn-xl js-scroll-trigger">Sign Up! Only $9.99!</a>
              </div>
            </div>

            <div className="col-lg-5 my-auto">
              <div className="device-container">
                <div className="device-mockup iphone6_plus portrait black">
                  <div className="device">
                    <div className="screen">
                      <img src="img/demo-screen-1.jpg" className="img-fluid" alt=""></img>
                    </div>
                    <div className="button">
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      <section className="features bg-white" id="features">
        <div className="container">

          <div className="section-heading text-center">
            <h2>Let your members connect with one another!</h2>
            <hr />
            <p>As an administrator, you are the gatekeepers. Users can only access your page and network of members once you've accepted their request.</p>
          </div>

          <div className="section-heading text-center" style={{ margin: '0' }}>
            <h2>When using Pair Up! a user can</h2>
          </div>

          <div className="row">

            <div className="col-lg-4 my-auto">
              <div className="device-container">
                <div className="device-mockup iphone6_plus portrait black">
                  <div className="device">
                    <div className="screen">
                      <img src="img/demo-screen-1.jpg" className="img-fluid" alt=""></img>
                    </div>
                    <div className="button"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 my-auto">

              <div className="container-fluid">

                <div className="row">

                  <div className="col-lg-6">
                    <div className="feature-item">
                      <i className="icon-magnifier text-primary"></i>
                      <h3>Search Organizations</h3>
                      <p className="text-muted">This is how a user will find you!</p>
                    </div>
                  </div>
                
                  <div className="col-lg-6">
                    <div className="feature-item">
                      <i className="icon-login text-primary"></i>
                      <h3>Request/Check-In</h3>
                      <p className="text-muted">Users will send you a request, and can check in to your facility once accepted.</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="row">

                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-arrow-right-circle text-primary"></i>
                    <h3>Pairing Request</h3>
                    <p className="text-muted">Users can see a list of other members checked in at your facility. They can check other users' skillsets to see who may be a good match.</p>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-people text-primary"></i>
                    <h3>Match</h3>
                    <p className="text-muted">Members will choose their partners when they have pending requests.</p>
                  </div>
                </div>

              </div>



              <div className="row">

                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-bubbles text-primary"></i>
                    <h3>Chat</h3>
                    <p className="text-muted">Members can live chat with their partners once there is a match!</p>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-energy text-primary"></i>
                    <h3>Pair Up!</h3>
                    <p className="text-muted">Once paired, members can ditch their phones and get moving!</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      
      </section>

      <footer>
        <div className="container">
          <p>&copy; Pair Up 2018. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;