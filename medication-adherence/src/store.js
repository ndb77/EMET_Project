import { createStore, action, thunk, computed } from "easy-peasy";
import useAxiosFetch from "./hooks/useAxiosFetch";
import api from "./api/medications";

export default createStore({
  medications: [],
  setMedications: action((state, payload) => {
    state.medications.push(payload);
  }),
  saveMedication: thunk(async (actions, newMedication, helpers) => {
    const { medications } = helpers.getState();
    const {id,medicationName,dosage,units,instructions,prescriber,rxcuis} = newMedication
    
    const medicationToAdd = {
      id: id,
      medicationName: medicationName,
      dosage: dosage,
      units: units,
      instructions: instructions,
      condition: '',
      prescriber: prescriber,
      timeTaken: '',
      lastModified: new Date().toISOString().slice(0, 10),
      edit: {},
      confirmStatus: 'newMedication',
      rxcui:rxcuis,
    }
    // id: medicationID,
    // dosage: strength,
    // units: strength,
    // instructions: instructions,
    // prescriber: prescriber,
    // rxcuis:medicationRXCUI
    try {
      const response = await api.post("/medications", medicationToAdd);
      actions.setMedications([...medications, response.data]);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
  editMedication: thunk(async (actions, medicationUpdate, helpers) => {
    const { medications } = helpers.getState();
    const { id } = medicationUpdate;

    function removeUndefinedValues(obj) {
      const cleanedObj = {};
    
      for (let key in obj) {
        if (obj[key] !== undefined) {
          cleanedObj[key] = obj[key];
        }
      }
      return cleanedObj;
    }
    try {
      const medicationToEdit = medications[1].find((item)=>item.id===Number(id))
      const cleanedMedicationUpdate = removeUndefinedValues(medicationUpdate)
      medicationToEdit.edit = cleanedMedicationUpdate
      medicationToEdit.confirmStatus = 'edited'
      medicationToEdit.lastModified = new Date().toISOString().slice(0, 10)
      await api.put(`/medications/${id}`,medicationToEdit)
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
  changeMedicationStatus: thunk(async (actions, statusChange, helpers) => {
    const {medicationID,status} = statusChange
    const { medications } = helpers.getState();
    try {
      const medicationToEdit = medications[1].find((item)=>item.id===Number(medicationID))
      medicationToEdit.confirmStatus = status
      actions.setMedications(
        medications.map((med) => (med.id === medicationID ? medicationToEdit : med))
      );
      await api.put(`/medications/${medicationID}`, medicationToEdit);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
});
