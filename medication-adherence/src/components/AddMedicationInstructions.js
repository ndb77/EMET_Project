import React from 'react'

const AddMedicationInstructions = ({setInstructions}) => {
  return (
    <div>
      <input placeholder='Example:Take once a day' onChange={(e)=>{setInstructions(e.target.value)}}/>
    </div>
  )
}

export default AddMedicationInstructions