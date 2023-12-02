import React from "react";


const Filter = ({ options, onChange }) => {
  return (
    <div className="filter-container">
      <select className="filter-year" id="year" onChange={onChange}>
        <option value=""> Anos  </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
