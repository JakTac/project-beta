import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './ManufacturerFrom';
import ModelForm from './ModelForm';
import AutomobileForm from './AutomobileForm';
import SalespersonForm from './SalespersonForm';
import Customer1Form from './Customer1Form';
import SaleForm from './SaleForm';
import SalesList from './SalesList';
import SalespersonSales from './SalespersonSales';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers/" element={<ManufacturerForm />} />
          <Route path="/models/" element={<ModelForm />} />
          <Route path="/automobiles/" element={<AutomobileForm />} />
          <Route path="/salesperson/" element={<SalespersonForm />} />
          <Route path="/customer/" element={<Customer1Form />} />
          <Route path="/sale/" element={<SaleForm />} />
          <Route path="/sales/" element={<SalesList />} />
          <Route path="/sales/salesperson/:id/" element={<SalespersonSales />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
