import React from "react";
import MedicationListTableComponent from "./MedicationListTableComponent";
const CurrentMedicationList = () => {
  return (
    <div className="container" style={{ maxWidth: 960, marginBottom: 20 }}>
      <div
        className="row d-lg-flex justify-content-end justify-content-lg-end"
        style={{ marginTop: 12 }}
      >
        <div className="col-auto">
          <img
            className="d-inline-flex"
            src="/live-help-logo.png"
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
          <h1 className="current-medications-header">Current Medications</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col d-lg-flex justify-content-lg-center">
          <h4 className="text-center">
            According to our records, we show that you are currently taking the
            following medications.
          </h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p style={{ textAlign: "center", marginBottom: 0 }}>
            Please <strong>scroll</strong> through the medication list below to{" "}
            <strong>verify the</strong> <strong>accuracy</strong> of your
            medications.
          </p>
        </div>
      </div>
      <div className="row" style={{ marginBottom: 10 }}>
        <div className="col">
          <div className="row" style={{ marginBottom: 10, marginTop: 10 }}>
            <div className="col">
              <a
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
                href="home-page.html"
              >
                Go to homepage
              </a>
            </div>
            <div className="col text-end d-lg-flex justify-content-lg-end">
              <a
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
                href="add-a-medication.html"
              >
                Add new medication
              </a>
            </div>
          </div>
        </div>
      </div>
      <MedicationListTableComponent />
      <div className="row">
        <div className="col text-end">
          <a
            className="btn btn-primary"
            role="button"
            style={{
              background: "var(--bs-success)",
              color: "var(--bs-body-bg)",
            }}
            href="current-medication-confirm-changes.html"
          >
            Confirm all and continue
          </a>
        </div>
      </div>
    </div>
  );
};

export default CurrentMedicationList;
