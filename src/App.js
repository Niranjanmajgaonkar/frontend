import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Registration from './component/Registration';
import Login from './component/Login';
import Navbars from './component/Navbars';
import Home from './component/Home';
import Cart from './component/Cart'; 
import Account from './component/Account';

function App() {
  const location = useLocation();
  return (
    <>

      {location.pathname !== "/" && location.pathname !== "/registration" && <Navbars />}


      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/account' element={<Account />} />
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>

    </>
  );
}

export default App;
