import { createStore, action, thunk, computed } from "easy-peasy";
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + "-" + mm + "-" + dd;
export default createStore({
  medications: [],
  requestedMedications: [],
  appointments: [],
  setAppointments: action((state, payload) => {
    state.appointments = payload;
  }),
  user: {},
  setUser: action((state, payload) => {
    const { Bearer, PatientID,patientDisplay } = payload;
    let loggedInUser = {};
    loggedInUser = {
      bearer: Bearer,
      patientID: PatientID,
      patientDisplay: patientDisplay
    };
    state.user = payload;
  }),
  setRequestedMedications: action((state, payload) => {
    state.requestedMedications = payload;
  }),
  setMedications: action((state, payload) => {
    state.medications = payload
  }),
  saveMedication: thunk(async (actions, newMedication, helpers) => {
    const { medications } = helpers.getState();
    const {PatientID,patientDisplay} = helpers.getState();
    const {
      id,
      medicationName,
      dosage,
      units,
      whenTaken,
      instructions,
      prescriber,
      drugObject,
      rxcuis,
    } = newMedication;
    const medicationToAdd = 
    {
      listID: id,
      confirmStatus: 'unedited',
      medicationReferenceDisplay: medicationName,
      medicationWhenTaken:whenTaken.toString(),
      medicationReferenceId: '',
      dosageInstructions: [
        {
          text: instructions,
          patientInstruction: instructions,
          doseAndRate: [
            {
              type: {
                coding: [
                  {
                    system: '',
                    code: '',
                    display: ''
                  }
                ],
                text: ''
              },
              doseQuantity: {
                value: dosage,
                unit: 'tablet',
                system: 'http://unitsofmeasure.org',
                code: '{tbl}'
              }
            },
          ]
        }
      ],
      reasonCode: {
        coding: [{}
        ],
        text: ''
      },
      requester: prescriber,
      status: 'active',
      validityPeriodStart: today,
      resource: {
        resourceType: 'MedicationRequest',
        id: `patientAdded.${id}`,
        identifier: [
          {
            use: '',
            system: '',
            value: ''
          }
        ],
        status: 'active',
        intent: '',
        category: [
          {
            coding: [
              {
                system: '',
                code: '',
                display: ''
              }
            ],
            text: ''
          }
        ],
        medicationReference: {
          reference: `Medication/patientAdded.${id}`,
          display: medicationName
        },
        subject: {
          reference: PatientID,
          display: patientDisplay
        },
        encounter: {
          reference: '',
          identifier: {
            use: '',
            system: '',
            value: ''
          },
          display: ''
        },
        authoredOn: today,
        requester: {
          reference: '',
          type: 'Practitioner',
          display: prescriber
        },
        recorder: {
          reference: '',
          type: 'Practitioner',
          display: prescriber
        },
        reasonCode: [
          {
            coding: [
              {
                system: 'http://snomed.info/sct',
                code: '',
                display: ''
              },
              {
                system: 'http://hl7.org/fhir/sid/icd-9-cm/diagnosis',
                code: '',
                display: ''
              },
              {
                system: 'http://hl7.org/fhir/sid/icd-10-cm',
                code: '',
                display: ''
              }
            ],
            text: ''
          }
        ],
        courseOfTherapyType: {
          coding: [
            {
              system: 'http://terminology.hl7.org/CodeSystem/medicationrequest-course-of-therapy',
              code: '',
              display: ''
            }
          ],
          text: ''
        },
        dosageInstruction: [
          {
            text: 'Take 1 tablet by mouth 1 (one) time each day., Starting Tue 5/28/2019, Until Wed 5/27/2020, Normal',
            patientInstruction: instructions,
            timing: {
              repeat: {
              },
              code: {
                text: ''
              }
            },
            asNeededBoolean: null,
            route: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '',
                  display: ''
                },
                {
                  system: 'urn:oid:1.2.840.114350.1.13.0.1.7.4.798268.7025',
                  code: '',
                  display: ''
                }
              ],
              text: ''
            },
            method: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '',
                  display: ''
                }
              ],
              text: ''
            },
            doseAndRate: [
              {
                type: {
                  coding: [
                    {
                      system: 'http://epic.com/CodeSystem/dose-rate-type',
                      code: '',
                      display: ''
                    }
                  ],
                  text: ''
                },
                doseQuantity: {
                  value: dosage,
                  unit: 'tablet',
                  system: 'http://unitsofmeasure.org',
                  code: '{tbl}'
                }
              },
              {
                type: {
                  coding: [
                    {
                      system: 'http://epic.com/CodeSystem/dose-rate-type',
                      code: '',
                      display: ''
                    }
                  ],
                  text: ''
                },
                doseQuantity: {
                  value: dosage,
                  unit: '',
                  system: 'http://unitsofmeasure.org',
                  code: '{tbl}'
                }
              },
              {
                type: {
                  coding: [
                    {
                      system: 'http://epic.com/CodeSystem/dose-rate-type',
                      code: '',
                      display: ''
                    }
                  ],
                  text: ''
                },
                doseQuantity: {
                  value: dosage,
                  unit: 'tablet',
                  system: 'http://unitsofmeasure.org',
                  code: '{tbl}'
                }
              }
            ]
          }
        ],
        dispenseRequest: {
          validityPeriod: {
            start: today

          },
          numberOfRepeatsAllowed: '',
          quantity: {
            value: '',
            unit: ''
          },
          expectedSupplyDuration: {
            value: '',
            unit: '',
            system: 'http://unitsofmeasure.org',
            code: ''
          }
        }
      },
      rxNormData: {
        drugName: medicationName,
        drugObject: drugObject,
        dosage: dosage,
        dosageUnits: units
      },
      edits: {}
    }
    try {
      actions.setMedications([...medications, medicationToAdd]);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
  editMedication: thunk(async (actions, medicationUpdate, helpers) => {
    const { medications } = helpers.getState();
    const { id } = medicationUpdate;

    function removeUndefinedValues(obj) {
      const cleanedObj = {};

      for (let key in obj) {
        if (obj[key] !== undefined) {
          cleanedObj[key] = obj[key];
        }
      }
      return cleanedObj;
    }
    try {
      const medicationToEdit = medications.find(
        (item) => item.listID === Number(id)
      );
      const cleanedMedicationUpdate = removeUndefinedValues(medicationUpdate);
      medicationToEdit.edits = cleanedMedicationUpdate;
      medicationToEdit.confirmStatus = "edited";
      medicationToEdit.lastModified = today;
      // await api.put(`/medications/${id}`, medicationToEdit);
      actions.setMedications(
        medications.map((med) => (med.id === id ? medicationToEdit : med))
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
  changeMedicationStatus: thunk(async (actions, statusChange, helpers) => {
    const { medicationID, status } = statusChange;
    const { medications } = helpers.getState();
    try {
      const medicationToEdit = medications.find((item)=>item.listID===medicationID)
      medicationToEdit.confirmStatus = status
      actions.setMedications(
        medications.map((med) => (med.id === medicationID ? medicationToEdit : med))
      );
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
});
