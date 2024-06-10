import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  message: "",
  incomeByStatus: {},
  stats: { label: [0], data: [0] },
  general: {},
  years: [],
  months: [],
  status: "",
  isLoading: false,
  isLoadMonth: false,
};

export const fetchMonths = createAsyncThunk(
  "admin/fetchMonths",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/admin/statsMonths/${data}`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchYears = createAsyncThunk(
  "admin/fetchYears",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/admin/statsYears`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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

export const fetchShowIncomeBetweenTwoDates = createAsyncThunk(
  "admin/fetchShowIncomeBetweenTwoDates",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/statsBetweenTwoDates`,
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchShowIncomeByYearAndMonth = createAsyncThunk(
  "admin/fetchShowIncomeByYearAndMonth",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
        url: `http://localhost:5000/admin/statsByMonthAndYear/${data.year}/${data.month}`,
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
        url: `http://localhost:5000/admin/statsByMonth/${data}`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchShowIncomeByYear = createAsyncThunk(
  "admin/fetchShowIncomeByYear",
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
    //show all income between 2 dates
    builder.addCase(fetchShowIncomeBetweenTwoDates.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchShowIncomeBetweenTwoDates.fulfilled,
      (state, action) => {
        state.message = action.payload.message;
        state.stats = action.payload.stats;
        state.status = "success";
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchShowIncomeBetweenTwoDates.rejected,
      (state, action) => {
        state.message = action.payload.message;
        state.status = "fail";
        state.isLoading = false;
      }
    );
    //show all income group by day of month and year
    builder.addCase(fetchShowIncomeByYearAndMonth.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchShowIncomeByYearAndMonth.fulfilled,
      (state, action) => {
        state.message = action.payload.message;
        state.stats = action.payload.stats;
        state.status = "success";
        state.isLoading = false;
      }
    );
    builder.addCase(fetchShowIncomeByYearAndMonth.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
      state.isLoading = false;
    });
    //show all income group by month of year
    builder.addCase(fetchShowIncomeByMonth.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShowIncomeByMonth.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.stats = action.payload.stats;
      state.status = "success";
      state.isLoading = false;
    });
    builder.addCase(fetchShowIncomeByMonth.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
      state.isLoading = false;
    });
    //show all months by year
    builder.addCase(fetchMonths.pending, (state, action) => {
      state.isLoadMonth = true;
    });
    builder.addCase(fetchMonths.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.months = action.payload.months;
      state.status = "success";
      state.isLoadMonth = false;
    });
    builder.addCase(fetchMonths.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
      state.isLoadMonth = false;
    });
    //show all years
    builder.addCase(fetchYears.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.years = action.payload.years;
      state.status = "success";
    });
    builder.addCase(fetchYears.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
    });
    //show all income group by status
    builder.addCase(fetchShowIncomeByStatus.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShowIncomeByStatus.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.incomeByStatus = action.payload.incomeByStatus;
      state.status = "success";
      state.isLoading = false;
    });
    builder.addCase(fetchShowIncomeByStatus.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
      state.isLoading = false;
    });
    //show all income group by month and year
    builder.addCase(fetchShowIncomeByYear.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShowIncomeByYear.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.stats = action.payload.stats;
      state.status = "success";
      state.isLoading = false;
    });
    builder.addCase(fetchShowIncomeByYear.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
      state.isLoading = false;
    });
    //show general income
    builder.addCase(fetchShowGeneralIncom.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShowGeneralIncom.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.general = action.payload.general;
      state.status = "success";
      state.isLoading = false;
    });
    builder.addCase(fetchShowGeneralIncom.rejected, (state, action) => {
      state.message = action.payload.message;
      state.status = "fail";
      state.isLoading = false;
    });
  },
});

export default statisticSlice.reducer;
