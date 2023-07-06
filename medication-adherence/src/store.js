import { createStore, action, thunk, computed } from "easy-peasy";
import useAxiosFetch from "./hooks/useAxiosFetch";

export default createStore({
  medications: [],
  setMedications: action((state, payload) => {
    state.medications.push(payload);
  }),
  fetchMedications: thunk(async (actions, payload) => {
    try {
      const { data, fetchError, isLoading } = useAxiosFetch(
        "http://localhost:3500/medications"
      );
      actions.setMedications(data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }),
});
