import React, { useEffect } from "react";
import { useState } from "react";
import MedicationListTableHeadComponent from "./MedicationListTableHeadComponent";
import MedicationListTable from "./MedicationListTable";
import RightArrow from "../img/RightArrow.png";
import { useStoreState, useStoreActions } from "easy-peasy";

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
    function extractAndFormatUntilDate(text) {
      // Regular expression to match the "Until" date pattern (e.g., "Until Wed 5/27/2020")
      const regex = /Until\s(\w+\s\d{1,2}\/\d{1,2}\/\d{4})/;
    
      // Extract the "Until" date using the regular expression
      const match = text.match(regex);
    
      if (match && match[1]) {
        // Extracted "Until" date in the format "M/D/YYYY"
        const untilDate = match[1];
    
        // Convert the "M/D/YYYY" date format to "YYYY-MM-DD" format
        const [month, day, year] = untilDate.split('/');
        const formattedUntilDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    
        return formattedUntilDate;
      } else {
        // Return null if the "Until" date is not found or the text doesn't match the pattern
        return null;
      }
    }
    
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
