import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import MovieListing from "../MovieListing/MovieListing";
import { asyncFetchAllMovies } from "../../features/movies/movieSlice";
import { asyncGetAllSeries } from "../../features/series/seriesSlice";
import "./Home.scss";

const Home = () => {
  console.log("home re-render");
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("home useEffect");
    dispatch(asyncFetchAllMovies("fight"));
    dispatch(asyncGetAllSeries("family"));
  }, []);

  return (
    <div className="home">
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
