import React from "react";
import icons from "../../assets/img/icon";

const { CiSearch } = icons;

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-bar">
      <input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <CiSearch />
    </div>
  );
}
