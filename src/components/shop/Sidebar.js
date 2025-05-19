import React from "react";
import BarFilter from "./BarFilter";
import SearchBar from "./searchbar";

export default function SideBar({
  filters,
  setFilters,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="shop-sidebar">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="filter-tool">
        <BarFilter title="shopby" filters={filters} setFilters={setFilters} />
        <BarFilter title="sortby" filters={filters} setFilters={setFilters} />

        <div className="filter-price">
          <input
            type="range"
            min={0}
            max={180}
            value={filters.price}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                price: parseInt(e.target.value),
              }))
            }
            className="slider"
          />
          <div className="slide-content">
            <p className="pricenumber">Price: ${filters.price} - $180</p>
            <p className="tag-number">Filter</p>
          </div>
        </div>

        <div className="onsale">
          <h3 className="check-title">On Sale</h3>
          <label className="switch">
            <input
              type="checkbox"
              checked={filters.onSale}
              onChange={() =>
                setFilters((prev) => ({ ...prev, onSale: !prev.onSale }))
              }
            />
            <span className="slider-btn"></span>
          </label>
        </div>

        <div className="instock">
          <h3 className="check-title">In Stock</h3>
          <label className="switch">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={() =>
                setFilters((prev) => ({ ...prev, inStock: !prev.inStock }))
              }
            />
            <span className="slider-btn"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
