import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Select from "react-select";
import TopNavbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
//styling CSS
import "../../CSS/Modal.css";
import "../../CSS/PageCustom.css";
import "../../CSS/custom.css";

function Product() {
  //Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  //Color input field select function
  const colorOptions = [
    { value: "Other", label: "Other" },
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Green", label: "Green" },
    { value: "Yellow", label: "Yellow" },
    { value: "White", label: "White" },
    { value: "Black", label: "Black" },
    { value: "Grey", label: "Grey" },
    { value: "Pink", label: "Pink" },
    { value: "Brown", label: "Brown" },
    { value: "Chocolate", label: "Chocolate" },
    { value: "Gold", label: "Gold" },
    { value: "Purple", label: "Purple" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    sizes: [],
    colors: [],
    imageUrl: null,
    price: "",
    discountprice: "",
    stockQuantity: "",
    popularproducts: false,
    topsales: false,
    newarrival: false,
  });

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
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/product/getAllProducts"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    setFormData({ ...formData, imageUrl: event.target.files[0] });
  };

  // Update handleInputChange to  selected colors
  const handleColorsInputChange = (selectedOptions) => {
    setFormData({
      ...formData,
      colors: selectedOptions.map((option) => option.value),
    });
  };

  // create a new product
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {
        name,
        description,
        category,
        price,
        discountprice,
        stockQuantity,
        sizes,
        colors,
        imageUrl,
        popularproducts,
        topsales,
        newarrival,
      } = formData;
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", name);
      formDataWithImage.append("description", description);
      formDataWithImage.append("category", category);
      formDataWithImage.append("price", price);
      formDataWithImage.append("discountprice", discountprice);
      formDataWithImage.append("stockQuantity", stockQuantity);
      formDataWithImage.append("popularproducts", popularproducts);
      formDataWithImage.append("topsales", topsales);
      formDataWithImage.append("newarrival", newarrival);

      sizes.forEach((size, index) =>
        formDataWithImage.append(`sizes[${index}][name]`, size)
      ); // Adjusted size appending
      colors.forEach((color, index) =>
        formDataWithImage.append(`colors[${index}][name]`, color)
      ); // Adjusted color appending

      formDataWithImage.append("imageUrl", imageUrl);

      console.log(formDataWithImage);
      await axios.post(
        process.env.REACT_APP_API_URL + "/api/product/createProduct",
        formDataWithImage,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      closeModal();
      fetchProducts();
      setFormData({
        name: "",
        description: "",
        category: "",
        imageUrl: null,
        sizes: [],
        colors: [],
        price: "",
        discountprice: "",
        stockQuantity: "",
      });
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }
  };

  // Update the addSize function
  const addSize = () => {
    setFormData({
      ...formData,
      sizes: [...formData.sizes, ""], // Updated: Use an array of strings
    });
  };

  // Update the removeSize function
  const removeSize = (index) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes.splice(index, 1);
    setFormData({
      ...formData,
      sizes: updatedSizes,
    });
  };

  // Update the handleSizeChange function
  const handleSizeChange = (event, index) => {
    const { value } = event.target;
    const updatedSizes = [...formData.sizes];
    updatedSizes[index] = value; // Updated: Use an array of strings
    setFormData({
      ...formData,
      sizes: updatedSizes,
    });
  };

  // Delete a product
  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        process.env.REACT_APP_API_URL +
        `/api/product/deleteProduct/${productId}`
      );
      fetchProducts();
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // Search for products function
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearch(searchTerm);

    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const searchResults = products.filter((product) => {
        const { name, category } = product;
        const categoryName =
          category && category.name ? category.name.toLowerCase() : "";
        return (
          name.toLowerCase().includes(searchTerm) ||
          categoryName.includes(searchTerm)
        );
      });
      setFilteredProducts(searchResults);
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
                <h1>Product</h1>
                <ul className="breadcrumb">
                  <li>
                    <a href="/">Dashboard</a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                  </li>
                  <li>
                    <a className="active" href="/">
                      Products
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
                      onChange={(e) => handleSearch(e)}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openModal}
                  >
                    Add Product
                  </button>
                </div>

                {/* Product Table */}
                <div className="table-responsive">
                  <table className="table-striped">
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Size</th>
                      <th>Colors</th>
                      <th>Price</th>
                      <th>Discount(%)</th>
                      <th>Stock Quantity</th>
                      <th>Actions</th>
                    </tr>
                    <tbody>
                      {(search === "" ? products : filteredProducts)?.map(
                        (product) => (
                          <tr key={product?._id}>
                            <td className="py-1">
                              <div className="table-img">
                                <img src={product.imageUrl} alt="category" />
                              </div>
                            </td>

                            <td>
                              <div className="table-product-name">
                                <span>{product.name}</span>
                              </div>
                            </td>

                            <td>
                              <div className="table-description">
                                <span>{product.description}</span>
                              </div>
                            </td>

                            <td>
                              <div className="table-td-category">
                                <span>{product.category?.name}</span>
                              </div>
                            </td>

                            <td >
                              <span >
                                <ul className="table-td-size">
                                  {product?.sizes?.map((size) => (
                                    <React.Fragment key={size._id}>
                                      <li>{size.name}</li>
                                    </React.Fragment>
                                  ))}
                                </ul>
                              </span>
                            </td>

                            <td>
                              <span>
                                <ul className="table-td-size">
                                  {product?.colors?.map((color) => (
                                    <li key={color._id}>{color.name}</li>
                                  ))}
                                </ul>
                              </span>
                            </td>

                            <td className="table-td-price">
                              <div >
                                <span>Rs.{product.price}</span>
                              </div>
                            </td>

                            <td className="table-td-price">
                              <div >
                                <span>Rs.{product.discountprice}</span>
                              </div>
                            </td>

                            <td>
                              <div>
                                <span>{product.stockQuantity}</span>
                              </div>
                            </td>
                            <td className="icon-cell"
                              style={{ border: 'none', borderBottom: 'none'}}
                            >
                              <div className="icon-container">
                                <a
                                  className="icon-link edit-icon"
                                  title="Edit"
                                >
                                  <box-icon name="edit" color="#054fb7"></box-icon>
                                </a>
                                <a
                                  className="icon-link delete-icon"
                                  title="Trash"
                                  onClick={() => handleDelete(product._id)}
                                >
                                  <box-icon name="trash" color="#ff0707"></box-icon>
                                </a>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination table  */}
            </div>
          </div>
        </div>
      </div>




      {/* *************** Add Modal Form ***************** */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-dialog landscape-design">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  New Product
                </h5>
                <button
                  type="button"
                  className="btn-close input-shadow"
                  data-mdb-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                />
              </div>

              <div className="modal-body landscape-modal-body">
                <form onSubmit={handleSubmit} className="landscape-form">
                  <div className="form-group last mb-3">
                    <label>Name</label>
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
                    <div className="d-flex justify-content-between">
                      <div style={{ flex: 1, marginRight: "5px" }}>
                        <label>Category</label>
                        <select
                          className="form-control"
                          type="text"
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
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

                      <div
                        className="ColorInput"
                        style={{ flex: 1, marginTop: "-4px" }}
                      >
                        <label>Colors</label>
                        <Select
                          isMulti
                          name="colors"
                          type="select"
                          className="form-control"
                          style={{ boxShadow: "none" }}
                          value={colorOptions.filter((option) =>
                            formData.colors.includes(option.value)
                          )}
                          options={colorOptions}
                          onChange={handleColorsInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <label>Sizes</label>
                  <button
                    type="button"
                    onClick={addSize}
                    className="btn Size-Btn"
                  >
                    Add Sizes
                  </button>
                  <div className="d-flex align-items-center justify-content-between">
                    {formData.sizes.map((size, index) => (
                      <div key={index} className="sizes-div">
                        <input
                          type="text"
                          value={size}
                          className="form-control"
                          onChange={(e) => handleSizeChange(e, index)}
                        />
                        &nbsp;&nbsp;
                        <button
                          type="button"
                          onClick={() => removeSize(index)}
                          className="btn btn-danger btn-sm"
                        >
                          <i class="bx bxs-trash-alt"></i>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="form-group last mb-3">
                    <div className="d-flex justify-content-between">
                      <div style={{ flex: 1, marginRight: "5px" }}>
                        <label>Image</label>
                        <input
                          type="file"
                          className="form-control"
                          style={{ boxShadow: "none" }}
                          name="imageUrl"
                          onChange={handleImageChange}
                          accept="image/*"
                          required
                        />
                      </div>

                      <div style={{ flex: 1, marginRight: "5px" }}>
                        <label>Popular products</label>
                        <select
                          className="form-control"
                          type="text"
                          id="popularproducts"
                          name="popularproducts"
                          value={formData.popularproducts}
                          onChange={handleInputChange}
                          style={{ boxShadow: "none" }}
                        >
                          <option value="" defaultChecked>
                            Select a Popular products
                          </option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group last mb-3">
                    <div className="d-flex justify-content-between">
                      <div style={{ flex: 1, marginRight: "5px" }}>
                        <label>New Arrival</label>
                        <select
                          className="form-control"
                          type="text"
                          id="newarrival"
                          name="newarrival"
                          value={formData.newarrival}
                          onChange={handleInputChange}
                          style={{ boxShadow: "none" }}
                        >
                          <option value="" defaultChecked>
                            Select a New Arrival
                          </option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>

                      <div style={{ flex: 1, marginRight: "5px" }}>
                        <label>Top Sales</label>
                        <select
                          className="form-control"
                          type="text"
                          id="topsales"
                          name="topsales"
                          value={formData.topsales}
                          onChange={handleInputChange}
                          style={{ boxShadow: "none" }}
                        >
                          <option value="" defaultChecked>
                            Select a TopSales
                          </option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group last mb-3">
                    <div className="d-flex justify-content-between">
                      <div style={{ flex: 1, marginRight: "5px" }}>
                        <label>Price</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          style={{ boxShadow: "none" }}
                        />
                      </div>

                      <div style={{ flex: 1, marginLeft: "5px" }}>
                        <label>Discount Price</label>
                        <input
                          type="number"
                          className="form-control"
                          name="discountprice"
                          value={formData.discountprice}
                          onChange={handleInputChange}
                          style={{ boxShadow: "none" }}
                        />
                      </div>
                      <div style={{ flex: 1, marginLeft: "5px" }}>
                        <label>Stock Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stockQuantity"
                          value={formData.stockQuantity}
                          onChange={handleInputChange}
                          style={{ boxShadow: "none" }}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary Custom-Btn"
                >
                  Save Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* *************** Edit Modal Form ***************** */}
    </>
  );
}

export default Product;
