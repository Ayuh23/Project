import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function restaurant() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/getrestaurant")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data.Result);
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:4000/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h5>Restaurant List</h5>
      </div>
      <Link to="/dashboard/create" className="btn btn-success my-5 btnCustom">
        Add Restaurant
      </Link>
      <div className="mt-3">
        <table className="table my-3">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {data.map((restaurant, index) => {
              return (
                <tr key={index}>
                  <td>
                    {
                      <img
                        src={`http://localhost:4000/images/` + restaurant.image}
                        alt=""
                        className="restaurant_image"
                      ></img>
                    }
                  </td>
                  <td className="align-middle">{restaurant.name}</td>
                  <td className="align-middle">{restaurant.email}</td>
                  <td className="align-middle">{restaurant.location}</td>
                  <td className="align-middle">{restaurant.phone}</td>
                  <td className="align-middle">
                    <Link
                      to={`/dashboard/restaurantEdit/` + restaurant.id}
                      className="btn btn-primary me-2 btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => handleDelete(restaurant.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default restaurant;
