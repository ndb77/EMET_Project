import React from "react";
import MedicationListTableBodyButton from "./MedicationListTableBodyButton";

function convertTo12HourFormat(time24) {
  // Split the time into hours and minutes
  const [hours, minutes] = time24.split(":");

  // Convert hours to a number
  const hoursNum = parseInt(hours, 10);

  // Determine if it's AM or PM
  const period = hoursNum >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = hoursNum % 12 === 0 ? 12 : hoursNum % 12;

  // Format the result in 'hh:mm AM/PM'
  const time12 = `${hours12.toString().padStart(2, "0")}:${minutes} ${period}`;
  return time12;
}

function checkSideEffectOrOther(edits) {
  if (edits.sideEffect || edits.other) {
    // Check if the 'edits' property exists and either 'sideEffect' or 'other' is truthy
    return edits.sideEffect || edits.other;
  } else {
    return undefined; // Return undefined if the keys are not present or the values are falsy
  }
}
// Renders the table body for the medication list.
const MedicationListTable = ({ columns, tableData, medicationListVersion }) => {
  const today = new Date().toISOString().split("T")[0];

  // The table will render according to which type of table is required
  if (medicationListVersion === "current") {
    return (
      <tbody>
        {/* Puts each medication in the medication list into a table row */}
        {tableData.map((entry) => (
          <tr key={entry.listID}>
            {/* goes through each accessor provided within the columns list to add each table cell*/}
            {columns.map(({ accessor }) => {
              let tData = null;
              if (accessor === "notes") {
                return null;
              } else if (accessor === "medicationName") {
                tData = entry["rxNormData"]["drugName"];
              } else if (accessor === "dosage") {
                tData = entry["rxNormData"]["dosage"];
              } else if (accessor === "units") {
                tData = entry["rxNormData"]["dosageUnits"];
              } else if (accessor === "instructions") {
                tData = entry["dosageInstructions"][0]["patientInstruction"];
              } else if (accessor === "timeTaken") {
                tData = entry.edits.timeTaken ? (
                  convertTo12HourFormat(entry.edits.timeTaken)
                ) : entry.medicationWhenTaken ? (
                  convertTo12HourFormat(entry.medicationWhenTaken)
                ) : (
                  <p style={{ color: "red" }}>
                    Add a time using the change button
                  </p>
                );
              } else if (accessor === "condition") {
                tData = entry["reasonCode"]["text"];
              } else if (accessor === "prescriber") {
                tData = entry["requester"];
              } else {
                tData = null;
              }
              return (
                <td
                  key={accessor}
                  style={{
                    backgroundColor:
                      entry.resource.authoredOn === today ||
                      entry.confirmStatus === "confirmed"
                        ? "var(--bs-success-border-subtle)"
                        : entry.confirmStatus === "removedByPatient" ||
                          entry.edits["clinicianStopped"] === true
                        ? "pink"
                        : null,
                    textDecoration:
                      entry.confirmStatus === "removedByPatient" ||
                      entry.edits["clinicianStopped"] === true
                        ? "line-through"
                        : null,
                  }}
                >
                  {tData}
                </td>
              );
            })}
            <td>
              <MedicationListTableBodyButton
                medicationID={entry.listID}
                selectionType="confirm"
              />
            </td>
            <td>
              <MedicationListTableBodyButton
                medicationID={entry.listID}
                selectionType="change"
              />
            </td>
            <td>
              <MedicationListTableBodyButton
                medicationID={entry.listID}
                selectionType="remove"
              />
            </td>
            <td>
              <MedicationListTableBodyButton
                medicationID={entry.listID}
                selectionType="refill"
              />
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
  if (medicationListVersion === "updated") {
    return (
      <tbody>
        {tableData.map((entry) =>
          // If the medication has been removed by the patient, do not include the medication on the updated list
          entry.confirmStatus === "removedByPatient" ||
          entry.edits["clinicianStopped"] === true ? (
            <tr></tr>
          ) : (
            <tr key={entry.listID}>
              {columns.map(({ accessor }) => {
                let tData = null;
                if (accessor === "notes") {
                  return null;
                } else if (accessor === "medicationName") {
                  tData = entry["rxNormData"]["drugName"];
                } else if (accessor === "dosage") {
                  tData = entry.edits.dosage
                    ? entry.edits.dosage
                    : entry["rxNormData"]["dosage"];
                } else if (accessor === "units") {
                  tData = entry.edits.units
                    ? entry.edits.units
                    : entry["rxNormData"]["dosageUnits"];
                } else if (accessor === "instructions") {
                  tData = entry.edits.instructions
                    ? entry.edits.instructions
                    : entry["dosageInstructions"][0]["patientInstruction"];
                } else if (accessor === "timeTaken") {
                  tData = entry.edits.timeTaken ? (
                    convertTo12HourFormat(entry.edits.timeTaken)
                  ) : entry.medicationWhenTaken ? (
                    convertTo12HourFormat(entry.medicationWhenTaken)
                  ) : (
                    <p style={{ color: "red" }}>
                      Add a time using the change button
                    </p>
                  );
                } else if (accessor === "condition") {
                  tData = entry["reasonCode"]["text"];
                } else if (accessor === "prescriber") {
                  tData = entry["requester"];
                } else {
                  tData = null;
                }

                // Add other logic for rendering table data
                return (
                  <td
                    key={accessor}
                    style={{
                      backgroundColor:
                        entry.confirmStatus === "confirmed"
                          ? "var(--bs-success-border-subtle)"
                          : entry.confirmStatus === "removedByPatient" ||
                            entry.edits["clinicianStopped"] === true
                          ? "pink"
                          : null,
                    }}
                  >
                    {/* Display the data */}
                    {tData}
                  </td>
                );
              })}

              {/* Render the buttons only if confirmStatus is not 'removedByPatient' or the medication wasn't removed by the clinican */}
              {entry.confirmStatus !== "removedByPatient" ||
              entry.edits["clinicianStopped"] === true ? (
                <>
                  <td>
                    <MedicationListTableBodyButton
                      medicationID={entry.listID}
                      selectionType="confirm"
                    />
                  </td>
                  <td>
                    <MedicationListTableBodyButton
                      medicationID={entry.listID}
                      selectionType="change"
                    />
                  </td>
                  <td>
                    <MedicationListTableBodyButton
                      medicationID={entry.listID}
                      selectionType="remove"
                    />
                  </td>
                  <td>
                    <MedicationListTableBodyButton
                      medicationID={entry.listID}
                      selectionType="refill"
                    />
                  </td>
                </>
              ) : null}
            </tr>
          )
        )}
      </tbody>
    );
  }
  if (medicationListVersion === "editedList") {
    return (
      <tbody>
        {
          // Map through the tableData array
          tableData.map((entry) => {
            // Create an object to store edited values for each row
            const editedValues = {};

            // Map through the columns array
            const columnsData = columns.map(({ accessor }) => {
              let tData = null;
              let oData = null;
              let isEditedData = false;

              // Check the accessor to determine which data to display
              if (accessor === "medicationName") {
                tData = entry["rxNormData"]["drugName"];
              } else if (
                accessor === "dosage" ||
                accessor === "units" ||
                accessor === "instructions" ||
                accessor === "timeTaken"
              ) {
                // If the entry has edits for dosage, units, instructions, or timeTaken, use the edited value
                if (entry.edits[accessor]) {
                  tData = accessor==="timeTaken"? convertTo12HourFormat(entry.edits[accessor]): entry.edits[accessor];
                  oData =
                    accessor === "dosage" ? (
                      entry["rxNormData"]["dosage"]
                    ) : accessor === "units" ? (
                      entry["rxNormData"]["dosageUnits"]
                    ) : accessor === "instructions" ? (
                      entry["dosageInstructions"][0]["patientInstruction"]
                    ) : entry.medicationWhenTaken ? (
                      entry.medicationWhenTaken
                    ) : (
                      null
                    );
                  isEditedData = true;
                  // Store the edited value in the editedValues object for later use
                  editedValues[accessor] = entry.edits[accessor];
                } else {
                  // If there are no edits, use the original data from the entry object
                  tData =
                    accessor === "dosage" ? (
                      entry["rxNormData"]["dosage"]
                    ) : accessor === "units" ? (
                      entry["rxNormData"]["dosageUnits"]
                    ) : accessor === "instructions" ? (
                      entry["dosageInstructions"][0]["patientInstruction"]
                    ) : accessor === "timeTaken" ? (
                      entry.edits.timeTaken ? (
                        convertTo12HourFormat(entry.edits.timeTaken)
                      ) : entry.medicationWhenTaken ? (
                        convertTo12HourFormat(entry.medicationWhenTaken)
                      ) : null
                    ) : (
                      <p style={{ color: "red" }}>
                        Add a time using the change button
                      </p>
                    );
                }
              } else if (accessor === "condition") {
                tData = entry["reasonCode"]["text"];
              } else if (accessor === "prescriber") {
                tData = entry["requester"];
              } else {
                tData = null;
              }

              // Return an object containing the table data and whether it's edited data
              return {
                tData,
                oData,
                isEditedData,
              };
            });
            // Render the table row
            // The return statement below will first look to see if the medication was added by the patient, then check if its unedited.
            // If patient added is true, it will supercede 'unedited' confirm status because patientAdded medications will also be listed as 'unedited', but will still need to be rendered
            return entry.resource.id.includes("patientAdded") ||
              (entry.confirmStatus !== "confirmed" &&
                entry.confirmStatus !== "unedited") ? (
              <tr key={entry.listID}>
                {columnsData.map(({ tData, oData, isEditedData }, index) => (
                  // Render the table cell
                  <td
                    key={index}
                    style={{
                      backgroundColor:
                        entry.confirmStatus === "confirmed" ||
                        entry.resource.id.includes("patientAdded")
                          ? "var(--bs-success-border-subtle)"
                          : entry.confirmStatus !== "unedited"
                          ? "pink"
                          : null,
                      textDecoration:
                        entry.confirmStatus === "removedByPatient" ||
                        entry.edits["clinicianStopped"] === true
                          ? "line-through"
                          : null,
                    }}
                  >
                    {/* If it's edited data, display it with strikethrough style */}
                    {isEditedData ? (
                      <>
                        <p
                          className="originalData"
                          style={{ textDecoration: "line-through" }}
                        >
                          {oData}
                        </p>
                        <span className="editedData" style={{ color: "red" }}>
                          {tData}
                        </span>
                      </>
                    ) : (
                      // If it's not edited data, display the original data
                      tData
                    )}
                  </td>
                ))}
                {Object.keys(entry.edits).length > 0 ||
                entry.confirmStatus !== "unedited" ? (
                  <td colSpan={columns.length}>
                    {Object.entries(entry.edits).map(([key, value]) =>
                      key !== "id" && value !== "" ? (
                        <div key={key}>
                          <span style={{ color: "red" }}>
                            {key == "other"
                              ? "Other:"
                              : key == "sideEffect"
                              ? "Side Effect:"
                              : key == "clinicianStopped"
                              ? "Stopped by Clinician"
                              : null}
                          </span>
                        </div>
                      ) : null
                    )}
                    <span style={{ color: "red" }}>
                      {checkSideEffectOrOther(entry.edits)}
                    </span>
                  </td>
                ) : entry.resource.id.includes("patientAdded") ? (
                  <td style={{ color: "green" }}>Patient Added Medication</td>
                ) : null}
              </tr>
            ) : null;
          })
        }
      </tbody>
    );
  }
  if (medicationListVersion === "patientToPrint") {
    return (
      <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
        {tableData.map((entry) => {
          return (
            <tr key={entry.listID}>
              {columns.map(({ accessor }) => {
                let tData = null;
                if (accessor === "notes") {
                  return null;
                } else if (accessor === "medicationName") {
                  tData = entry["rxNormData"]["drugName"];
                } else if (accessor === "dosage") {
                  tData = entry.edits.dosage
                    ? entry.edits.dosage
                    : entry["rxNormData"]["dosage"];
                } else if (accessor === "units") {
                  tData = entry.edits.units
                    ? entry.edits.units
                    : entry["rxNormData"]["dosageUnits"];
                } else if (accessor === "instructions") {
                  tData = entry.edits.instructions
                    ? entry.edits.instructions
                    : entry["dosageInstructions"][0]["patientInstruction"];
                } else if (accessor === "timeTaken") {
                  tData = entry.edits.timeTaken ? (
                    convertTo12HourFormat(entry.edits.timeTaken)
                  ) : entry.medicationWhenTaken ? (
                    convertTo12HourFormat(entry.medicationWhenTaken)
                  ) : (null
                  );
                } else if (accessor === "condition") {
                  tData = entry["reasonCode"]["text"];
                } else if (accessor === "prescriber") {
                  tData = entry["requester"];
                } else {
                  tData = null;
                }
                // console.log(entry);
                // console.log(accessor)
                let editValue =
                  accessor in entry["edits"] && entry["edits"][accessor] !== []
                    ? entry["edits"][accessor]
                    : null;
                if (entry.edit && entry.edit.clinicianStopped === true) {
                  return null;
                }
                if (accessor === "notes") {
                  return null;
                }
                return (
                  <>
                    <td
                      key={accessor}
                      style={{
                        backgroundColor:
                          entry.confirmStatus === "confirmed"
                            ? "var(--bs-success-border-subtle)"
                            : entry.confirmStatus === "unsure"
                            ? "var(--bs-highlight-bg)"
                            : null,
                      }}
                    >
                      <p
                        style={{
                          color: editValue !== null ? "red" : "black",
                          textDecoration:
                            editValue === "" ||
                            entry.confirmStatus === "removedByPatient"
                              ? "line-through"
                              : "none",
                        }}
                      >
                        {editValue ? editValue : tData}
                      </p>
                    </td>
                  </>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  } else {
    return <div>null</div>;
  }
};

export default MedicationListTable;
