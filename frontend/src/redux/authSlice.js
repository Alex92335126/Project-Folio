import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false || localStorage.getItem("TOKEN") != null,
  role: '',
  user: {
    id: "",
    firstName: ""
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setUser: (state, payload) => {
      console.log("get user payload", payload.payload.firstName)
      state.user.firstName = payload.payload.firstName
      state.user.id = payload.payload.id
      console.log("set user state", state.firstName)
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;

export const signupThunk =
  ({ username, password, firstName, lastName, email }) =>
  async (dispatch) => {
    console.log(username, password, firstName, lastName, email);
    let res = await axios.post(`${process.env.REACT_APP_BACKEND}/user/signup`, {
      username,
      password,
      firstName,
      lastName,
      email
    });
    if (res.status === 200) {
      console.log("signup ok u + p", username, password)
      await dispatch(loginThunk({username, password}))
      return true
    }
  };

export const loginThunk =
({ username, password }) =>
async (dispatch) => {
    console.log('env', process.env.REACT_APP_BACKEND)
    console.log(username, password)
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/user/login`,
      { username, password }
    );
    if (response.data) {
      console.log(response.data);
      localStorage.setItem("ROLE", response.data.role)
      localStorage.setItem("TOKEN", response.data.token);
      dispatch(login());
    }
  };

export const logoutThunk = () => async (dispatch) => {
  localStorage.clear();
  dispatch(logout());
};

export const getUserThunk = () => async (dispatch) => {
  const token = localStorage.getItem("TOKEN");
  let response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }}
  );
  if (response.data) {
    console.log(response.data);
    dispatch(setUser(response.data));
  }
};
