import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCar</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
      </div>
      <div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card shadow" style={{width: "18rem", height: "24rem"}}>
              <img src="https://pictures.dealer.com/a/accesscorpuschristifordfd/0555/aab0bbb53d2c35f4a47b488d99af4b51x.jpg?impolicy=downsize&w=568" className="card-img-top" style={{height: "200px"}} />
              <div className="card-body">
                <h5 className="card-title">Service</h5>
                <p className="card-text">Manage and view new, current, and past appointments. </p>
                <Link to="/appointments/" className="btn btn-primary">View Appointments</Link>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow" style={{width: "18rem", height: "24rem"}}>
              <img src="https://njbmagazine.com/wp-content/uploads/2020/06/car_dealership-775x500.jpeg" className="card-img-top" style={{height: "200px"}} />
                <div className="card-body">
                  <h5 className="card-title">Inventory</h5>
                  <p className="card-text">Manage Inventory</p>
                  <Link to="/automobiles/" className="btn btn-primary">View Inventory</Link>
                </div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow" style={{width: "18rem", height: "24rem"}}>
              <img src="https://w6b2m2v6.rocketcdn.me/wp-content/uploads/2018/09/car-sales-techniques.jpeg" className="card-img-top" style={{height: "200px"}} />
                <div className="card-body">
                  <h5 className="card-title">Sales</h5>
                  <p className="card-text">Manage Sales</p>
                  <Link to="/sales/" className="btn btn-primary">View Sales</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
