import AddMedication from "./components/AddMedicationPage"
import Appointment from "./components/Appointment"
import CurrentMedicationList from "./components/CurrentMedicationList"
import HomePage from "./components/HomePage"
import LoginPage from "./components/LoginPage"
import MedicationChange from "./components/MedicationChange"
import UpdatedMedicationList from "./components/UpdatedMedicationList"
import PrintMedications from './components/PrintMedicationsPage'
import { Route, Switch } from 'react-router-dom';
import { useStoreActions } from "easy-peasy";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useEffect } from "react"

function App() {
  const setMedications = useStoreActions((actions)=>actions.setMedications)
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/medications"
  )

  // const { data: a, fetchError: b, isLoading:c } = useAxiosFetch(
  //   "https://fhir-open.cerner.com/r4/ec2458f2-1e24-41c8-b71b-0e701af7583d/MedicationRequest?patient=12724067&status=active"
  // )
  useEffect(() => {
    setMedications(data);
  }, [data, setMedications]);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/appointment/:id" component={Appointment} />
        <Route exact path="/currentMedicationList" component={CurrentMedicationList}/>
        <Route exact path="/updatedMedicationList" component={UpdatedMedicationList} />
        <Route exact path="/addMedication" component={AddMedication} />
        <Route exact path="/medicationChange/:id" component={MedicationChange} />
        <Route exact path='/updatedMedicationList/print' component={PrintMedications}/>
      </Switch>
    </div>
  );
}

export default App;
