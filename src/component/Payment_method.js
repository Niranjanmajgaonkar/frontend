import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { Contextproduct } from './ProductContext';


export default function PaymentMethod() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [status, setstatus] = useState();
  const [show, setShow] = useState(false);
  const[loader,setLoader]=useState(false);
  const[unsuccess,setUnsuccess]=useState(false);
  const[success,setsuccess]=useState(false);
  const[meassage,setmeassage]=useState();
  const handleClose = () => setShow(false);
  const { fetchProduct } = useContext(Contextproduct);


  const location = useLocation();
  const state = location.state || {};
  const { Orderdata } = state;

  {success | unsuccess &&
    setTimeout(() => {
      setLoader(false)
      navigate("/home");
      // window.location.reload();
      fetchProduct();
   
    }, 6000)
  }
  const handlePayment = () => {
    alert(`Payment Method Selected: ${paymentMethod}`);
  };
  const orderData = {
    ...Orderdata,  // Spread Orderdata object
    paymentMethod: paymentMethod // Add payment method
};


const order=async()=>{
   setShow(true);
   setLoader(true);
    const result =await fetch('http://127.0.0.1:8000/api/order_place', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        },
        body: JSON.stringify(orderData)
    })
    .then(response => response.json())
    .then(data =>{ if(data.success){
      setmeassage(data.success);
setsuccess(true)
setLoader(false)


}
else{
  setmeassage('you enter something wrong');
  setLoader(false)
        setUnsuccess(true)
    
    }
    if(data.unsuccess){
      setmeassage(data.unsuccess);
    }
    }
  )
    .catch(error => console.error('Fetch error:', error));
}



  return (
    <div className="order-container">
    <>
    {/* this modal for the status display such as the order success or not  */}

    <div className="m" style={{ display: 'flex',justifyContent:'center' }}>
  <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
     // ✅ Centers the modal on the screen
  >
    <Modal.Header className="d-flex justify-content-center text-center w-100">
      <Modal.Title>Your order is being initiated</Modal.Title>
    </Modal.Header>

    <Modal.Body className="d-flex flex-column align-items-center text-center">
      {loader ?<img src="images/orderplaceloader.gif" alt="wait" className="img-fluid" />
      :success?<img src="images/success.gif" alt="success" className="img-fluid" />:
      <img src="images/unsuccess.gif" alt="success" className="img-fluid" style={{height:'14vh'}}/>
    }
    </Modal.Body>
    {!loader?meassage&&<p style={{color:'green', justifySelf:'center',alignSelf:'center'}}>{meassage}</p>:''}
  </Modal>
</div>

    </>


      {/* Payment Form Section */}
      <div className="order-form">
        <h2>Billing Details</h2>
        <Form>
          {/* Payment Method Selection */}
          <Form.Group className="mb-3">
            <Form.Label>Select Payment Method</Form.Label>
            <Form.Check
              type="radio"
              label="Online Payment"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Cash on Delivery (COD)"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>

      {/* Payment Summary Section */}
      <div className="order-summary">
        <h2>Payment Summary</h2>
        <p><strong>Selected Payment Method:</strong> {paymentMethod === "online" ? "Online Payment" : "Cash on Delivery (COD)"}</p>
        <hr />
        <h1 className="total-price">₹ {Orderdata.total_price}</h1> {/* Replace with actual amount dynamically */}
        <Button variant="warning" className="proceed-btn" onClick={order}>
          <marquee behavior="flow" direction="right">
            Proceed <img src="images/order.svg" alt="" style={{ width: '32px', height: '32px', alignSelf: 'center' }} />
          </marquee>
        </Button>
      </div>

    <style>
        {
            `
           /* Payment Page Layout (Same as Order Page) */
.order-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 900px;
    margin: 50px auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.50);
    border-radius: 10px;
    margin-top: 8%;
    background-color: white;
    align-self: center;
    margin-top:7vh;
}

/* Payment Form Section */
.order-form {
    flex: 1;
    padding: 20px;
    border-right: 2px solid #f1f1f1;
    min-height: 350px;  /* Set the same height as order form */
}

/* Payment Summary Section */
.order-summary {
    flex: 1;
    padding: 20px;
    text-align: center;
    align-self: center;
    min-height: 350px; /* Set the same height as order summary */
}

/* Ensure both sections have equal height */
@media (min-width: 768px) {
    .order-form, .order-summary {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}

.order-summary h2 {
    font-size: 22px;
    margin-bottom: 15px;
    color: #444;
}

/* Total Price Styling */
.total-price {
    font-size: 28px;
    font-weight: bold;
    color: #ff6600;
}

/* Proceed Button */
.proceed-btn {
    width: 100%;
    padding: 10px;
    font-size: 18px;
    border-radius: 5px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .order-container {
        flex-direction: column;
    }
    .order-form {
        border-right: none;
        border-bottom: 2px solid #f1f1f1;
        padding-bottom: 20px;
    }
}
#root{
margin-top:22vh;}

            `
        }
    </style>
        </div>
  );
}
