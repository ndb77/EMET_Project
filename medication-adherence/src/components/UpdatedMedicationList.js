import React from "react";
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
            Please{" "}
            <strong>
              <em>scroll</em>
            </strong>{" "}
            through the medication list below to verify the{" "}
            <strong>accuracy</strong> of your medications.
          </p>
        </div>
      </div>
      <div className="row" style={{ marginBottom: 10 }}>
        <div className="col">
          <div className="row" style={{ marginBottom: 10, marginTop: 10 }}>
            <div className="col">
              <Link
                to="/home"
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
              >
                {" "}
                Start Over
              </Link>
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
      <div
        className="row"
        style={{
          marginRight: 0,
          background: "var(--bs-success-border-subtle)",
          marginLeft: 0,
        }}
      >
        <div className="col">
          <h3>Updated Medication List</h3>
        </div>
      </div>
      <div
        className="row"
        style={{ marginRight: 0, marginLeft: 0, marginBottom: 10 }}
      >
        <div
          className="col"
          style={{
            marginBottom: 10,
            width: "100%",
            paddingRight: 0,
            paddingLeft: 0,
            background: "var(--bs-success-border-subtle)",
          }}
        >
          <div
            className="row"
            style={{
              boxShadow: "0px 0px 3px",
              marginLeft: 0,
              marginBottom: 0,
              marginRight: 0,
            }}
          >
            <div
              className="col"
              style={{ paddingRight: 0, paddingLeft: 0, width: 100 }}
            >
              <div className="row mobile-scrollable-indicator">
                <div className="col text-end">
                  <p>
                    *Scrollable&nbsp;
                    <img src="/RightArrow.png" style={{ width: 20 }} />
                  </p>
                </div>
              </div>
              <div
                className="hrz-txt-scroll"
                style={{
                  minHeight: 230,
                  overflow: "scroll",
                  paddingRight: 0,
                  paddingLeft: 0,
                  height: 230,
                  background: "var(--bs-success-border-subtle)",
                }}
              >
                <div
                  className="row"
                  style={{
                    background: "var(--bs-success-border-subtle)",
                    marginRight: 0,
                    marginLeft: 0,
                  }}
                >
                  <div
                    className="col"
                    style={{
                      background: "var(--bs-success-border-subtle)",
                      paddingLeft: 10,
                      paddingRight: 0,
                      overflow: "auto",
                    }}
                  >
                    <div
                      className="table-responsive"
                      style={{ background: "var(--bs-success-border-subtle)" }}
                    >
                      <table className="table">
                        <thead
                          style={{
                            background: "var(--bs-success-border-subtle)",
                            position: "sticky",
                          }}
                        >
                          <tr
                            style={{
                              background: "var(--bs-success-border-subtle)",
                              position: "sticky",
                            }}
                          >
                            <th
                              style={{
                                background: "var(--bs-success-border-subtle)",
                                position: "sticky",
                              }}
                            >
                              <h5>Medication</h5>
                              <img
                                src="/724916.png"
                                style={{
                                  width: 10,
                                  transform: "rotate(90deg)",
                                  marginLeft: 5,
                                  position: "sticky",
                                }}
                              />
                            </th>
                            <th
                              style={{
                                background: "var(--bs-success-border-subtle)",
                                position: "sticky",
                              }}
                            >
                              <h5>Dosage</h5>
                              <img
                                src="/724916.png"
                                style={{
                                  width: 10,
                                  transform: "rotate(90deg)",
                                  marginLeft: 5,
                                  position: "sticky",
                                }}
                              />
                            </th>
                            <th
                              style={{
                                background: "var(--bs-success-border-subtle)",
                                position: "sticky",
                              }}
                            >
                              <h5>Instructions</h5>
                              <img
                                src="/724916.png"
                                style={{
                                  width: 10,
                                  transform: "rotate(90deg)",
                                  marginLeft: 5,
                                  position: "sticky",
                                }}
                              />
                            </th>
                            <th
                              style={{
                                background: "var(--bs-success-border-subtle)",
                                position: "sticky",
                              }}
                            >
                              <h5>Condition</h5>
                              <img
                                src="/724916.png"
                                style={{
                                  width: 10,
                                  transform: "rotate(90deg)",
                                  marginLeft: 5,
                                  position: "sticky",
                                }}
                              />
                            </th>
                            <th
                              style={{
                                background: "var(--bs-success-border-subtle)",
                                position: "sticky",
                              }}
                            >
                              <h5>Prescriber</h5>
                              <img
                                src="/724916.png"
                                style={{
                                  width: 10,
                                  transform: "rotate(90deg)",
                                  marginLeft: 5,
                                  position: "sticky",
                                }}
                              />
                            </th>
                            <th
                              style={{
                                background: "var(--bs-success-border-subtle)",
                                position: "sticky",
                              }}
                            >
                              <h5>Last Modified</h5>
                              <img
                                src="/724916.png"
                                style={{
                                  width: 10,
                                  transform: "rotate(90deg)",
                                  marginLeft: 5,
                                  position: "sticky",
                                }}
                              />
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          style={{
                            background: "var(--bs-success-border-subtle)",
                            overflow: "scroll",
                          }}
                        >
                          <tr />
                          
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Atorvatatin(Lipitor)
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              <strong>
                                <span
                                  style={{ textDecoration: "line-through" }}
                                >
                                  80 mg
                                </span>
                              </strong>
                              <div className="row">
                                <div className="col">
                                  <p>
                                    <strong>10 mg</strong>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Every Other Day
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              High cholesterol, coronary artery disease
                              <br />
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>Williams</td>
                            <td>
                              Today
                              <p
                                className="edited-medication-info"
                                style={{ marginBottom: 0, minHeight: 24 }}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Carvedilol (Coreg)&nbsp;
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              25 mg
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              ½ tablet twice a day
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              High blood pressure, heart failure
                              <br />
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>Black</td>
                            <td>
                              <p style={{ marginBottom: 0, minHeight: 24 }} />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Sacubitril / Valsartan (Entresto)&nbsp;
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              49/51 mg
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Twice a day
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Heart failure
                              <br />
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>Black</td>
                            <td>
                              <p style={{ marginBottom: 0, minHeight: 24 }} />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Eplerenone (Inspra)&nbsp;
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              50 mg
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Every AM
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ color: "rgb(255, 0, 0)" }}>
                                Heart Failure
                              </span>
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>Black</td>
                            <td>
                              <p style={{ marginBottom: 0, minHeight: 24 }} />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Metformin ER (Glucophage)&nbsp;
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              500 mg
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Every AM
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ color: "rgb(255, 0, 0)" }}>
                                Diabetes
                              </span>
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>Williams</td>
                            <td>
                              <p style={{ marginBottom: 0, minHeight: 24 }} />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Dulaglutide (Trulicity)&nbsp;
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              3 mg
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Inject once a week
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ color: "rgb(255, 0, 0)" }}>
                                Diabetes
                              </span>
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>Williams</td>
                            <td>
                              <p style={{ marginBottom: 0, minHeight: 24 }} />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Sitagliptin (Januvia)&nbsp;
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              100 mg
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Every AM
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ color: "rgb(255, 0, 0)" }}>
                                Diabetes
                              </span>
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>Williams</td>
                            <td>
                              <p style={{ marginBottom: 0, minHeight: 24 }} />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Zolpidem (Ambien)
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              5 mg
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              ½ tablet every night
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Insomnia
                              <br />
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>Willams</td>
                            <td>
                              <p style={{ marginBottom: 0, minHeight: 24 }} />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Aspirin
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              &nbsp;81 mg
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Once a day
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Coronary artery disease
                              <br />
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>Willams</td>
                            <td>
                              <p style={{ marginBottom: 0, minHeight: 24 }} />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Acetaminophen (Tylenol)&nbsp;
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              500 mg
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              one-two tablets as needed
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>Paragraph</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>
                              Pain
                              <br />
                              <div className="row edited-medication-info">
                                <div className="col">
                                  <p>
                                    <span style={{ color: "rgb(255, 0, 0)" }}>
                                      Paragraph
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td style={{ color: "rgb(255,0,0)" }}>OTC</td>
                            <td>
                              <p style={{ marginBottom: 0, minHeight: 24 }} />
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  background: "var(--bs-success-border-subtle)",
                                  color: "var(--bs-table-striped-color)",
                                }}
                              >
                                Confirm
                              </button>
                            </td>
                            <td>
                              <a
                                className="btn btn-primary"
                                role="button"
                                style={{
                                  height: "100%",
                                  minHeight: "100%",
                                  color: "rgb(0,0,0)",
                                  background: "var(--bs-danger-bg-subtle)",
                                }}
                                href="medication-change-make-changes.html"
                              >
                                Change
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                type="button"
                                style={{
                                  height: "100%",
                                  background: "var(--bs-warning-bg-subtle)",
                                  color: "rgb(0,0,0)",
                                }}
                              >
                                Unsure
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col text-end" style={{ marginBottom: 10 }}>
          <a
            className="btn btn-primary"
            role="button"
            style={{
              background: "var(--bs-success)",
              color: "var(--bs-body-bg)",
            }}
            href="home-page.html"
          >
            Confirm all
          </a>
        </div>
      </div>
      <div
        className="row"
        style={{
          marginRight: 0,
          marginLeft: 0,
          background: "var(--bs-danger-border-subtle)",
        }}
      >
        <div className="col">
          <h3>Show Edited Medications</h3>
          <div>
            <a
              className="btn btn-primary"
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-controls="collapse-1"
              href="#collapse-1"
              role="button"
              style={{ background: "#da3f4f" }}
            >
              Toggle Content
            </a>
            <div className="collapse" id="collapse-1">
              <p />
              <div
                className="row"
                style={{ marginRight: 0, marginLeft: 0, marginBottom: 10 }}
              >
                <div
                  className="col"
                  style={{
                    marginBottom: 10,
                    width: "100%",
                    paddingRight: 0,
                    paddingLeft: 0,
                    background: "var(--bs-danger-border-subtle)",
                  }}
                >
                  <div
                    className="row"
                    style={{
                      boxShadow: "0px 0px 3px",
                      marginLeft: 0,
                      marginBottom: 0,
                      marginRight: 0,
                    }}
                  >
                    <div
                      className="col"
                      style={{ paddingRight: 0, paddingLeft: 0, width: 100 }}
                    >
                      <div className="row mobile-scrollable-indicator">
                        <div className="col text-end">
                          <p>
                            *Scrollable&nbsp;
                            <img src="/RightArrow.png" style={{ width: 20 }} />
                          </p>
                        </div>
                      </div>
                      <div
                        className="hrz-txt-scroll"
                        style={{
                          minHeight: 230,
                          overflow: "scroll",
                          paddingRight: 0,
                          paddingLeft: 0,
                          height: 230,
                          background: "var(--bs-danger-border-subtle)",
                        }}
                      >
                        <div
                          className="row"
                          style={{
                            background: "var(--bs-danger-border-subtle)",
                            marginRight: 0,
                            marginLeft: 0,
                          }}
                        >
                          <div
                            className="col"
                            style={{
                              background: "var(--bs-danger-border-subtle)",
                              paddingLeft: 10,
                              paddingRight: 0,
                              overflow: "auto",
                            }}
                          >
                            <div
                              className="table-responsive"
                              style={{
                                background: "var(--bs-danger-border-subtle)",
                              }}
                            >
                              <table className="table">
                                <thead
                                  style={{
                                    background:
                                      "var(--bs-danger-border-subtle)",
                                    position: "sticky",
                                  }}
                                >
                                  <tr
                                    style={{
                                      background:
                                        "var(--bs-success-border-subtle)",
                                      position: "sticky",
                                    }}
                                  >
                                    <th
                                      style={{
                                        background:
                                          "var(--bs-danger-border-subtle)",
                                        position: "sticky",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      >
                                        Medication
                                      </h5>
                                      <img
                                        src="/724916.png"
                                        style={{
                                          width: 10,
                                          transform: "rotate(90deg)",
                                          marginLeft: 5,
                                          position: "sticky",
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      />
                                    </th>
                                    <th
                                      style={{
                                        background:
                                          "var(--bs-danger-border-subtle)",
                                        position: "sticky",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      >
                                        Dosage
                                      </h5>
                                      <img
                                        src="/724916.png"
                                        style={{
                                          width: 10,
                                          transform: "rotate(90deg)",
                                          marginLeft: 5,
                                          position: "sticky",
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      />
                                    </th>
                                    <th
                                      style={{
                                        background:
                                          "var(--bs-danger-border-subtle)",
                                        position: "sticky",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      >
                                        Instructions
                                      </h5>
                                      <img
                                        src="/724916.png"
                                        style={{
                                          width: 10,
                                          transform: "rotate(90deg)",
                                          marginLeft: 5,
                                          position: "sticky",
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      />
                                    </th>
                                    <th
                                      style={{
                                        background:
                                          "var(--bs-danger-border-subtle)",
                                        position: "sticky",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      >
                                        Condition
                                      </h5>
                                      <img
                                        src="/724916.png"
                                        style={{
                                          width: 10,
                                          transform: "rotate(90deg)",
                                          marginLeft: 5,
                                          position: "sticky",
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      />
                                    </th>
                                    <th
                                      style={{
                                        background:
                                          "var(--bs-danger-border-subtle)",
                                        position: "sticky",
                                      }}
                                    >
                                      <h5
                                        style={{
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      >
                                        Prescriber
                                      </h5>
                                      <img
                                        src="/724916.png"
                                        style={{
                                          width: 10,
                                          transform: "rotate(90deg)",
                                          marginLeft: 5,
                                          position: "sticky",
                                          background:
                                            "var(--bs-danger-border-subtle)",
                                        }}
                                      />
                                    </th>
                                    <th
                                      style={{
                                        background:
                                          "var(--bs-danger-border-subtle)",
                                        position: "sticky",
                                      }}
                                    >
                                      <h5>Last Modified</h5>
                                      <img
                                        src="/724916.png"
                                        style={{
                                          width: 10,
                                          transform: "rotate(90deg)",
                                          marginLeft: 5,
                                          position: "sticky",
                                        }}
                                      />
                                    </th>
                                  </tr>
                                </thead>
                                <tbody
                                  style={{
                                    background:
                                      "var(--bs-success-border-subtle)",
                                    overflow: "scroll",
                                  }}
                                >
                                  <tr />
                                  <tr>
                                    <td style={{ color: "rgb(255,0,0)" }}>
                                      Atorvatatin(Lipitor)
                                      <div className="row">
                                        <div className="col">
                                          <p className="edited-medication-info">
                                            Paragraph
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td style={{ color: "rgb(255,0,0)" }}>
                                      <strong>
                                        <span
                                          style={{
                                            textDecoration: "line-through",
                                          }}
                                        >
                                          100 mg
                                        </span>
                                      </strong>
                                      <div className="row">
                                        <div className="col">
                                          <p>
                                            <strong>10 mg</strong>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td style={{ color: "rgb(255,0,0)" }}>
                                      Every Other Day
                                      <div className="row">
                                        <div className="col">
                                          <p className="edited-medication-info">
                                            Paragraph
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td style={{ color: "rgb(255,0,0)" }}>
                                      High cholesterol, coronary artery disease
                                      <br />
                                      <div className="row">
                                        <div className="col">
                                          <p className="edited-medication-info">
                                            <span
                                              style={{
                                                color: "rgb(255, 0, 0)",
                                              }}
                                            >
                                              Paragraph
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                    <td style={{ color: "rgb(255,0,0)" }}>
                                      Williams
                                      <p className="edited-medication-info">
                                        Paragraph
                                      </p>
                                    </td>
                                    <td>
                                      <p
                                        style={{
                                          marginBottom: 0,
                                          minHeight: 24,
                                        }}
                                      >
                                        Today
                                      </p>
                                    </td>
                                  </tr>
                                  <tr />
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatedMedicationList;
