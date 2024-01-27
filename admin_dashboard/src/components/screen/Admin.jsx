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

const Admin = () => {
  // Add Modal Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);


  // ********************* Main Admin page functions  ********************************

  // State for new admin data
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    image: null,
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/getAllAdmins`);
      setAdmins(response.data);
    } catch (error) {
      toast.error("Error fetching admins");
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewAdmin({ ...newAdmin, image: e.target.files[0] });
  };


  // ****** Create a Admin Credential *******
  const handleCreateAdmin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    Object.keys(newAdmin).forEach(key => formData.append(key, newAdmin[key]));

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/createAdmin`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data) {
        toast.success('Admin created successfully');
        setNewAdmin({ name: '', email: '', username: '', password: '', image: null });
        setIsModalOpen(false);
        fetchAdmins();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error('Failed to create admin: ' + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };


  // Admin Delete
  const handleDelete = async (adminId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/deleteAdmin/${adminId}`);
      toast.success("Admin deleted successfully");
      fetchAdmins();
    } catch (error) {
      toast.error(`Failed to delete admin: ${error.response?.data?.message || error.message}`);
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
                <h1>Admin</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="/">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                  </li>
                  <li>
                    <a className="active" href="/Admin">
                      Admin
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
                    onClick={openModal}>Create Admin
                  </button>
                </div>
                {/* Admin Table */}
                <table className="table-striped">
                  <h2 className="table-title">Admin Table</h2>
                  <thead>
                    <th>IMAGE</th>
                    <th>NAME</th>
                    <th>EMAIL ADDRESS</th>
                    <th>USERNAME</th>
                    <th>ACTION</th>
                  </thead>
                  <tbody>
                    {admins.map(admin => (
                      <tr key={admin._id}>
                        <td>
                          <div className="dashboard-content-profile">
                            <div className="profile-image-container">
                              <img src={admin.image} alt={admin.name} className="profile-image" />
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>{admin.name}</span>
                        </td>
                        <td>
                            <span>{admin.email}</span>
                        </td>

                        <td>
                          <span>{admin.username}</span>
                        </td>

                        <td className="icon-cell" style={{ border: 'none', borderBottom: 'none'}}>
                          <div className="icon-container mt-1">
                            <a
                              href="##"
                              className="icon-link edit-icon"
                              title="Edit"
                              // onClick={() => openEditModal(admin)}
                            >
                              <box-icon name="edit" color="#054fb7"></box-icon>
                            </a>
                            <a
                              href="##"
                              className="icon-link delete-icon"
                              title="Trash"
                              onClick={() => handleDelete(admin._id)}
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

      {/* *************** Administer Add Modal Form ***************** */}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  Create New Admin
                </h5>
                <button type="button" className="btn-close input-shadow" data-mdb-dismiss="modal"  aria-label="Close"
                  onClick={closeModal}
                />
              </div>

              <div className="modal-body">
                <form onSubmit={handleCreateAdmin}>
                  <div className="form-group last mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newAdmin.name} 
                      onChange={handleChange}
                      style={{ boxShadow: "none" }}
                      className="form-control"
                      placeholder="Enter Full Name"
                      required
                    />
                  </div>

                  <div className="form-group last mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={newAdmin.email} 
                      onChange={handleChange} 
                      className="form-control"
                      style={{ boxShadow: "none" }}
                      required
                    />
                  </div>

                  <div className="form-group last mb-3">
                    <label>Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      value={newAdmin.username} 
                      onChange={handleChange}
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
                      value={newAdmin.password} 
                      onChange={handleChange} 
                      placeholder="Password" 
                    />              
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}
                        style={{ color: "#757575" }}
                      >
                        <IonIcon icon={showPassword ? eyeOff : eye} />
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
                  onClick={handleCreateAdmin}
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

export default Admin;
