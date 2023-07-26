import React, { useEffect, useState } from "react";
import FHIR from "fhirclient";
import { useStoreState, useStoreActions, action } from "easy-peasy";
import HomePageUpcomingAppointmentsComponent from "./HomePageUpcomingAppointmentsComponent";
const HomePage = () => {

  // Stores the logged in user's credentials into the browser's local storage
  const setUser = useStoreActions((actions) => actions.setUser);

  // Stores the logged in user's credentials into the browser's local storage
  const setRequestedMedications = useStoreActions(
    (actions) => actions.setRequestedMedications
  );

  const setMedications = useStoreActions((actions)=>actions.setMedications)

  const [userAppointments, setUserAppointments] = useState(null);
  const [userPatient, setUserPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  var myApp = {};
  useEffect(() => {
    // function to create the connection to EPIC
    FHIR.oauth2.ready().then(function (client) {
      myApp.smart = client;
      if (userAppointments != null && userPatient != null) {
        setIsLoading(false);
      } else {
        // requests for data that are sent to EPIC
        doRequests();
      }
    });
  }, [userAppointments]);

  async function doRequests() {
    // test EPIC patient ID and bearer. Not the same patient as was logged in with. 
    // Needed because logged in patient does not have any future appointments
    const appointmentsPatientID = "erXuFYUfucBZaryVksYEcMg3";
    const appointmentsPatientBearer =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiJkOWYwN2JlNi0yOGNkLTQ2OWEtYjJjMS1jNjU5NWNjODE5MDEiLCJlcGljLmVjaSI6InVybjplcGljOk9wZW4uRXBpYy1jdXJyZW50IiwiZXBpYy5tZXRhZGF0YSI6IktvNjVnQlVvbURXVEZELURlR3AtbmtSUUxiRDlPb3JGY2NraGdfaUJ6dEtiVHp0VnhwWGNHRUZYcEJGcTdwUEJ1WFZWN3BUUUV5Y1B0OVFNRzREaWxOQ2lNUDFnbW4yblV4ZFlUaENtUW5BZjAwdHVaWW1NeG1DTUtReUxuaVE3IiwiZXBpYy50b2tlbnR5cGUiOiJhY2Nlc3MiLCJleHAiOjE2OTA0MTM3ODAsImlhdCI6MTY5MDQxMDE4MCwiaXNzIjoidXJuOm9pZDpmaGlyIiwianRpIjoiYjBjY2MyMDMtOGU0My00NjAyLWJhMDAtZjFiZjM3MzIyOWIzIiwibmJmIjoxNjkwNDEwMTgwLCJzdWIiOiJldk5wLUtoWXdPT3FBWm4xcFoyZW51QTMifQ.IKIA_8usjoQzpCo4KapRl0te8TQCWWEtSJrkGUtqqMio1BzAt0_sg6yJj0IWCmR1o3F8seDW4B4poTJb1vj_rq_l3rxrnq_WD6GZzowEon9FiS7_gH7n8Pug4li2cnyZQNWSc17Aiatkqee5wuajsh9uZc_x67kw11L_dMH5-rq_8OS-aXcb9kHTDl1a6dWY3odDpXd-_p4uJ-A99inE0-seyn_Jp6scFtOCHQxrUr8x9UEY_1oKp5HtrZoM7VKDAa9VtLB5o5c-ifVXgbiiOzsqmPgjPPQBRpKCrgSh_36Z6h5v6PwbXaLFuEp98tVyLB_37lXknSUFyjfGX_2yRw";
    // getting Appointment, Patient, and MedicationRequest(active only) resources
    var [appts, patient, activeMeds] = await Promise.all([
      fetch(
        myApp.smart.state.serverUrl +
          "/Appointment?patient=" +
          (appointmentsPatientID
            ? appointmentsPatientID
            : myApp.smart.patient.id) +
          "&service-category=appointment",
        {
          headers: {
            Accept: "application/json+fhir",
            Authorization:
              "Bearer " +
              (appointmentsPatientBearer
                ? appointmentsPatientBearer
                : myApp.smart.state.tokenResponse.access_token),
          },
        }
      ).then(function (data) {
        console.log(data);
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

    // setting respective variables
    var response_appts = await appts.json();
    var response_activeMeds = await activeMeds.json();
    var response_patient = await patient.json();

    // functions to extract relevant data
    function extractAllActorsForEntry(entry) {
      const participants = entry.resource?.participant || [];
      return participants.map((participant) => participant.actor);
    }

    function extractAllActorsForAllEntries(obj) {
      const entries = obj.entry || [];
      return entries.map((entry) => extractAllActorsForEntry(entry));
    }

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

    function extractMedicationData(activeMeds) {
      const medicationDataList = [];

      if (activeMeds && activeMeds.entry && Array.isArray(activeMeds.entry)) {
        let id = 0
        activeMeds.entry.forEach((entry) => {
          if (
            entry.resource &&
            entry.resource.resourceType === "MedicationRequest"
          ) {
            const medicationRequest = entry.resource;
            const medicationReferenceDisplay =
              medicationRequest.medicationReference.display;
            const medicationReferenceId =
              medicationRequest.medicationReference.reference;
            const dosageInstructions = medicationRequest.dosageInstruction;
            const dosageInstructionsDoseAndRate = dosageInstructions.map(
              (instruction) => instruction.doseAndRate
            );
            const reasonCode = medicationRequest.reasonCode
              ? medicationRequest.reasonCode[0]
              : null;
            const requester = medicationRequest.requester
              ? medicationRequest.requester.display
              : null;
            const status = medicationRequest.status;
            const validityPeriodStart =
              medicationRequest.dispenseRequest.validityPeriod.start;
            medicationDataList.push({
              listID: id,
              confirmStatus:'unedited',
              medicationReferenceDisplay,
              medicationReferenceId,
              dosageInstructions,
              dosageInstructionsDoseAndRate,
              reasonCode,
              requester,
              status,
              validityPeriodStart,
              resource: entry.resource
            });
          }
          id = id+1;
        });
      }

      return medicationDataList;
    }


    console.log("response_appts", response_appts);
    console.log("active_meds", response_activeMeds);
    console.log("patient", response_patient.name[0].text);
    const closestAppointments = getFutureAppointments(response_appts);
    console.log("closest future 3 appointments", closestAppointments);
    setUserAppointments(closestAppointments);
    const allActorsList = extractAllActorsForAllEntries(response_appts);
    console.log("all actors", allActorsList);

    const medicationDataList = extractMedicationData(response_activeMeds);
    console.log("medications data list", medicationDataList);
    setRequestedMedications(medicationDataList);

    //Looks up the medications in the medication data list by Epic reference ID
    // Returns the RXnorm drugName as well as the RxNorm DrugObject which contains RXcuis for prescribable doses
    async function fetchMedicationData() {
      const medicationPromises = medicationDataList.map(async (entry) => {
        const data = await fetch(
          myApp.smart.state.serverUrl + "/" + entry.medicationReferenceId,
          {
            headers: {
              Accept: "application/json+fhir",
              Authorization:
                "Bearer " +
                (appointmentsPatientBearer
                  ? appointmentsPatientBearer
                  : myApp.smart.state.tokenResponse.access_token),
            },
          }
        );
        return await data.json();
      });
      const medicationLookupValue = await Promise.all(medicationPromises);
      return medicationLookupValue;
    }

    function extractRxNormCodes(data) {
      const rxnormCodes = [];

      data.forEach((entry) => {
        const rxNormVals = entry.code.coding.filter((item) =>
          item.system.includes("rxnorm")
        );
        rxNormVals.forEach((item) => rxnormCodes.push(item.code));
      });
      return rxnormCodes;
    }

    function getApiResponse(searchTerm) {
      const apiUrl = `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${searchTerm}&maxList=5&sf=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS,&df=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS`;

      return fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          return null;
        });
    }

    function getMultipleApiResponses(searchList) {
      const promises = searchList.map((searchTerm) =>
        getApiResponse(searchTerm)
      );
      console.log("promises", promises);
      return Promise.all(promises);
    }

    function getApiResponse(searchTerm) {
      const apiUrl = `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${searchTerm}&maxList=5&sf=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS,&df=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS`;

      return fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          return null;
        });
    }

    function findDrugObjectWithDose(resl, searchString) {
      let result = {};
    
      for (const entry of resl) {
        const drugObject = entry[3][0];
        if (drugObject[1].includes(searchString)) {
          const drugObjectModified = drugObject.map(item => {
            return item.includes(',') ? item.split(',') : item;
          });
          result = {
            drugName: entry[1][0],
            drugObject: drugObjectModified
          };
        }
      }
    
      return result;
    }

    function extractNumberAndUnits(medicationName) {
      const regex = /(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)\s+(\S+)/;
      const match = medicationName.match(regex);
    
      return match
        ? { number: `${match[1]}-${match[2]}`, units: match[3] }
        : null;
    }
    
    function appendDrugObjectToMedList(medLookup, medList, drugObject) {
      // Extract the medicationReferenceId from medLookup
      const medLookupId = medLookup[0]['id'];
    
      // Find the index in medList that matches the medicationReferenceId
      const index = medList.findIndex(item => item.medicationReferenceId.split('/')[1] === medLookupId);
    
      // If the index is found, create the drugObject using the data from medLookup
      if (index !== -1) {
        // Append the drugObject to the correct entry in medList
        medList[index]["rxNormData"] = drugObject;
        medList[index]['edits'] = {}
      }
    
      return medList;
    }

    fetchMedicationData()
      .then((medicationLookupValue) => {
        console.log("medLookup", medicationLookupValue);
        const medicationSearchValues = extractRxNormCodes(
          medicationLookupValue
        );
        const dosageAmount = extractNumberAndUnits(medicationLookupValue[0].code.text).number
        const dosageUnits = extractNumberAndUnits(medicationLookupValue[0].code.text).units
        console.log('searchVals',medicationSearchValues);
        try {
          const rxTermsResponses = getMultipleApiResponses(
            medicationSearchValues
          ).then((result) => {
            return result.filter(
              (entry) => entry[1].length > 0 && entry[3].length > 0
            );
          }).then((result)=>{

            console.log('resl',result)
            const searchString = dosageAmount + ' ' + dosageUnits
            let drugObject = findDrugObjectWithDose(result,searchString)
            drugObject['dosage'] = dosageAmount
            drugObject['dosageUnits'] = dosageUnits
            console.log('obj',drugObject)
            appendDrugObjectToMedList(medicationLookupValue,medicationDataList,drugObject)
            console.log('newList',medicationDataList)
            setMedications(medicationDataList)
          });
          // const filteredRxTermsResponses = rxTermsResponses.filter(entry => entry[1].length > 0 && entry[3].length > 0);
          // You can now use the rxTermsResponses constant containing the list of responses.
        } catch (error) {
          console.error("Error:", error);
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });

    setUserPatient(response_patient.name[0].text);
    console.log(userAppointments);
    setUser({
      Bearer: myApp.smart.state.tokenResponse.access_token,
      PatientID: myApp.smart.patient.id,
    });
  }

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="container" style={{ maxWidth: 960 }}>
        <div
          className="row"
          style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }}
        >
          <div className="col">
            <h1>
              Welcome Back,{" "}
              <span style={{ color: "rgb(255, 0, 0)" }}>{userPatient}</span>
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
          <HomePageUpcomingAppointmentsComponent
            appointmentType={userAppointments[0].serviceCategoryText}
            physician={userAppointments[0].actors[1].display}
            startTime={userAppointments[0].startTime}
            location={userAppointments[0].actors[2].display}
            checkInAvailable={true}
          />
          <HomePageUpcomingAppointmentsComponent
            appointmentType={userAppointments[1].serviceCategoryText}
            physician={userAppointments[1].actors[1].display}
            startTime={userAppointments[1].startTime}
            location={userAppointments[1].actors[2].display}
            checkInAvailable={false}
          />
          <HomePageUpcomingAppointmentsComponent
            appointmentType={userAppointments[2].serviceCategoryText}
            physician={userAppointments[2].actors[1].display}
            startTime={userAppointments[2].startTime}
            location={userAppointments[2].actors[2].display}
            checkInAvailable={false}
          />
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
  }
};

export default HomePage;
