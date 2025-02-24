import React, { createContext, useState, useEffect } from 'react';

export const ContextOrder = createContext(); // ✅ Create Context

export default function OrderProvider({ children }) { // ✅ Create a Provider Component
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch order data
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/ordersdata");
      const data = await response.json();
      setOrders(data);
      localStorage.setItem("orders_data", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setErrorMessage("We are currently facing some issues. We will solve it soon.");
      setLoading(false);
    }
  };

  return (
    <ContextOrder.Provider value={{ orders, errorMessage, fetchOrders, loading }}>
      {children} {/* ✅ Now, all components inside App.js can access this context */}
    </ContextOrder.Provider>
  );
}