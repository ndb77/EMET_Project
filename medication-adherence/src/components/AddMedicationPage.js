import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AddMedicationMenu from "./AddMedicationMenu";
const AddMedicationPage = () => {
  return (
    <div className="container" style={{ marginTop: 12, maxWidth: 960 }}>
      <div className="row">
        <div className="col-auto mx-auto">
          <h1 style={{ textAlign: "center" }}>Add a medication</h1>
          <p>System banner
Name - Text input with type-aheadDose - Dropdown from validated dose listDose units - Default to valid units (e.g., mg)
Prescriber - FHIR lookup (or free text)
Instructions - Free text 
Medication identifier - RxNorm CUI (hidden)</p>
          <hr />
        </div>
      </div>
      <AddMedicationMenu />
    </div>
  );
};

export default AddMedicationPage;
