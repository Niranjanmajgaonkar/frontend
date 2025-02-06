import React, { useState } from "react";
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';



export default function Login() {
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const [message, setMessage] = useState("");
  const [messageerror, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordshow, setPasswordshow] = useState(true);
  const navigate = useNavigate();

  const login = async () => {
    if (!mobile || !password) {
      alert("Please fill all fields.");
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      alert("Mobile number must be 10 digits.");
      return;
    }

    try {
      const loginData = { password, mobile };
      setLoading(true);
      const result = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const response = await result.json();

      if (result.ok) {
        setLoading(false);
        setMessage(response.success || "You have successfully logged in.");

        navigate('/home');
      } else {
        setLoading(false);
        setErrorMessage(response.unsuccess || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("An error occurred while trying to log in.");
    }

  };

  return (

      <div className="containers">
        <div className="form-card">
          <h2 className="form-title">Login</h2>

          <div className="status">
            {loading && <img src="images/spinner.gif" className="spinner" alt="spinner" />}
            {!loading && message && <p className="success-message">{message}</p>}
            {!loading && messageerror && <p className="error-message">{messageerror}</p>}
          </div>

          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              className="input-field"
              required
            />
            <div className="pass">
              <input
                type={passwordshow ? "password" : ""}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-field"
                required
              />
              <img
                src="images/eye.png"
                className="eye"
                onClick={() => setPasswordshow(!passwordshow)}
                alt="eye"
              />
            </div>
            <input type="submit" value="Login" className="register-button" />
            <Link to="/registration">
              <button className="register-button" id="res">Register</button>
            </Link>
          </form>
        </div>
      </div>

  );
}
