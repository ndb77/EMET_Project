import React from "react";
import useScript from "../hooks/useScript";
import AddMedicationSearchBar from "./AddMedicationSearchBar";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useEffect, useState } from "react";
import AddMedicationStrengthList from "./AddMedicationStrengthList";
import AddMedicationInstructions from "./AddMedicationInstructions";
import AddMedicationPrescriber from "./AddMedicationPrescriber";
import { Link,useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useStoreActions, useStoreState } from "easy-peasy";
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
  const { data, fetchError, isLoading } = useAxiosFetch(
    `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?&terms=${search}&maxList=5&sf=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS,&df=DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS`
  );
  const saveMedication = useStoreActions((actions) => actions.saveMedication);
  const medicationsList = useStoreState((state) => state.medications);
  const history = useHistory()

  useEffect(() => {
    if (isLoading === false && search !== "" && data[1] !== []) {
      setSearchResult(data[1]);
    } else {
      setSearchResult([]);
    }
    if (isLoading === false && search !== "" && data[3].length > 0) {
      console.log('results',data[3][0][1].split(","))
      setMedicationID(()=>{
        console.log(medicationsList[1][medicationsList[1].length-1].id)
        return medicationsList[1].length ? medicationsList[1][medicationsList[1].length-1].id + 1 : 0;
      })
      setStrengthResult(data[3][0][1].split(","));
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
        console.log('data',data[3][0],'//')
        return data[3][0][2].split(",")[index];
      });
      
    } else {
      setStrengthResult([]);
      setStrength('')
    }

  }, [search, data, prescriber, instructions, strength, medicationRXCUI]);

  function splitString(string) {
    const cleanedString = string.replace(/^\s+/, "")
    const regex = /^([\d.]+)\s*(.*)$/;
    const match = cleanedString.match(regex);
    if (match) {
      const quantity = match[1];
      const description = match[2];
      return [quantity, description];
    } else {
      return null;
    }
  }

  function handleSave(){
    console.log(splitString(strength))
    let submitData = {
      id: medicationID,
      medicationName:medicationName,
      dosage: splitString(strength)[0], // /\s/.test(strength)?splitString(strength)[0]:'none',
      units: splitString(strength)[1],// /\s/.test(strength)?splitString(strength)[1]:'none',
      instructions: instructions,
      prescriber: prescriber,
      rxcuis:medicationRXCUI
    };
    console.log(submitData)
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

// function handleSave(e) {
//   e.preventDefault();
//   if (!isLastStep) {
//     console.log(firstStepSelection);
//     return next();
//   }
//   let submitData = {
//     id: id,
//     clinicianStopped: clinicianStopped,
//     dosage: newDosage.value,
//     units: newUnits.value,
//     instructions: newInstructions.value,
//     timeTaken: newTime.value,
//     sideEffect: newSideEffect.value,
//     other: other.value,
//   };
//   editMedication(submitData);
//   history.push('/updatedMedicationList')
// }
