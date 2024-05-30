import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  incomeByStatus: {},
  incomeByMonth: {},
  general: {},
  status: "",
};

export const fetchShowIncomeByStatus = createAsyncThunk(
  "admin/fetchShowIncomeByStatus",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/admin/incomeByStatus`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchShowIncomeByMonth = createAsyncThunk(
  "admin/fetchShowIncomeByMonth",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/admin/getStatisticByMonth`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchShowGeneralIncom = createAsyncThunk(
  "admin/fetchShowGeneralIncom",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/admin/getGeneral`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //show all income group by status
    builder.addCase(fetchShowIncomeByStatus.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.incomeByStatus = action.payload.incomeByStatus;
      state.status = "success";
    });
    builder.addCase(fetchShowIncomeByStatus.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
    });
    //show all income group by month and year
    builder.addCase(fetchShowIncomeByMonth.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.incomeByMonth = action.payload.incomeByMonth;
      state.status = "success";
    });
    builder.addCase(fetchShowIncomeByMonth.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
    });
    //show general income
    builder.addCase(fetchShowGeneralIncom.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.general = action.payload.general;
      state.status = "success";
    });
    builder.addCase(fetchShowGeneralIncom.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
    });
  },
});

export default statisticSlice.reducer;
