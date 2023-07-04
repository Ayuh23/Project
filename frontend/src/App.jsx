import React from "react";
import Login from "./Login.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Restaurant from "./Restaurant.jsx";
// import Profile from "./Profile.jsx";
import Home from "./Home.jsx";
import AddRestaurant from "./AddRestaurant.jsx";
import RestauranteEdit from "./EditRestaurant.jsx";
import Start from "./Start.jsx";
import RestaurantDetail from "./RestaurantDetail.jsx";
import RestaurantLogin from "./RestaurantLogin.jsx";
import PageNotFound from "./PageNotFound.jsx";
function App() {
  const token = document.cookie;
  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={token ? `/dashboard` : `/`}
          element={token ? <Dashboard /> : <Start />}
        >
          <Route path="/dashboard" element={<Home />}></Route>
          <Route path="/dashboard/restaurant" element={<Restaurant />}></Route>
          {/* <Route path="/profile" element={<Profile />}></Route> */}
          <Route path="/dashboard/create" element={<AddRestaurant />}></Route>
          <Route
            path="/dashboard/restaurantEdit/:id"
            element={<RestauranteEdit />}
          ></Route>
        </Route>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/restaurantLogin" element={<RestaurantLogin />}></Route>
        <Route
          path="/restaurantdetail/:id"
          element={<RestaurantDetail />}
        ></Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
