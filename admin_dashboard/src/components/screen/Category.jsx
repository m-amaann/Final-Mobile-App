import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

// Layout import
import TopNavbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';

//styling CSS
import "../../App.css";
import "../../CSS/Modal.css";
import "../../CSS/PageCustom.css";
import "../../CSS/custom.css";




const Category = () => {
    // Add Modal Function
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  // Edit Modal to open 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setEditCategory(category);
    setIsEditModalOpen(true);
  };

  // close the edit modal
  const closeEditModal = () => {
    setEditCategory(null);
    setIsEditModalOpen(false);
  };


  





  
    // ********************  Main Category page functions ************************

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
      name: "",
      description: "",
      image: null,
    });
    const [editCategory, setEditCategory] = useState(null);
  
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
  
  
    // Input Change function
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  

    // Image Change function
    const handleImageChange = (event) => {
      setFormData({ ...formData, image: event.target.files[0] });
    };
  


    // Add Submit Function
  const handleAddSubmit = async (event) => {
    try {
      if (!formData.name || !formData.description || !formData.image) {
        toast.error('Please enter all the fields');
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/category/createCategory`,
        formDataToSend
      );
      if (response.status === 201) {
        toast.success('Category added successfully');
        setFormData({
          name: '',
          description: '',
          image: null,
        });
        setIsModalOpen(false);
        fetchCategories(); // Fetch the updated categories

        // Close the modal automatically after a few seconds
        setTimeout(() => {
          setIsModalOpen(false);
        }, 1000);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      toast.error('Failed to add category');
    }
  };




  // Edit Submit Function
  const handleEditSubmit = async (event) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('image', formData.image);
  
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/category/updateCategory/${editCategory._id}`,
        formDataToSend
      );
      if (response.status === 200) {
        toast.success('Category updated successfully');
        setFormData({
          name: '',
          description: '',
          image: null,
        });
        setIsEditModalOpen(false);
        fetchCategories(); // Fetch the updated categories
        setTimeout(() => {
          closeEditModal();
        }, 1000); // Close the modal after 3 seconds
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
  };





    //Delete record function
    const handleDelete = async (categoryId) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/category/deleteCategory/${categoryId}`
        );
        if (response.status === 204) {
          fetchCategories();
          toast.success('Deleted Successful');
        }
      } catch (error) {
        toast.error('Failed to delete category: ' + error.message);
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
                  <h1>Categotory</h1>
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
                        value={search}
                        onChange={(e) => __handleSearch(e)}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{width:'120px'}}
                      onClick={openModal}
                    >
                      Add Category
                    </button>
                  </div>
  
                  {/* Category Table */}
                  <table className="table-striped">
                    <h2 className="table-title">Category List</h2>
                    <thead>
                      <th>CATEGORY NAME</th>
                      <th>CATEGORY DESCRIPTION</th>
                      <th>IMAGE</th>
                      <th>ACTION</th>
                    </thead>
                    
                      <tbody>  
                      {categories.map((category) => ( 
                          <tr key={category._id}>
                            <td>
                              <span>{category.name}</span>
                            </td>
  
                            <td className="table-description">
                              <div>
                                <span>{category.description}</span>
                              </div>
                            </td>
                            <td>
                              <div className="table-img">
                                  <img 
                                    src={category.image} 
                                    alt={category.name}
                                  />
                              </div>
                            </td>
                                             
                            <td className="icon-cell" style={{ border: 'none', borderBottom: 'none'}}>
                              <div className="icon-container">
                                <a href="##" 
                                  className="icon-link edit-icon" 
                                  title="Edit"
                                  onClick={() => openEditModal(category)}
                                >
                                  <box-icon name='edit' color='#054fb7'></box-icon>
                                </a>
                                <a href="##" 
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
  
              { /* Pagination table  */}                 
                </div>
              </div>
            </div>
          </div>
        </div>
  
  
        {/* *************** Category Add Modal Form ***************** */}
        
        {isModalOpen && (
          <div className="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addModalLabel">
                    New Category
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
                <form onSubmit={handleAddSubmit}>
                      <div className="form-group last mb-3">
                          <label>Category Name</label>
                          <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              style={{ boxShadow: 'none' }}
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
                              style={{ boxShadow: 'none' }}
                              required
                          />
                      </div>

                      <div className="form-group last mb-3">
                        <label>Image</label>
                        <input
                          type="file"
                          className="form-control"
                          style={{ boxShadow: 'none' }}
                          name="imageUrl"
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
                    onClick={handleAddSubmit} 
                    style={{width:'121px'}}
                    className="btn btn-primary Custom-Btn"
                  >
                  Save Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    
      
      
  
  
      {/* *************** Category Edit Modal  ***************** */}
      {isEditModalOpen && (
          <div className="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">
                    Edit Category
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
                          <label>Category Name</label>
                          <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              style={{ boxShadow: 'none' }}
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
                              style={{ boxShadow: 'none' }}
                              required
                          />
                      </div>

                      <div className="form-group last mb-3">
                        <label>Image</label>
                        <input
                          type="file"
                          className="form-control"
                          style={{ boxShadow: 'none' }}
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
                    style={{width:'100px'}}
                    className="btn btn-primary Custom-Btn"
                  >
                  Update 
                  </button>
                </div>
              </div>
            </div>
          </div>
      )}
  
      </>
    );
}

export default Category;
