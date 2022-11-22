import React from "react";
import { useSelector } from "react-redux";
import { getMovies } from "../../features/movies/movieSlice";
import { getSeries } from "../../features/series/seriesSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

const MovieListing = () => {
  const movies = useSelector(getMovies);
  const series = useSelector(getSeries);
  const renderMovies =
    !movies.isLoading && movies.moviesList.length !== 0 ? (
      movies.moviesList.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.moviesError}</h3>
      </div>
    );
  const renderSeries =
    !series.isLoading && series.seriesList.length !== 0 ? (
      series.seriesList.map((show) => (
        <MovieCard key={show.imdbID} movie={show} />
      ))
    ) : (
      <div className="series-error">
        <h3>{series.seriesError}</h3>
      </div>
    );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">{renderMovies}</div>
      </div>
      <div className="series-list">
        <h2>Series</h2>
        <div className="series-container">{renderSeries}</div>
      </div>
    </div>
  );
};

export default MovieListing;
