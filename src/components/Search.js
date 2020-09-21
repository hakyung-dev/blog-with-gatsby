import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = (props) => {
  const { handleChange, type, placeholder } = props;

  return (
    <div className={`search-${type}`}>
      <div className="search-icon">
        <FaSearch />
      </div>
      <input
        className="search-box"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
