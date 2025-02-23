import React, { createContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";


export default function Order({ children }) {
  const [order, setOrder] = useState([]);
  const [orderLocalStorage, setOrderLocalStorage] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [helpModalShow, setHelpModalShow] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelmeassage, setCancelmessage] = useState(false);

  const closeModal = () => setModalShow(false);
  const closeHelpModal = () => setHelpModalShow(false);
  const closeCancelModal = () => setShowCancelModal(false);

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders_data");
    if (storedOrders) {
      setOrderLocalStorage(JSON.parse(storedOrders));
    } else {
      fetching();
    }
  }, []);

  const fetching = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/ordersdata");
      const data = await response.json();
      setOrder(data);
      localStorage.setItem("orders_data", JSON.stringify(data));
      setOrderLocalStorage(data);
    } catch (error) {
      
      console.error("Error fetching order data:", error);
    }
  };

  const displayOrderDetails = (order) => {
    setSelectedOrder(order);
    setModalShow(true);
  };

  const handleCancelOrder = async() => {
    const id =selectedOrder?.order_id;
      
        const result = await fetch("http://127.0.0.1:8000/api/cancelorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({orderid:id}), // Send as JSON array
        });
  
        const response = await result.json(); // Parse the response as JSON
        console.log(response)
     if(response.success){
      setCancelmessage(true)
     }
   

    // closeCancelModal();
    // closeModal()
  };

  return (


        <div className="container mt-4">
 
    {/* this section is decribe the total order list in the order section */}
      <div className="order-list">
        {orderLocalStorage &&
          orderLocalStorage.map((order, index) => (
            <Card key={index} className="order-card" onClick={() => displayOrderDetails(order)}>
              <Card.Header className="order-header">
                Order Date: {order.created_at.split("T")[0]} - order_id -{order.order_id}
              </Card.Header>
              <Card.Body className="order-body">
                <div className="order-details">
                  <Card.Title>{order.product_name}</Card.Title>
                  <Card.Text>Price: ₹ {order.p_price}</Card.Text>
                  <Button variant="primary" onClick={() => displayOrderDetails(order)}>
                    View Details
                  </Button>
                </div>
                <div className="order-image">
                  <img src={order.imageurl || ""} alt="Product" />
                </div>
              </Card.Body>
            </Card>
          ))}
      </div>

      {/* Order Details Modal means this modal is decribe the total details of the order */}
      <Modal show={modalShow} onHide={closeModal} centered>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {selectedOrder && (
            <div className="modal-content-box">
              <div className="modal-image">
                <img src={selectedOrder.imageurl || ""} alt="Product" />
              </div>
              <div className="modal-info">
                <h5>{selectedOrder.product_name}</h5>
                <p><strong>Quantity:</strong> {selectedOrder.p_qut}</p>
                <p><strong>Price:</strong> ₹ {selectedOrder.p_price}</p>
                <p><strong>Total:</strong> ₹ {selectedOrder.p_total}</p>
                <p><strong>Payment Mode:</strong> {selectedOrder.payment_mode}</p>
              </div>
            </div>
          )}
          <hr />
          <h6>Customer Details</h6>
          {selectedOrder && (
            <div className="customer-info">
              <p><strong>Name:</strong> {selectedOrder.customer_name}</p>
              <p><strong>Mobile:</strong> {selectedOrder.mobile}</p>
              <p><strong>Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowCancelModal(true)}>
            Cancel Order
          </Button>
          <Button variant="info" onClick={() => {
            closeModal();
            setHelpModalShow(true);
          }}>
            Help
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel Order Confirmation Modal */}

      
      {cancelmeassage &&
      <Modal show={showCancelModal} onHide={closeCancelModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton style={{ backgroundColor: "red" }}>
          <Modal.Title>Order Cancellation Succefull</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <img src="images/success.gif" alt="success"  style={{width:'100px',height:'100px'}} />
<p>order succefully cancel </p>
        </Modal.Body>
     
      </Modal>
}
{!cancelmeassage &&
<Modal show={showCancelModal} onHide={closeCancelModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton style={{ backgroundColor: "red" }}>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to cancel your order? 😞</Modal.Body>
        <Modal.Footer style={{ borderBottom: "4px solid red" }}>
          <Button variant="secondary" onClick={closeCancelModal}>No</Button>
          <Button variant="danger" onClick={handleCancelOrder}>Yes, Cancel</Button>
        </Modal.Footer>
      </Modal>
      }


      {/* Help Modal */}
      <Modal show={helpModalShow} onHide={closeHelpModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Need Help?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>How can we assist you?</h4>
<textarea name="help" placeholder="Describe Your Concern Here" style={{width:'100%',height:'20vh'}} id="">

</textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={closeHelpModal}>Send</Button>
        </Modal.Footer>
      </Modal>

      {/* CSS Styling */}
      <style>
        {`
          .order-card {
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
            border-radius: 10px;
            overflow: hidden;
          }
          .order-card:hover {
            transform: scale(1.05);
            box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.2);
            cursor: pointer;
          }
          .order-header {
            background: #007bff;
            color: white;
            font-weight: bold;
            text-align: center;
            padding: 10px;
          }
          .order-body {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
          }
          .order-details {
            flex: 1;
          }
          .order-image img {
            height: 100px;
            border-radius: 10px;
            object-fit: cover;
          }
          .modal-header {
            background: #007bff;
            color: white;
          }
          .modal-body {
            padding: 20px;
          }
          .modal-content-box {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          .modal-image img {
            height: 120px;
            border-radius: 10px;
            object-fit: cover;
          }
        `}
      </style>
    </div>
  
 
  );
}
