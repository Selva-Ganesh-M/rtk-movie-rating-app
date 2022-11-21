import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import MovieListing from "../MovieListing/MovieListing";
import { asyncFetchMovies } from "../../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncFetchMovies("harry"));
  }, [dispatch]);
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     dispatch(movieActions.moviesRequested());
  //     try {
  //       const res = await api
  //         .get(`/?APIKey=${APIKey}&s=${searchTerm}&type=movie`)
  //         .catch((err) => {
  //           // If this catch is not here, we still catch the error as "Axios Error"
  //           throw err.message; //throws an error if it can't reach the server "Network Error"
  //         });
  //       if (res.data.Response === "False") {
  //         throw new Error("something is wrong with the request."); //this is the "custom error" we thrown.
  //       } else {
  //         console.log("res", res);
  //         dispatch(movieActions.moviesFetchSucceeded(res.data.Search));
  //       }
  //     } catch (error) {
  //       dispatch(movieActions.moviesFetchFailed(error));
  //     }
  //   };
  //   fetchMovies();
  // }, []);

  return (
    <div className="home">
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
