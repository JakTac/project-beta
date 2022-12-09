import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateTechnician from './TechnicianForm'
import CreateAppointment from './CreateAppointment'
import ListAppointments from './ListAppointments'
import VinHistory from './VinHIstory';
import SearchBar from './SearchBar';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/new" element={<CreateTechnician />} />
          <Route path="/:id/history/" element={<VinHistory />} />
          <Route path="/appointments/new" element={<CreateAppointment />} />
          <Route path="/appointments" element={<ListAppointments />} />
          <Route path="/searchbar" element={<SearchBar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
