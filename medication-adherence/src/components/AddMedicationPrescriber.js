import React from "react";

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
