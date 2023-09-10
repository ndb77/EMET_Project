import React from "react";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import ChangeMedicationForm from "./ChangeMedicationForm";

// Renders the medication change page for each medication on the medication list
const MedicationChange = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const medications = useStoreState((state) => state.medications);
  
  function convertToAMPM(time24h) {
    let [hours, minutes] = time24h.split(':').map(Number);
    let period = 'AM';
    
    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  useEffect(() => {
    if (medications.length > 0) {
      setData(medications);
    }
  }, [medications]);

  return (
    <div className="container" style={{ marginTop: 12, maxWidth: 960 }}>
      <div className="row">
        <div className="col-auto mx-auto">
          <h1 style={{ textAlign: "center" }}>
            Make Changes to Your Medication List
          </h1>
          <hr />
        </div>
      </div>
      <div
        className="row"
        style={{ background: "rgb(255,255,255)", boxShadow: "0px 0px 4px" }}
      >
        <div className="col">
          <div className="table-responsive fixTableHead">
            <table className="table">
              <thead style={{ position: "sticky" }}>
                <tr>
                  <th>Medication Name</th>
                  <th>Dosage</th>
                  <th>Units</th>
                  <th>Instructions</th>
                  <th>Condition</th>
                  <th>Prescriber</th>
                  <th>Time Taken</th>
                </tr>
              </thead>
              <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
                <td>{data.length===0 ? "loading" : data[id]["rxNormData"]['drugName']}</td>
                <td>{data.length===0  ? "loading" : data[id]["rxNormData"]["dosage"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["rxNormData"]["dosageUnits"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["dosageInstructions"][0]["patientInstruction"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["reasonCode"]["text"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["requester"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["medicationWhenTaken"]?convertToAMPM(data[id]["medicationWhenTaken"]):null}</td>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>
        <ChangeMedicationForm id={id}></ChangeMedicationForm>
      </div>
    </div>
  );


};

export default MedicationChange;
