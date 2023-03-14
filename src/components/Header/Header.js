import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncFetchAllMovies } from "../../features/movies/movieSlice";
import { asyncGetAllSeries } from "../../features/series/seriesSlice";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncFetchAllMovies("fight"));
    dispatch(asyncGetAllSeries("family"));
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(asyncFetchAllMovies(searchTerm));
    dispatch(asyncGetAllSeries(searchTerm));
    setSearchTerm("")
  };
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      <div className="set">
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="search for movies or series here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
