import React from "react";

import { useStoreState } from "easy-peasy";
import MedicationListTableComponent from "./MedicationListTableComponent";
import helpLogo from '../img/live-help-logo.png'  
import { Link } from "react-router-dom";

const UpdatedMedicationList = () => {
  return (
    <div className="container" style={{ maxWidth: 960, marginBottom: 20 }}>
      <div
        className="row d-lg-flex justify-content-end justify-content-lg-end"
        style={{ marginTop: 12 }}
      >
        <div className="col-auto">
          <img
            className="d-inline-flex"
            src={helpLogo}
            width={39}
            height={38}
          />
          <p className="d-inline-flex">
            <em>I need assistance</em>
          </p>
        </div>
      </div>
      <div className="row" style={{ marginTop: 0 }}>
        <div className="col-md-12 mx-auto" style={{ width: "auto" }}>
          <h1 className="updated-medications-header">Your Medications</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p style={{ textAlign: "center", marginBottom: 0 }}>
            Please <strong>verify the accuracy</strong> of your
            medications.
          </p>
        </div>
      </div>
      <div className="row" style={{ marginBottom: 10 }}>
        <div className="col">
          <div className="row" style={{ marginBottom: 10, marginTop: 10 }}>
            <div className="col">
              <Link
                className="btn btn-primary"
                role="button"
                style={{
                  background: "rgb(163,163,163)",
                  borderColor: "rgb(0,0,0)",
                  paddingTop: 0,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 0,
                }}
                to="/home"
              >
                Start Over
              </Link>
            </div>
            <div className="col text-end d-lg-flex justify-content-lg-end">
              <Link
                className="btn btn-primary"
                role="button"
                style={{
                  background: "rgb(158,242,171)",
                  borderColor: "rgb(0,0,0)",
                  paddingTop: 0,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 0,
                  color: "rgb(0,0,0)",
                }}
                to="/addMedication"
              >
                Add new medication
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MedicationListTableComponent medicationListVersion='updated'  />
      <div className="row">
        <div className="col text-end">
          <Link
            className="btn btn-primary"
            role="button"
            style={{
              background: "var(--bs-success)",
              color: "var(--bs-body-bg)",
            }}
            to="/updatedMedicationList/print"
          >
            Confirm all and continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatedMedicationList;
