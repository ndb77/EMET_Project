import React from "react";
import { useState } from "react";
const MedicationListTableHeadComponent = ({ columns, handleSort,medicationListVersion,editedList }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  // a function that gets figures out what is the order that the table needs to be sorted in
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSort(accessor, sortOrder);
  };

  return (
    <thead style={{ position: "sticky" }}>
      <tr>
        {/* Gets the column headings from parent and maps them to the table head */}
        {columns.map(({ label, accessor, sortable }) => {
          const icon = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
              ? "down"
              : "default"
            : "";
          return (
            <th
              key={accessor}
              style={{background: medicationListVersion==="updated"?"#a4cfbb":medicationListVersion==="editedList"?"#f4b0b7":"f1f1f1", postion: "sticky" }}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
            >
              {label}
              <img style= {{"width": "20px"}} className={icon}></img>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default MedicationListTableHeadComponent;
