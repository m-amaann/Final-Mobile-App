import axios from "axios";
import React, { useEffect, useState } from "react";

import TopNavbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

//styling CSS
import "../../App.css";
import "../../CSS/Modal.css";
import "../../CSS/PageCustom.css";
import "../../CSS/custom.css";

import userAvator from "../../assets/icons/User-Admin.png";


const Customer = () => {

  // User Image Profile Click Function
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
    setTimeout(() => setShowModal(false), 1000);
  };




  // ********************* Main Customer page functions  ********************************

  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + "/api/user/getAllUsers");
      console.log(response.data);

      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };



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
                <h1>Customers</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="/">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                  </li>
                  <li>
                    <a className="active" href="/">
                      Customers
                    </a>
                  </li>
                </ul>
              </div>
              <a href="/" className="downloadPdf-button">
                <ion-icon
                  name="cloud-download"
                  className="download-icon">
                </ion-icon>
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: '161px' }}
                  >
                    Regular Customer
                  </button>
                </div>
                {/* Customers Table */}
                <table className="table-striped">
                  <h2 className="table-title">Table</h2>
                  <thead>
                    <th>PROFILE</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADDRESS</th>
                    <th>DOB</th>
                    <th>MOBILE NO</th>
                  </thead>

                  <tbody>
                  {users.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <div className="dashboard-content-profile">
                            {/* <div className="profile-image-container"> */}
                            <img
                              src={user.image}
                              alt=""
                              className="profile-image"
                              onClick={handleImageClick}
                            />
                            {/* </div> */}
                            <span>{user.name}</span>
                          </div>
                          {showModal && (
                            <div className="modalProfile" onClick={() => setShowModal(false)}>
                              <img
                                src={user.image}
                                alt=""
                                className="modal-profile-image"
                              />
                            </div>
                          )}
                        </td>
                        <td>
                          <span>{user.name}</span>
                        </td>
                        <td>
                          <span>{user.email}</span>
                        </td>
                        <td>
                          <span>{user.address}</span>
                        </td>
                        <td>
                          <span>Dob</span>
                        </td>
                        <td>
                          <span>{user.phone}</span>
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>


                { /* Pagination  */}
              </div>
            </div>
          </div>
        </div>
      </div>




    </>
  );
}

export default Customer;
