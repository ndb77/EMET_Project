import React from "react";
import { Link } from "react-router-dom";
import FHIR from "fhirclient"

const HomePage = () => {
  
  var myApp = {}

  FHIR.oauth2.ready()
  .then(function(client){ 
    myApp.smart = client
    doRequests()
  })

  async function doRequests(){

    var [appts,activeMeds] = await Promise.all([
      fetch(myApp.smart.state.serverUrl+"/Appointment?patient="+myApp.smart.patient.id+"&service-category=appointment",{
        headers:{  
          "Accept":"application/json+fhir",
          "Authorization":"Bearer "+myApp.smart.state.tokenResponse.access_token
        }
        }).then(function(data){
          return data
      }),
      fetch(myApp.smart.state.serverUrl+"/MedicationRequest?patient="+myApp.smart.patient.id+"&status=active",{
        headers:{  
          "Accept":"application/json+fhir",
          "Authorization":"Bearer "+myApp.smart.state.tokenResponse.access_token
        }
        }).then(function(data){
          return data
      })
    ])

    var response_appts = await appts.json()
    var response_activeMeds = await activeMeds.json()
    console.log('response_appts',response_appts)
    console.log('active_meds',response_activeMeds) 


  }

  return (
    <div className="container" style={{maxWidth: 960}}>
      <div className="row" style={{marginTop: 10, marginRight: 10, marginLeft: 10}}>
        <div className="col">
          <h1>Welcome Back, <span style={{color: 'rgb(255, 0, 0)'}}>Noah Bastola</span></h1>
        </div>
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
                  <p style={{width: '100%', maxWidth: '100%'}}>At: <span style={{color: 'rgb(255, 0, 0)'}}>Nebraska Medicine</span></p>

                </div>
              </div>
              <div className="row text-center">
                <div className="col"><Link className="btn btn-primary" to='/currentMedicationList'>Click to begin Check-in</Link></div>
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
                  <p style={{width: '100%', maxWidth: '100%'}}>At: <span style={{color: 'rgb(255, 0, 0)'}}>Nebraska Medicine</span></p>

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
                  <p style={{width: '100%', maxWidth: '100%'}}>At: <span style={{color: 'rgb(255, 0, 0)'}}>Nebraska Medicine</span></p>
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
            <li style={{paddingBottom: 10}}><a href="current-medications-1.html">Questionaires</a></li>
            <li style={{paddingBottom: 10}}><a href="#">Your Messages</a></li>
            <li style={{paddingBottom: 10}}><a href="#">Your Appointments Calendar</a></li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default HomePage;
