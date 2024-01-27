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

const SubCategory = () => {
  // Add Modal Function
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  
  const [editSubCategory, setEditSubCategory] = useState(null);

  const [subcategories, setSubcategories] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Edit Modal to open

  const openEditModal = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setEditSubCategory(category);
    setIsEditModalOpen(true);
  };

  // close the edit modal
  const closeEditModal = () => {
    setEditSubCategory(null);
    setIsEditModalOpen(false);
  };

  // ********************  Main SubCategory page functions ************************

  useEffect(() => {
    fetchCategories();
  }, [categories]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/category/getAllCategories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/subcategory/getAllSubCategories`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [subcategories]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddSubmit = async (event) => {
    try {
      event.preventDefault();

      const data = {
        name: name,
        category: category,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/subcategory/createSubCategory`,
        data
      );

      if (response.status === 201) {
        // Subcategory added successfully
        console.log("Subcategory Added Successfully");
        toast.success("Subcategory Added Successfully");
        closeModal();
        setName(null);
        setCategory(null);
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
      toast.success("Error adding subcategory");
    }
  };

  //Delete record function
  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/category/deleteSubCategory/${categoryId}`
      );
      if (response.status === 204) {
        fetchCategories();
        toast.success("Deleted Successful");
      }
    } catch (error) {
      toast.error("Failed to delete category: " + error.message);
    }
  };

  // Search function
  const [search, setSearch] = useState("");

  const __handleSearch = (event) => {
    setSearch(event.target.value);
    // if (event.target.value !== "") {
    //     let searchResults = products.filter(
    //       (item) =>
    //         item.name.toLowerCase().includes(search.toLowerCase()) ||
    //         item.description.toLowerCase().includes(search.toLowerCase()) ||
    //         item.category.toLowerCase().includes(search.toLowerCase())
    //     );
    //     // setProducts(searchResults);
    //   }
    //   else {
    //     // fetchProducts();
    //   }
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
                <h1>Sub Category</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="/">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                  </li>
                  <li>
                    <a className="active" href="/">
                      Categories
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
                      value={search}
                      onChange={(e) => __handleSearch(e)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: "120px" }}
                    onClick={openModal}
                  >
                    Add SubCategory
                  </button>
                </div>

                {/* SubCategory Table */}
                <table className="table-striped">
                  <h2 className="table-title">SubCategory List</h2>
                  <thead>
                    <th>Sub Category NAME</th>
                    <th>CATEGORY</th>
                    <th>ACTION</th>
                  </thead>

                  <tbody>
                    {subcategories.map((category) => (
                      <tr key={category._id}>
                        <td>
                          <span>{category.name}</span>
                        </td>
                        <td>
                          <span>{category.category.name}</span>
                        </td>

                        <td className="icon-cell" style={{ border: 'none', borderBottom: 'none'}}>
                          <div className="icon-container">
                            <a
                              href="##"
                              className="icon-link edit-icon"
                              title="Edit"
                              onClick={() => openEditModal(category)}
                            >
                              <box-icon name="edit" color="#054fb7"></box-icon>
                            </a>
                            <a
                              href="##"
                              className="icon-link delete-icon"
                              title="Trash"
                              onClick={() => handleDelete(category._id)}
                            >
                              <ion-icon name="trash"></ion-icon>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination table  */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* *************** SubCategory Add Modal Form ***************** */}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  New Sub Category
                </h5>
                <button
                  type="button"
                  className="btn-close input-shadow"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                />
              </div>

              <div className="modal-body">
                <form>
                  <div className="form-group last mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={handleNameChange}
                      style={{ boxShadow: "none" }}
                      required
                    />
                  </div>

                  <div className="form-group last mb-3">
                    <label>Category</label>
                    <select
                      className="form-control"
                      type="text"
                      id="category"
                      name="category"
                      value={category}
                      onChange={handleCategoryChange}
                      style={{ boxShadow: "none" }}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleAddSubmit}
                  style={{ width: "160px" }}
                  className="btn btn-primary Custom-Btn"
                >
                  Save Sub Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* *************** SubCategory Edit Modal  ***************** */}
      {/* {isEditModalOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  Edit SubCategory
                </h5>
                <button
                  type="button"
                  className="btn-close input-shadow"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                  onClick={closeEditModal}
                />
              </div>

              <div className="modal-body">
                <form onSubmit={handleEditSubmit}>
                  <div className="form-group last mb-3">
                    <label>SubCategory Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ boxShadow: "none" }}
                      required
                    />
                  </div>

                  <div className="form-group last mb-3">
                    <label>Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      style={{ boxShadow: "none" }}
                      required
                    />
                  </div>

                  <div className="form-group last mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      className="form-control"
                      style={{ boxShadow: "none" }}
                      name="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  style={{ width: "100px" }}
                  className="btn btn-primary Custom-Btn"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default SubCategory;
