import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ListTechnicians from './Service/ListTechnicians';
import CreateTechnician from './Service/TechnicianForm'
import CreateAppointment from './Service/CreateAppointment'
import ListAppointments from './Service/ListAppointments'
import VinHistory from './Service/VinHIstory';
import SearchBar from './Service/SearchBar';
import ManufacturerForm from './ManufacturerFrom';
import ModelForm from './ModelForm';
import AutomobileForm from './AutomobileForm';
import SalespersonForm from './Sales/SalespersonForm';
import Customer1Form from './Sales/Customer1Form';
import SaleForm from './Sales/SaleForm';
import SalesList from './Sales/SalesList';
import SalespersonSales from './Sales/SalespersonSales';

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
