# Enhanced Medical Education Track Project

A FHIR application created to improve medication adherence. This project was created with support from the University of Nebraska Medical Center's Medical Student Summer Research Program and UNMC's Center for Intelligent Healthcare. This project is intended to demonstrate a Proof of Concept of a FHIR-enabled medication adherence web application, which makes use of EPIC's Electronic Healthcare Record sandbox.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Getting Started

### Cloning the repository

Ensure that git is installed on your computer. Clone this repository by running the command `git clone https://github.com/ndb77/EMET_Project.git`

### Obtaining EPIC credentials

Because this web application uses FHIR resources to interface with the EPIC system, you will need to set up EPIC credentials for your instance of this application.

1. Navigate to https://fhir.epic.com/Developer/Index and set up an account
2. Navigate to the "Build Apps" section at the top of the screen and click "Create"
3. Fill out the Create an App form, selecting "Patients" for the intended audience
4. From the available APIs, select the following APIs
  * PATIENT.READ 
  * PATIENT.SEARCH 
  * OBSERVATION.READ 
  * OBSERVATION.SEARCH 
  * MEDICATIONREQUEST.READ
  * MEDICATIONREQUEST.SEARCH
5. Designate the URL to which EPIC will redirect to after authentication. For this application, we use `localhost:3000/home`
6. Select "Can Register Dynamic Clients"
7. Select "Refresh Token Grant Type"
8. Select FHIR version "R4"
9. Select "Use Unconstrainted FHIR IDs"
10. **Copy the non-production client ID at the top of the form.**
11. Fill out the rest of the form as needed, and click "Save and Ready for Sandbox"

At the time of writing, EPIC does not have upcoming appointments for the test patient we use in this example. For this reason, we will also need to get test data for Appointments.
1. Click API specifications at the top of the page
2. Search for Appointments.Search and select the R4 version
3. Click "Try It" in the right hand corner
4. **Copy the patient ID. This will be the patient ID used for appointments.**
4. Click the plus button next to "Raw Request" 
5. **Copy the text string after "Bearer." This will be the bearer string used for appointments.** 

### Setting up and Running the web app

Once the EMET_project directory is set up on your local device, and you have registered your instance of the application with EPIC:
1. Navigate to `./medication-adherence/src/components/FhirSignInButton.js` and **paste your client ID into the clientID variable**
2. Navigate to `./medication-adherence/src/components/HomePage.js` and **paste your appointments ID into appointmentsPatientID and bearer into appointmentsPatientBearer**. Note that the bearer token expires on a timed basis. 
3. Navigate to `./medication-adherence` and run the command `npm start`
4. EPIC credentials for this applications test patient are:
  * username: **fhircamila**
  * password: **epicepic1**
  * Other test patients with different available data are found here: https://fhir.epic.com/Documentation?docId=testpatients