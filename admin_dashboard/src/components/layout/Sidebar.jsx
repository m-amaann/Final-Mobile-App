import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useState } from "react";
import "../../App.css";

import AdminImage from "./../../assets/icons/User-Admin.png"; 
import ToggleIcon from "../../assets/icons/menu-bar.png";
import messageIcon from "../../assets/icons/message.png";
import logo from "../../assets/logo/logo.png";
import adminIcon from "./../../assets/icons/admin.png";
import payment from "./../../assets/icons/bill_10498955.png";
import CategoryIcon from "./../../assets/icons/category.png";
import usersIcon from "./../../assets/icons/customers.png";
import Homeicon from "./../../assets/icons/home-category.png";
import ToggleIconLeft from "./../../assets/icons/menu-left.png";
import ordersIcon from "./../../assets/icons/orders.png";
import productIcon from "./../../assets/icons/products.png";
import reportIcon from "./../../assets/icons/report.png";
import SettingIcon from "./../../assets/icons/settings.png";
import Driver from "../../assets/icons/delivery-man.png";



const Sidebar = (props) => {
  const [inactive, setInactive] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };


  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };


  return (
    <aside className={`Sidebar ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>

        <div
          onClick={() => {
            setInactive(!inactive);
          }}
          className="togglemenu-btn"
        >
          {inactive ? (
            <img src={ToggleIcon} alt="Icon" className="toggle-icon" />
          ) : (
            <img src={ToggleIconLeft} alt="Icon" className="toggle-icon-2" />
          )}
        </div>
      </div>
      {!inactive && <div className="title">Stock Mart Lanka</div>}

      {/* Searching */}

      {!inactive && <div className="divider"></div>}

      {/* Menu */}
      <div className="main-menu">
        <ul className="p-0">
          <li>
            <a className="menu-item" href="/">
              <div className="menu-icon">
                <img className="img-icon" src={Homeicon} alt="Icon" />
              </div>
              <span>Dashboard</span>
            </a>
          </li>

          <li>
            <a className="menu-item" href="/Product">
              <div className="menu-icon">
                <img className="img-icon" src={productIcon} alt="Icon" />
              </div>
              <span>Products</span>
            </a>
          </li>

          <li>
            <a className="menu-item" href="/Orders">
              <div className="menu-icon">
                <img className="img-icon" src={ordersIcon} alt="Icon" />
              </div>
              <span>Orders</span>
            </a>
          </li>

          <li>
            <div className="menu-item" onClick={toggleCategory}>
              <div className="menu-icon">
                <img className="img-icon" src={CategoryIcon} alt="Icon" />
              </div>
              <a href="/Category" style={{color:'#fff'}}>
                <span>Categories</span>
              </a>
              <span className="dropdownarrow-icon">
                {isCategoryOpen ? (
                  <ion-icon name="chevron-up-outline"></ion-icon>
                ) : (
                  <ion-icon name="chevron-down-outline"></ion-icon>
                )}
              </span>
            </div>
            {isCategoryOpen && (
              <ul className="sub-menu">
                <li>
                  <a href="/SubCategory" className="sub-menu-item">
                    Sub Category
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div className="menu-item">
              <div className="menu-icon">
                <img className="img-icon" src={usersIcon} alt="Icon" />
              </div>
              <a href="/Customers" style={{color:'#fff'}}>
                <span>Customers</span>
              </a>
              <span className="dropdownarrow-icon" onClick={toggleSubMenu}>
                <ion-icon name="chevron-down-outline"></ion-icon>
              </span>
            </div>

            {isSubMenuOpen && (
              <ul
                className={`sub-menu ${
                  inactive && isSubMenuOpen ? "hide-sub-menu" : ""
                }`}
              >
                <li>
                  <a href="/" className="sub-menu-item">
                    Regular Customers
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a className="menu-item" href="/Admin">
              <div className="menu-icon">
                <img className="img-icon" src={adminIcon} alt="Icon" />
              </div>
              <span>Admin</span>
            </a>
          </li>

          <li>
            <a className="menu-item" href="/Driver">
              <div className="menu-icon">
                <img className="img-icon" src={Driver} alt="Icon" />
              </div>
              <span>Driver</span>
            </a>
          </li>

          <li>
            <a className="menu-item" href="/">
              <div className="menu-icon">
                <img className="img-icon" src={payment} alt="Icon" />
              </div>
              <span>Transaction</span>
            </a>
          </li>

          <li>
            <a className="menu-item" href="/">
              <div className="menu-icon">
                <img className="img-icon" src={reportIcon} alt="Icon" />
              </div>
              <span>Reports</span>
            </a>
          </li>

          <li>
            <a className="menu-item" href="/">
              <div className="menu-icon">
                <img className="img-icon" src={messageIcon} alt="Icon" />
              </div>
              <span>Message</span>
            </a>
          </li>

          <li>
            <a className="menu-item" href="/Settings">
              <div className="menu-icon">
                <img className="img-icon" src={SettingIcon} alt="Icon" />
              </div>
              <span>Setting</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="side-menu-footer">
      <div className="avatar">
          <img src={AdminImage} alt="user" />
        </div>
        <div className="user-info">
          <h5>Administrator</h5>
          <p>stockmart@gmail.com</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;