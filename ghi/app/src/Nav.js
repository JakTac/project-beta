import { NavLink } from 'react-router-dom';


const styles = {
  marginRight: "10px",
  padding: "10px"
}


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li style={{styles}}>
              <div className="dropdown">
                <a className="btn btn-success dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Service
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className='dropdown-item' aria-current='page' to='/appointments/'>List Appointments</NavLink>
                  </li>
                  <li>
                    <NavLink className='dropdown-item' aria-current='page' to='/appointments/new/'>Create an Appointment</NavLink>
                  </li>
                  <li>
                    <NavLink className='dropdown-item' aria-current='page' to='/technicians/new/'>Create a Technician</NavLink>
                  </li>
                  <li>
                    <NavLink className='dropdown-item' aria-current='page' to='/technicians/'>List Technicians</NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="dropdown">
                <a className="btn btn-success dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Inventory
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" aria-current="page" to="/manufacturers/new/">Add a Manufacturer</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" aria-current="page" to="/manufacturers/">List Manufacturers</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" aria-current="page" to="/models/">Add a Vehicle model</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" aria-current="page" to="/models/new/">List Vehicle Models</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" aria-current="page" to="/automobiles/new/">Add a Automobile</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" aria-current="page" to="/automobiles/">List Automobiles</NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="dropdown">
                <a className="btn btn-success dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sales
                </a>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <NavLink className="dropdown-item" aria-current="page" to="/sales/">List sales</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" aria-current="page" to="/salesperson/">Add a Salesperson</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" aria-current="page" to="/customer/">Add a customer</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="dropdown-item" aria-current="page" to="/sale/">Record a sale</NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
