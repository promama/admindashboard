import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: localStorage.getItem("email") || "",
  status: "idle",
  token: localStorage.getItem("access_token") || "",
  message: "",
  listUsers: [],
  failData: {},
  isShowOffcanvas: false,
  userIndex: 0,
  allowAccess: true,
  userSocketId: "",
  notificationList: [],
  unreadNotify: 0,
};

export const fetchTestingSocket = createAsyncThunk(
  "test/fetchTestingSocket",
  async (token, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/testing/testValidateSocket",
        token
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (userInfos, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/login",
        userInfos
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchVerify = createAsyncThunk(
  "user/fetchVerify",
  async (numb, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/verify`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchGetAllUserInfos = createAsyncThunk(
  "user/fetchGetAllUserInfos",
  async (numb, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/allUser`,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchEditUserInfos = createAsyncThunk(
  "user/fetchEditUserInfos",
  async (props, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        url: `http://localhost:5000/admin/editUser/${props._id}`,
        data: { props },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDeleteUser = createAsyncThunk(
  "user/fetchDeleteUser",
  async (props, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "DELETE",
        url: `http://localhost:5000/admin/delete/${props._id}`,
        data: { props },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUnreadNotification = createAsyncThunk(
  "/user/fetchUnreadNotification",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.request({
        method: "POST",
        url: `http://localhost:5000/admin/notification`,
        data: data,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.email = "";
      state.status = "idle";
      state.token = "";
      state.message = "";
      state.listUsers = [];
      state.failData = {};
      state.userIndex = 0;
      state.allowAccess = false;
      state.isShowOffcanvas = false;

      localStorage.clear();
    },
    showOffcanvas: (state, action) => {
      state.isShowOffcanvas = true;
      state.userIndex = action.payload.index;
    },
    hideOffCanvas: (state, action) => {
      state.isShowOffcanvas = false;
      state.userIndex = -1;
    },
    replaceNotify: (state, action) => {
      state.notificationList = action.payload.notify;
      state.unreadNotify = action.payload.managerUnreadNoti;
    },
  },
  extraReducers: (builder) => {
    //testing socket
    builder.addCase(fetchTestingSocket.fulfilled, (state, action) => {
      state.message = "success";
      state.userSocketId = action.payload.socketId;
    });
    builder.addCase(fetchTestingSocket.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    //login in to page
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "login success!";
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.allowAccess = true;
      localStorage.setItem("access_token", action.payload.token);
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    //show all users infos except admin
    builder.addCase(fetchGetAllUserInfos.fulfilled, (state, action) => {
      state.status = "success";
      state.message = "get all user success!";
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.listUsers = action.payload.users;
    });
    builder.addCase(fetchGetAllUserInfos.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.failData = action.payload.number;
    });
    //edit user infos
    builder.addCase(fetchEditUserInfos.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.listUsers = action.payload.users;
    });
    builder.addCase(fetchEditUserInfos.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    //protected routes, verify before doing things
    builder.addCase(fetchVerify.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.allowAccess = action.payload.success;
    });
    builder.addCase(fetchVerify.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
      state.allowAccess = action.payload.success;
    });
    //delete user
    builder.addCase(fetchDeleteUser.fulfilled, (state, action) => {
      state.status = "success";
      state.message = action.payload.message;
      state.token = action.payload.token;
      localStorage.setItem("access_token", action.payload.token);
      state.listUsers = action.payload.users;
    });
    builder.addCase(fetchDeleteUser.rejected, (state, action) => {
      state.status = "fail";
      state.message = action.payload.message;
    });
    //notification
    builder.addCase(fetchUnreadNotification.fulfilled, (state, action) => {
      state.status = "success";
      state.notificationList = action.payload.listNotification;
      state.unreadNotify = action.payload.unreadNoti;
    });
  },
});

export const { reset, showOffcanvas, hideOffCanvas, replaceNotify } =
  userSlice.actions;

export default userSlice.reducer;
