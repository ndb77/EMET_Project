import AddMedication from "./components/AddMedicationPage";
import Appointment from "./components/Appointment";
import CurrentMedicationList from "./components/CurrentMedicationList";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import MedicationChange from "./components/MedicationChange";
import UpdatedMedicationList from "./components/UpdatedMedicationList";
import PrintMedications from "./components/PrintMedicationsPage";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/appointment/:id" component={Appointment} />
        <Route
          exact
          path="/currentMedicationList"
          component={CurrentMedicationList}
        />
        <Route
          exact
          path="/updatedMedicationList"
          component={UpdatedMedicationList}
        />
        <Route exact path="/addMedication" component={AddMedication} />
        <Route
          exact
          path="/medicationChange/:id"
          component={MedicationChange}
        />
        <Route
          exact
          path="/updatedMedicationList/print"
          component={PrintMedications}
        />
      </Switch>
    </div>
  );
}

export default App;
