import React from "react";
import { useState } from "react";
import tableData1 from "../tableData.json";
import MedicationListTableBodyComponent from "./MedicationListTableBodyComponent";
import MedicationListTableHeadComponent from "./MedicationListTableHeadComponent";

import { useStoreState, useStoreActions } from "easy-peasy";

const MedicationListTableComponent = () => {
  const [tableData, setTableData] = useState(tableData1);

  const columns = [
    { label: "Medication Name", accessor: "medicationName", sortable: true },
    { label: "Dosage", accessor: "dosage", sortable: false },
    { label: "Units", accessor: "units", sortable: false },
    { label: "Instructions", accessor: "instructions", sortable: false },
    { label: "Condition", accessor: "condition", sortable: true },
    { label: "Prescriber", accessor: "prescriber", sortable: true },
    { label: "Time Taken", accessor: "timeTaken", sortable: true },
    { label: "Last Modified", accessor: "lastModified", sortable: true },
    { label: "", accessor: "confirm", sortable: false },
    { label: "", accessor: "change", sortable: false },
    { label: "", accessor: "unsure", sortable: false },
  ];
  const handleSort = (sortField, sortOrder) => {
    const sorted = [...tableData].sort((a, b) => {
      return (
        a[sortField]
          .toString()
          .localeCompare(b[sortField].toString(), "en", { numeric: true }) *
        (sortOrder === "asc" ? 1 : -1)
      );
    });
    setTableData(sorted);
  };

  return (
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
            style={{
              paddingRight: 0,
              paddingLeft: 0,
              width: 100,
              background: "#f1f1f1",
            }}
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
                paddingRight: 9,
                paddingLeft: 0,
                height: 230,
              }}
            >
              <div className="table-responsive fixTableHead">
                <table className="table">
                  <MedicationListTableHeadComponent
                    columns={columns}
                    handleSort={handleSort}
                  />
                  <MedicationListTableBodyComponent
                    columns={columns}
                    tableData={tableData}
                  />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationListTableComponent;
