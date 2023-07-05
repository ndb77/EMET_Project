import React from "react";
const HomePage = () => {
  return (
    <div className="container" style={{maxWidth: 960}}>
      <div className="row" style={{marginTop: 10, marginRight: 10, marginLeft: 10}}>
        <div className="col">
          <h1>Welcome Back, <br /><span style={{color: 'rgb(255, 0, 0)'}}>Noah Bastola</span></h1>
        </div>
        <div className="col-auto align-self-center" style={{textAlign: 'right', width: 'auto', paddingRight: 0, paddingLeft: 0, height: 'auto', background: '#ffeaea'}}><img className="d-inline" src="/kisscc0-user-profile-computer-icons-facebook-avatar-ftkuser-5b7751e1c79415.8309983615345464018175.png" style={{width: 75}} /></div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h4>Upcoming appointments</h4>
        </div>
      </div>
      <div className="row row-cols-3 text-nowrap text-truncate d-flex flex-nowrap horizontal-scrollable">
        <div className="col flex-wrap" style={{width: 325, height: 'auto'}}>
          <div className="card" style={{width: 'auto', height: '100%'}}>
            <div className="card-body" style={{maxWidth: '100%'}}>
              <div className="row">
                <div className="col">
                  <h4><span style={{color: 'rgb(255, 0, 0)'}}>Follow-up</span></h4>
                </div>
              </div>
              <div className="row">
                <div className="col flex-shrink-1 text-wrap">
                  <p style={{width: '100%', maxWidth: '100%'}}>With: <span style={{color: 'rgb(255, 0, 0)'}}>Dr. Williams</span><br />On:&nbsp; <span style={{color: 'rgb(255, 0, 0)'}}>6/1/23 at 2:00 pm</span></p>
                </div>
              </div>
              <div className="row text-center">
                <div className="col"><a className="btn btn-primary" role="button" style={{width: '75%'}} href="appointment-information.html">Click to begin Check-in</a></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col flex-wrap" style={{width: 325, height: 'auto'}}>
          <div className="card" style={{width: 'auto', height: '100%'}}>
            <div className="card-body" style={{maxWidth: '100%'}}>
              <div className="row">
                <div className="col">
                  <h4><span style={{color: 'rgb(255, 0, 0)'}}>Follow-up</span></h4>
                </div>
              </div>
              <div className="row">
                <div className="col flex-shrink-1 text-wrap">
                  <p style={{width: '100%', maxWidth: '100%'}}>With: <span style={{color: 'rgb(255, 0, 0)'}}>Dr. Black</span><br />On:&nbsp; <span style={{color: 'rgb(255, 0, 0)'}}>6/12/23 at 2:00 pm</span></p>
                </div>
              </div>
              <div className="row text-center">
                <div className="col"><button className="btn btn-primary" type="button" style={{width: '75%'}}>Check-in Unavailable</button></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col flex-wrap" style={{width: 325, height: 'auto'}}>
          <div className="card" style={{width: 'auto', height: '100%'}}>
            <div className="card-body" style={{maxWidth: '100%'}}>
              <div className="row">
                <div className="col">
                  <h4><span style={{color: 'rgb(255, 0, 0)'}}>Follow-up</span></h4>
                </div>
              </div>
              <div className="row">
                <div className="col flex-shrink-1 text-wrap">
                  <p style={{width: '100%', maxWidth: '100%'}}>With: <span style={{color: 'rgb(255, 0, 0)'}}>Dr. James Tcheng </span><br />On:&nbsp; <span style={{color: 'rgb(255, 0, 0)'}}>6/21/23 at 2:00 pm</span></p>
                </div>
              </div>
              <div className="row text-center">
                <div className="col"><button className="btn btn-primary" type="button" style={{width: '75%'}}>Check-in Unavailable</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{marginTop: 10}}>
        <div className="col">
          <h2>Quick Links</h2>
          <ul className="landing-page-quick-links">
            <li style={{paddingBottom: 10}}><a href="current-medications-1.html">Your Medication List</a></li>
            <li style={{paddingBottom: 10}}><a href="#">Your Test Results</a></li>
            <li style={{paddingBottom: 10}}><a href="#">Your Messages</a></li>
            <li style={{paddingBottom: 10}}><a href="#">Your Appointments Calendar</a></li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default HomePage;
