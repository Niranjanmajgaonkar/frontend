// this addcart component are created for the save the all cart product state and update and provide the result to all page
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import {Contextproduct}from './ProductContext';


export const cartContext = createContext();
export default function Addcart(props) {
    const [allcartproduct,setAllcartproduct]=useState([]);
    // in this cart item there is store the product id not the cart details
    const [cartitem, setCartitem] = useState([]);

    const products = useContext(Contextproduct);

    useEffect(() => {
        const updatedCart = cartitem.map((key) =>
            products.products.find((element) => element.productid == key)
        );
    
        setAllcartproduct(updatedCart); // ✅ Update once
    }, [cartitem]);
    

   


    // here is storing the context add cart items into the localStorage
    useEffect(() => {
        if (cartitem.length > 0) {
            
            // here is only storing the unique values of product id in the local storage
           
                let s = new Set([...cartitem]); 
                let a1 = [...s]
                localStorage.setItem("cart", JSON.stringify(a1)); // Store as JSON array
            }
        
    }, [cartitem]); // Update when cartitem changes

    // this method is created for the whene the user is close there window this time there cart all availbel product send to database
    {
        
        useEffect(() => {
         
            const handleBeforeUnload = () => {

    
                // Retrieve and parse stored cart data
                const storedCart = localStorage.getItem("cart");
                const cartArray = storedCart ? JSON.parse(storedCart) : [];
    
                if (cartArray.length > 0) {
                    fetch("http://127.0.0.1:8000/api/addcart", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(cartArray ), // Send as JSON array
                        keepalive: true, // Ensures request completes before page unload
                    })
            
                    .catch((error) => console.error("Fetch error:", error));
                }
            };
    
            window.addEventListener("beforeunload", handleBeforeUnload);
    
            return () => {
                window.removeEventListener("beforeunload", handleBeforeUnload);
            };
        }, [cartitem,setCartitem]);
    
    }


    return (
        <cartContext.Provider value={{ cartitem, setCartitem }}>
            {props.children}

        </cartContext.Provider>
    )
}
