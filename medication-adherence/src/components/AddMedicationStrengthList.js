import React from "react";

//Recieves the prescribable strengths from the NLM API calls made by the parent and renders them to the dropdown onclick
const AddMedicationStrengthList = ({ strengthResult, setStrength, editDosage,editUnits, currentStrength}) => {
  function isSubstring(str1, str2) {
    const sanitizedStr1 = str1.replace(/\s/g, ''); // Remove all spaces from str1
    const sanitizedStr2 = str2.replace(/\s/g, ''); // Remove all spaces from str2
  
    return sanitizedStr1.includes(sanitizedStr2);
  }
  function splitString(string) {
    const cleanedString = string.replace(/^\s+/, "");
    const regex = /^([\d.-]+)\s*(.*)$/; // Updated regex to allow for decimal, hyphen, and dot in quantity
    const match = cleanedString.match(regex);
    if (match) {
      const quantity = match[1];
      const description = match[2];
      return [quantity, description];
    } else {
      return null;
    }
  }
  return (
    <>
      <select
        className="medication-strength"
        onChange={(e) => {
          let rxNormStrengthData = splitString(e.target.value)
          if(editDosage){
            editDosage(rxNormStrengthData[0])
            // console.log(rxNormStrengthData[0])
          }
          if(editUnits){
            // console.log(rxNormStrengthData[1])
            editUnits(rxNormStrengthData[1])
          }
          if(setStrength){
            setStrength(e.target.value);
          }
        }}
      >
        {strengthResult
          ? strengthResult.map((result, index) => {
              return (
                <option key={index} value={result} selected={currentStrength && isSubstring(result,currentStrength)?"selected":null}>
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
