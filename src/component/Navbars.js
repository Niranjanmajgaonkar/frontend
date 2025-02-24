
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import '../css/Navbar.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import Home from '../component/Home';
import Registration from '../component/Registration';
import Login from '../component/Login';
import Cart from '../component/Cart';
import Account from '../component/Account';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Navbars() {

  const [show, setShow] = useState(false);
  const [accountshow, setaccountShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState(); // 🔹 State for search input
  const [category, setcategory] = useState(); // 🔹 State for search input


  const navigate = useNavigate(); // 🔹 For navigation


  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    if (term.trim() === "") {
      // 🔹 If search is empty, remove query parameter and reset state
      navigate("/home", { replace: true });  
    } else {
      // 🔹 Update URL with search query
      navigate(`/home?search=${encodeURIComponent(term)}`);
    }
  };

  useEffect(() => {
    if (category) {
      navigate(`/home?category=${encodeURIComponent(category)}`);
    }
  }, [category]);  // 🔹 Runs
  return (
    <>
    <div style={{marginBottom:'6%'}}>

      <Navbar bg="dark" variant="dark" expand="lg" className="px-4 fixed-top" >

        <Container fluid>
          {/* Navbar Brand */}
          <Navbar.Brand as={Link} to="/" className="ms-3 text-white">
            Navbar
          </Navbar.Brand>

          {/* Navbar Toggle Button */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* Collapsible Content */}
          <Navbar.Collapse id="navbar-nav">
            {/* Search Bar */}
            <InputGroup size="sm" className="mx-auto my-2 my-lg-0" style={{ width: '40%' }}>
            <Form.Control
                  value={searchTerm} // Controlled input
                  onChange={handleSearchChange} // 🔹 Handle search input change
                  placeholder="Search..."
                  style={{ backgroundColor: 'white', color: 'black' , paddingTop:'5px'}}
                />
            </InputGroup>

            {/* Navigation Links */}
            <Nav className="ms-auto navmain">
              <Nav.Link as={Link} to="/home" className="navnames text-white">
                Home <img src="images/home.png" className="home" alt="home" style={{ marginRight: '35px' }} />
              </Nav.Link>




   
              {/* category dropdown */}
              <Nav.Item   onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <NavDropdown
                  title={
                    <span style={{ color: 'white' }}>
                      Category <img src="/images/category.png" className="home" alt="category" />
                    </span>
                  }
                  id="category-dropdown"
                  menuVariant="dark" // Ensures dark background
                  className="custom-dropdown"
                  show={show}
                 
                  >
                     <NavDropdown.Item onClick={() => setcategory("electronics")}>electronics</NavDropdown.Item>
    <NavDropdown.Item onClick={() => setcategory("Cloths - men's")}>Cloths - men's</NavDropdown.Item>
    <NavDropdown.Item onClick={() => setcategory("Cloths - women's")}>Cloths - women's</NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>



              <Nav.Link as={Link} to="/cart" className="navnames text-white">
                Cart <img src="images/cart (2).png" className="cartimg" alt="Shopping Cart" />
              </Nav.Link>



              {/* account dropdown */}
              <Nav.Item onMouseEnter={() => setaccountShow(true)} onMouseLeave={() => setaccountShow(false)}>
                <NavDropdown
                  title={
                    <span style={{ color: 'white' }}>
                      <img src="images/account (1).png" className="Account " alt="Account" />
                    </span>
                  }
                  id="category-dropdown"
                  menuVariant="dark" // Ensures dark background
                  className="custom-dropdown navnames"
                  show={accountshow}
                  align="end"
                  >
                <NavDropdown.Item as={Link} to="/action-1">Profile</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/Order_details">Orders</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/action-3">Logout</NavDropdown.Item>

                </NavDropdown>
              </Nav.Item>



            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>



                  </div>


    </>
  );
}
