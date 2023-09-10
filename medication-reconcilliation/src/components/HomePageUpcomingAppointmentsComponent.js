import React from "react";
import { Link } from "react-router-dom";


// Renders the scrollable list for upcoming appointments
// Each appointment is rendered to an appointment 
// ** Currently the appointment cards are hard coded. This needs to be upgraded so that .map is used to render each appointment card
// Data used to populate this information is populated using responses from FHIR calls to EPIC
const HomePageUpcomingAppointmentsComponent = ({
  appointmentType,
  physician,
  startTime,
  location,
  checkInAvailable,
}) => {

  function convertDateTimeFormat(dateTimeStr) {
    const match = dateTimeStr.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);

    if (match) {
      const [, year, month, day, hour, minute] = match;
      const formattedDate = `${month}/${day}/${year}`;
      const formattedTime = new Date(
        `${year}-${month}-${day}T${hour}:${minute}`
      ).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return `${formattedDate} at ${formattedTime}`;
    }

    // Return the original string if the input format is not as expected
    return dateTimeStr;
  }
  return (
    <div className="col flex-wrap" style={{ width: 325, height: "auto" }}>
      <div className="card" style={{ width: "auto", height: "100%" }}>
        <div className="card-body" style={{ maxWidth: "100%" }}>
          <div className="row">
            <div className="col">
              <h4>
                <span style={{ color: "rgb(255, 0, 0)" }}>
                  {appointmentType.replace(/^./, (match) =>
                    match.toUpperCase()
                  )}
                </span>
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col flex-shrink-1 text-wrap">
              <p style={{ width: "100%", maxWidth: "100%" }}>
                With:{" "}
                <span style={{ color: "rgb(255, 0, 0)" }}>{physician}</span>
                <br />
                On:&nbsp;{" "}
                <span style={{ color: "rgb(255, 0, 0)" }}>
                  {convertDateTimeFormat(startTime)}
                </span>
              </p>
              <p style={{ width: "100%", maxWidth: "100%" }}>
                At: <span style={{ color: "rgb(255, 0, 0)" }}>{location}</span>
              </p>
            </div>
          </div>
          <div className="row text-center">
            {checkInAvailable ? (
              <div className="col">
                <Link className="btn btn-primary" to="/currentMedicationList">
                  Click to begin Check-in
                </Link>
              </div>
            ) : (
              <div className="col">
                <button
                  className="btn btn-primary"
                  type="button"
                  style={{ width: "75%" }}
                >
                  Check-in Unavailable
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageUpcomingAppointmentsComponent;
