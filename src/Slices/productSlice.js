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
  isShowCreateProduct: false,
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
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/getAllProducts`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCreateProduct = createAsyncThunk(
  "product/fetchCreateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        url: `http://localhost:5000/admin/createProduct`,
        data: productData,
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
  reducers: {
    showOffcanvasCreateProduct: (state, action) => {
      state.isShowCreateProduct = true;
    },
    hideOffCanvasCreateProduct: (state, action) => {
      state.isShowCreateProduct = false;
    },
    saveImages: (state, action) => {
      state.productImages = action.payload;
    },
  },
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
    //create a product
    builder.addCase(fetchCreateProduct.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload?.message;
    });
    builder.addCase(fetchCreateProduct.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
    });
  },
});

export const {
  showOffcanvasCreateProduct,
  hideOffCanvasCreateProduct,
  saveImages,
} = productSlice.actions;

export default productSlice.reducer;
