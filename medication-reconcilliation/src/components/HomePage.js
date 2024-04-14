import React, { useEffect, useState } from 'react';
import FHIR from 'fhirclient';
import { useStoreActions } from 'easy-peasy';
import HomePageUpcomingAppointmentsComponent from './HomePageUpcomingAppointmentsComponent';

// When the home page is loaded, it makes API calls to EPIC using the authentication information
// stored by the FHIRSignInButton within the fhirclient
// It uses a variety of functions to convert the API response into data
// structures are then stored into the application local storage to be used by
// the components in the rest of the app
const HomePage = () => {
  // Stores the logged in user's credentials into the browser's local storage
  const setUser = useStoreActions((actions) => actions.setUser);

  // Stores the logged in user's credentials into the browser's local storage
  const setRequestedMedications = useStoreActions(
    (actions) => actions.setRequestedMedications,
  );

  // setMedications will store store the list of current medications.
  // the outer layer of the list is the a running history of medications added to the list
  // the inner layer of the list is the list of medicatiosn for that iteration in the history
  // for example, the first storage of the medication list with one medication on the list is 
  // [0(history version)][0(medication list)]
  // the second storage of the medication list with 3 neew medications on the list will
  // be [1][0-2(medication list)]
  const setMedications = useStoreActions((actions) => actions.setMedications);

  const [userAppointments, setUserAppointments] = useState(null);
  const [userPatient, setUserPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  let myApp = {};
  async function doRequests() {
    // test EPIC patient ID and bearer. Not the same patient as was logged in with.
    // Needed because logged in patient does not have any future appointments
    const appointmentsPatientID = 'erXuFYUfucBZaryVksYEcMg3'; // Paste your patient ID here
    const appointmentsPatientBearer = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ1cm46b2lkOmZoaXIiLCJjbGllbnRfaWQiOiJkOWYwN2JlNi0yOGNkLTQ2OWEtYjJjMS1jNjU5NWNjODE5MDEiLCJlcGljLmVjaSI6InVybjplcGljOk9wZW4uRXBpYy1jdXJyZW50IiwiZXBpYy5tZXRhZGF0YSI6IjB4bGtVNEJqbC16WlowZHpVQmpBZldxdHpqWExQTFh1X1RKNkhkaEdlR2xRVXJmTXhZeE94bnV3NGhhYUc4dE1xeEM0b3lEZHRrVF96Y1h6QjF0dkdBczNCZHlVWGZYa0VDVGk3QzZrcFVid0NYYV9IV1RLWHRjeGRONW9vNFJiIiwiZXBpYy50b2tlbnR5cGUiOiJhY2Nlc3MiLCJleHAiOjE3MTMxMzQ5MzIsImlhdCI6MTcxMzEzMTMzMiwiaXNzIjoidXJuOm9pZDpmaGlyIiwianRpIjoiMWYwN2JlNWMtNzU1Yy00MTIzLTlkZWEtY2YwODY5N2NmOTQ5IiwibmJmIjoxNzEzMTMxMzMyLCJzdWIiOiJldk5wLUtoWXdPT3FBWm4xcFoyZW51QTMifQ.ocwF4b-yB1q7Gj48TD49RHDoYjOJWk0z4tgweQjiZ1aAaWTyx407yJNGXJhSYf_GdO4UXv4srfZBOUFwG232wORxFNWFdukb_7zY0sn7SXXHqPWJCfy3dyAy-FReVDB9PccvVMxBQTT6FaqeufJgofelaKQZvxePbjT6HllvH_ImAvrlntUSoqcnR84864AaP5CWv_u2XwRl_d1jQeSb_cFcbwB8BPt21_b_VvEamdRwXzSV-lJ_9wiEB56LqPhl8dX1Hm3BY_ILD6qoUT2JefplrczymAxQtcH0dkTRHtlblnCmoVHR3ABOwdKcq2jsCYj14sheXEusuM2R1utAIw'; // paste your bearer string here
    
    // getting Appointment, Patient, and MedicationRequest(active only) resources
    console.log('req',myApp.smart.state.serverUrl +
    '/Appointment?patient=' + (appointmentsPatientID!==''?appointmentsPatientID:myApp.smart.patient.id) + '&service-category=appointment')
    var [appts, patient, activeMeds] = await Promise.all([
      fetch(
        myApp.smart.state.serverUrl +
          '/Appointment?patient=' + (appointmentsPatientID!==''?appointmentsPatientID:myApp.smart.patient.id) + '&service-category=appointment',
        {
          headers: {
            Accept: 'application/json+fhir',
            Authorization:
              'Bearer ' + (appointmentsPatientBearer!==''?appointmentsPatientBearer:myApp.smart.state.tokenResponse.access_token),
          },
        }
      ).then(function (data) {
        return data;
      }),
      fetch(
        myApp.smart.state.serverUrl + '/Patient/' + myApp.smart.patient.id,
        {
          headers: {
            Accept: 'application/json+fhir',
            Authorization:
              'Bearer ' + myApp.smart.state.tokenResponse.access_token,
          },
        }
      ).then(function (data) {
        return data;
      }),
      fetch(
        myApp.smart.state.serverUrl +
          '/MedicationRequest?patient=' +
          myApp.smart.patient.id +
          '&status=active',
        {
          headers: {
            Accept: 'application/json+fhir',
            Authorization:
              'Bearer ' + myApp.smart.state.tokenResponse.access_token,
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

    console.log('response_appointments',response_appts)
    console.log('response_activeMeds',response_activeMeds)
    console.log('response_patient',response_patient)

    // functions to extract relevant data
    function extractAllActorsForEntry(entry) {
      const participants = entry.resource?.participant || [];
      return participants.map((participant) => participant.actor);
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

    // Used to retrieve specific medication data within the the MedicationRequest FHIR call response
    // Stores this information into the medicationdataList
    function extractMedicationData(activeMeds) {
      const medicationDataList = [];

      if (activeMeds && activeMeds.entry && Array.isArray(activeMeds.entry)) {
        let id = 0;
        activeMeds.entry.forEach((entry) => {
          if (
            entry.resource &&
            entry.resource.resourceType === 'MedicationRequest'
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
            medicationDataList.push({
              listID: id,
              confirmStatus: 'unedited',
              medicationReferenceDisplay,
              medicationReferenceId,
              dosageInstructions,
              dosageInstructionsDoseAndRate,
              reasonCode,
              requester,
              status,
              resource: entry.resource,
            });
          }
          id = id + 1;
        });
      }

      return medicationDataList;
    }
    const closestAppointments = getFutureAppointments(response_appts);
    console.log('closest future 3 appointments', closestAppointments);

    setUserAppointments(closestAppointments);
    console.log(userAppointments)

    const medicationDataList = extractMedicationData(response_activeMeds);
    setRequestedMedications(medicationDataList);

    //Looks up the medications in the medication data list by Epic reference ID
    // Returns the RXnorm drugName as well as the RxNorm DrugObject which contains RXcuis for prescribable doses
    async function fetchMedicationData() {
      const medicationPromises = medicationDataList.map(async (entry) => {
        const data = await fetch(
          myApp.smart.state.serverUrl + '/' + entry.medicationReferenceId,
          {
            headers: {
              Accept: 'application/json+fhir',
              Authorization:
                'Bearer ' +
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

    // EPIC provides many codes for the same medication. This function looks through the drug codes to find the ones that are RxNorm.
    function extractRxNormCodes(data) {
      const rxnormCodes = [];

      data.forEach((entry) => {
        const rxNormVals = entry.code.coding.filter((item) =>
          item.system.includes('rxnorm')
        );
        rxNormVals.forEach((item) => rxnormCodes.push(item.code));
      });
      return rxnormCodes;
    }

    // These functions use the NLM API to look up the RxNorm medication name for the rxcuis provided by EPIC
    function getApiResponse(searchTerm) {
      const apiUrl = `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${searchTerm}&maxList=5&sf=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS,&df=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS`;

      return fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          return response.json();
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          return null;
        });
    }

    function getMultipleApiResponses(searchList) {
      const promises = searchList.map((searchTerm) =>
        getApiResponse(searchTerm)
      );
      return Promise.all(promises);
    }

    //Ensures that the selected medication from the RxNorm has dosages associated with them
    function findDrugObjectWithDose(resl, searchString) {
      let result = {};

      for (const entry of resl) {
        const drugObject = entry[3][0];
        const nameList = drugObject[1].split(',');
        // console.log('searchstring', searchString);
        if (
          nameList.some((item) => item.includes(searchString.toLowerCase()))
        ) {
          const drugObjectModified = drugObject.map((val) => {
            return val.includes(',') ? val.split(',') : val;
          });
          result = {
            drugName: entry[1][0],
            drugObject: drugObjectModified,
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
      const index = medList.findIndex(
        (item) => item.medicationReferenceId.split('/')[1] === medLookupId
      );

      // If the index is found, create the drugObject using the data from medLookup
      if (index !== -1) {
        // Append the drugObject to the correct entry in medList
        medList[index]['rxNormData'] = drugObject;
        medList[index]['edits'] = {};
      }

      return medList;
    }

    fetchMedicationData()
      .then((medicationLookupValue) => {
        // console.log('medLookup', medicationLookupValue);
        const medicationSearchValues = extractRxNormCodes(
          medicationLookupValue
        );
        const dosageAmount = extractNumberAndUnits(
          medicationLookupValue[0].code.text
        ).number;
        const dosageUnits = extractNumberAndUnits(
          medicationLookupValue[0].code.text
        ).units;
        // console.log('searchVals', medicationSearchValues);
        try {
          const rxTermsResponses = getMultipleApiResponses(
            medicationSearchValues
          )
            .then((result) => {
              return result.filter(
                (entry) => entry[1].length > 0 && entry[3].length > 0
              );
            })
            .then((result) => {
              const searchString = dosageAmount + ' ' + dosageUnits;
              let drugObject = findDrugObjectWithDose(result, searchString);
              drugObject['dosage'] = dosageAmount;
              drugObject['dosageUnits'] = dosageUnits.toLowerCase();
              appendDrugObjectToMedList(
                medicationLookupValue,
                medicationDataList,
                drugObject
              );
              setMedications(medicationDataList);
            });
          // const filteredRxTermsResponses = rxTermsResponses.filter(entry => entry[1].length > 0 && entry[3].length > 0);
          // You can now use the rxTermsResponses constant containing the list of responses.
        } catch (error) {
          console.error('Error:', error);
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });

    setUserPatient(response_patient.name[0].text);
    setUser({
      Bearer: myApp.smart.state.tokenResponse.access_token,
      PatientID: myApp.smart.patient.id,
      patientDisplay: response_patient.name[0].text
    });
  }
  
  useEffect(() => {
    // function to create the connection to EPIC
    FHIR.oauth2.ready().then(function (client) {
      myApp.smart = client;
      if (userPatient != null) {
        setIsLoading(false);
      } else {
        // requests for data that are sent to EPIC
        doRequests();
      }
    });
  }, [userPatient]);

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    console.log('userAppointments', userAppointments);
    return (
      <div className='container' style={{ maxWidth: 960 }}>
        <div
          className='row'
          style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }}
        >
          <div className='col'>
            <h1>
              Welcome Back,{' '}
              <span style={{ color: 'rgb(255, 0, 0)' }}>{userPatient}</span>
            </h1>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col'>
            <h4>Upcoming appointments</h4>
          </div>
        </div>
        <div className='row row-cols-3 text-nowrap text-truncate d-flex flex-nowrap horizontal-scrollable'>
          <HomePageUpcomingAppointmentsComponent
            appointmentType={
              userAppointments[0]
                ? userAppointments[0].serviceCategoryText
                : 'Dummy Description'
            }
            physician={
              userAppointments[0]
                ? userAppointments[0].actors[1].display
                : 'Dummy Physician'
            }
            startTime={
              userAppointments[0] ? userAppointments[0].startTime : '00:00 AM'
            }
            location={
              userAppointments[0]
                ? userAppointments[0].actors[2].display
                : 'Dummy location'
            }
            checkInAvailable={true}
          />
          <HomePageUpcomingAppointmentsComponent
            appointmentType={
              userAppointments[1]
                ? userAppointments[1].serviceCategoryText
                : 'Dummy Description'
            }
            physician={
              userAppointments[1]
                ? userAppointments[1].actors[1].display
                : 'Dummy Physician'
            }
            startTime={
              userAppointments[1] ? userAppointments[1].startTime : '00:00 AM'
            }
            location={
              userAppointments[1]
                ? userAppointments[1].actors[2].display
                : 'Dummy location'
            }
            checkInAvailable={false}
          />
          <HomePageUpcomingAppointmentsComponent
            appointmentType={
              userAppointments[2]
                ? userAppointments[2].serviceCategoryText
                : 'Dummy Description'
            }
            physician={
              userAppointments[2]
                ? userAppointments[2].actors[1].display
                : 'Dummy Physician'
            }
            startTime={
              userAppointments[2] ? userAppointments[2].startTime : '00:00 AM'
            }
            location={
              userAppointments[2]
                ? userAppointments[2].actors[2].display
                : 'Dummy Location'
            }
            checkInAvailable={false}
          />
        </div>
        <div className='row' style={{ marginTop: 10 }}>
          <div className='col'>
            <h2>Quick Links</h2>
            <ul className='landing-page-quick-links'>
              <li style={{ paddingBottom: 10 }}>
                <a href='current-medications-1.html'>Questionaires</a>
              </li>
              <li style={{ paddingBottom: 10 }}>
                <a href='#'>Your Messages</a>
              </li>
              <li style={{ paddingBottom: 10 }}>
                <a href='#'>Your Appointments Calendar</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;
