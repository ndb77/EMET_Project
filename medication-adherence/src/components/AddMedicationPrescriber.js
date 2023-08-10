import React from "react";

// Simple input field that sends keystrokes back to parent
const AddMedicationPrescriber = ({setPrescriber}) => {
  return (
    <div className="prescriber">
          <input
            name="prescriber"
            type="text"
            placeholder="Prescriber Last Name"
            onChange={(e)=>{setPrescriber(e.target.value)}}
          ></input>  </div>
  );
};

export default AddMedicationPrescriber;
