import React from "react";
import MedicationListTableBodyButton from "./MedicationListTableBodyButton";
import { useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
const MedicationListTableBodyComponent = ({
  columns,
  tableData,
  medicationListVersion,
}) => {
  if (medicationListVersion === "updated") {
    return (
      <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
        {tableData.map((data) => {
          return (
            <tr key={data.id}>
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? (
                  data[accessor]
                ) : (
                  <MedicationListTableBodyButton
                    id={data.id}
                    selectionType={accessor}
                  />
                );
                let editValue =
                  accessor in data["edit"] && data["edit"][accessor].length > 0
                    ? data["edit"][accessor]
                    : null;
                if (data.edit && data.edit.clinicianStopped === true){
                  editValue = ""
                }
                return (
                  <>
                    <td key={accessor}>
                      <p
                        style={{
                          textDecoration:
                            editValue !== null ? "line-through" : null,
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
        })}
      </tbody>
    );
  } else if (medicationListVersion === "editedList") {
    return (
      <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
        {tableData.map((data) => {
          if (Object.keys(data.edit).length > 0) {
            return (
              <tr key={data.id}>
                {columns.map(({ accessor }) => {
                  const tData = data[accessor] ? (
                    data[accessor]
                  ) : (
                    <MedicationListTableBodyButton
                      id={data.id}
                      selectionType={accessor}
                    />
                  );
                  let editValue =
                    accessor in data["edit"] &&
                    data["edit"][accessor].length > 0
                      ? data["edit"][accessor]
                      : null;
                  if (data.edit && data.edit.clinicianStopped === true){
                    editValue = ""
                  }
                  return (
                    <>
                      <td key={accessor}>
                        <p
                          style={{
                            color: editValue !== null ? "red" : "black",
                            textDecoration:editValue===""?"line-through":"none",
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
          }
        })}
      </tbody>
    );
  } else {
    return (
      <tbody style={{ borderWidth: 1, borderStyle: "solid" }}>
        {tableData.map((data) => {
          return (
            <tr key={data.id}>
              {columns.map(({ accessor }) => {
                const tData = data[accessor] ? (
                  data[accessor]
                ) : (
                  <MedicationListTableBodyButton
                    id={data.id}
                    selectionType={accessor}
                  />
                );
                const editValue =
                  accessor in data["edit"] && data["edit"][accessor].length > 0
                    ? data["edit"][accessor]
                    : null;
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
        })}
      </tbody>
    );
  }
};

export default MedicationListTableBodyComponent;
