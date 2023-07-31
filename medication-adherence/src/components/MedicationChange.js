import React from "react";
import { useParams } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import ChangeMedicationForm from "./ChangeMedicationForm";
const MedicationChange = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const medications = useStoreState((state) => state.medications);
  function extractDate(inputString) {
    const regex =
      /Until (?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (\d{1,2}\/\d{1,2}\/\d{4})/;
    const matches = inputString.match(regex);
    return matches ? matches[1] : null;
  }
  function formatDate(inputDate) {
    const dateParts = inputDate.split("/");
    const year = dateParts[2];
    const month = dateParts[0].padStart(2, "0");
    const day = dateParts[1].padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    if (medications.length > 0) {
      setData(medications);
      setLoading(false);
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
                  <th>Valid Until</th>
                </tr>
              </thead>
              {/* {console.log(data.length)}{console.log(id)} */}
              <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
                <td>{data.length===0 ? "loading" : data[id]["rxNormData"]['drugName']}</td>
                <td>{data.length===0  ? "loading" : data[id]["rxNormData"]["dosage"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["rxNormData"]["dosageUnits"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["dosageInstructions"][0]["patientInstruction"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["reasonCode"]["text"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["requester"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["timeTaken"]}</td>
                <td>{data.length===0  ? "loading" : formatDate(extractDate(data[id]["dosageInstructions"][0]["text"]))}</td>
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
