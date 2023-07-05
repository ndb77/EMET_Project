import React from 'react'

const Appointment = () => {
  return (
<div className="container" style={{maxWidth: 960}}>
  <div className="row" style={{marginTop: 12}}>
    <div className="col-md-12 mx-auto" style={{width: 'auto'}}>
      <h1>Appointment Information</h1>
      <hr />
    </div>
  </div>
  <div className="row" style={{marginRight: 0}}>
    <div className="col">
      <div className="row d-inline-flex" style={{width: 'auto', height: 'auto'}}>
        <div className="col" style={{width: 'auto', minWidth: 41, height: 'auto'}}>
          <h5 style={{width: 'auto', marginBottom: 0}}>When:</h5>
        </div>
      </div>
      <div className="row" style={{boxShadow: '0px 0px 3px', marginLeft: 0}}>
        <div className="col">
          <p><span style={{color: 'rgb(255, 15, 0)'}}>2:00 pm</span></p>
        </div>
      </div>
    </div>
  </div>
  <div className="row" style={{marginRight: 0}}>
    <div className="col">
      <div className="row d-inline-flex" style={{width: 'auto', height: 'auto'}}>
        <div className="col" style={{width: 'auto', minWidth: 41, height: 'auto'}}>
          <h5 style={{width: 'auto', marginBottom: 0}}>With:</h5>
        </div>
      </div>
      <div className="row" style={{boxShadow: '0px 0px 3px', marginLeft: 0}}>
        <div className="col">
          <p><span style={{color: 'rgb(255, 15, 0)'}}>Dr. Williams</span></p>
        </div>
      </div>
    </div>
  </div>
  <div className="row" style={{boxShadow: 'inset 0px 0px 0px 0px'}}>
    <div className="col">
      <div className="row d-inline-flex" style={{width: 'auto', height: 'auto'}}>
        <div className="col" style={{width: 'auto', minWidth: 41, height: 'auto'}}>
          <h5 style={{width: 'auto', marginBottom: 0}}>Reason:</h5>
        </div>
      </div>
      <div className="row" style={{boxShadow: '0px 0px 3px', marginLeft: 0, marginRight: 0}}>
        <div className="col">
          <p><span style={{color: 'rgb(255, 15, 0)'}}>Follow Up</span></p>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col">
      <div className="row d-inline-flex" style={{width: 'auto', height: 'auto'}}>
        <div className="col" style={{width: 'auto', minWidth: 41, height: 'auto'}}>
          <h5 style={{width: 'auto', marginBottom: 0}}>Description:</h5>
        </div>
      </div>
      <div className="row" style={{boxShadow: '0px 0px 3px', marginLeft: 0, minHeight: 100, marginRight: 0}}>
        <div className="col">
          <p><span style={{color: 'rgb(255, 15, 0)'}}>Meeting to discuss blood pressure control.</span></p>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col">
      <div className="row d-inline-flex" style={{width: 'auto', height: 'auto'}}>
        <div className="col" style={{width: 'auto', minWidth: 41, height: 'auto'}}>
          <h5 style={{width: 'auto', marginBottom: 0}}>This appointment will be located at:</h5>
        </div>
      </div>
      <div className="row" style={{boxShadow: '0px 0px 3px', marginLeft: 0, minHeight: 100, marginRight: 0}}>
        <div className="col">
          <p><span style={{color: 'rgb(255, 15, 0)'}}>42nd and Emile Street.</span></p>
        </div>
      </div>
    </div>
  </div>
  <div className="row" style={{marginTop: 30}}>
    <div className="col-auto mx-auto" style={{width: 'auto'}}><a className="btn btn-primary" role="button" href="current-medications-1-1.html">Continue</a></div>
  </div>
</div>

  )
}

export default Appointment