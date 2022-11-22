import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCurrentSeries,
  getSeries,
  seriesActions,
} from "../../features/series/seriesSlice";

const SeriesDetails = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const series = useSelector(getSeries);
  const currentSeries = useSelector(getSeries).currentSeries;
  useEffect(() => {
    dispatch(getCurrentSeries(imdbID));
    return () => {
      dispatch(seriesActions.currentSeriesCleanup());
    };
  }, [dispatch, imdbID]);
  const {
    Title,
    Ratings,
    imdbVotes,
    Runtime,
    Year,
    Plot,
    Poster,
    Director,
    Actors,
    Genre,
    Awards,
    Language,
  } = currentSeries;
  return currentSeries ? (
    <div className="container">
      <div className="details">
        <h1>{Title}</h1>
        <div className="subs">
          {Ratings && <p>IMDB rating: {Ratings[0].Value}</p>}
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
        <img src={Poster} alt={Title} />
      </div>
    </div>
  ) : (
    "null"
  );
};

export default SeriesDetails;
