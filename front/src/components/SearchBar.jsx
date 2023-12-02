import React from 'react';
import {FaSistrix} from "react-icons/fa6";

const SearchBar = ({ label, type, name, placeholder, classNm }) => {
  return (
    <div className={classNm}>
        <label>{label}</label>
        <input 
            type={type} 
            name={name} 
            placeholder= {placeholder}
        />
        <button className="search-icon">
          <FaSistrix style={{fontSize: "1.2rem", paddingTop: '3px'}}/>
        </button>
    </div>
  );
};

export default SearchBar;
