import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AddMedicationMenu from "./AddMedicationMenu";
const AddMedicationPage = () => {
  return (
    <div className="container" style={{ marginTop: 12, maxWidth: 960 }}>
      <div className="row">
        <div className="col-auto mx-auto">
          <h1 style={{ textAlign: "center" }}>Add a medication</h1>
          <hr />
        </div>
      </div>
      <AddMedicationMenu />
    </div>
  );
};

export default AddMedicationPage;
