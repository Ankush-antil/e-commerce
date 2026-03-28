import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
// import { ShopContext } from "../context/ShopContext";
import "../style/Navbar.css";
import { ShopContext } from "../context/ShopContext";
 const adminPanelUrl = import.meta.env.VITE_ADMIN_PANEL_URL; 
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

   const {  showSearch,setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
  //const { showSearch, setShowSearch, navigate, getCartCount } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken(" ");
    setCartItems({});
  };

  return (
    <div className="navbar" id="navbar">
      <Link to="/" className="navbar-logo">
        E-Commerce
      </Link>


      <ul className="navbar-links">
        <Link to="/" className="nav-item">
          HOME
        </Link>
        <Link to="/collection" className="nav-item">
          COLLECTION
        </Link>
        <Link to="/about" className="nav-item">
          ABOUT
        </Link>
        <Link to="/contact" className="nav-item">
          CONTACT
        </Link>
         <Link to={adminPanelUrl} className="nav-item admin" target="_blank" rel="noopener noreferrer">
          Admin Panel
        </Link>
      </ul>


      <div className="navbar-icons">
   
        <img
          src={assets.search_icon}
          alt="Search"
          className="icon"
          onClick={() => {
            setShowSearch(!showSearch);
            navigate("/collection");
          }}
        />

        <div className="profile-wrapper">
          <img
            src={assets.profile_icon}
            alt="Profile"
            className="icon"
            onClick={() => {
              setOpen(!open);
            }}
          />

          {open && (
            <div className="profile-wrapper-dropdown">
              <p className="dropdown-item" onClick={() => navigate("/orders")}>Orders</p>
              <p className="dropdown-item" onClick={() =>{logout()}}> Logout </p>
            </div>
           )}
          

          {token && (
            <div className="profile-dropdown">
              <p onClick={() => navigate("/orders")}></p>
              <p onClick={logout}></p>
            </div>
          )}
        </div>

     
        <Link to="/cart" className="cart-wrapper">
          <img src={assets.cart_icon} alt="Cart" className="icon" />
          <span className="cart-count">{getCartCount()}</span>
        </Link>

  
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="icon mobile-menu-icon"
          onClick={() => setVisible(true)}
        />
      </div>

      <div className={`mobile-sidebar ${visible ? "show" : ""}`}>
        <div className="sidebar-header" onClick={() => setVisible(false)}>
          <img src={assets.dropdown_icon} alt="Back" />
          <span>Back</span>
        </div>

        <Link to="/" onClick={() => setVisible(false)}>
          HOME
        </Link>
        <Link to="/collection" onClick={() => setVisible(false)}>
          COLLECTION
        </Link>
        <Link to="/about" onClick={() => setVisible(false)}>
          ABOUT
        </Link>
        <Link to="/contact" onClick={() => setVisible(false)}>
          CONTACT
        </Link>
      </div>
    </div>
  );
};

export default Navbar;