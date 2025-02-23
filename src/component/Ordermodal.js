import { Link, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import '../css/order.css';
import { useContext, useEffect, useState } from 'react';
import { Contextproduct } from './ProductContext';
import Button from 'react-bootstrap/Button';

export default function Ordermodal() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");

  const { products } = useContext(Contextproduct);
  const location = useLocation();
  const state = location.state || {};
  const { productid, qut } = state;
  const { all_p_ids, allqut } = state;

  const [buyproduct, setBuyproduct] = useState(null);
  const [totalproductforbuy, setTotalproductforbuy] = useState([]);
  const [totalprice, setTotalprice] = useState(0);
  const [final_order_all_data, set_Final_order_all_data] = useState({});

  // Fetch the selected single product
  useEffect(() => {
    if (productid) {
      const selectedProduct = products.find((product) => product.productid === productid);
      setBuyproduct(selectedProduct);
    }
  }, [productid, products]);

  // Fetch multiple products (if buying from cart)
  useEffect(() => {
    if (Array.isArray(all_p_ids) && all_p_ids.length > 0) {
      const multiple_o_product = products.filter((product) => all_p_ids.includes(product.productid));
      setTotalproductforbuy(multiple_o_product);
    }
  }, [all_p_ids, products]);

  // Calculate total price
  useEffect(() => {
    const newTotalPrice = totalproductforbuy.reduce(
      (sum, product) => sum + (product.price * (allqut[product.productid] || 0)),
      0
    );
    setTotalprice(newTotalPrice);
  }, [totalproductforbuy, allqut]);

  // Consolidate all data into one object
  // this section is devloped for the send the total data to the backend
  useEffect(() => {
    set_Final_order_all_data({
      user: {
        name,
        address,
        mobile,
        pincode,
        city,
        states,
      },
      products: productid
        ? [{ name: buyproduct?.name, productid: buyproduct?.productid, price: buyproduct?.price, quantity: qut,
           total:buyproduct?.price* qut,imageurl:buyproduct?.imageurl }]
        : totalproductforbuy.map((product) => ({
            name: product.name,
            productid: product.productid,
            price: product.price,
            quantity: allqut[product.productid] || 0,
            total:product.price* allqut[product.productid] || 0,
            imageurl:product.imageurl 
          })),
      total_price: productid ? (buyproduct?.price * qut) : totalprice,
    });
  }, [name, address, mobile, pincode, city, states, buyproduct, totalproductforbuy, totalprice]);




  return (
    <div className="order-container" style={{ alignItems: 'center' }}>
      {/* Order Form Section */}
      <div className="order-form">
        <h2>Billing Details</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer Name" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control as="textarea" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} placeholder="Full Address" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control type="text" value={states} onChange={(e) => setStates(e.target.value)} placeholder="State" required />
          </Form.Group>
        </Form>
      </div>

      {/* Order Summary Section */}
      {productid ? (
        <div className="order-summary">
          <h2>Order Summary</h2>
          <p><strong>Product:</strong> {buyproduct?.name}</p>
          <p><strong>Price:</strong> ₹ {buyproduct?.price}</p>
          <p><strong>Delivery Charge:</strong> {buyproduct?.price > 200 ? "FREE" : "₹ 40"}</p>
          <p><strong>Quantity:</strong> {qut}</p>
          <hr />
          <h1 className="total-price">₹ {buyproduct?.price * qut}</h1>
          <Link to='/payment' state={{Orderdata:final_order_all_data}}>
          <Button variant="warning" className="proceed-btn">
            <marquee behavior="flow" direction="right">
              Proceed <img src="images/order.svg" alt="" style={{ width: '32px', height: '32px', alignSelf: 'center' }} />
            </marquee>
          </Button>
          </Link>
        </div>
      ) : (
        <div className="order-summary">
          <h2>Order Summary</h2>
          {totalproductforbuy.map((product) => (
            <p key={product.productid}>
              <strong>Product:</strong> {product.name} - ₹{product.price} X {allqut[product.productid]} = ₹{product.price * allqut[product.productid]}
            </p>
          ))}
          <p><strong>Delivery Charge:</strong> {totalprice > 200 ? "FREE" : "₹ 40"}</p>
          <hr />
          <h1 className="total-price">₹ {totalprice}</h1>
          <Link to='/payment' state={{Orderdata:final_order_all_data}}>
          <Button variant="warning" className="proceed-btn">
            <marquee behavior="flow" direction="right">
              Proceed <img src="images/order.svg" alt="" style={{ width: '32px', height: '32px', alignSelf: 'center'}} />
            </marquee>
          </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
