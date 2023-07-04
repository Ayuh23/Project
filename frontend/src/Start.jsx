import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function Start() {
  const navigate = useNavigate();

  return (
    <div className="landingpage">
      <div className="image landingPage">
        <div className="bg-overlay"></div>
      </div>
      <div className="container navbar-container">
        <Navbar className="landingpage_nav" variant="dark">
          <Navbar.Brand href="/">
            <h5>RLS || List Your Business</h5>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            
            className="justify-content-end"
          >
          
              <Button onClick={(e) => navigate("/login")}>
                Admin
              </Button>
              <span>&nbsp;&nbsp;</span>
              <Button onClick={(e) => navigate("/restaurantLogin")}>
                Restaurant
              </Button>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className="header_content text-center">
        <h3>Restaurant Listing Service </h3>
        <p>Want To List Your Restaurant?</p>
        <Button
        style={{padding:'0.7rem 1rem'}}
          id="dropdown-basic-button"
          className="my-custom-dropdown"
          title="LOGIN"
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Start;
