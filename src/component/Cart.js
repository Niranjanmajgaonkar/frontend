import React, { useContext, useEffect, useState } from 'react';
import { Contextproduct } from './ProductContext';  // ✅ Import Context
import { Link, useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import '../css/Cart.css';
import Button from 'react-bootstrap/Button';
import context from 'react-bootstrap/esm/AccordionContext';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Ordermodal from './Ordermodal';
import { cartContext } from './Addcart';
import { useNavigate } from "react-router-dom"; // Assuming React Router is used



export default function Cart(props) {
  const { cartitem, setCartitem } = useContext(cartContext);
  const { products, errormeassage, fetchProduct } = useContext(Contextproduct);  // ✅ Use Context
  // const { cartitem, setCartitem } = useContext(cartContext);  // ✅ Use Context
  const location = useLocation();

  const variant = "Dark";
  const [addcartproduct, setAddcartproduct] = useState([]);
  const [removecartfromdb, setRemovecartfromdb] = useState([]);
  const [reload, serReload] = useState(true);
  const [lgShow, setLgShow] = useState(false);
  const [totalprice, setTotalprice] = useState(0);
  const [productQuantities, setProductQuantities] = useState({});

  const [totalavailble_p_p_id, setTotalavailble_p_p_id] = useState([]);
  const [all_p_qut, setAll_p_qut] = useState({});
  const [proced_yes_or_no, setProced_yes_or_no] = useState(false);

  



  // {addcartproduct? setShow(true):setShow(false)}
  // this section is devloped for if stock added more then  avaliblle this time they btn off
  useEffect(() => {
    let anyProductDisabled = addcartproduct.some((element) => 
      element.Quantity !== 0 && element.Quantity < productQuantities[element.productid]
    );
  

    setProced_yes_or_no(!anyProductDisabled);  // Disable "Proceed to Checkout" if any product is disabled
  }, [totalprice, productQuantities, addcartproduct]); 
  

  if (products.length === 0) {
    // this fetachproduct function is run whene the all productdata is not availble in the context
    // this time they are featch the data from the database 
    // why need the allproduct data? beacuse the we display the addcart product by only availble there product id

    fetchProduct();
  }

  const addcartproductid = localStorage.getItem("cart") ?
    JSON.parse(localStorage.getItem("cart")) : [null].filter(Boolean);



  // this section is  created for the create the array of the availble cart product to  transfrer this array 
  // to order page
  useEffect(() => {
    setTotalavailble_p_p_id(
      addcartproduct
        .filter((item) => item.Quantity !== 0) // Filter only items with Quantity > 0
        .map((item) => item.productid) // Extract product IDs
    );


  }, [addcartproduct]); // Depend on addcartproduct





  useEffect(() => {
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
  }, [])

  useEffect(() => {
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
  }, [])



  const remove = (productid) => {
    // this function is created for the remove cart data  from the local and database  
    const databasecartitem = JSON.parse(localStorage.getItem("cartdatabase") || "[]");
    const localstoragecartitem = JSON.parse(localStorage.getItem("cart") || "[]");


    const d = databasecartitem.filter(item => item !== productid)

    const l = localstoragecartitem.filter(item => item !== productid)

    localStorage.setItem("cart", JSON.stringify(l))
    localStorage.setItem("cartdatabase", JSON.stringify(d))

    setRemovecartfromdb((prev) => [...prev, productid])
    setCartitem(l)

    const newproducts = addcartproduct.filter(item => item.productid !== productid)
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

  useEffect(() => {

    if (addcartproduct.length == 0) {
      setLgShow(true);
    } else {
      setLgShow(false);
    }
  }, [addcartproduct]);

  useEffect(() => {
    const initialQuantities = {};
    addcartproduct.forEach((product) => {
      initialQuantities[product.productid] = 1;
    });
    setProductQuantities(initialQuantities);
  }, [addcartproduct]);

  const updateQuantity = (productid, action) => {
    setProductQuantities((prev) => {
      const newQuantity = action === "increase" ? prev[productid] + 1 : prev[productid] - 1;
      return { ...prev, [productid]: Math.max(1, newQuantity) };
    });
  };


  // this section is devloped for the total price and quantiity of the cart display section
  useEffect(() => {
    let total = 0;
    addcartproduct.forEach((element) => {
      const quantity = productQuantities[element.productid] || 1; // Default to 1
      if (element.Quantity !== 0) {

        total += quantity * element.price;
      }
    });
    setTotalprice(total);
  }, [addcartproduct, productQuantities]); // Depend on cart products & quantities

  return (
    <>

      {/* this modal is show the alert for the if the cart is empty then the modal is pop up  */}

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" style={{ color: 'red' }}>
            Your Cart is Empty
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Add New Products In Your cart  😊
          <Link rel="stylesheet" to="/home" >
            <Button variant="success" style={{ marginLeft: '2%' }} >Add Now</Button>
          </Link>
        </Modal.Body>
      </Modal>


      <div className="cart-container">
        {/* Left side: Cart Products */}
        <div className="main">



          {addcartproduct && addcartproduct.map((element, index) => (




            <Card
              key={index}
              text={variant.toLowerCase() === "light" ? "dark" : "white"}
              style={{ width: "100%", background: '#3F4F44' }}
              className="mb-4"
            >

              {/* { this bracket section is only blinking effect added for the stock availble or not */
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '99%',
                  justifyContent: 'flex-end', // Ensure content aligns at the end

                }}>



                  {/* this section is devloped for the if quantity add more than availbel here is diplay meassage */}
                 {
                 !element.Quantity == 0 &&
                 element.Quantity<productQuantities[element.productid]?
                  <p style={{
                    color:'cyan',marginRight:'30px'
                  }}>Your Quantity is more than availble </p>
                
                  :""
                
                }
                  {!element.Quantity == 0 &&
                  
                    <div className="qut" style={{ marginRight: '30px' }}>
                      <button
                        onClick={() => updateQuantity(element.productid, "decrease")}
                        style={{
                          background: 'none', border: 'none',

                          cursor: 'pointer'
                        }}
                      >
                        <img src="images/minus.svg" alt="-" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                      </button>
                      <input
                        type="text"
                        value={productQuantities[element.productid] || 1}
                        readOnly
                        style={{ width: '70px', textAlign: 'center', margin: '0 10px' }}
                      />
                      <button
                        onClick={() => updateQuantity(element.productid, "increase")}
                        style={{
                          background: 'none', border: 'none'
                          , cursor: 'pointer'
                        }}
                      >
                        <img src="images/plus.svg" alt="+" style={{ width: '20px', height: '20px' }} />
                      </button>
                    </div>
                  }
                  <div style={{
                    marginRight: '10px',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    animation: 'blink 1s infinite',
                    backgroundColor: 'chartreuse'
                  }}></div>
                  {element.Quantity == 0 ? <p style={{ color: 'red', margin: 0 }}> Out Of Stock</p> :
                    <p style={{ color: 'greenyellow', margin: 0 }}>      {element.Quantity} Qut left</p>} {/* Removes extra margin */}
                  <style>
                    {`
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `}
                  </style>
                </div>


              }


              {/* here is this updating the total cart price */}

              <Card.Body className='data'>
                <div className="image">
                  <img src={element.imageurl} alt="product image"

                    style={{ width: '150px', height: '150px', borderRadius: '10px' }} />
                </div>
                <div className="details">
                  <Card.Title className='name'>{element.name}</Card.Title>
                  <Card.Title style={{ color: '#ffc107' }}>₹ {element.price} </Card.Title>
                  <Card.Text>{element.description}</Card.Text>
                </div>
                <div className="btns">

                  {!element.Quantity == 0 && element.Quantity>=productQuantities[element.productid]? 
                    <Link to='/order' state={{ productid: element.productid, qut: productQuantities[element.productid] }}>
                      <Button variant="warning">Buy Now</Button>
                    </Link>
                    : <Button variant="warning" disabled className='currntstate'>Buy Now</Button>}
                  <Button variant="info" onClick={() => remove(element.productid)}>Remove</Button>
                </div>
              </Card.Body>
            </Card>

          ))}
        </div>

        {/* Right side: Total Product Summary */}
        {!lgShow &&
          <div className="totalproductsummary">

            <marquee behavior="flow" direction="left"><h2>Total Summary</h2></marquee>
            <p><strong>Total Products:</strong> {addcartproduct.length}</p>

            <p><strong>Total Price:</strong> ₹{totalprice && totalprice}</p>
            {totalprice !== 0 && proced_yes_or_no==true ?
              <Link to='/order' state={{ all_p_ids: totalavailble_p_p_id, allqut: productQuantities }}>
                <Button variant="success" style={{ backgroundColor: '#ffc107', color: 'black' }}>Proceed to Checkout</Button>
              </Link>
              :
              <Button variant="success" disabled style={{ backgroundColor: '#ffc107', color: 'black' }}>Proceed to Checkout</Button>
            }
          </div>
        }
      </div>

    </>


  );
}
