import './App.css';
import Clients from './components/clients/Clients';
import Employees from './components/employees/Employees';
import Offers from './components/offers/Offers';
import Sales from './components/sales/Sales';
import Teams from './components/teams/Teams';

function App() {
  return (
    <div>
      <Clients />
      <Employees />
      <Offers />
      <Sales />
      <Teams />
    </div>
  );
}

export default App;
