import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import React from "react";
import useAutoComplete from "../hooks/useAutoComplete";
export function ChangeMedicationFormReason2({
  firstStepSelection,
  setClinicianStopped,
  editDosage,
  editUnits,
  editInstructions,
  editTime,
  setNewSideEffect,
  setOther,
  id,
}) {
  const [isLoading, setLoading] = useState(true);
  const medications = useStoreState((state) => state.medications);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [strengthResult, setStrengthResult] = useState([]);
  const [strength, setStrength] = useState("");
  const [strengthID, setStrengthID] = useState(null);
  const [instructions, setInstructions] = useState("");
  const { autoCompleteData, autoCompleteFetchError, autoCompleteDataLoading } = useAutoComplete(
    `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?&terms=${medications!==null?medications[1].filter(medication=>medication.id==1)[0].medicationName.split(" ")[0]:""}&maxList=5&sf=DISPLAY_NAME,STRENGTHS_AND_FORMS&df=DISPLAY_NAME,STRENGTHS_AND_FORMS`
  );

  useEffect(() => {
    autoCompleteData==[]?setSearchResult([]):setSearchResult(autoCompleteData[3])
    // if(searchResult!==[]){
    //   setLoading(false)
    //   setSearchResult(autoCompleteData[3])
    // }
  }, [medications,autoCompleteData]);

  if (!isLoading) {
    return <div>Loading</div>;
  }else{
    if (firstStepSelection === "clinicianStop") {
      setClinicianStopped(true);
      return (
        <div className="card-body">
          <h4>Clinician Stopped</h4>
          <p>
            Got it. Please click finish below to save changes, or back to change
            options.{" "}
          </p>
        </div>
      );
    } else if (firstStepSelection === "changeSomething") {
      console.log(autoCompleteData)
      return (
        <div className="card-body">
          <h4>Change something</h4>
          <p>Please use the appropriate text boxes to type your edits</p>
          <p></p>
          <input
            name="dosage"
            type="text"
            placeholder="New Dosage?"
            onChange={(e) => {
              editDosage(e.target);
            }}
          ></input>
          <input
            name="dosage"
            type="text"
            placeholder="units"
            onChange={(e) => {
              editUnits(e.target);
            }}
          ></input>
          <p></p>
          <input
            type="text"
            placeholder="New Instructions?"
            onChange={(e) => {
              editInstructions(e.target);
            }}
          ></input>
          <p></p>
          <input
            type="text"
            placeholder="New time?"
            onChange={(e) => {
              editTime(e.target);
            }}
          ></input>
        </div>
      );
    } else if (firstStepSelection === "sideEffects") {
      return (
        <div className="card-body">
          <h4>Experiencing Side Effects.</h4>
          <input
            type="text"
            placeholder="Please describe your side effects"
            onChange={(e) => {
              setNewSideEffect(e.target);
            }}
          ></input>
        </div>
      );
    } else {
      return (
        <div className="card-body">
          <h4>Other</h4>
          <input
            type="text"
            placeholder="Please describe your issue"
            onChange={(e) => {
              setOther(e.target);
            }}
          ></input>
        </div>
      );
    }
  }

}
