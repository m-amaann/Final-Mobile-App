import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import '../../App.css';

// icons
import AdminImg from '../../assets/icons/User-Admin.png';
import notifcationicon from '../../assets/icons/bell.png';
import emailicon from '../../assets/icons/email.png';

import NotificationModal from '../screen/NotificationModal';


const TopNavbar = () => {

  // Dropdown 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  //Date and Times
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });


  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('adminToken');

    // Redirect to the login page
    window.location.href = '/login';
  };



  // Notifcation message popup modal 
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/product/getAllProducts');
      const fetchedProducts = response.data;
      const newNotifications = fetchedProducts.filter((product) => product.quantity < 15);
      setNotifications(newNotifications);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

    return (
      <Navbar>
        <div className="header">
          <div className="search-bar">
              <input type="text" placeholder="Search" />
              <button>
              <i className="bx bx-search" ></i>
              </button>
          </div>

          <div className="date-time">
              <span className="date-icon">📅 {formattedDate}</span>         
          </div>


          <div className="navbar-icon" onClick={openModal}>
              <span className="badge">{notifications.length}</span>
              <img src={notifcationicon} alt="" className='notification-icon'/>
          </div>

            <div className="navbar-icon">
                <img src={emailicon} alt="" className='email-icon'/>
            </div>

          
            <div className="profile">
                <div className={`profile-image ${dropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
                    <img src={AdminImg} alt="Admin Profile" />
                </div>
                <div className={`profile-dropdown ${dropdownOpen ? 'show' : ''}`}>
                    {/* Dropdown content */}
                    <a href="/"  style={{textDecoration: 'none'}}>Settings</a>
                    <a 
                      href="##" 
                      onClick={handleLogout}
                      style={{textDecoration: 'none'}}
                    >
                      Logout
                    </a>
                </div>
            </div>


            <NotificationModal 
            isOpen={showModal}
            closeModal={closeModal}
            notifications={notifications} 
          />

        </div>
      </Navbar>
        
    );
}



export default TopNavbar;