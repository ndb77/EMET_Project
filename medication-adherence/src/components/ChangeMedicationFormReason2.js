import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import React from "react";
import useAutoComplete from "../hooks/useAutoComplete";
import AddMedicationStrengthList from "./AddMedicationStrengthList";
import AddMedicationWhenTaken from "./AddMedicationWhenTaken";
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
  const [medicationWhenTaken, setMedicationWhenTaken] = useState("");
  const [strength, setStrength] = useState("");
  const [dosage, setDosage] = useState("");
  const [currentStrength, setCurrentStrength] = useState("");
  const [strengthID, setStrengthID] = useState(null);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (medications.length > 0) {
      const medicationToEdit = medications.filter((entry) => {
        return entry.listID.toString() === id.toString();
      });
      setStrengthResult(medicationToEdit[0].rxNormData.drugObject[1]);
      setCurrentStrength(
        medicationToEdit[0].rxNormData.dosage +
          " " +
          medicationToEdit[0].rxNormData.dosageUnits
      );
    }
  }, [medications]);

  if (!isLoading) {
    return <div>Loading</div>;
  } else {
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
      return (
        <div className="card-body">
          <h4>Change something</h4>
          <p>Please use the appropriate text boxes to type your edits</p>
          <AddMedicationStrengthList
            editDosage={editDosage}
            editUnits = {editUnits}
            strengthResult={strengthResult}
            currentStrength={currentStrength}

          />
          <p></p>
          <input
            type="text"
            placeholder="New Instructions?"
            onChange={(e) => {
              editInstructions(e.target);
            }}
          ></input>
          <p></p>
          <AddMedicationWhenTaken
            editTime={editTime}
          />
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
