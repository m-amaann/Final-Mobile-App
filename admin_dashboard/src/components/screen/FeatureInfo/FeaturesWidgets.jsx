
import React, { useState, useEffect } from 'react';
import "../../../CSS/widgetInfo.css";
import axios from 'axios';

function FeaturesWidgets() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);


  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/product/getAllProducts"
      );
      setProducts(response.data);
    } catch (error) {
      // console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchAllUsers();
  }, [products]);


  // ***** Fetch Orders *****
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/order/getAllOrders"
      );
      setOrders(response.data);
    } catch (error) {
      // console.error("Error fetching orders:", error);
    }
  };

//Customers
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + "/api/user/getAllUsers");
      console.log(response.data);

      setUsers(response.data.users);
    } catch (error) {
      // console.error("Error fetching users:", error);
    }
  };

  return (
    <div className='Featured'>
      <div className="featuredItems">
        <span className="featuredTitle">Product</span>
        <div className="featuredValueContainer">
          <span className="featureValue">{products.length}</span>
          <span className="featureRate">-11.6%</span>
        </div>
        <span className="featuredSub">Since last month</span>
      </div>

      <div className="featuredItems">
        <span className="featuredTitle">Orders</span>
        <div className="featuredValueContainer">
          <span className="featureValue">{orders.length}</span>
          <span className="featureRate">-14.6%</span>
        </div>
        <span className="featuredSub">Since last month</span>
      </div>

      <div className="featuredItems">
        <span className="featuredTitle">New Users</span>
        <div className="featuredValueContainer">
          <span className="featureValue">{users.length}</span>
          <span className="featureRate">-5.6% </span>
        </div>
        <span className="featuredSub">Since last month</span>
      </div>

      <div className="featuredItems">
        <span className="featuredTitle">Sales </span>
        <div className="featuredValueContainer">
          <span className="featureValue">54,200</span>
          <span className="featureRate">-11.6% </span>
        </div>
        <span className="featuredSub">Since last month</span>
      </div>
    </div>
  )
}

export default FeaturesWidgets