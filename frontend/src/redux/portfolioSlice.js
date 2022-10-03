import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  portfolio: [],
  assetPortfolio:[],
  cashBal: ''
};

export const portfolioSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getAssetPortfolio: (state, action) => {
      state.assetPortfolio = action.payload;
    },
    getCashBal: (state, action) => {
        state.cashBal = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { getAssetPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;

export const assetThunk = () => async (dispatch) => {
  const token = localStorage.getItem("TOKEN");
  const response = await axios(`${process.env.REACT_APP_BACKEND}/assetPortfolio`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch(getAssetPortfolio(response.data.todo));
};
