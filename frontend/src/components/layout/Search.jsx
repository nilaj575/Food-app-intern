import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/eats/stores/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={searchHandler} className="search-form">
      <div className="input-group">
        <i className="fa fa-search search-icon-fixed" aria-hidden="true"></i>
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Search for restaurants or cuisines..."
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button id="search_btn" className="btn" type="submit">
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
};

export default Search;
