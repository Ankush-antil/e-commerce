import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import "../style/SearchBar.css";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-box">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <img
          src={assets.search_icon}
          alt="Search"
          className="search-icon"
        />
      </div>

      <img
        src={assets.cross_icon}
        alt="Close"
        className="close-icon"
        onClick={() => setShowSearch(false)}
      />
    </div>
  );
};

export default SearchBar;