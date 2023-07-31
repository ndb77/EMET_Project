import React from "react";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";

const AddMedicationWhenTaken = ({ setMedicationWhenTaken,editTime }) => {
  const [time, setTime] = useState("");

  // Function to handle time selection and logging the selected time
  const handleTimeChange = (newTime) => {
    // Format the selected time in 12-hour format with am/pm
    const selectedTime = newTime.format("hh:mm A");
    
    // Get the 24-hour time separately
    const time24Hour = newTime.format("HH:mm");
    
    setTime(newTime);
    if(setMedicationWhenTaken){
      setMedicationWhenTaken(time24Hour)
    }
    if(editTime){
      // console.log(time24Hour)
      editTime(time24Hour)
    }
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimeField"]}>
        {/* Modify the TimeField component to include the onChange prop */}
        <TimeField label="Enter Time" onChange={handleTimeChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default AddMedicationWhenTaken;