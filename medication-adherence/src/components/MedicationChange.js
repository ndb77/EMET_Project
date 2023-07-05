import React from "react";
import { useParams } from "react-router-dom";
import data from "../tableData.json";
const MedicationChange = () => {
  const { id } = useParams();

  console.log(id);
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
                  <th>
                    Medication Name
                  </th>
                  <th>
                    Dosage
                  </th>
                  <th>
                    Units
                  </th>
                  <th>
                    Instructions
                  </th>
                  <th>
                    Condition
                  </th>
                  <th>
                    Prescriber
                  </th>
                  <th>
                    Time Taken
                  </th>
                  <th>
                    Last Modified
                  </th>
                </tr>
              </thead>
              <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
                <tr>
                  <td>{data[id]['medicationName']}</td>
                  <td>{data[id]['dosage']}</td>
                  <td>{data[id]['units']}</td>
                  <td>{data[id]['instructions']}</td>
                  <td>{data[id]['condition']}</td>
                  <td>{data[id]['prescriber']}</td>
                  <td>{data[id]['timeTaken']}</td>
                  <td>{data[id]['lastModified']}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: 20 }}>
        <div className="col">
          <h4 style={{ textAlign: "center" }}>
            Use the dropdown to indicate the reason you're changing this
            medication&nbsp;
          </h4>
        </div>
      </div>
      <div className="row" style={{ marginTop: 20, height: 200 }}>
        <div
          className="col d-flex d-lg-flex justify-content-center justify-content-lg-center"
          style={{ minHeight: "100%" }}
        >
          <div className="dropdown d-table" style={{ textAlign: "center" }}>
            <button
              className="btn btn-primary dropdown-toggle"
              aria-expanded="false"
              data-bs-toggle="dropdown"
              id="dropdown-medication-change"
              type="button"
              style={{
                background: "rgb(231,231,231)",
                color: "var(--bs-emphasis-color)",
                width: "100%",
                textAlign: "center",
              }}
            >
              Select an option
            </button>
            <div
              className="dropdown-menu dropdown-menu-center"
              style={{ position: "relative" }}
            >
              <a
                className="dropdown-item text-start"
                href="medication-change-doctor-instructed-to-stop.html"
              >
                A doctor instructed me to stop taking it.
              </a>
              <a
                className="dropdown-item text-start"
                href="medication-change-edit-something.html"
                data-bs-target="#dropdown-medication-change"
              >
                I need to edit something.
              </a>
              <a
                className="dropdown-item"
                href="medication-change-experiencing-side-effects.html"
              >
                I am experiencing side effects
              </a>
              <a
                className="dropdown-item"
                href="medication-change-other-1.html"
              >
                Other
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row d-flex d-lg-flex justify-content-center flex-nowrap justify-content-lg-center"
        style={{ marginTop: 50, marginBottom: 20, position: "relative" }}
      >
        <div className="col-auto" style={{ textAlign: "center" }}>
          <a
            className="btn btn-primary"
            role="button"
            style={{
              marginRight: 20,
              background: "var(--bs-danger-bg-subtle)",
              color: "var(--bs-emphasis-color)",
            }}
            href="current-medications-1-1.html"
          >
            Discard Changes
          </a>
        </div>
        <div className="col-auto" style={{ textAlign: "center" }}>
          <a
            className="btn btn-primary"
            role="button"
            style={{
              marginLeft: 20,
              color: "var(--bs-emphasis-color)",
              background: "var(--bs-success-border-subtle)",
            }}
            href="current-medication-confirm-changes.html"
          >
            Save Changes
          </a>
        </div>
      </div>
    </div>
  );
};

export default MedicationChange;
