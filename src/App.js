import './App.css';
import Clients from './components/clients/Clients';
import Employees from './components/employees/List';
import Offers from './components/offers/List';
import Sales from './components/sales/List';
import Teams from './components/teams/List';

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
