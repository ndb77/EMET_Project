import { FormWrapper } from "./FormWrapper";
import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
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
  const [data, setData] = useState();
  const medications = useStoreState((state) => state.medications);

  useEffect(() => {
    if (medications[1]) {
      setData(medications[1]);
      setLoading(false);
    } else {
      setData([]);
    }
  }, [medications]);

  if (isLoading) {
    return <div>Loading</div>;
  } else {
    const medicationToChange = data.map((medication) => {
      if (medication.id === Number(id)) {
        return medication;
      }
    });
    if (firstStepSelection === "clinicianStop") {
      setClinicianStopped(true)
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
