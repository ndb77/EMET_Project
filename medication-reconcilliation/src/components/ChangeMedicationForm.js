import React from "react";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { ChangeMedicationFormReason } from "./ChangeMedicationFormReason";
import { ChangeMedicationFormReason2 } from "./ChangeMedicationFormReason2";
import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import { Link, useHistory } from "react-router-dom";

// This is a child of the MedicationChange component and is a parent of ChangeMedicationFormReason and ChangeMedicationFormReason2
// This stores the data collected from the child forms and packages them into an object submitData which is eventually stored within the edit object of a medication object
// Edit areas that are left blank are accounted for within the store.js file
const ChangeMedicationForm = ({ id }) => {
  const [clinicianStopped, setClinicianStopped] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const [newUnits, setNewUnits] = useState("");
  const [newInstructions, setNewInstructions] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newSideEffect, setNewSideEffect] = useState("");
  const [other, setOther] = useState("");

  const [firstStepSelection, setFirstStepSelection] = useState(null);

  const history = useHistory()

  function editDosage(edits) {
    setNewDosage(edits);
  }
  function editUnits(edits) {
    setNewUnits(edits);
  }
  function editInstructions(edits) {
    setNewInstructions(edits);
  }
  function editTime(edits) {
    setNewTime(edits);
  }

  // This keeps track of which step the user is on and provides the useState functions as required
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <ChangeMedicationFormReason
        setFirstStepSelection={setFirstStepSelection}
      />,
      <ChangeMedicationFormReason2
        firstStepSelection={firstStepSelection}
        setClinicianStopped={setClinicianStopped}
        editDosage={editDosage}
        editUnits={editUnits}
        editInstructions={editInstructions}
        editTime={editTime}
        setNewSideEffect={setNewSideEffect}
        setOther={setOther}
        id={id}
      />,
    ]);
  const editMedication = useStoreActions((actions) => actions.editMedication);

  function onSubmit(e) {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    }
    let submitData = {
      id: id,
      clinicianStopped: clinicianStopped,
      dosage: newDosage,
      units: newUnits,
      instructions: newInstructions.value,
      timeTaken: newTime,
      sideEffect: newSideEffect.value,
      other: other.value,
    };
    editMedication(submitData);
    history.push('/updatedMedicationList')
  }

  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-title" style={{ textAlign: "right" }}>
          Current Step: {currentStepIndex + 1}/{steps.length}{" "}
        </h6>
        <form onSubmit={onSubmit}>
          {step}
          <div className="d-flex justify-content-end">
            {!isFirstStep && (
              <button type="button" onClick={back}>
                Back
              </button>
            )}
            <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeMedicationForm;
