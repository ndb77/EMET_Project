import { createStore, action, thunk, computed } from "easy-peasy";
import useAxiosFetch from "./hooks/useAxiosFetch";
import api from "./api/medications";

export default createStore({
  medications: [],
  setMedications: action((state, payload) => {
    state.medications.push(payload);
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
});
