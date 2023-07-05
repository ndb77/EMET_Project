import React from 'react'
import MedicationListTableBodyButton from './MedicationListTableBodyButton'

const MedicationListTableBodyComponent = ({tableData,columns}) => {
  return (
    <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
      {tableData.map((data)=>{
        return(
          <tr key = {data.id}>
            {columns.map(({accessor})=>{
              const tData = data[accessor] ? data[accessor]: <MedicationListTableBodyButton id={data.id} selectionType={accessor}/>
              console.log(data[accessor])
              return <td key={accessor}>{tData}</td>
            })}
          </tr>
        )
      })}
  </tbody>  )
}

export default MedicationListTableBodyComponent