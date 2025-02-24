import React, { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Contextproduct } from './ProductContext';  // ✅ Import Context from separate file

import Singleproduct from './Singleproduct';
import CryptoJS from "crypto-js";
import { useLocation } from 'react-router-dom';


const secretKey = "mySecretKey123";


export default function Products() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  
  // this one  line get data form the url of search by user
  const searchQuery = searchParams.get("search"); // Get search term from URL
  
  
  // this one  line get data form the url of category selectred  by user
  const searchQuerycategory = searchParams.get("category"); // Get search term from URL



  const { products, errormeassage, fetchProduct,mainpageloader } = useContext(Contextproduct);  // ✅ Get data from Context
  const [modalShow, setModalShow] = React.useState(false);
  const [singleproductid, setSingleproductid] =useState("");
  const [filter_products, setFilter_products] =useState([]);


  // this section is filter out the search box element products
  useEffect(() => {
    setFilter_products(
      products.filter((product) => 
        product.name && searchQuery ? 
        product.name|product.description.toLowerCase().includes(searchQuery.toLowerCase()) : false
      )
    );
  }, [searchQuery, products]); // ✅ Dependencies ensure dynamic updates
  
  // this section filter out the category selected products
  useEffect(() => {
    setFilter_products(
      products.filter((product) => 
        product.p_category && searchQuerycategory ? 
        product.p_category.toLowerCase().includes(searchQuerycategory.toLowerCase()) : false
      )
    );
  }, [searchQuerycategory, products]); // ✅ Dependencies ensure dynamic updates
  


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
   
      {!errormeassage && mainpageloader && <img src="images/loadinganimination.gif" alt="mainpageloader" 
      style={{height:'15%',width:'15%',display:'flex', justifySelf:'center',alignSelf:'center'}}/>
      }

            <Singleproduct
        show={modalShow}
        onHide={() => setModalShow(false)
        }
        productid={singleproductid}
        />


{/* all products div/// */}
        {!mainpageloader&&
      <div className="allproducts" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)', // 5 columns per row
        gap: '10px', // Spacing between cards
        rowGap: '30px',
        justifyItems: 'center' // Center items horizontally
      }}>

{/* here map function can be display the single products in the  */}


{(filter_products && filter_products.length > 0 ? filter_products : products).map((element, index) => (
          
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
}
    </>
  );
}
