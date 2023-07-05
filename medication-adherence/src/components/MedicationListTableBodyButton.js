import React from 'react'
import { Link } from 'react-router-dom'
const MedicationListTableBodyButton = ({id,selectionType}) => {
  if(selectionType==='change'){
    return (
      <Link to={`/medicationChange/${id}`}><button style={{"backgroundColor":"red"}}>{`${id} ${selectionType}`}</button></Link>
    )
  }else if(selectionType==='confirm'){
    return (
      <button style={{"backgroundColor":"green"}}>{`${id} ${selectionType}`}</button>
    )
  }else{
    return (
      <button style={{"backgroundColor":"yellow"}}>{`${id} ${selectionType}`}</button>
      )
  }
}

export default MedicationListTableBodyButton