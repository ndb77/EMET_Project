import { useStoreState } from "easy-peasy";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintPageTable } from "./PrintPageTable";
import { Link } from "react-router-dom/cjs/react-router-dom";

// Provides the user the ability to print out their medications
// This component is very similar to MedicaitonListTableComponent however this component wraps the table component in a ref so that it can be printed with formatted page breaks
const PrintMedicationsPage = () => {
  const componentRef = useRef();
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
    { label: "", accessor: "unsure", sortable: false },
    { label: "Notes", accessor: "notes", sortable: false },
  ];
  const [medications, setMedications] = useState([]);
  const [patientPrintMedications, setPatientPrintMedications] = useState([]);
  const [maPrintMedications, setMaPrintMedications] = useState([]);
  const [pcpPrintMedications, setPcpPrintMedications] = useState([]);

  const medicationsList = useStoreState((state) => state.medications);

  const handleSortForPrintPatientMedicationList = (sortField, sortOrder) => {
    const sorted = [...medications].sort((a, b) => {
      return (
        a[sortField]
          .toString()
          .localeCompare(b[sortField].toString(), "en", { numeric: true }) *
        (sortOrder === "asc" ? 1 : -1)
      );
    });
    setPatientPrintMedications(sorted);
  };
  const handleSortForPrintMaMedicationList = (sortField, sortOrder) => {
    const sorted = [...medications].sort((a, b) => {
      return (
        a["medicationName"]
          .toString()
          .localeCompare(b["medicationName"].toString(), "en", {
            numeric: true,
          }) * -1
      );
    });
    setMaPrintMedications(sorted);
  };

  const handleSortForPrintPcpMedicationList = (sortField, sortOrder) => {
    const sorted = [...medications].sort((a, b) => {
      return (
        a["medicationName"]
          .toString()
          .localeCompare(b["medicationName"].toString(), "en", {
            numeric: true,
          }) * 1
      );
    });
    setPcpPrintMedications(sorted);
  };

  useEffect(() => {
    if (medicationsList.length !== []) {
      try {
        const meds = medicationsList;
        setMedications(meds);
        setPatientPrintMedications(meds);
        setMaPrintMedications(meds);
        setPcpPrintMedications(meds);
      } catch {
        setMedications([]);
      }
    }
  }, [medicationsList]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleFinish = () =>{
    console.log(medicationsList)
  }
  return (
    <div>
      <div>
        <button onClick={handlePrint} style={{margin:'20px'}}>Print Tables</button>
        <Link to='/home'>
          <button style={{margin:'20px'}} onClick={handleFinish}>Finish and return home</button>
        </Link>
      </div>
      <div ref={componentRef}>
        <h1>Patient Sheet - Updated List</h1>
        <PrintPageTable
          columns={columns}
          tableData={patientPrintMedications}
          handleSort={handleSortForPrintPatientMedicationList}
          medicationListVersion="patientToPrint"
        />
        <div className="page-break"></div>
        <h1>Medical Assistant Sheet - Medication Changes</h1>
        <PrintPageTable
          columns={columns}
          tableData={maPrintMedications}
          handleSort={handleSortForPrintMaMedicationList}
          medicationListVersion="editedList"
        />
        <div className="page-break"></div>
        <h1>Physician Sheet - Updated List</h1>
        <PrintPageTable
          columns={columns}
          tableData={pcpPrintMedications}
          handleSort={handleSortForPrintPcpMedicationList}
          medicationListVersion="patientToPrint"
        />
        <h1>Physician Sheet - Medication Changes</h1>
        <PrintPageTable
          columns={columns}
          tableData={pcpPrintMedications}
          handleSort={handleSortForPrintPcpMedicationList}
          medicationListVersion="editedList"
        />
      </div>
    </div>
  );
};

export default PrintMedicationsPage;
