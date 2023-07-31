import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddMedicationValidUntilDate = ({setValidUntilDate}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to handle date selection and logging the selected date
  const handleDateChange = (newDate) => {
    // Format the selected date in 'yyyy-mm-dd' format
    const formattedDate = newDate.format('YYYY-MM-DD');
    
    setSelectedDate(newDate);
    setValidUntilDate(formattedDate)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        {/* Modify the DatePicker component to include the onChange prop */}
        <DatePicker
          label="Enter Date"
          onChange={handleDateChange}
          value={selectedDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default AddMedicationValidUntilDate;
