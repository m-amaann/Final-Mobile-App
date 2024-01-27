import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";

// Layout import
import TopNavbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

//styling CSS
import "../../CSS/order.css";
import ITEM from '../../assets/Category/Cake Decorating Tools.png';



const Orders = () => {

  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); 

  const openModal = (order) => {
    setSelectedOrder(order); // Set the selected order
    setIsModalOpen(true); // Open the modal
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };



  // ********************* Main Orders page functions  ********************************
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);


  // ***** Fetch Orders *****
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/order/getAllOrders"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // HandleChange
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + `/api/order/updateOrderStatusById/${orderId}`,
        { newStatus }
      );
      toast.success("Status Changed");
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };


  // HandleChange
  const handleDriverAssignChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL + `/api/order/updateDriverAssignById/${orderId}`,
        { newStatus }
      );
      toast.success("Driver Assigned Successfully");
      fetchOrders();
    } catch (error) {
      console.error('Error updating order driver assigned:', error);
    }
  };




  // ***** Fetch Drivers Function *****
  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/driver/getAllDrivers"
      );
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
    fetchDrivers();
  }, []);


  return (
    <>
      <div className="mainbg">
        <header class="top-navbar">
          <TopNavbar />
        </header>
        <div class="main-container">
          <div class="sidebar">
            <Sidebar />
          </div>
          <div class="main-content">
            {/* Page Head Title */}
            <div className="head-container">
              <div className="left">
                <h1>Orders</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="/">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                  </li>
                  <li>
                    <a className="active" href="/">
                      Orders
                    </a>
                  </li>
                </ul>
              </div>
              <a href="/" className="downloadPdf-button">
                <ion-icon
                  name="cloud-download"
                  className="download-icon"
                ></ion-icon>
                Download PDF
              </a>
            </div>

            <div className="dashboard-content">
              <div className="dashboard-content-container">
                <div className="dashboard-content-header">
                  <div className="dashboard-content-search">
                    <input
                      type="text"
                      placeholder="Search"
                    // value={search}
                    // onChange={e => handleSearch(e)}
                    />
                  </div>
                </div>
                <div className="table-responsive">
                  <h2 className="table-title">Table</h2>
                  <table className="table-striped">
                    <thead>
                      <th>Customer Name</th>
                      <th>Order Items</th>
                      <th>Payment Method</th>
                      <th>Order Date</th>
                      <th>Total Price</th>
                      <th>Payment Status</th>
                      <th>Assign Drivers</th>
                      <th style={{ textAlign: 'center' }}>Status</th>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <span>{order.customerId.name}</span>
                          </td>

                          <td>
                            <span className="OrderlistButton">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={openModal}
                              >
                                View Orders
                              </button>
                            </span>
                          </td>

                          <td>
                            <span>{order.paymentType}</span>
                          </td>

                          <td>
                            <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                          </td>

                          <td>
                            <span>Rs.{order.totalAmount}</span>
                          </td>

                          <td>
                            <div style={{ alignItems: 'center', justifyContent: 'center', background: '#d1ffdd', borderRadius: '5px', padding: '4px', width: '70px', marginLeft: '25px' }}>
                              <span >{order.paymentStatus}</span>
                            </div>
                          </td>

                          <td className="Driver-Status">
                            <div className="Driver-Status-Container">
                              <select
                                className="form-select driver-status-Dropdown"
                                style={{ boxShadow: "none" }}
                                value={order.driver}
                                onChange={(e) => handleDriverAssignChange(order._id, e.target.value)}
                              >
                                <option selected className="status-initial-name">Select Driver</option>
                                {drivers.map((driver) => (
                                  <option key={driver._id} value={driver._id}>
                                    {driver.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </td>

                          <td className="Order-Status">
                            <div className="Order-Status-Container">
                              <select
                                className="form-select order-status-Dropdown"
                                style={{ boxShadow: "none" }}
                                value={order.status}
                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                aria-label="Default select example"
                              >
                                <option selected className="status-initial-name">Order Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Packaging">Packaging</option>
                                <option value="Delivered">Delivered</option>
                              </select>

                            </div>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
                {/* Pagination  */}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* *************** Order Detial Modal Form ***************** */}
      {isModalOpen && selectedOrder && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  Order Details
                </h5>
                <button type="button" className="btn-close input-shadow" data-mdb-dismiss="modal" aria-label="Close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                {/* Order Information */}
                <div className="order-info">
                  <div className="OrderContainer-1">
                    <p className="OrderID">ORDER ID: </p>
                    <p className="OrderNumber">#{selectedOrder._id}</p>
                  </div>
                  <div className="seperator"></div>

                  <div className="OrderContainer">
                    <p className="orderInfo">Status: </p>
                    <p className="orderInfoText">Paid</p>
                  </div>
                  <div className="OrderContainer">
                    <p className="orderInfo">Order Date: </p>
                    <p className="orderInfoText">23-10-2023</p>
                  </div>
                  <div className="OrderContainer">
                    <p className="orderInfo">Total Amount: </p>
                    <p className="orderInfoText">LKR.4303</p>
                  </div>
                  <div className="OrderContainer-2">
                    <p className="orderInfo">Customer Address:</p>
                    <p className="orderInfoText-address">389/3E/1  Zaras Garden, Avissawella rd, wellampitiya.. wellampitiya</p>
                  </div>

                  <div className="OrderContainer">
                    <p className="orderInfo">Customer Number:</p>
                    <p className="orderInfoText">0771668444</p>
                  </div>
                </div>
                {/* Order Items */}
                <div className="order-items">
                  {/* {order.items.map((item, index) => ( */}
                  <div className="item-detail">
                    <h3 className="item-title">ITEMS</h3>
                    <div className="Item-image_Name">
                      <img src={ITEM} className="item-image" />
                      <div>
                        <p className="item-name">32 In 1 /16 Cakes Noiseless Set 3 Pack Mini Magnetic Kit</p>
                        <p className="item-price">Rs. 4390</p>
                      </div>
                    </div>
                    <div className="item-info">
                      <div className="Item-info-Container">
                        <p className="orderInfo">Quantity:</p>
                        <p className="orderInfoText">2</p>
                      </div>
                      <div className="Item-info-Container">
                        <p className="orderInfo">Sizes:</p>
                        <p className="orderInfoText">S, M</p>
                      </div>
                      <div className="Item-info-Container">
                        <p className="orderInfo">Color:</p>
                        <p className="orderInfoText">blue, red</p>
                      </div>
                    </div>
                  </div>
                  {/* ))} */}
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Orders;
