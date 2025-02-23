import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Registration from './component/Registration';
import Login from './component/Login';
import Navbars from './component/Navbars';
import Home from './component/Home';
import Cart from './component/Cart'; 
import Account from './component/Account';
import Ordermodal from './component/Ordermodal';
import Payment_method from './component/Payment_method';
import Order from './component/Order';

function App() {
  const location = useLocation();
  return (
    <>
      {/* Show Navbar on all pages except Login and Registration */}
      {location.pathname !== "/" && location.pathname !== "/registration" && <Navbars />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/account' element={<Account />} />
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/order" element={<Ordermodal />} />

        {/* ✅ Wrap Payment_method inside OrderProvider */}
        <Route path="/payment" element={
  
            <Payment_method />

        } />

        <Route path="/Order_details" element={<Order />} />
      </Routes>
    </>
  );
}

export default App;
