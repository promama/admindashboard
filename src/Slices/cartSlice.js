import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "",
  message: "",
  orders: [],
  orderCount: [],
  isLoading: false,
};

export const showAllOrder = createAsyncThunk(
  "cart/showAllOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/getAllOrder`,
        data: { ...productInfos },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const showDeliveringOrder = createAsyncThunk(
  "cart/showDeliveringOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/getDeliveringOrder`,
        data: { ...productInfos },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const approveOrder = createAsyncThunk(
  "cart/approveOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/approveOrder`,
        data: { productInfos },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const finishOrder = createAsyncThunk(
  "cart/finishOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/finishOrder`,
        data: { productInfos },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //show all orders
    builder.addCase(showAllOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload.listOrder;
      state.orderCount = action.payload.countEachOrder;
    });
    builder.addCase(showAllOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    //approve order
    builder.addCase(approveOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(approveOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(approveOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    //delivering order
    builder.addCase(showDeliveringOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(showDeliveringOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(showDeliveringOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    //finish order
    builder.addCase(finishOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.orders = action.payload.listOrder;
      state.isLoading = false;
    });
    builder.addCase(finishOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.isLoading = false;
    });
    builder.addCase(finishOrder.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export default cartSlice.reducer;
