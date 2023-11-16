import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon icon={faSearch} style={{fontSize: "1.2rem", paddingTop: '3px'}}/>
        </button>
    </div>
  );
};

export default SearchBar;
