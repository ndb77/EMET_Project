import React from "react";
import MedicationListTableHeadComponent from "./MedicationListTableHeadComponent";
import MedicationListTable from "./MedicationListTable";
import { useState } from "react";

export const PrintPageTable = React.forwardRef(
  (props) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    // a function that gets figures out what is the order that the table needs to be sorted in
    // props.handleSort(props.accessor, 'desc');
    return (
      <div >
        <table className="table">
        <MedicationListTableHeadComponent
                    columns={props.columns}
                    handleSort={props.handleSort}
                    medicationListVersion={props.medicationListVersion}
                  />
          
          <MedicationListTable
            columns={props.columns}
            tableData={props.tableData}
            medicationListVersion={props.medicationListVersion}
          />
        </table>
      </div>
    );
  }
);
