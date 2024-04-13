import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Popup from "./components/Popup";
import Admin from "./components/screen/Admin";
import Loginpage from "./components/screen/Admin/Login";
import Category from "./components/screen/Category";
import Customer from "./components/screen/Customer";
import Home from "./components/screen/Home/Home";
import Orders from "./components/screen/Orders";
import Product from "./components/screen/Product";
import Settings from "./components/screen/Settings";
import SubCategory from "./components/screen/SubCategory";
import Driver from "./components/screen/Driver";



const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const Routing = () => {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={ <Home /> }
      />

      <Route
        exact
        path="/Product"
        element={<Product/> }
      />
      <Route
        exact
        path="/Category"
        element={ <Category/> }
      />
      <Route
        exact
        path="/SubCategory"
        element={ <SubCategory/> }
      />
      <Route
        exact
        path="/Customers"
        element={<Customer/>}
      />
      <Route
        exact
        path="/Admin"
        element={<Admin/> }
      />
       <Route
        exact
        path="/Driver"
        element= {<Driver/> }
      />
      <Route
        exact
        path="/Settings"
        element={<Settings/> }
      />
            <Route
        exact
        path="/Orders"
        element={<Orders/> }
      />
      
      <Route exact path="/login" element={<Loginpage />} />
    </Routes>
  );
};



function App() {
  // const user = useSelector((state) => state.user.user);

  return (
    <>
    <Router>
      <Popup/>
      <Routing/>
    </Router>
    
    </>
  );
}


export default App;
