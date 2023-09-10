import React from "react";
import AddMedicationSearchBar from "./AddMedicationSearchBar";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useEffect, useState } from "react";
import AddMedicationStrengthList from "./AddMedicationStrengthList";
import AddMedicationInstructions from "./AddMedicationInstructions";
import AddMedicationPrescriber from "./AddMedicationPrescriber";
import { Link,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useStoreActions, useStoreState } from "easy-peasy";
import AddMedicationWhenTaken from "./AddMedicationWhenTaken";


// This menu is a child of the AddMedicationPage and a parent of AddMedicationInstructions, AddMedicationPrescriber, AddMedicationSearchBar, AddMedicationstrengthList, AddMedicationWhenTaken
// This menu collects information from all of its child components and packages the information into an object "submitData" which is sent to the local browser storage
const AddMedicationMenu = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [strengthResult, setStrengthResult] = useState([]);
  const [strength, setStrength] = useState("");
  const [prescriber, setPrescriber] = useState("");
  const [instructions, setInstructions] = useState("");
  const [medicationName, setMedicationName] = useState("");
  const [medicationRXCUI, setMedicationRXCUI] = useState("");
  const [medicationID, setMedicationID] = useState("");
  const [medicationWhenTaken,setMedicationWhenTaken] = useState("")

  //This API call is used for the the autocomplete functionality of the search bar and search result
  const { data, fetchError, isLoading } = useAxiosFetch(
    `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?&terms=${search}&maxList=5&sf=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS,&df=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS`
  );
  const saveMedication = useStoreActions((actions) => actions.saveMedication);
  const medicationsList = useStoreState((state) => state.medications);
  const history = useHistory()

  useEffect(() => {

    // data[1] refers to the medication name which is returned by the api call at index 1
    if (isLoading === false && search !== "" && data[1] !== []) {
      setSearchResult(data[1]);
    } else {
      setSearchResult([]);
    }
    //Check to see that the strengths list is not empty
    if (isLoading === false && search !== "" && data[3].length > 0) {
      setMedicationID(()=>{
        // setting the medicationID for the local medication list.
        return medicationsList.length ? medicationsList[medicationsList.length-1].listID + 1 : 0;
      })
      // setting the strength results list that is available in the strength dropdown menu
      // data[3][0][1] returns a list of strengths for the selected medication
      function splitStringByCommas(inputString) {
        // Remove commas from numbers with 4 or more digits
        const formattedString = inputString.replace(/(\d),(\d{3})/g, '$1$2');
        
        // Split the formatted string by commas
        const trimmedString = formattedString.trim(); // Remove leading/trailing whitespace
        const splitArray = trimmedString.split(',').map(item => item.trim()); // Split and trim each item
        return splitArray;
      }
      console.log(data[3][0][1])
      console.log(splitStringByCommas(data[3][0][1]))
      setStrengthResult(splitStringByCommas(data[3][0][1]));
      setMedicationRXCUI(() => {
        let index = 0;
        if (
          strength === "" ||
          strengthResult.findIndex((strengthVal) => strengthVal == strength) ===
            -1
        ) {
          index= 0;
          setStrength(data[3][0][1].split(",")[0])
        } else {
          index = strengthResult.findIndex(
            (strengthVal) => strengthVal == strength
          );
          setStrength(strength)
        }
        return data[3][0][2].split(",")[index];
      });
      
    } else {
      setStrengthResult([]);
      setStrength('')
    }

  }, [search, data, prescriber, instructions, strength, medicationRXCUI]);

  // Function to split up the dose and units returned by the NLM API
  function splitString(string) {
    const cleanedString = string.replace(/^\s+/, "");
    const regex = /^([\d.,-]+)\s*(.*)$/; // Updated regex to allow for decimal, comma, hyphen, and dot in quantity
    const match = cleanedString.match(regex);
    if (match) {
      const quantity = match[1].replace(/,/g, ''); // Remove commas from the quantity
      const description = match[2];
      return [quantity, description];
    } else {
      return null;
    }
  }

  // Stores the medication information into the local storage. Triggered upon clicking save changes
  function handleSave(){
    let submitData = {
      id: medicationID,
      medicationName:medicationName,
      dosage: splitString(strength)[0], // /\s/.test(strength)?splitString(strength)[0]:'none',
      units: splitString(strength)[1],// /\s/.test(strength)?splitString(strength)[1]:'none',
      whenTaken:medicationWhenTaken,
      instructions: instructions,
      prescriber: prescriber,
      rxcuis:medicationRXCUI,
      drugObject: data[3][0],
    };
    saveMedication(submitData);
    history.push('/updatedMedicationList')
  }

  return (
    <div>
      <div className="row" style={{ marginTop: 20, minHeight: 400 }}>
        <div className="col">
          <div
            className="hrz-txt-scroll"
            style={{ overflow: "scroll", paddingRight: 0, paddingLeft: 0 }}
          >
            <div className="col-auto">
              <div
                className="row d-lg-flex justify-content-lg-center"
                style={{ height: 400 }}
              >
                <div className="col-auto mx-auto">
                  <div
                    className="row"
                    style={{ minHeight: 38, marginBottom: 10 }}
                  >
                    <div className="col">
                      <h4 style={{ textAlign: "right" }}>
                        Name of new medication
                      </h4>
                    </div>
                    <div className="col-auto">
                      <AddMedicationSearchBar
                        setSearch={setSearch}
                        searchResult={searchResult}
                        setSearchResult={setSearchResult}
                        search={search}
                        setMedicationName={setMedicationName}
                        setStrength={setStrength}
                      />
                    </div>
                  </div>
                  <div
                    className="row d-flex"
                    style={{ minHeight: 38, marginBottom: 10 }}
                  >
                    <div className="col">
                      <h4 style={{ textAlign: "right" }}>Strength</h4>
                    </div>
                    <div className="col-auto">
                      <AddMedicationStrengthList
                        setStrength={setStrength}
                        strengthResult={strengthResult}
                        setMedicationRXCUI={setMedicationRXCUI}
                      />
                    </div>
                  </div>
                  <div
                    className="row d-flex"
                    style={{ minHeight: 38, marginBottom: 10 }}
                  >
                    <div className="col">
                      <h4 style={{ textAlign: "right" }}>Instructions</h4>
                    </div>
                    <div className="col">
                      <div className="col-auto">
                        <AddMedicationInstructions
                          setInstructions={setInstructions}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="row d-flex"
                    style={{ minHeight: 38, marginBottom: 10 }}
                  >
                    <div className="col">
                      <h4 style={{ textAlign: "right" }}>
                        Prescribing physician
                      </h4>
                    </div>
                    <div className="col">
                      <AddMedicationPrescriber setPrescriber={setPrescriber} />
                    </div>
                  </div>
                  <div
                    className="row d-flex"
                    style={{ minHeight: 38, marginBottom: 10 }}
                  >
                    <div className="col">
                      <h4 style={{ textAlign: "right" }}>
                        What time do you take it?
                      </h4>
                    </div>
                    <div className="col">
                      <AddMedicationWhenTaken setMedicationWhenTaken={setMedicationWhenTaken} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row d-flex d-lg-flex justify-content-center flex-nowrap justify-content-lg-center"
        style={{ marginTop: 50, marginBottom: 20, position: "relative" }}
      >
        <div className="col-auto" style={{ textAlign: "center" }}>
          <Link
            to="/updatedMedicationList"
            className="btn btn-primary"
            role="button"
            style={{
              marginRight: 20,
              background: "var(--bs-danger-bg-subtle)",
              color: "var(--bs-emphasis-color)",
            }}
          >
            Discard Changes
          </Link>
        </div>
        <div className="col-auto" style={{ textAlign: "center" }}>
          <Link
            className="btn btn-primary"
            role="button"
            to='/updatedMedicationList'
            style={{
              marginLeft: 20,
              color: "var(--bs-emphasis-color)",
              background: "var(--bs-success-border-subtle)",
            }}
            onClick={handleSave}
          >
            Save Changes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddMedicationMenu;