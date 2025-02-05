import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Contextproduct } from './ProductContext';  // ✅ Import Context from separate file

export default function Products() {
  const { products, errormeassage, fetchProduct } = useContext(Contextproduct);  // ✅ Get data from Context

  useEffect(() => {
    if (products.length === 0) {   // ✅ Prevent API call if data is already available
      fetchProduct();
    }
  }, []);

  return (
    <>
      {errormeassage && <marquee><h3>{errormeassage}</h3></marquee>}
      {products.map((element, index) => (
        <Card key={index} style={{ width: '18rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Img variant="top" style={{ height: '150px', width: '150px', marginTop: '15px' }} src={element.imageurl} />
          <Card.Body style={{ width: '100%', borderTop: '1px solid black', marginTop: '10px', backgroundColor: 'whitesmoke' }}>
            <Card.Title style={{ justifySelf: 'center', alignSelf: 'center' }}>{element.name}</Card.Title>
            <Card.Title style={{ justifySelf: 'center', display: 'flex', alignItems: 'center' }}>
              <img style={{ marginLeft: '-11px', height: '24px', width: '24px' }} src='images/Rupees.png' alt='RS :-' />
              {element.price}
            </Card.Title>
            <div className="btns" style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            </div>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
