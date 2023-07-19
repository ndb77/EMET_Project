import React from "react";
import { useState } from "react";
const MedicationListTableHeadComponent = ({
  columns,
  handleSort,
  medicationListVersion,
  editedList,
}) => {
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
          if (
            (medicationListVersion === "updated" ||
              medicationListVersion === "editedList") &&
            (accessor === "confirm" ||
              accessor === "change" ||
              accessor === "unsure")
          ) {
            return <th></th>;
          }
          if (
            (medicationListVersion === "updated" ||
              medicationListVersion === "current" ||
              medicationListVersion === "patientToPrint") &&
            accessor === "notes"
          ) {
            return null;
          }
          return (
            <th
              className={accessor == "medicationName" ? "sticky-header" : "sticky-header"}
              key={accessor}
              style={{
                alignItems: "center",
              }}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
            >
              <p>
                {accessor === "confirm" ||
                accessor === "change" ||
                accessor === "unsure"
                  ? null
                  : medicationListVersion === "editedList" &&
                    accessor === "notes"
                  ? ""
                  : label}
              </p>
              <img style={{ width: "20px" }} className={icon}></img>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default MedicationListTableHeadComponent;
