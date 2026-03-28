import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import "../style/Collection.css";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory(category.filter(item => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;

    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter(item => item !== value));
    } else {
      setSubCategory([...subCategory, value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = [...products];

     if (showSearch && search) {
       productsCopy = productsCopy.filter((item) =>
         item.name.toLowerCase().includes(search.toLowerCase())
       );
     }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory)); 
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let copy = [...filterProducts];

    if (sortType === "low-high") {
      copy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      copy.sort((a, b) => b.price - a.price);
    } else {
      applyFilter();
      return;
    }

    setFilterProducts(copy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="collection-container">
       <div className="filter-section">
        <p className="filter-heading">
          FILTERS
        </p>

      
        <div className="filter-box">
          <p className="filter-title">CATEGORIES</p>
          <div className="filter-options">
            <label><input type="checkbox" value="Men" onChange={toggleCategory} /> Men</label>
            <label><input type="checkbox" value="Women" onChange={toggleCategory} /> Women</label>
            <label><input type="checkbox" value="Kids" onChange={toggleCategory} /> Kids</label>
          </div>
        </div>

        
       <div className="filter-box">
          <p className="filter-title">TYPE</p>
          <div className="filter-options">
            <label><input type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear</label>
            <label><input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear</label>
            <label><input type="checkbox" value="Footwear" onChange={toggleSubCategory} /> Footwear</label>
          </div>
        </div>
      </div>

       <div className="products-section">
        <div className="products-header">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="sort-dropdown"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="products-grid">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              images={item.images}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;