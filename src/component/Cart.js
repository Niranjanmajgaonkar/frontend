import React, { useContext, useEffect, useState } from 'react';
import { Contextproduct } from './ProductContext';  // ✅ Import Context
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {cartContext}from './Addcart';
import '../css/Cart.css';
import Button from 'react-bootstrap/Button';
import context from 'react-bootstrap/esm/AccordionContext';
import Alert from 'react-bootstrap/Alert';



export default function Cart(props) {
  const { products, errormeassage, fetchProduct } = useContext(Contextproduct);  // ✅ Use Context
  // const { cartitem, setCartitem } = useContext(cartContext);  // ✅ Use Context
  const location = useLocation();

  const variant = "Dark";
  const [addcartproduct, setAddcartproduct] = useState([]);
  const [removecartfromdb, setRemovecartfromdb] = useState([]);
  const [reload, serReload]=useState(true);




  if (products.length === 0) {
    // this fetachproduct function is run whene the all productdata is not availble in the context
    // this time they are featch the data from the database 
    // why need the allproduct data? beacuse the we display the addcart product by only availble there product id

    fetchProduct();
  }

  const addcartproductid = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [null].filter(Boolean);



useEffect(()=>{
  // this section is work for the if the card is empty thene we featch the record from the db and sent in the localstorage
  if (addcartproductid.length == 0) {
    (async () => {
      const databasecart_p = await fetch("http://127.0.0.1:8000/api/getcartitems")
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        
        const addcartproducts = res.map((value) => {
            return value.productid;
          }).filter(Boolean);

                      // here is only storing the unique values of product id in the local storage
                
                      let s = new Set(addcartproducts);
                      let a1 = [...s]
                      // setCartitem(a1)

                      localStorage.setItem("cartdatabase", JSON.stringify(a1)); // Store as JSON array
                   
                      
              
           
        })
      })();
    }
  },[])
  
  useEffect(()=>{
    // this section is work for the mearge the two localStorage data in the signle 
    (async () => {
      const databasecartitem = JSON.parse(localStorage.getItem("cartdatabase") || "[]");
    const localstoragecartitem = JSON.parse(localStorage.getItem("cart") || "[]");

    const mergedCart = [...new Set([...databasecartitem, ...localstoragecartitem])];
    

    
    const addcartproduct = mergedCart.map((id) =>
      products.find((element) => element.productid == id)
          ).filter(Boolean); // Removes undefined values
          setAddcartproduct(addcartproduct)
  })();
},[])



const remove=(productid)=>{
  // this function is created for the remove cart data  from the local and database  
  const databasecartitem = JSON.parse(localStorage.getItem("cartdatabase") || "[]");
  const localstoragecartitem = JSON.parse(localStorage.getItem("cart") || "[]");


const d= databasecartitem.filter(item => item !== productid)

const l= localstoragecartitem.filter(item => item !== productid)

  localStorage.setItem("cart",JSON.stringify(l)) 
  localStorage.setItem("cartdatabase",JSON.stringify(d)) 

  setRemovecartfromdb((prev)=>[...prev,productid])

  const newproducts= addcartproduct.filter(item => item.productid !== productid)
  setAddcartproduct(newproducts)

}


         
        const handleBeforeUnload = async (event) => {
          // In this function there are the remove the the deleted cart data from the database whene the user
          // leave the page 

      
          try {
              const result = await fetch("http://127.0.0.1:8000/api/removeitemsfromcart", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(removecartfromdb), // Send as JSON array
                  keepalive: true, // Ensures request completes before page unload
              });
      
              const response = await result.json(); // Parse the response as JSON

      
          } catch (error) {
              console.error("Fetch error:", error);
          }
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);



    return (
      <>
      

      <div className="main">
        {addcartproduct && addcartproduct.map((element, index) => ( // ✅ Use `.map()` instead of `.forEach()`
        // productid
          <Card
            // bg={variant.toLowerCase()}
            key={index} // ✅ Use a unique key (index or element.id if available)
            text={variant.toLowerCase() === "light" ? "dark" : "white"}
            style={{ width: "60%" ,background:'#3F4F44'}}
            className="mb-4"
            
          >
            <Card.Body className='data'>
              <div className="image">
              <img src={element.imageurl} alt="product image" style={{width:'150px', height:'150px',borderRadius:'10px'}}/>
              </div>

              <div className="details">
              <Card.Title className='name'>{element.name}</Card.Title>

              <Card.Title  style={{color:'#ffc107'}}>₹ {element.price} </Card.Title>
              <Card.Text>
              {element.description}
              </Card.Text>
              </div>

              <div className="btns">
              <Button variant="warning">Buy Now</Button>

              <Button variant="info" onClick={()=>{remove(element.productid)}}>Remove</Button>


              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>


  );
}
