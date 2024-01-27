import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// Layout import
import TopNavbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

//styling CSS
import "../../App.css";
import "../../CSS/Modal.css";
import "../../CSS/PageCustom.css";
import "../../CSS/custom.css";

// Icons
import { IonIcon } from "@ionic/react";
import { eye, eyeOff } from "ionicons/icons";

// Image

const Driver = () => {
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [showPassword, setShowPassword] = useState(false);

  const [drivers, setDrivers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newDriver, setNewDriver] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });


  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/driver/getAllDrivers`);
      setDrivers(response.data);
    } catch (error) {
      toast.error("Error fetching drivers");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDriver({ ...newDriver, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewDriver({ ...newDriver, image: e.target.files[0] });
  };

 

  // ****** Create a Drivers Credential *******
const HandleCreateDriver = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    Object.keys(newDriver).forEach(key => {
      formData.append(key, newDriver[key]);
    });

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/driver/createDriver`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Driver added successfully');
      setDrivers([...drivers, response.data]);
      closeModal();
    } catch (error) {
      toast.error(`Failed to create driver: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  // Driver Delete
  const handleDelete = async (driverId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/driver/deleteDrivers/${driverId}`);
      toast.success("Driver Deleted Sucessful");
      fetchDrivers();
    } catch (error) {
      toast.error(`Failed to delete driver: ${error.response?.data?.message || error.message}`);
    }
  };



  // const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
                <h1>Driver</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="/">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                  </li>
                  <li>
                    <a className="active" href="/Driver">
                      Driver
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
                  <button type="button"
                    className="btn btn-primary"
                    style={{ width: "123px" }}
                    onClick={openModal}>Create Driver
                  </button>
                </div>
                {/* Driver Table */}
                <table className="table-striped">
                  <h2 className="table-title">Table</h2>
                  <thead>
                    <th>IMAGE</th>
                    <th>NAME</th>
                    <th>EMAIL ADDRESS</th>
                    <th>ACTION</th>
                  </thead>
                  <tbody>
                    {drivers.map(driver => (
                      <tr key={driver._id}>
                        <td>
                          <div className="dashboard-content-profile">
                            <div className="profile-image-container">
                              <img src={driver.image} alt={driver.name} className="profile-image" />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>{driver.name}</span>
                        </td>
                        <td>
                            <span style={{}}>{driver.email}</span>
                        </td>

                        <td className="icon-cell" style={{ border: 'none', borderBottom: 'none'}}>
                          <div className="icon-container mt-1">
                            <a
                              href="##"
                              className="icon-link edit-icon"
                              title="Edit"
                              // onClick={() => openEditModal(driver)}
                            >
                              <box-icon name="edit" color="#054fb7"></box-icon>
                            </a>
                            <a
                              href="##"
                              className="icon-link delete-icon"
                              title="Trash"
                              onClick={() => handleDelete(driver._id)}
                            >
                              <ion-icon name="trash"></ion-icon>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination  */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* *************** Drivers Add Modal Form ***************** */}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  Create New Driver
                </h5>
                <button type="button" className="btn-close input-shadow" data-mdb-dismiss="modal"  aria-label="Close"
                  onClick={closeModal} 
                />
              </div>

              <div className="modal-body">
                <form onSubmit={HandleCreateDriver}>
                  <div className="form-group last mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newDriver.name} 
                      onChange={handleChange}
                      style={{ boxShadow: "none" }}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-group last mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={newDriver.email} 
                      onChange={handleChange} 
                      className="form-control"
                      style={{ boxShadow: "none" }}
                      required
                    />
                  </div>

                  <div className="form-group last mb-3">
                    <label>Password</label>
                    <div className="input-group">
                    <input 
                      className="form-control"
                      style={{ boxShadow: "none" }}
                      required
                      id="password"
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      value={newDriver.password} 
                      onChange={handleChange} 
                      placeholder="Password" 
                    />              
                      <span
                        className="input-group-text"
                        // onClick={togglePasswordVisibility}
                        style={{ color: "#757575" }}
                      >
                       <IonIcon icon={showPassword ? eyeOff : eye} onClick={() => setShowPassword(!showPassword)} />

                      </span>
                    </div>
                  </div>

                  <div className="form-group last mb-3">
                    <label>Image</label>
                    <input
                      id="image"
                      type="file"
                      className="form-control"
                      style={{ boxShadow: "none" }}
                      onChange={handleImageChange} 
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  onClick={HandleCreateDriver}
                  style={{ width: "90px", alignItems: "center" }}
                  className="btn btn-primary Custom-Btn"
                  disabled={isLoading}>
                  {isLoading ? "Creating..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Driver;
