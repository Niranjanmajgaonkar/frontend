
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import '../css/order.css';
import { useContext, useEffect, useState } from 'react';
import { Contextproduct } from './ProductContext';
import Button from 'react-bootstrap/Button';
export default function Ordermodal() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState();
  const [pincode, setPincode] = useState();
  const [city, setCity] = useState();
  const [states, setStates] = useState();
  const { products, errormeassage, fetchProduct } = useContext(Contextproduct);
  const location = useLocation(); // Get location object
  const state = location.state || {}; // Ensure state is defined
  const { productid ,qut} = state;
  const [buyproduct, setBuyproduct] = useState([])

  
  const buy = products.find((element) => element.productid == productid)

  useEffect(() => {
    setBuyproduct(buy)
    console.log("state buy", buyproduct)
  }, [buyproduct])
console.log(buyproduct)
  return (

    <div className="order-container" style={{alignItems:'center'}}>
    {/* Order Form Section */}
    <div className="order-form">
        <h2>Billing Details</h2>
        <Form>
            <Form.Group className="mb-3">
                <Form.Control type="text" value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Customer Name" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    rows={3} placeholder="Full Address" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="text" value={mobile} 
                    onChange={(e) => setMobile(e.target.value)} 
                    placeholder="Mobile Number" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="text" value={pincode} 
                    onChange={(e) => setPincode(e.target.value)} 
                    placeholder="Pincode" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="text" value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                    placeholder="City" required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control type="text" value={states} 
                    onChange={(e) => setStates(e.target.value)} 
                    placeholder="State" required />
            </Form.Group>
        </Form>
    </div>

    {/* Order Summary Section */}
   
    <div className="order-summary">
        <h2>Order Summary</h2>
        <p><strong>Product:</strong> {buyproduct.name}</p>
        <p><strong>Price:</strong> ₹ {buyproduct.price}</p>
        <p><strong>Delivery Charge:</strong>  {buyproduct.price>200?"FREE":"₹ 40"}</p>
        <p><strong>Qut :</strong>  {qut}</p>
        <hr />
        <h1 className="total-price">Total: ₹304</h1>
        <Button  variant="warning" className="proceed-btn"><marquee behavior="flow" direction="right" >
          Proceed <img src="images/order.svg" alt="" style={{width:'32px',height:'32px', alignSelf:'center'}}/></marquee></Button>
    </div>

</div>

  )
}

