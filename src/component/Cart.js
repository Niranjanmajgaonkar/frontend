import React, { useContext } from 'react';
import { Contextproduct } from './ProductContext';  // ✅ Import Context

export default function Cart() {
  const { products, errormeassage,fetchProduct } = useContext(Contextproduct);  // ✅ Use Context

  if(products.length===0){
    fetchProduct();
  }
console.log(products);


  return (
    <div>
      <h1>Cart</h1>
      
    </div>
  );
}
