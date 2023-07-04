import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style.css";

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [restaurantCount, setRestaurantCount] = useState();
  const [phonenumber, setPhonenumber] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:4000/adminCount")
      .then((res) => {
        setAdminCount(res.data[0].admin);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:4000/restaurantCount")
      .then((res) => {
        setRestaurantCount(res.data[0].restaurant);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:4000/phone")
      .then((res) => {
        setPhonenumber(res.data[0].sumOfPhonenumber);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container custom-container">
      <div className="p-3 d-flex flex-column justify-content-around mt-5">
        {" "}
        {/* Changed from 'd-flex' to 'd-flex flex-column' */}
        <div className="px-3 pt-2 pb-3 border shadow-sm w-100 mb-5 customCard">
          {" "}
          {/* Changed from 'w-25' to 'w-100' and added 'mb-3' for margin-bottom */}
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <div className="">
            <h5 className="text-center">Total: {adminCount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-100 mb-5 customCard">
          {" "}
          {/* Changed from 'w-25' to 'w-100' and added 'mb-3' for margin-bottom */}
          <div className="text-center pb-1">
            <h4>Restaurant</h4>
          </div>
          <div className="">
            <h5 className="text-center">Total: {restaurantCount}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

// <div>
//   <div className="p-3 d-flex justify-content-around mt-5">
//     <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
//       <div className="text-center pb-1">
//         <h4>Admin</h4>
//       </div>
//       <hr />
//       <div className="">
//         <h5>Total: {adminCount}</h5>
//       </div>
//     </div>
//     <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
//       <div className="text-center pb-1">
//         <h4>restaurant</h4>
//       </div>
//       <hr />
//       <div className="">
//         <h5>Total: {restaurantCount}</h5>
//       </div>
//     </div>
//     <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
//       <div className="text-center pb-1">
//         <h4>Phonenumber</h4>
//       </div>
//       <hr />
//       <div className="">
//         <h5>Total: {phonenumber}</h5>
//       </div>
//     </div>
//   </div>

//   {/* List of admin  */}
//   {/* <div className="mx-4 mt-4 px-5 pt-3">
//     <h4>Admins</h4>
//     <table className="table">
//       <thead>
//         <tr>
//           <th>Admin</th>
//           <th>Email</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>Admin1</td>
//           <td>admin@gmail.com</td>
//           <td>Active</td>
//         </tr>
//       </tbody>
//     </table>
//   </div> */}
// </div>
