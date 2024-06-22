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
  editId: "",
  isShowCreateProduct: false,
  isShowEditProduct: false,
  editProductId: "",
  isLoading: false,
  isCreateNewColor: false,
  colorData: {},
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

export const fetchCreateColor = createAsyncThunk(
  "product/fetchCreateColor",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        url: `http://localhost:5000/admin/createColor`,
        data: productData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateProductName = createAsyncThunk(
  "product/fetchUpdateProductName",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/updateProductName`,
        data: productData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateProductBrand = createAsyncThunk(
  "product/fetchUpdateProductBrand",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/updateProductBrand`,
        data: productData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateProductCategory = createAsyncThunk(
  "product/fetchUpdateProductCategory",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/updateProductCategory`,
        data: productData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateProductSize = createAsyncThunk(
  "product/fetchUpdateProductSize",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/updateProductSize`,
        data: productData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUpdateProductColor = createAsyncThunk(
  "product/fetchUpdateProductColor",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/updateProductColor`,
        data: productData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAddProductSize = createAsyncThunk(
  "product/fetchAddProductSize",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/addProductSize`,
        data: productData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeleteProductSize = createAsyncThunk(
  "product/fetchDeleteProductSize",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "DELETE",
        url: `http://localhost:5000/admin/deleteProductSize`,
        data: productData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeleteProductColor = createAsyncThunk(
  "product/fetchDeleteProductColor",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "DELETE",
        url: `http://localhost:5000/admin/deleteProductColor`,
        data: productData,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeleteProduct = createAsyncThunk(
  "product/fetchDeleteProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "DELETE",
        url: `http://localhost:5000/admin/deleteProduct`,
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
      state.isCreateNewColor = false;
    },
    hideOffCanvasCreateProduct: (state, action) => {
      state.isShowCreateProduct = false;
      state.isCreateNewColor = false;
      state.colorData = {};
    },
    showOffCanvasCreateColor: (state, action) => {
      state.isShowCreateProduct = true;
      state.isCreateNewColor = true;
      state.colorData = action.payload;
    },
    showOffCanvasEditProduct: (state, action) => {
      state.isShowEditProduct = true;
      state.editId = action.payload?.id;
    },
    hideOffCanvasEditProduct: (state, action) => {
      state.isShowEditProduct = false;
      state.editId = "";
    },
    saveImages: (state, action) => {
      state.productImages = action.payload;
    },
    setEditing: (state, action) => {
      state.isEdit = action.payload?.id;
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
      state.products = action.payload?.allProduct;
      state.colors = action.payload?.allColor;
      state.sizes = action.payload?.allSize;
    });
    builder.addCase(fetchCreateProduct.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
    });
    //create color
    builder.addCase(fetchCreateColor.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload?.message;
      state.colors = action.payload?.colors;
    });
    builder.addCase(fetchCreateColor.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
    });
    //update product name
    builder.addCase(fetchUpdateProductName.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload?.products;
      state.colors = action.payload?.colors;
    });
    builder.addCase(fetchUpdateProductName.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
    });
    //update product brand
    builder.addCase(fetchUpdateProductBrand.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload?.products;
    });
    builder.addCase(fetchUpdateProductBrand.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
    });
    //update product category
    builder.addCase(fetchUpdateProductCategory.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload?.products;
    });
    builder.addCase(fetchUpdateProductCategory.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
    });
    //update product size
    builder.addCase(fetchUpdateProductSize.fulfilled, (state, action) => {
      state.status = "success";
      state.sizes = action.payload?.sizes;
      state.isLoading = false;
    });
    builder.addCase(fetchUpdateProductSize.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(fetchUpdateProductSize.pending, (state, action) => {
      state.isLoading = true;
    });
    //update product color
    builder.addCase(fetchUpdateProductColor.fulfilled, (state, action) => {
      state.status = "success";
      state.colors = action.payload?.colors;
      state.sizes = action.payload?.sizes;
      state.message = action.payload?.message;
    });
    builder.addCase(fetchUpdateProductColor.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
    });
    //add product size
    builder.addCase(fetchAddProductSize.fulfilled, (state, action) => {
      state.status = "success";
      state.sizes = action.payload?.sizes;
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(fetchAddProductSize.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(fetchAddProductSize.pending, (state, action) => {
      state.isLoading = true;
    });
    //delete product size
    builder.addCase(fetchDeleteProductSize.fulfilled, (state, action) => {
      state.status = "success";
      state.sizes = action.payload?.sizes;
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(fetchDeleteProductSize.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(fetchDeleteProductSize.pending, (state, action) => {
      state.isLoading = true;
    });
    //delete product color
    builder.addCase(fetchDeleteProductColor.fulfilled, (state, action) => {
      state.status = "success";
      state.colors = action.payload?.colors;
      state.sizes = action.payload?.sizes;
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(fetchDeleteProductColor.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(fetchDeleteProductColor.pending, (state, action) => {
      state.isLoading = true;
    });
    //delete product
    builder.addCase(fetchDeleteProduct.fulfilled, (state, action) => {
      state.status = "success";
      state.colors = action.payload?.colors;
      state.sizes = action.payload?.sizes;
      state.products = action.payload?.products;
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(fetchDeleteProduct.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload?.message;
      state.isLoading = false;
    });
    builder.addCase(fetchDeleteProduct.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export const {
  showOffcanvasCreateProduct,
  hideOffCanvasCreateProduct,
  showOffCanvasCreateColor,
  showOffCanvasEditProduct,
  hideOffCanvasEditProduct,
  saveImages,
  setEditing,
} = productSlice.actions;

export default productSlice.reducer;
