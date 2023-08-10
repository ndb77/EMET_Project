import React, { useEffect } from "react";
import { useState } from "react";
import MedicationListTableHeadComponent from "./MedicationListTableHeadComponent";
import MedicationListTable from "./MedicationListTable";
import RightArrow from "../img/RightArrow.png";
import { useStoreState, useStoreActions } from "easy-peasy";

// Renders the table for the medicationList dynamically according to what is version is provided through the props. 
// Provides the sort function to the TableHeadComponent which registers which heading was clicked, then provides ListTable component with the newly organized table data 
const MedicationListTableComponent = ({ medicationListVersion }) => {
  const [tableData, setTableData] = useState([]);
  const medications = useStoreState((state) => state.medications);
  useEffect(() => {
    if (medications.length !==[]) {
      try {
        setTableData(medications);
      } catch {
        setTableData([]);
      }
    }
  }, [medications]);
  const columns = [
    { label: "Medication", accessor: "medicationName", sortable: true },
    { label: "Dosage", accessor: "dosage", sortable: false },
    { label: "Units", accessor: "units", sortable: false },
    { label: "Instructions", accessor: "instructions", sortable: false },
    { label: "When Taken", accessor: "timeTaken", sortable: true },
    { label: "Condition", accessor: "condition", sortable: true },
    { label: "Prescriber", accessor: "prescriber", sortable: true },
    { label: "", accessor: "confirm", sortable: false },
    { label: "", accessor: "change", sortable: false },
    { label: "", accessor: "remove", sortable: false },
    { label: "", accessor: "refill", sortable: false },
    { label: "Notes", accessor: "notes", sortable: false },
  ];
  const handleSort = (sortField, sortOrder) => {    
    const sorted = [...tableData].sort((a, b) => {
      let toSortA = null
      let toSortB = null
      if(sortField==='medicationName'){
        toSortA = a.rxNormData.drugName
        toSortB = b.rxNormData.drugName
      }
      if(sortField==='timeTaken'){
        toSortA = a.medicationWhenTaken
        toSortB = b.medicationWhenTaken
      }
      if(sortField==='condition'){
        toSortA = a.reasonCode.text
        toSortB = b.reasonCode.text
      }
      if(sortField==='prescriber'){
        toSortA = a.requester
        toSortB = b.requester
      }
      return (
        toSortA
          .toString()
          .localeCompare(toSortB.toString(), "en", { numeric: true }) *
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
            backgroundColor: "#f1f1f1",
          }}
        >
          <h3>{medicationListVersion==='updated'? 'Updated Medications':'Current Medications'}</h3>
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
              backgroundColor:"white",
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
              <div className="table fixTableHead">
                <table className="table">
                  <MedicationListTableHeadComponent
                    columns={columns}
                    handleSort={handleSort}
                    medicationListVersion={medicationListVersion}
                  />
                  <MedicationListTable
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
                backgroundColor: "#f1f1f1",
              }}
            >
              <h3>Edited Medications</h3>
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
                  backgroundColor: "white",
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
                  <div className="table fixTableHead">
                    <table className="table">
                      <MedicationListTableHeadComponent
                        columns={columns}
                        handleSort={handleSort}
                        medicationListVersion="editedList"
                      />
                      <MedicationListTable
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
