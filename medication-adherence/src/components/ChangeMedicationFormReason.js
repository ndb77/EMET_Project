import { useState } from "react";

// The first step of the form which sends to the parent which option should be further expanded in the second step of the form.
export function ChangeMedicationFormReason({setFirstStepSelection}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.id);
    setFirstStepSelection(event.target.id)
  };
  return (
    <div className="card-body">
      <h2>Reason for Change</h2>
      <div className="form-check">
        <input
          id="clinicianStop"
          name="step1"
          className="form-check-input"
          type="radio"
          checked={selectedOption === "clinicianStop"}
          onChange={handleRadioChange}
          required
        />
        <label className="form-check-label" htmlFor="clinicianStop">
          A clinician told me to stop.
        </label>
      </div>
      <div className="form-check">
        <input
          id="changeSomething"
          name="step1"
          className="form-check-input"
          type="radio"
          checked={selectedOption === "changeSomething"}
          onChange={handleRadioChange}
        />
        <label className="form-check-label" htmlFor="changeSomething">
          I need to change something.
        </label>
      </div>
      <div className="form-check">
        <input
          id="sideEffects"
          name="step1"
          className="form-check-input"
          type="radio"
          checked={selectedOption === "sideEffects"}
          onChange={handleRadioChange}
        />
        <label className="form-check-label" htmlFor="sideEffects">
          Experiencing side effects.
        </label>
      </div>
      <div className="form-check">
        <input
          id="other"
          name="step1"
          className="form-check-input"
          type="radio"
          checked={selectedOption === "other"}
          onChange={handleRadioChange}
        />
        <label className="form-check-label" htmlFor="other">
          Other.
        </label>
      </div>
    </div>
  );
}
