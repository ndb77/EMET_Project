import React from 'react'
import { Link } from 'react-router-dom'
const MedicationListTableBodyButton = ({id,selectionType}) => {
  if(selectionType==='change'){
    return (
      <Link to={`/medicationChange/${id}`}><button style={{"backgroundColor":"red"}}>{`${selectionType}`}</button></Link>
    )
  }else if(selectionType==='confirm'){
    return (
      <button style={{"backgroundColor":"green"}}>{`${selectionType}`}</button>
    )
  }else{
    return (
      <button style={{"backgroundColor":"yellow"}}>{`${selectionType}`}</button>
      )
  }
}

export default MedicationListTableBodyButton