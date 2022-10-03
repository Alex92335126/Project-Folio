import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false || localStorage.getItem("TOKEN") != null,
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
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const signupThunk =
  ({ username, password, firstName, lastName, email }) =>
  async () => {
    console.log(username, password, firstName, lastName, email);
    let res = await axios.post(`${process.env.REACT_APP_BACKEND}/user/signup`, {
      username,
      password,
      firstName,
      lastName,
      email
    });
    if (res.status === 200) {
      return true
    }
  };

export const loginThunk =
({ username, password }) =>
async (dispatch) => {
    console.log('env', process.env.REACT_APP_BACKEND)
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/user/login`,
      { username, password }
    );
    if (response.data) {
      console.log(response.data);
      localStorage.setItem("TOKEN", response.data.token);
      dispatch(login());
    }
  };

export const logoutThunk = () => async (dispatch) => {
  localStorage.removeItem("TOKEN");
  dispatch(logout());
};
