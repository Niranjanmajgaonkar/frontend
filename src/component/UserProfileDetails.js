import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

const UserProfileDetails = () => {
  const [user, setUser] = useState({
    name: "Niranjan Majgaonkar",
    email: "n@gmail.com",
    phone: "+91 8421081281",
    address: "Khedgaon, Dindori, Nashik, Maharashtra, India",
  });

  return (
    <div className="d-flex justify-content-center align-items-center"style={{marginTop:'25vh'}}>
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <div className="text-center mb-3">
          <FaUser size={60} className="text-primary" />
          <h4 className="mt-2">{user.name}</h4>
        </div>
        <hr />
        <div className="mb-3 d-flex align-items-center">
          <FaEnvelope className="me-2 text-primary" />
          <strong>Email:</strong> <span className="ms-2">{user.email}</span>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <FaPhone className="me-2 text-primary" />
          <strong>Phone:</strong> <span className="ms-2">{user.phone}</span>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <FaMapMarkerAlt className="me-2 text-primary" />
          <strong>Address:</strong> <span className="ms-2">{user.address}</span>
        </div>
        <button className="btn btn-primary w-100">
          <FaEdit className="me-2" />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfileDetails;
