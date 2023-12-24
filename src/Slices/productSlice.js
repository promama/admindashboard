import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  res: [],
  loading: false,
  status: "",
  message: "",
  products: [],
  colors: [],
  sizes: [],
};

export const fetchUploadImage = createAsyncThunk(
  "product/fetchUploadImage",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        method: "POST",
        url: `http://localhost:5000/upload`,
        data: data,
      });
      //const res = await axios.post("http://localhost:5000/upload", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchShowAllProducts = createAsyncThunk(
  "cart/fetchShowAllProducts",
  async (data, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/getAllProducts`,
        data: { refresh_token },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //upload image
    builder.addCase(fetchUploadImage.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUploadImage.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.loading = false;
      state.res = action.payload.data;
    });
    builder.addCase(fetchUploadImage.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.loading = false;
    });
    //show all products
    builder.addCase(fetchShowAllProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload?.message;
      state.products = action.payload?.products;
      state.colors = action.payload?.colors;
      state.sizes = action.payload?.sizes;
    });
    builder.addCase(fetchShowAllProducts.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
    });
  },
});

export default productSlice.reducer;
