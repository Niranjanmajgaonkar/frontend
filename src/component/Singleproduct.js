import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CryptoJS from "crypto-js";
import { useContext } from 'react';
import { Contextproduct } from './ProductContext';
import { Link } from 'react-router-dom';


export default function Singleproduct(props) {
    const [errordisplay,setErrordisplay]=useState("");
    const secretKey = "mySecretKey123";

    const bytes = CryptoJS.AES.decrypt(props.productid, secretKey);
    const productids = bytes.toString(CryptoJS.enc.Utf8); // Convert back to string
    // console.log(productids)


    // he is featching the product details from the context beacuse there is uploded the all product detalis
    const { products } = useContext(Contextproduct);

    const clickedproduct = products.find((element) => element.productid == productids);

    return (
        <>
            {clickedproduct  &&
        !errordisplay?
            
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body>
                        <div className="main" style={{
                            display: 'flex', flexDirection: 'row',
                            justifyContent: 'cneter', width: '100%'
                        }} >


                            <div className="forimage" style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={clickedproduct.imageurl} style={{ maxHeight: '80%' }} alt="Product image" />
                            </div>




                            <div className="forproductdetails" style={{ width: '50%' }}>
                                <h3 style={{ justifySelf: 'center' }}>{clickedproduct.name}</h3>
                                <hr />
                                <p style={{ justifySelf: 'center', marginTop: '5%', marginBottom: '5%' }}>{clickedproduct.description}</p>
                                <h3 style={{ alignSelf: 'center', justifySelf: 'center', marginLeft: '-20px' }}><img style={{ height: '35px', width: '47px', marginRight: '5px', alignSelf: 'center', marginTop: '-6px' }} src='images/Rupees.png' alt='RS :-' />{clickedproduct.price}</h3>

                                <hr />
                                <div className="btns" style={{ display: 'flex', marginTop: '10%', justifyContent: 'space-evenly', position: 'bottom' }}>



                                    <Link to="/Buy" state={{ productid: clickedproduct.productid }} >
                                        <Button variant="warning">Buy Now</Button>
                                    </Link>
                                    <Link  state={{ productid: clickedproduct.productid }} >
                                        <Button variant="warning">Add Cart</Button>
                                    </Link>

                                </div>


                            </div>
                        </div>
                    </Modal.Body>

                </Modal>
                :errordisplay
            }

        </>
    )
}
