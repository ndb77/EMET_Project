import React from "react";
import MedicationListTableBodyButton from "./MedicationListTableBodyButton";
const MedicationListTableBodyComponent = ({
  columns,
  tableData,
  medicationListVersion,
}) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
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
  if (medicationListVersion === "updated") {
    return (
      <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
        {tableData.map((data) => {
          console.log(data);
          return (
            <tr key={data.id}>
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? (
                  data[accessor]
                ) : (
                  <MedicationListTableBodyButton
                    medicationID={data.id}
                    selectionType={accessor}
                  />
                );
                let editValue =
                  accessor in data["edit"] && data["edit"][accessor].length > 0
                    ? data["edit"][accessor]
                    : null;
                if (data.edit && data.edit.clinicianStopped === true) {
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
                          data.dateAdded === today ||
                          data.confirmStatus === "confirmed"
                            ? "var(--bs-success-border-subtle)"
                            : data.confirmStatus === "unsure"
                            ? "var(--bs-highlight-bg)"
                            : null,
                      }}
                    >
                      <p
                        style={{
                          color: editValue !== null ? "red" : "black",
                          textDecoration:
                            editValue === "" ||
                            data.confirmStatus === "removedByPatient"
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
  } else if (medicationListVersion === "editedList") {
    return (
      <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
        {tableData.map((data) => {
          if (data.dateAdded === today) {
            return (
              <tr key={data.id}>
                {columns.map(({ accessor }) => {
                  let tData = data[accessor];
                  if (accessor === "notes") {
                    tData = "Patient Added Medication";
                  }
                  let editValue =
                    accessor in data["edit"] &&
                    data["edit"][accessor].length > 0
                      ? data["edit"][accessor]
                      : null;
                  if (
                    data.edit &&
                    (data.edit.clinicianStopped === true ||
                      data.edit.sideEffect)
                  ) {
                    editValue = "";
                  }
                  if (
                    accessor === "confirm" ||
                    accessor === "change" ||
                    accessor === "remove" ||
                    accessor === "refill"
                  ) {
                    return null;
                  }
                  return (
                    <>
                      <td key={accessor}>
                        <p
                          style={{
                            color:
                              editValue !== null || editValue === ""
                                ? "red"
                                : data.dateAdded === today
                                ? "green"
                                : null,
                            textDecoration:
                              (editValue !== null || editValue === "") &&
                              accessor !== "notes"
                                ? "line-through"
                                : data.dateAdded === today
                                ? "underline"
                                : null,
                          }}
                        >
                          {tData}
                        </p>
                        {medicationListVersion &&
                        !(
                          accessor === "confirm" ||
                          accessor === "change" ||
                          accessor === "remove" ||
                          accessor === "refill"
                        ) ? (
                          <div>
                            <div className="col">
                              <p style={{ color: "red" }}>{editValue}</p>
                            </div>
                          </div>
                        ) : null}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          }
          if (data.confirmStatus === "removedByPatient") {
            return (
              <tr key={data.id}>
                {columns.map(({ accessor }) => {
                  let tData = data[accessor];
                  if (accessor === "notes") {
                    tData = "Patient Removed Medication";
                  }
                  let editValue =
                    accessor in data["edit"] &&
                    data["edit"][accessor].length > 0
                      ? data["edit"][accessor]
                      : null;
                  if (
                    data.edit &&
                    (data.edit.clinicianStopped === true ||
                      data.edit.sideEffect)
                  ) {
                    editValue = "";
                  }
                  if (
                    accessor === "confirm" ||
                    accessor === "change" ||
                    accessor === "remove" ||
                    accessor === "refill"
                  ) {
                    return null;
                  }
                  return (
                    <>
                      <td key={accessor}>
                        <p
                          style={{
                            color:
                              editValue !== null ||
                              editValue === "" ||
                              data.confirmStatus === "removedByPatient"
                                ? "red"
                                : data.dateAdded === today
                                ? "green"
                                : null,
                            textDecoration:
                              (editValue !== null || editValue === "") &&
                              accessor !== "notes"
                                ? "line-through"
                                : data.dateAdded === today
                                ? "underline"
                                : null,
                          }}
                        >
                          {tData}
                        </p>
                        {medicationListVersion &&
                        !(
                          accessor === "confirm" ||
                          accessor === "change" ||
                          accessor === "unsure"
                        ) ? (
                          <div>
                            <div className="col">
                              <p style={{ color: "red" }}>{editValue}</p>
                            </div>
                          </div>
                        ) : null}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          }
          if (Object.keys(data.edit).length > 0) {
            return (
              <tr key={data.id}>
                {columns.map(({ accessor }) => {
                  let tData = data[accessor];
                  if (accessor === "notes") {
                    if (data.edit.clinicianStopped === true) {
                      tData = "Clinician stopped med";
                    } else if (data.edit.sideEffect) {
                      tData = `Experiencing side effects: ${data.edit.sideEffect}`;
                    } else {
                      tData = data[accessor];
                    }
                  }
                  let editValue =
                    accessor in data["edit"] &&
                    data["edit"][accessor].length > 0
                      ? data["edit"][accessor]
                      : null;
                  if (
                    data.edit &&
                    (data.edit.clinicianStopped === true ||
                      data.edit.sideEffect)
                  ) {
                    editValue = "";
                  }
                  if (
                    accessor === "confirm" ||
                    accessor === "change" ||
                    accessor === "remove" ||
                    accessor === "refill"
                  ) {
                    return null;
                  }
                  return (
                    <>
                      <td key={accessor}>
                        <p
                          style={{
                            color:
                              editValue !== null || editValue === ""
                                ? "red"
                                : null,
                            textDecoration:
                              (editValue !== null ||
                                editValue === "" ||
                                data.confirmStatus === "removedByPatient") &&
                              accessor !== "notes"
                                ? "line-through"
                                : null,
                          }}
                        >
                          {tData}
                        </p>
                        {medicationListVersion &&
                        !(
                          accessor === "confirm" ||
                          accessor === "change" ||
                          accessor === "remove" ||
                          accessor === "refill"
                        ) ? (
                          <div>
                            <div className="col">
                              <p style={{ color: "red" }}>{editValue}</p>
                            </div>
                          </div>
                        ) : null}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          }
        })}
      </tbody>
    );
  } else if (medicationListVersion === "patientToPrint") {
    return (
      <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
        {tableData.map((data) => {
          return (
            <tr key={data.id}>
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? data[accessor] : null;
                let editValue =
                  accessor in data["edit"] && data["edit"][accessor].length > 0
                    ? data["edit"][accessor]
                    : null;
                if (data.edit && data.edit.clinicianStopped === true) {
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
                          data.confirmStatus === "confirmed"
                            ? "var(--bs-success-border-subtle)"
                            : data.confirmStatus === "unsure"
                            ? "var(--bs-highlight-bg)"
                            : null,
                      }}
                    >
                      <p
                        style={{
                          color: editValue !== null ? "red" : "black",
                          textDecoration:
                            editValue === "" ||
                            data.confirmStatus === "removedByPatient"
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
    return (
      <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
        {tableData.map((entry) => {
          return entry.map((data) => {
            console.log(data.listID)
            return (
              <tr key={data.listID}>
                {columns.map(({ accessor }) => {
                  let tData = (null);
                  if (accessor === "notes") {
                    return null;
                  } else if (accessor === "medicationName") {
                    tData = data["rxNormData"]["drugName"];
                  } else if (accessor === "dosage") {
                    tData = data["rxNormData"]["dosage"];
                  } else if (accessor === "units") {
                    tData = data["rxNormData"]["dosageUnits"];
                  } else if (accessor === "instructions") {
                    tData = data["dosageInstructions"][0]["patientInstruction"];
                  } else if (accessor === "condition") {
                    tData = data["reasonCode"]["text"];
                  } else if (accessor === "condition") {
                    tData = data["reasonCode"]["text"];
                  } else if (accessor === "prescriber") {
                    tData = data["requester"];
                  } else if (accessor === "validUntil") {
                    tData = formatDate(
                      extractDate(data["dosageInstructions"][0]["text"])
                    );
                  } else if (
                    accessor == "confirm" ||
                    accessor == "change" ||
                    accessor == "remove" ||
                    accessor == "refill" ||
                    accessor == "change"
                  ) {
                    tData = 
                      <MedicationListTableBodyButton
                        medicationID={data.listID}
                        selectionType={accessor}
                      />
                  } else {
                    tData = null;
                  }
                  console.log(tData)
                  return (
                    <>
                      <td key={accessor}>
                        <p>{tData}</p>
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          });
        })}
      </tbody>
    );
  }
};

export default MedicationListTableBodyComponent;
