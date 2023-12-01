import React from "react";

const Filter = ({ label, options, onChange }) => {
  return (
    <div className="filter-container">
      <label htmlFor="year">{label}</label>
      <select className="filter-year" id="year" onChange={onChange}>
        <option value="">Anos</option>
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
