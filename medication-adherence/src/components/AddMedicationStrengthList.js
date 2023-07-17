import React from "react";
import { useState } from "react";
const AddMedicationStrengthList = ({ strengthResult, setStrength }) => {
  return (
    <>
      <select
        className="medication-strength"
        onChange={(e) => {
          setStrength(e.target.value);
        }}
      >
        {strengthResult
          ? strengthResult.map((result, index) => {
              return (
                <option key={index} value={result}>
                  {result}
                </option>
              );
            })
          : null}
      </select>
    </>
  );
};

export default AddMedicationStrengthList;
