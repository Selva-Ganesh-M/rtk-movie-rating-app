import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../common/api/MovieApi";
import { APIKey } from "../../common/api/MovieApiKey";

const initialState = {
  isLoading: false,
  seriesList: [],
  currentSeries: {},
  error: "",
};

export const asyncGetAllSeries = createAsyncThunk(
  "series/asyncGetAllSeries",
  async (searchTerm, { rejectWithValue, fulfillWithValue }) => {
    try {
      const dataObject = await api
        .get(`/?APIKey=${APIKey}&s=${searchTerm}&type=series`)
        .then((res) => res.data);
      console.log("All series res: ", dataObject);
      if (dataObject.Response === "False") {
        return rejectWithValue("Invalid request");
      } else {
        return fulfillWithValue(dataObject.Search);
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getCurrentSeries = createAsyncThunk(
  "series/getCurrentSeries",
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

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    currentSeriesCleanup: (state) => {
      state.currentSeries = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetAllSeries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(asyncGetAllSeries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.seriesList = action.payload;
        state.error = "";
      })
      .addCase(asyncGetAllSeries.rejected, (state, action) => {
        state.isLoading = false;
        state.seriesList = [];
        state.error = action.payload;
      })
      .addCase(getCurrentSeries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentSeries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentSeries = action.payload;
        state.error = "";
      })
      .addCase(getCurrentSeries.rejected, (state, action) => {
        state.isLoading = false;
        state.currentSeries = {};
        state.error = action.payload;
      });
  },
});

export const getSeries = (state) => {
  return state.series;
};

export default seriesSlice.reducer;
export const seriesActions = seriesSlice.actions;
