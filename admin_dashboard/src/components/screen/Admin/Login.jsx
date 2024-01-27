import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Image from "../../../assets/Dashboard.jpg";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }

    fetch(process.env.REACT_APP_API_URL + "/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          toast.error(data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.admin)); 
          dispatch({ type: "LOGIN", payload: data.admin }); 
          toast.success(data.message); //success message
          history("/"); // redirection to home page
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
            <div className="min-h-screen flex items-center justify-center">
      <div className="container py-4 mt-2">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6">
                  <img
                    src={Image}
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      {/* Logo and Title */}
                      <div className="d-flex align-items-center mb-4 pb-2">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        />
                        
                      </div>

                        <h5 className="fw-bold mb-3 pb-3 text-center"
                          style={{ letterSpacing: 1, fontFamily: "Poppins", fontWeight: "600" }}
                        >
                          ADMIN LOGIN
                        </h5>

                      <div className="form-outline mb-3 mx-auto">
                        <label className="form-label text-left">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-sm input-shadow"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      {/* Password Input */}
                      <div className="form-outline mb-3 mx-auto">
                        <label className="form-label text-left">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-sm input-shadow"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {/* Login Button */}
                      <div className="pt-1 mb-4 mx-auto text-center">
                        <button
                          className="btn btn-dark btn-m btn-block color" 
                          type="button"
                          onClick={() => handleSubmit()}
                        >
                          Login
                        </button>
                      </div>
                      <a className="small text-muted" href="#!">
                        Reset password?
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        
    </>
  );
};

export default Login;
