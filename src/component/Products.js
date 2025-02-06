import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Contextproduct } from './ProductContext';  // ✅ Import Context from separate file

import Singleproduct from './Singleproduct';
import CryptoJS from "crypto-js";


const secretKey = "mySecretKey123";


export default function Products() {
 


  const { products, errormeassage, fetchProduct } = useContext(Contextproduct);  // ✅ Get data from Context
  const [modalShow, setModalShow] = React.useState(false);
  const [singleproductid, setSingleproductid] =useState("");

  useEffect(() => {
    if (products.length === 0) {   // ✅ Prevent API call if data is already available
      fetchProduct();
    }
  }, []);

  const handdleclick=(event)=>{
    const card = event.target.closest(".card");
    setModalShow(true)

    setSingleproductid(    card.getAttribute('data-productId')
  )
  }
  return (
    <>

  {/* modal for the pop up product.. */}
      {errormeassage && <marquee><h3>{errormeassage}</h3></marquee>}
   

      <Singleproduct
        show={modalShow}
        onHide={() => setModalShow(false)
        }
        productid={singleproductid}
      />


{/* all products div/// */}
      <div className="allproducts" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)', // 5 columns per row
        gap: '10px', // Spacing between cards
        rowGap: '30px',
        justifyItems: 'center' // Center items horizontally
      }}>

{/* here map function can be display the single products in the  */}
        {products.map((element, index) => (
          
          <Card key={index} className='' data-productId={
            CryptoJS.AES.encrypt(element.productid.toString(), secretKey).toString()
          } style={{
            width: '18rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor:'pointer'
          }} onClick={handdleclick}

    >


            <Card.Img variant="top" style={{
              height: '150px',
              width: '150px',
              marginTop: '15px'
            }} src={element.imageurl} />

            <Card.Body style={{
              width: '100%',
              borderTop: '1px solid black',
              marginTop: '10px',
              backgroundColor: 'whitesmoke'
            }}>
              <Card.Title style={{ textAlign: 'center' }}>{element.name}</Card.Title>
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img style={{ height: '24px', width: '24px', marginRight: '5px' }} src='images/Rupees.png' alt='RS :-' />
                {element.price}
              </Card.Title>
              <div className="btns" style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                {/* Buttons here */}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

    </>
  );
}
