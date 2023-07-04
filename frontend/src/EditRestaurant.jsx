import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRestaurant() {
  const [data, setData] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:4000/get/" + id)
      .then((res) => {
        setData({
          ...data,
          name: res.data.Result[0].name,
          email: res.data.Result[0].email,
          location: res.data.Result[0].location,
          phone: res.data.Result[0].phone,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefLocation
    axios
      .put("http://localhost:4000/update/" + id, data)
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("Update Success")
          window.assign("/restaurant");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <h2>Update Restaurant</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputLocation" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="inputLocation"
            placeholder="Enter Location"
            autoComplete="off"
            onChange={(e) => setData({ ...data, location: e.target.value })}
            value={data.location}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputphone" className="form-label">
            phone
          </label>
          <input
            type="text"
            className="form-control"
            id="inputphone"
            placeholder="Enter phone"
            autoComplete="off"
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            value={data.phone}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditRestaurant;
