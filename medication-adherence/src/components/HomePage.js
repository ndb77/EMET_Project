import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FHIR from "fhirclient";
import { useStoreState, useStoreActions } from "easy-peasy";
const HomePage = () => {
  const user = useStoreState((state) => state.user);
  const setUser = useStoreActions((actions) => actions.setUser);
  const setAppointments = useStoreActions((actions) => actions.setAppointments);
  var myApp = {};

  useEffect(() => {
    FHIR.oauth2.ready().then(function (client) {
      myApp.smart = client;
      doRequests();
    });
  }, []);

  async function doRequests() {
    //test EPIC patient ID. Not the same patient as was logged in with
    // const appointmentsPatientID = "erXuFYUfucBZaryVksYEcMg3";
    // const appointmentsPatientBearer =
    //   "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiJkOWYwN2JlNi0yOGNkLTQ2OWEtYjJjMS1jNjU5NWNjODE5MDEiLCJlcGljLmVjaSI6InVybjplcGljOk9wZW4uRXBpYy1jdXJyZW50IiwiZXBpYy5tZXRhZGF0YSI6IjJteEZqOG0wMTVNa3JqbGMta2NjdkhQWmRaN3dvTUZ6ZXJtQmdEMU5YcU5naDJvVkt2UEN0QVBRMkZyRTNLSUFtSkJOcFAwcWM0Wnd0NGxCS1VDeDA4TEtkNENuWGxTM1lxYzhBb2llbWt3UGhfd1ZTcUtmQWh0TVQ5eFNuY0xFIiwiZXBpYy50b2tlbnR5cGUiOiJhY2Nlc3MiLCJleHAiOjE2ODk5NTY1ODEsImlhdCI6MTY4OTk1Mjk4MSwiaXNzIjoidXJuOm9pZDpmaGlyIiwianRpIjoiYjM1MTE3ODItOTdiMS00ZTdjLWJmZjgtOGVlNWExNjI0ZGEzIiwibmJmIjoxNjg5OTUyOTgxLCJzdWIiOiJldk5wLUtoWXdPT3FBWm4xcFoyZW51QTMifQ.KBGwi-ndpLGUhvwzRDHlza767SUPO2aeUhrEc0ACWsP-776GKp3vptNhhnxUyTYP1KLUSPFY8Mlllgo69T_1EODPTTVwWYyXqIMrfQCnaxx9_YgyXc-SBFpE3jGZtSOPnCUJdIIuJNP7ctyPlCc6AuirDhe_xmscbh83gF9spGMM0dbxGCg3aQl6eFp6LGALvLkjNt2q4Pr1YC0o17HE2AzIT33Lp0cNbpzC6Q_DjlkFvaypduStkHJFQn7J9Wd7Y0cQDOPjvUuIXOQIFeJOkQweWd6eZjEjbOHWgZ30LPA93x0LH08SjncaZkFZu2ljobQ0kaB68q6oQrmu3ikzgQ";

    var [appts, patient, activeMeds] = await Promise.all([
      fetch(
        myApp.smart.state.serverUrl +
          "/Appointment?patient=" +
          myApp.smart.patient.id +
          "&service-category=appointment",
        {
          headers: {
            Accept: "application/json+fhir",
            Authorization: "Bearer " + myApp.smart.state.tokenResponse.access_token,
          },
        }
      ).then(function (data) {
        return data;
      }),
      fetch(
        myApp.smart.state.serverUrl + "/Patient/" + myApp.smart.patient.id,
        {
          headers: {
            Accept: "application/json+fhir",
            Authorization:
              "Bearer " + myApp.smart.state.tokenResponse.access_token,
          },
        }
      ).then(function (data) {
        return data;
      }),
      fetch(
        myApp.smart.state.serverUrl +
          "/MedicationRequest?patient=" +
          myApp.smart.patient.id +
          "&status=active",
        {
          headers: {
            Accept: "application/json+fhir",
            Authorization:
              "Bearer " + myApp.smart.state.tokenResponse.access_token,
          },
        }
      ).then(function (data) {
        return data;
      }),
    ]);

    var response_appts = await appts.json();
    var response_activeMeds = await activeMeds.json();
    var response_patient = await patient.json();

    function extractAllActorsForEntry(entry) {
      const participants = entry.resource?.participant || [];
      return participants.map((participant) => participant.actor);
    }

    function extractAllActorsForAllEntries(obj) {
      const entries = obj.entry || [];
      return entries.map((entry) => extractAllActorsForEntry(entry));
    }

    const allActorsList = extractAllActorsForAllEntries(response_appts);
    console.log(allActorsList);

    function getDifferenceInMinutes(date1, date2) {
      const diffInMs = new Date(date1) - new Date(date2);
      return Math.abs(Math.round(diffInMs / (1000 * 60)));
    }

    function getFutureAppointments(obj) {
      const currentDate = new Date();
      const appointments = obj.entry || [];

      // Filter out only the future appointments
      const futureAppointments = appointments.filter((entry) => {
        const startDateTime = new Date(entry.resource.start);
        return startDateTime > currentDate;
      });

      // Calculate the time difference for each future appointment
      futureAppointments.forEach((entry) => {
        const startDateTime = new Date(entry.resource.start);
        entry.timeDifference = getDifferenceInMinutes(
          startDateTime,
          currentDate
        );
      });

      // Sort the future appointments based on the time difference
      futureAppointments.sort((a, b) => a.timeDifference - b.timeDifference);

      // Take the first three closest future appointments
      const closestAppointments = futureAppointments.slice(0, 3);

      // Extract the required information for each closest appointment
      const result = closestAppointments.map((entry) => {
        const startDateTime = new Date(entry.resource.start);
        return {
          startTime: startDateTime.toISOString(),
          minutesDuration: entry.resource.minutesDuration,
          serviceCategoryText: entry.resource.serviceCategory[0].text,
          actors: extractAllActorsForEntry(entry),
        };
      });

      return result;
    }

    function getMedicationDetails(activeMeds) {
      const appointments = activeMeds.entry || [];
    
      const medicationDetailsList = appointments
        .filter((entry) => entry.resource && entry.resource.resourceType === "MedicationRequest")
        .map((entry) => {
          const medicationRequest = entry.resource;
          const dosageInstructions = medicationRequest.dosageInstruction || [];
          const encounterReference = medicationRequest.encounter ? medicationRequest.encounter.reference : null;
          const medicationReference = medicationRequest.medicationReference;
          const reasonCode = medicationRequest.reasonCode ? medicationRequest.reasonCode[0] : null;
          const requester = medicationRequest.requester;
    
          return {
            dosageInstructions,
            encounterReference,
            medicationReference,
            reasonCode,
            requester,
          };
        });
    
      return medicationDetailsList;
    }

    const closestAppointments = getFutureAppointments(response_appts);
    console.log(closestAppointments);
    setAppointments(closestAppointments);

    const medicationDetailsList = getMedicationDetails(response_activeMeds);
    const medicationReferences = medicationDetailsList.map((listVal)=>{
      return listVal.medicationReference.reference
    })
    medicationReferences.map(val=>{
      fetch(
        myApp.smart.state.serverUrl +
          '/'+val,
        {
          headers: {
            Accept: "application/json+fhir",
            Authorization:
              "Bearer " + myApp.smart.state.tokenResponse.access_token,
          },
        }
      ).then(function (data) {
        console.log(data.json())
        return data;
      })
    })


    console.log("response_appts", response_appts);
    console.log("active_meds", response_activeMeds);
    console.log("patient", response_patient.name[0].text);
    setUser({
      Bearer: myApp.smart.state.tokenResponse.access_token,
      PatientID: myApp.smart.patient.id,
    });
  }

  return (
    <div className="container" style={{ maxWidth: 960 }}>
      <div
        className="row"
        style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }}
      >
        <div className="col">
          <h1>
            Welcome Back,{" "}
            <span style={{ color: "rgb(255, 0, 0)" }}>Noah Bastola</span>
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col">
          <h4>Upcoming appointments</h4>
        </div>
      </div>
      <div className="row row-cols-3 text-nowrap text-truncate d-flex flex-nowrap horizontal-scrollable">
        <div className="col flex-wrap" style={{ width: 325, height: "auto" }}>
          <div className="card" style={{ width: "auto", height: "100%" }}>
            <div className="card-body" style={{ maxWidth: "100%" }}>
              <div className="row">
                <div className="col">
                  <h4>
                    <span style={{ color: "rgb(255, 0, 0)" }}>Follow-up</span>
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col flex-shrink-1 text-wrap">
                  <p style={{ width: "100%", maxWidth: "100%" }}>
                    With:{" "}
                    <span style={{ color: "rgb(255, 0, 0)" }}>
                      Dr. Williams
                    </span>
                    <br />
                    On:&nbsp;{" "}
                    <span style={{ color: "rgb(255, 0, 0)" }}>
                      6/1/23 at 2:00 pm
                    </span>
                  </p>
                  <p style={{ width: "100%", maxWidth: "100%" }}>
                    At:{" "}
                    <span style={{ color: "rgb(255, 0, 0)" }}>
                      Nebraska Medicine
                    </span>
                  </p>
                </div>
              </div>
              <div className="row text-center">
                <div className="col">
                  <Link className="btn btn-primary" to="/currentMedicationList">
                    Click to begin Check-in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col flex-wrap" style={{ width: 325, height: "auto" }}>
          <div className="card" style={{ width: "auto", height: "100%" }}>
            <div className="card-body" style={{ maxWidth: "100%" }}>
              <div className="row">
                <div className="col">
                  <h4>
                    <span style={{ color: "rgb(255, 0, 0)" }}>Follow-up</span>
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col flex-shrink-1 text-wrap">
                  <p style={{ width: "100%", maxWidth: "100%" }}>
                    With:{" "}
                    <span style={{ color: "rgb(255, 0, 0)" }}>Dr. Black</span>
                    <br />
                    On:&nbsp;{" "}
                    <span style={{ color: "rgb(255, 0, 0)" }}>
                      6/12/23 at 2:00 pm
                    </span>
                  </p>
                  <p style={{ width: "100%", maxWidth: "100%" }}>
                    At:{" "}
                    <span style={{ color: "rgb(255, 0, 0)" }}>
                      Nebraska Medicine
                    </span>
                  </p>
                </div>
              </div>
              <div className="row text-center">
                <div className="col">
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{ width: "75%" }}
                  >
                    Check-in Unavailable
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col flex-wrap" style={{ width: 325, height: "auto" }}>
          <div className="card" style={{ width: "auto", height: "100%" }}>
            <div className="card-body" style={{ maxWidth: "100%" }}>
              <div className="row">
                <div className="col">
                  <h4>
                    <span style={{ color: "rgb(255, 0, 0)" }}>Follow-up</span>
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="col flex-shrink-1 text-wrap">
                  <p style={{ width: "100%", maxWidth: "100%" }}>
                    With:{" "}
                    <span style={{ color: "rgb(255, 0, 0)" }}>
                      Dr. James Tcheng{" "}
                    </span>
                    <br />
                    On:&nbsp;{" "}
                    <span style={{ color: "rgb(255, 0, 0)" }}>
                      6/21/23 at 2:00 pm
                    </span>
                  </p>
                  <p style={{ width: "100%", maxWidth: "100%" }}>
                    At:{" "}
                    <span style={{ color: "rgb(255, 0, 0)" }}>
                      Nebraska Medicine
                    </span>
                  </p>
                </div>
              </div>
              <div className="row text-center">
                <div className="col">
                  <button
                    className="btn btn-primary"
                    type="button"
                    style={{ width: "75%" }}
                  >
                    Check-in Unavailable
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col">
          <h2>Quick Links</h2>
          <ul className="landing-page-quick-links">
            <li style={{ paddingBottom: 10 }}>
              <a href="current-medications-1.html">Questionaires</a>
            </li>
            <li style={{ paddingBottom: 10 }}>
              <a href="#">Your Messages</a>
            </li>
            <li style={{ paddingBottom: 10 }}>
              <a href="#">Your Appointments Calendar</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
