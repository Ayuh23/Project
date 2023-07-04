import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState([]);

  /* useEffect(() => {
    axios
      .get("http://localhost:4000/get/" + id)
      .then((res) => res.data.Result[0])
      .catch((err) => console.log(err));
  }); */

  useEffect(() => {
    axios
      .get("http://localhost:4000/get/" + id)
      .then((res) => setRestaurant(res.data.Result[0]))
      .catch((err) => console.log(err));
  });

  const handleLogout = () => {
    axios
      .get("http://localhost:4000/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    // <div>
    //   <div className="d-flex justify-content-center flex-column align-items-center mt-3">
    //     <img
    //       src={`http://localhost:4000/images/` + restaurant.image}
    //       alt=""
    //       className="empImg"
    //     />
    //     <div className="d-flex align-items-center flex-column mt-5">
    //       <h3>Name: {restaurant.name}</h3>
    //       <h3>Email: {restaurant.email}</h3>
    //       <h3>SaRestaurantestaurant.salary}</h3>
    //     </div>
    //     <div>
    //       <button className="btn btn-primary me-2">Edit</button>
    //       <button className="btn btn-danger" onClick={handleLogout}>
    //         Logout
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="restaurant-profile">
      <div className="navRestaurant">
        <div className="navLogoRestro">RLS</div>
        <div>
          <button className="custombutton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="restaurantBody"></div>
      <div className="restaurantDetailsList">
        <div className="restroImage">
          <img
            src={`http://localhost:4000/images/` + restaurant.image}
            alt=""
            className="restro"
          />
        </div>
        <div className="restroName">
          <h3> {restaurant.name}</h3>
          <div className="restroOtherDetails">
            <h3>Email: {restaurant.email}</h3>
            <h3>Location: {restaurant.location}</h3>
            <h3>Phone: {restaurant.phone}</h3>
          </div>
        </div>
      </div>
      {/* <div className="restroOtherDetails">
        <h3>Email: {Restaurant.email}</h3>
        <h3>Location: {Restaurant.location}</h3>
        <h3>Phone: {Restaurant.phone}</h3>
      </div> */}
    </div>
  );
}

export default RestaurantDetail;
