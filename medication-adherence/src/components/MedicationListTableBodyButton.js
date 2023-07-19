import React from "react";
import reactRouterDom, { Link } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useEffect, useState } from "react";
const MedicationListTableBodyButton = ({ medicationID, selectionType }) => {
  const changeMedicationStatus = useStoreActions(
    (actions) => actions.changeMedicationStatus
  );
  const medications = useStoreState((state) => state.medications);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  function transformToInput() {
    // Get the button element
    const button = document.querySelector("button");
  
    // Create an input element
    const input = document.createElement("input");
    input.type = "text";
  

  }
  useEffect(() => {
    if (medications[1]) {
      setData(medications[1]);
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
            console.log(medicationID);
            const medicationConfirmStatus = data.find(
              (item) => item.id === medicationID
            ).confirmStatus;
            changeMedicationStatus({
              medicationID: medicationID,
              status: medicationConfirmStatus==="confirmed"?"unedited":"confirmed"
            })
          }}
        >{`${selectionType}`}</button>
      );
    } else if(selectionType==='change'){
      return (
        <button
          style={{ backgroundColor: "yellow" }}
        >{`${selectionType}`}</button>
      );
    }
    else if(selectionType==='condition') {
      return (
        <p
          style={{ color: "red" }}
        >Provider will Set</p>
      );
    }
    else if(selectionType==='remove'){
      return (
        <button
          style={{ backgroundColor: "red" }}
          onClick={() => {
            console.log(medications)
            const medicationConfirmStatus = data.find(
              (item) => item.id === medicationID
            ).confirmStatus;
            changeMedicationStatus({
              medicationID: medicationID,
              status: medicationConfirmStatus==="removedByPatient"?"unedited":'removedByPatient'
            })
          }}
        >{`${selectionType}`}</button>
      );
    }
    else if(selectionType==='refill'){
      return (
        <button
          style={{ backgroundColor: "blue",
        color:'white' }}
          onClick={() => {
            console.log(medications)
            const medicationConfirmStatus = data.find(
              (item) => item.id === medicationID
            ).confirmStatus;
            changeMedicationStatus({
              medicationID: medicationID,
              status: medicationConfirmStatus==="unsure"?"unedited":"unsure"
            })
          }}
        >{`${selectionType}`}</button>
      );
    }
    else {
      return (
        <p
          style={{ color: "red" }}
        >Set Through Change Menu</p>
      );
    }
  }
};

export default MedicationListTableBodyButton;



