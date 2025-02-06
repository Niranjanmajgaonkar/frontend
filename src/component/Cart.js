import React, { useContext } from 'react';
import { Contextproduct } from './ProductContext';  // ✅ Import Context
import { useLocation } from 'react-router-dom';

export default function Cart(props) {
  const { products, errormeassage,fetchProduct } = useContext(Contextproduct);  // ✅ Use Context
  const location = useLocation();
  const { productid } = location.state || {}; // Use optional chaining to avoid errors if state is undefined

  console.log(productid); // Debugging


  if(products.length===0){
    fetchProduct();
  }

  return (
    <div>
      <h1>Cart</h1>
      
    </div>
  );
}
