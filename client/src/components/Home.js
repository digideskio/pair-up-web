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
                <h1 className="mb-5">Pair Up! is an app that will help you create strong community inside your organization!</h1>
                <a href="#signup" className="btn btn-outline btn-xl js-scroll-trigger">Sign Up! Only $9.99!</a>
              </div>
            </div>

            <div className="col-lg-5 my-auto">
              <div className="device-container">
                <div className="device-mockup iphone6_plus portrait white">
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
            <h2>Check out what you can do with this app!</h2>
            <hr />
          </div>

          <div className="row">

            <div className="col-lg-4 my-auto">
              <div className="device-container">
                <div className="device-mockup iphone6_plus portrait white">
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
                      <i className="icon-login text-primary"></i>
                      <h3>Check-In</h3>
                      <p className="text-muted">Check in to your favorite organizations once you are there!</p>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="feature-item">
                    <i className="icon-arrow-right-circle text-primary"></i>
                    <h3>Request</h3>
                    <p className="text-muted">Request to pair with a partner!</p>
                  </div>

                </div>
              </div>

              <div className="row">

                <div className="col-lg-6">
                  <div className="feature-item">
                    <i className="icon-people text-primary"></i>
                    <h3>Match</h3>
                    <p className="text-muted">Decide the best partner for you!</p>
                  </div>
                </div>

                <div className="col-lg-6">
                    <div className="feature-item">
                    <i className="icon-phone text-primary"></i>
                    <h3>Chat</h3>
                    <p className="text-muted">Chat with your partner once matched up!</p>
                    </div>
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