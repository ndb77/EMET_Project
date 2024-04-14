import React from "react";
import reactRouterDom, { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";

// A button that adjusts values within the medication object when clicked
const MedicationListTableBodyButton = ({ medicationID, selectionType }) => {
  const changeMedicationStatus = useStoreActions(
    (actions) => actions.changeMedicationStatus
  );
  const medications = useStoreState((state) => state.medications);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    if (medications.length>0) {
      setData(medications);
      setLoading(false);
    } else {
      setData([]);
    }
  }, [medications]);

  if (isLoading === false) {
    if (selectionType === "change") {
      return (
        <Link to={`/medicationChange/${medicationID}`}>
          <button
            style={{ backgroundColor: "yellow" }}
          >{`${selectionType}`}</button>
        </Link>
      );
    } else if (selectionType === "confirm") {
      return (
        <button
          style={{ backgroundColor: "green" }}
          onClick={() => {
            let medicationConfirmStatus =  data.find(
              (item) => item.listID === medicationID
            )
            changeMedicationStatus({
              medicationID: medicationID,
              status: medicationConfirmStatus.confirmStatus === "confirmed"
                  ? "unedited"
                  : "confirmed",
            });
          }}
        >{`${selectionType}`}</button>
      );
    } else if (selectionType === "change") {
      return (
        <button
          style={{ backgroundColor: "yellow" }}
        >{`${selectionType}`}</button>
      );
    } else if (selectionType === "condition") {
      return <p style={{ color: "red" }}>Provider will Set</p>;
    } else if (selectionType === "remove") {
      return (
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            let medicationConfirmStatus =  data.find(
              (item) => item.listID === medicationID
            )
            changeMedicationStatus({
              medicationID: medicationID,
              status:
                medicationConfirmStatus.confirmStatus === "removedByPatient"
                  ? "unedited"
                  : "removedByPatient",
            });
          }}
        >{`${selectionType}`}</button>
      );
    } else if (selectionType === "refill") {
      return (
        <button
          style={{ backgroundColor: "blue", color: "white" }}
          onClick={() => {
            let medicationConfirmStatus =  data.find(
              (item) => item.listID === medicationID
            )
            changeMedicationStatus({
              medicationID: medicationID,
              status:
                medicationConfirmStatus.confirmStatus === "needRefill" ? "unedited" : "needRefill",
            });
          }}
        >{`${selectionType}`}</button>
      );
    } else {
      return <p style={{ color: "red" }}>Set Through Change Menu</p>;
    }
  }
};

export default MedicationListTableBodyButton;
