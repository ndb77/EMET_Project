import React, { useEffect } from "react";
import { useState } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";
import tableData1 from "../tableData.json";
import MedicationListTableBodyComponent from "./MedicationListTableBodyComponent";
import MedicationListTableHeadComponent from "./MedicationListTableHeadComponent";
import RightArrow from "../img/RightArrow.png";
import { useStoreState, useStoreActions } from "easy-peasy";

const MedicationListTableComponent = ({ medicationListVersion }) => {
  const [tableData, setTableData] = useState([]);
  const medications = useStoreState((state) => state.medications);
  useEffect(() => {
    if (medications.length > 1) {
      try {
        setTableData(medications[1]);
        console.log(medications);
      } catch {
        setTableData([]);
      }
    }
  }, [medications]);
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
            backgroundColor: medicationListVersion==='updated'?"#a4cfbb":"#f1f1f1",
          }}
        >
          <h3>{medicationListVersion==='updated'? 'Updated Medication List':'Current Medication List'}</h3>
        </div>
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
              background: medicationListVersion==='updated' ? "#a4cfbb" : "#f1f1f1",
            }}
          >
            <div className="row mobile-scrollable-indicator">
              <div className="col text-end">
                <p>
                  *Scrollable&nbsp;
                  <img src={RightArrow} style={{ width: 20 }} />
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
                    medicationListVersion={medicationListVersion}
                  />
                  <MedicationListTableBodyComponent
                    columns={columns}
                    tableData={tableData}
                    medicationListVersion={medicationListVersion}
                  />
                </table>
              </div>
            </div>
          </div>
        </div>

        {medicationListVersion === "updated" ? (
          <div>
            <div
              className="row"
              style={{
                boxShadow: "0px 0px 3px",
                marginLeft: 0,
                marginBottom: 0,
                marginRight: 0,
                marginTop: 20,
                backgroundColor: "#f4b0b7",
              }}
            >
              <h3>Discontinued Medications</h3>
            </div>
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
                  background: medicationListVersion ? "#f4b0b7" : "#f1f1f1",
                }}
              >
                <div className="row mobile-scrollable-indicator">
                  <div className="col text-end">
                    <p>
                      *Scrollable&nbsp;
                      <img src={RightArrow} style={{ width: 20 }} />
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
                        medicationListVersion="editedList"
                      />
                      <MedicationListTableBodyComponent
                        columns={columns}
                        tableData={tableData}
                        medicationListVersion="editedList"
                      />
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MedicationListTableComponent;