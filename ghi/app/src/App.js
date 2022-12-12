import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListTechnicians from './Service/ListTechnicians';
import CreateTechnician from './Service/TechnicianForm'
import CreateAppointment from './Service/CreateAppointment'
import ListAppointments from './Service/ListAppointments'
import VinHistory from './Service/VinHIstory';
import SearchBar from './Service/SearchBar';
import ManufacturerForm from './Inventory/ManufacturerFrom';
import ModelForm from './Inventory/ModelForm';
import AutomobileForm from './Inventory/AutomobileForm';
import SalespersonForm from './SalespersonForm';
import Customer1Form from './Customer1Form';
import SaleForm from './SaleForm';
import SalesList from './SalesList';
import SalespersonSales from './SalespersonSales';
import ListAutomobiles from './Inventory/ListAutomobiles';
import ListModels from './Inventory/ListModels';
import ListManufacturers from './Inventory/ListManufacturers';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<ListTechnicians />} />
          <Route path="/technicians/new" element={<CreateTechnician />} />
          <Route path="/:id/history/" element={<VinHistory />} />
          <Route path="/appointments/new" element={<CreateAppointment />} />
          <Route path="/appointments" element={<ListAppointments />} />
          <Route path="/searchbar" element={<SearchBar />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/manufacturers/" element={<ListManufacturers />} />
          <Route path="/models/new" element={<ModelForm />} />
          <Route path='/models' element={<ListModels />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
          <Route path="/automobiles" element={<ListAutomobiles />} />
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
