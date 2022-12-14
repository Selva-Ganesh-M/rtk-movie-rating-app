import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentMovie,
  getMovies,
  movieActions,
} from "../../features/movies/movieSlice";
import "./MovieDetails.scss";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const movies = useSelector(getMovies);
  const currentMovie = movies.currentMovie;
  useEffect(() => {
    dispatch(getCurrentMovie(imdbID));
    return () => {
      dispatch(movieActions.currentMovieCleanup());
    };
  }, [dispatch, imdbID]);
  const {
    Ratings,
    imdbVotes,
    Runtime,
    Year,
    Plot,
    Director,
    Actors,
    Genre,
    Awards,
    Language,
  } = currentMovie;

  return !movies.isLoading ? (
    <div className="container">
      <div className="details">
        <h1>{currentMovie.Title}</h1>
        <div className="subs">
          {/* <p>IMDB rating: {Ratings[0].Value}</p> */}
          <p>IMDB Votes: {imdbVotes}</p>
          <p>Runtime: {Runtime}</p>
          <p>Year: {Year}</p>
        </div>
        <div className="plot">{Plot}</div>
        <table>
          <tbody>
            <tr>
              <td>Director</td>
              <td className="secondary">{Director}</td>
            </tr>
            <tr>
              <td>Actors</td>
              <td className="secondary">{Actors}</td>
            </tr>
            <tr>
              <td>Genre</td>
              <td className="secondary">{Genre}</td>
            </tr>
            <tr>
              <td>Language</td>
              <td className="secondary">{Language}</td>
            </tr>
            <tr>
              <td>Awards</td>
              <td className="secondary">{Awards}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="poster">
        <img src={currentMovie.Poster} alt={currentMovie.Title} />
      </div>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
};

export default MovieDetails;
