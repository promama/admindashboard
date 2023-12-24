import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "",
  message: "",
  orders: [],
};

export const showAllOrder = createAsyncThunk(
  "cart/showAllOrder",
  async (productInfos, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/getAllOrder`,
        data: { ...productInfos, refresh_token },
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
    //show "finish" orders
    builder.addCase(showAllOrder.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload.listOrder;
    });
    builder.addCase(showAllOrder.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
  },
});

export default cartSlice.reducer;
