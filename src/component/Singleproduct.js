import React, { useState, createContext, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CryptoJS from "crypto-js";
import { Contextproduct } from './ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import { cartContext } from './Addcart';

export default function Singleproduct({  productid }) {
    const navigate = useNavigate();
    const {cartitem,setCartitem}=useContext(cartContext);

    const secretKey = "mySecretKey123";
    const [show, setShow] = useState(false);
    const [showmainmodal, setMainmodal] = useState(false);
    const [Qut, setQut] = useState(1);
    const [customQut, setcustomQut] = useState();


     useEffect(() => {
        if (productid) {
            setMainmodal(true);  // Open modal when a product is clicked
        }
    }, [productid]);

    const handleClose = () => {
        setShow(false);
        navigate('/cart');
    };

    const handleClosehome = () => {
        setShow(false);
        setMainmodal(false);
        navigate('/home');
    };

    // this function happing the added product id in the our card
    const handleShow = () =>{ 
        setShow(true)
        setCartitem((prev)=>[...prev,clickedproduct.productid])
        
    };

    let productids = null;
    try {
        if (productid) {
            const bytes = CryptoJS.AES.decrypt(productid, secretKey);
            productids = bytes.toString(CryptoJS.enc.Utf8);
        }
    } catch (error) {
        console.error("Decryption failed:", error);
    }

    const { products } = useContext(Contextproduct);
    const clickedproduct = products.find((element) => element.productid == productids);

    return (
        <>
            {clickedproduct && showmainmodal && (
                <Modal
                    className='mainmodal'
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showmainmodal}
                    onHide={handleClosehome}
                    >
                    <Modal.Header closeButton>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton style={{ color: 'green', backgroundColor: '#ffc' }}>
                                <Modal.Title>
                                    Successfully Added
                                    <img src="images/check.png" alt="successfully" style={{
                                        height: '26px',
                                        width: '31px',
                                        marginTop: '-6px',
                                        marginLeft: '10px'
                                    }} />
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: '#ffc' }}>
                                Do You want to View Your shopping Cart
                            </Modal.Body>
                            <Modal.Footer style={{ backgroundColor: '#ffc' }}>
                                <Button variant="secondary" onClick={handleClosehome}>
                                    Continue Shopping
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    View Cart
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="main" style={{
                            display: 'flex', flexDirection: 'row',
                            justifyContent: 'center', 
                        }}>
                            <div className="forimage" style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={clickedproduct.imageurl} style={{ maxHeight: '80%' }} alt="Product" />
                            </div>
                            <div className="forproductdetails" style={{ width: '50%' }}>
                                <h3 style={{ justifySelf: 'center' }}>{clickedproduct.name}</h3>
                                <hr />
                                <p style={{ justifySelf: 'center', marginTop: '5%', marginBottom: '5%' }}>{clickedproduct.description}</p>
                                <h3 style={{ alignSelf: 'center', justifySelf: 'center', marginLeft: '-20px' }}>
                                    <img style={{ height: '35px', width: '47px', marginRight: '5px', alignSelf: 'center', marginTop: '-6px' }} src='images/Rupees.png' alt='RS :-' />
                                    {clickedproduct.price}
                                </h3>
                                <hr />
    {/* this section is for blinking and qut display           */}
    <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        justifyContent: 'space-between', // Ensure content aligns at the end
        marginLeft:'15px'
    }}>
        <div className="so">
            <label htmlFor="qut">QUT</label>
            <select name="qut" id="qut" onChange={(key)=>{
setQut(key.target.value)
            }} >
                
                {clickedproduct.Quantity >=1 &&<option value="1">1</option>}
                {clickedproduct.Quantity >=2 &&<option value="2">2</option>}
                {clickedproduct.Quantity >=3 &&<option value="3">3</option>}
                {clickedproduct.Quantity >=4 &&<option value="more">More</option>}
            </select>
            
      {Qut === "more" ? (
        <input style={{
            marginTop:'10px'
        }}
            type="number" 
            value={customQut} 
            onChange={(e) => {
    
                setcustomQut(e.target.value)} 
            }
        />
    ) : null
            }

            
        </div>
       {clickedproduct.Quantity == 0 ?
       <p style={{ color: 'red', margin: 0 ,display:'flex', alignItems:'center'}}>
       <div style={{
           marginRight: '10px',
           width: '10px',
           height: '10px',
           backgroundColor: 'red',
           borderRadius: '50%',
           animation: 'blink 1s infinite'
        }}></div>
         Out Of Stock</p>:
         
        <p style={{ color: 'green', margin: 0 ,display:'flex', alignItems:'center'}}>  
        <div style={{
           marginRight: '10px',
           width: '10px',
           height: '10px',
           backgroundColor: 'green',
           borderRadius: '50%',
           animation: 'blink 1s infinite'
        }}></div>    {clickedproduct.Quantity} Qut left</p>} {/* Removes extra margin */}
    </div>

    <style>
        {`
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `}
    </style>



                                <div className="btns" style={{ display: 'flex',marginTop:'10%', justifyContent: 'space-evenly', position: 'bottom',flexDirection:'row' }}>
                                    {!clickedproduct.Quantity == 0?

                                    <Link  to="/order" state={{ productid: clickedproduct.productid ,qut:Qut=="more"?customQut:Qut}}>
                                        <Button variant="warning" >Buy Now</Button>
                                    </Link>:
                                        <Button variant="warning" disabled>Buy Now</Button>
}
                                    <Link >
                                        <Button variant="warning" onClick={handleShow}>Add Cart</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
           <style>
         {`
            option{
                width:'50px'
            }
         
         `
            }
           </style>
    </>
    );
}