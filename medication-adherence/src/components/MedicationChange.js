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

  useEffect(() => {
    if (medications.length > 1) {
      setData(medications[1]);
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
                  <th>Last Modified</th>
                </tr>
              </thead>
              {console.log(data.length)}{console.log(id)}
              <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
                <td>{data.length===0 ? "loading" : data[id]["medicationName"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["dosage"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["units"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["instructions"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["condition"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["prescriber"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["timeTaken"]}</td>
                <td>{data.length===0  ? "loading" : data[id]["lastModified"]}</td>
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
