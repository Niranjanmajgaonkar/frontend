import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/registration.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function Registration() {
const[firstname,setFirstName]=useState('');
const[lastname,setlastname]=useState('');
const[password,setpassword]=useState('');
const[mobile,setmobile]=useState('');
const[meassage,setMeassage]=useState('');
const[errormeassage,seterrormeassage]=useState('');
const[responsemeassage,setresponsemeassage]=useState([]);
const[loading,setLoading]=useState(false);
const[passwordshow,setPasswordshow]=useState(true);
const[count,setCount]=useState(3);
const navigate = useNavigate();

const register=async()=>{

  // cheacking clint side form field validation
  if (!firstname||!lastname||!mobile||!password) {
    alert("please fill the All field");
    return;
  }
    if (!/^\d{10}$/.test(mobile)) {
      alert('Mobile number must be 10 digits.');
      return;
    }
  
  
  try {
    // creating the object formate of the input field
const registerdata= {firstname,lastname,password,mobile};

// displying the spinner
setLoading(true);

// sending the data to the backed by using the laravel route url
const result=await fetch("http://127.0.0.1:8000/api/registration",{
    method:'POST',
    headers:{
        "Content-Type":"application/json",
        "Response":"application/json"
    },

    body:JSON.stringify(registerdata)
}
);

// waiting  for the response from receving from the backed
const response=await result.json();

// if the backed catch section is run this time response.errrors display the error meassage
setresponsemeassage(response.errors);
if(result.ok){
  setLoading(false);
  seterrormeassage('');
  setMeassage(response.success || "your registration is succefully completed");
  setTimeout(() => {
    
    navigate('/');
  }, 1000);


}else{
  setMeassage('')
  setLoading(false);
  
  seterrormeassage(response.unsuccess || "your registration is not completed . Try again");
}
} catch (error) {
  setMeassage('')
  seterrormeassage(" The error is accurerd ... Try again")
  setLoading(false);
  
}

}
return (

  <div className="containers">
    <div className="form-card">
      <h2 className="form-title">Register</h2>

      <div className="status">
        {!loading?errormeassage && <marquee behavior="flow" direction="left"><p className="error-message">{errormeassage}</p></marquee>:""}
        {!loading?meassage && <p className="success-message">{meassage} </p>:""}
        {loading === true ? (
          <img
            src="images/spinner.gif"
            alt="spinner"
            className="spinner"
          />
        ) : (
          ""
        )}

              {responsemeassage&&!loading?
                Object.entries(responsemeassage).map(([field, errors], index) => (
                  <div key={index} className="field-errors">
                    <ul>
                      {errors.map((error, errorIndex) => (
                        <li key={errorIndex} className="error-message">{error}</li>
                      ))}
                    </ul>
                  </div>
                )):""
              }

      </div>

                   <form className="form" onSubmit={(e)=>{
                     e.preventDefault();
                     register();
                   }}>
                   <input
               type="text"
               value={firstname}
               onChange={(e) => setFirstName(e.target.value)}
               placeholder="First Name"
               className="input-field"
               required
             />


        <input
          type="text"
          value={lastname}
          onChange={(e) => setlastname(e.target.value)}
          placeholder="Last Name"
          className="input-field"
          required
        />

        <input
          type="text"
          value={mobile}
          onChange={(e) => setmobile(e.target.value)}
          placeholder="Mobile Number"
          className="input-field"
          required
        />
            <div className="pass">

        <input
          type={passwordshow?'password':""}
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Password"
          className="input-field"
          required
          />
          <img src="images/eye.png" className='eye' onClick={(e)=>{  
            if(passwordshow){
              setPasswordshow(false)  
            }else{setPasswordshow(true)}  
          }} alt="eye" />  
          </div>
        <input type="submit" className="register-button"/>


        <Link to="/"><button  className="register-button" id="res">Login</button></Link>
      </form>
    </div>
</div>

);
}