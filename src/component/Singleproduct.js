import React, { useState, createContext, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CryptoJS from "crypto-js";
import { Contextproduct } from './ProductContext';
import { Link, useNavigate } from 'react-router-dom';


export default function Singleproduct({  productid }) {
    const navigate = useNavigate();
    const secretKey = "mySecretKey123";
    const [show, setShow] = useState(false);
    const [showmainmodal, setMainmodal] = useState(false);


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

    const handleShow = () => setShow(true);

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
                            justifyContent: 'center', width: '100%'
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
                                <div className="btns" style={{ display: 'flex', marginTop: '10%', justifyContent: 'space-evenly', position: 'bottom' }}>
                                    <Link to="/Buy" state={{ productid: clickedproduct.productid }}>
                                        <Button variant="warning">Buy Now</Button>
                                    </Link>
                                    <Link state={{ productid: clickedproduct.productid }}>
                                        <Button variant="warning" onClick={handleShow}>Add Cart</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}
    </>
    );
}