import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateTechnician from './TechnicianForm'
import AppointmentList from './CreateAppointment'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/new" element={<CreateTechnician />} />
          <Route path="/appointments/new" element={<AppointmentList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
