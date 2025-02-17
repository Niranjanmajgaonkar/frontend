import React, { createContext, useState, useEffect } from 'react';

export const Contextproduct = createContext();  // ✅ Create Context

export default function ProductProvider({ children }) {  // ✅ Create a Provider Component
  const [products, setProducts] = useState([]);
  const [errormeassage, setErrormeassage] = useState("");
  const [mainpageloader,setMainpageloader]=useState(false);

  // Fetch product data
  const fetchProduct = async () => {
    setMainpageloader(true);
    try {
      const result = await fetch("http://127.0.0.1:8000/api/fetchproducts");
      const data = await result.json();
      if (data.length > 0) {
        setMainpageloader(false);
        setProducts(data);
        setErrormeassage("");
      } else {
        setErrormeassage("Currently no products available.");
      }
    } catch (error) {
      setErrormeassage("We are currently facing some issues. We will solve it soon.");
    }
  };

  return (

    // Contextproduct this name are always use for the use the uploded products
    <Contextproduct.Provider value={{ products, errormeassage, fetchProduct ,mainpageloader}}>  
      {children}  {/* ✅ Now, all components inside App.js can access this context */}
    </Contextproduct.Provider>
  );
}
