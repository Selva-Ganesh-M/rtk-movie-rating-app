import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../common/api/MovieApi";
import { APIKey } from "../../common/api/MovieApiKey";

const initialState = {
  isLoading: false,
  moviesList: [],
  error: "",
};

export const asyncFetchMovies = createAsyncThunk(
  "movies/asyncFetchMovies",
  async (searchTerm, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await api
        .get(`/?APIKey=${APIKey}&s=${searchTerm}&type=movie`)
        .then((res) => res.data);
      console.log("res: ", res);
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

const movieSlice = createSlice({
  name: "movies",
  initialState,
  // reducers: {
  //   moviesRequested: (state) => {
  //     state.isLoading = true;
  //   },
  //   moviesFetchSucceeded: (state, action) => {
  //     state.isLoading = false;
  //     state.moviesList = action.payload;
  //     state.error = "";
  //   },
  //   moviesFetchFailed: (state, action) => {
  //     state.isLoading = false;
  //     state.moviesList = [];
  //     state.error = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(asyncFetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncFetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.moviesList = action.payload;
        state.error = "";
      })
      .addCase(asyncFetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.moviesList = [];
        state.error = action.payload;
      });
  },
  // extraReducers: {
  //   [asyncFetchMovies.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [asyncFetchMovies.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.moviesList = action.payload;
  //     state.error = "";
  //   },
  //   [asyncFetchMovies.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.moviesList = [];
  //     state.error = action.payload;
  //   },
  // },
});

export const getAllMovies = (state) => {
  return state.movies;
};

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
