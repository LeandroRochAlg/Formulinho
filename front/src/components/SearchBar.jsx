import React, { useState } from "react";
import { FaSistrix } from "react-icons/fa6";

const SearchBar = ({ label, type, name, placeholder, classNm, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchValue);
  };

  return (
    <div className={classNm}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
      />
      <button className="search-icon" onClick={handleSearchClick}>
        <FaSistrix style={{ fontSize: "4vh", paddingTop: "3px" }} />
      </button>
    </div>
  );
};

export default SearchBar;
