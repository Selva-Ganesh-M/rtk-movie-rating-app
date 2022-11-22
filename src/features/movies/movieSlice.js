import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../common/api/MovieApi";
import { APIKey } from "../../common/api/MovieApiKey";

const initialState = {
  isLoading: false,
  moviesList: [],
  currentMovie: {},
  error: "",
};

export const asyncFetchAllMovies = createAsyncThunk(
  "movies/asyncFetchAllMovies",
  async (searchTerm, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api
        .get(`/?APIKey=${APIKey}&s=${searchTerm}&type=movie`)
        .then((res) => res.data);
      console.log("Movies res: ", res);
      if (res.Response === "False") {
        return rejectWithValue("something is wrong with the request.");
      } else {
        return fulfillWithValue(res.Search);
      }
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const getCurrentMovie = createAsyncThunk(
  "series/getCurrentMovie",
  async (imdbID, { rejectWithValue, fulfillWithValue }) => {
    try {
      const dataObject = await api
        .get(`/?APIKey=${APIKey}&i=${imdbID}`)
        .then((res) => res.data);
      if (dataObject.Response === "False") {
        return rejectWithValue("Invalid request");
      } else {
        return fulfillWithValue(dataObject);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    currentMovieCleanup: (state) => {
      state.currentMovie = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchAllMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncFetchAllMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moviesList = action.payload;
        state.error = "";
      })
      .addCase(asyncFetchAllMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.moviesList = [];
        state.error = action.payload;
      })
      .addCase(getCurrentMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMovie = action.payload;
        state.error = "";
      })
      .addCase(getCurrentMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.currentMovie = [];
        state.error = action.payload;
      });
  },
});

export const getMovies = (state) => {
  return state.movies;
};

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
