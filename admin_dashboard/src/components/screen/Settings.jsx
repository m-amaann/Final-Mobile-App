import React, { useEffect, useState } from "react";

import TopNavbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

//styling CSS
import axios from "axios";
import toast from "react-hot-toast";
import "../../App.css";
import "../../CSS/Modal.css";
import "../../CSS/PageCustom.css";
import "../../CSS/custom.css";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    activeStatus: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/setting/getsettings"
      );
      // response is an object with newArrival, popular, and topSale
      const { newArrival, popular, topSale } = response.data;
      setFormData({
        newArrival: newArrival ? "Enable" : "Disable",
        popular: popular ? "Enable" : "Disable",
        topSale: topSale ? "Enable" : "Disable",
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      // Assuming the API endpoint for updating settings is correct
      await axios.put(process.env.REACT_APP_API_URL + "/api/setting/settings", {
        newArrival: formData.newArrival === "Enable",
        popular: formData.popular === "Enable",
        topSale: formData.topSale === "Enable",
      });
      // Optionally, you can fetch and update the settings again after the update
      fetchSettings();
      console.log("Settings updated successfully!");
      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Error updating settings. Please try again.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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
                <h1>Setting</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="/">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                  </li>
                  <li>
                    <a className="active" href="/Setting">
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="dashboard-content">
              <div className="dashboard-content-container">
                {/* **** Setting Form ***** */}
                <div>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title mb-3" id="addModalLabel">
                          Settings
                        </h5>
                      </div>

                      <div className="modal-body">
                        <form>
                          <div className="form-group last mb-3">
                            <label>Newest Arrival</label>
                            <select
                              className="form-control"
                              type="text"
                              name="newArrival"
                              value={formData.newArrival}
                              onChange={handleInputChange}
                              style={{ boxShadow: "none" }}
                              required
                            >
                              <option value="Enable">Enable</option>
                              <option value="Disable">Disable</option>
                            </select>
                          </div>
                          <div className="form-group last mb-3">
                            <label>Popular</label>
                            <select
                              className="form-control"
                              type="text"
                              name="popular"
                              value={formData.popular}
                              onChange={handleInputChange}
                              style={{ boxShadow: "none" }}
                              required
                            >
                              <option value="Enable">Enable</option>
                              <option value="Disable">Disable</option>
                            </select>
                          </div>
                          <div className="form-group last mb-3">
                            <label>Top Sale</label>
                            <select
                              className="form-control"
                              type="text"
                              name="topSale"
                              value={formData.topSale}
                              onChange={handleInputChange}
                              style={{ boxShadow: "none" }}
                              required
                            >
                              <option value="Enable">Enable</option>
                              <option value="Disable">Disable</option>
                            </select>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={handleAddSubmit}
                          style={{ width: "100px" }}
                          className="btn btn-primary Custom-Btn"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pagination table  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
