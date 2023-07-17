import React from 'react'

const AddMedicationInstructions = ({setInstructions}) => {
  return (
    <div>
      <input placeholder='Med Instructions' onChange={(e)=>{setInstructions(e.target.value)}}/>
    </div>
  )
}

export default AddMedicationInstructions