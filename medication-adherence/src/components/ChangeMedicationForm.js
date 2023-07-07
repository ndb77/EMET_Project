import React from "react";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { ChangeMedicationFormReason } from "./ChangeMedicationFormReason";
import { ChangeMedicationFormReason2 } from "./ChangeMedicationFormReason2";
import { useState } from "react";
import { useStoreActions } from "easy-peasy";
const ChangeMedicationForm = ({ id }) => {
  const [clinicianStopped, setClinicianStopped] = useState("");
  const [newDosage, setNewDosage] = useState("");
  const [newUnits, setNewUnits] = useState("");
  const [newInstructions, setNewInstructions] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newSideEffect, setNewSideEffect] = useState("");
  const [other, setOther] = useState("");

  const [firstStepSelection, setFirstStepSelection] = useState(null);

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
  // function editDosage(field, edits) {
  //   setFormData(submitData);
  // }
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
      console.log(firstStepSelection);
      return next();
    }
    let submitData = {
      id: id,
      clinicianStopped: clinicianStopped,
      dosage: newDosage.value,
      units: newUnits.value,
      instructions: newInstructions.value,
      timeTaken: newTime.value,
      sideEffect: newSideEffect.value,
      other: other.value,
    };
    editMedication(submitData);
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
