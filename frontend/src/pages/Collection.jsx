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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const toggleCategory = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;

    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter((item) => item !== value));
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
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
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

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  const activeFilterCount = category.length + subCategory.length;

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="collection-container">
      <div className="filter-section">
        <div className="filter-mobile-header">
          <p className="filter-heading">FILTERS</p>
          <button
            type="button"
            className="filter-toggle-btn"
            onClick={() => setShowMobileFilters((prev) => !prev)}
            aria-expanded={showMobileFilters}
            aria-controls="collection-filters-panel"
          >
            <span>{showMobileFilters ? "Hide" : "Show"} Filters</span>
            {activeFilterCount > 0 && (
              <span className="filter-count-badge">{activeFilterCount}</span>
            )}
          </button>
        </div>

        <div
          id="collection-filters-panel"
          className={`filter-panel ${showMobileFilters ? "show" : ""}`}
        >
          <div className="filter-panel-top">
            <p className="filter-panel-title">Shop by category and type</p>
            {activeFilterCount > 0 && (
              <button
                type="button"
                className="filter-clear-btn"
                onClick={clearFilters}
              >
                Clear all
              </button>
            )}
          </div>

          <div className="filter-box">
            <p className="filter-title">CATEGORIES</p>
            <div className="filter-options">
              <label>
                <input
                  type="checkbox"
                  value="Men"
                  checked={category.includes("Men")}
                  onChange={toggleCategory}
                />
                Men
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Women"
                  checked={category.includes("Women")}
                  onChange={toggleCategory}
                />
                Women
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Kids"
                  checked={category.includes("Kids")}
                  onChange={toggleCategory}
                />
                Kids
              </label>
            </div>
          </div>

          <div className="filter-box">
            <p className="filter-title">TYPE</p>
            <div className="filter-options">
              <label>
                <input
                  type="checkbox"
                  value="Topwear"
                  checked={subCategory.includes("Topwear")}
                  onChange={toggleSubCategory}
                />
                Topwear
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Bottomwear"
                  checked={subCategory.includes("Bottomwear")}
                  onChange={toggleSubCategory}
                />
                Bottomwear
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Footwear"
                  checked={subCategory.includes("Footwear")}
                  onChange={toggleSubCategory}
                />
                Footwear
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="products-section">
        <div className="products-header">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="sort-dropdown"
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
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