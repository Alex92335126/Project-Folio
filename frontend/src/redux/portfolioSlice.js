import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  portfolio: [],
  assetPortfolio:[],
  cashBal: '',
  totalBal: ''
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
    },
    getTotalBal: (state) => {
      console.log("state portfolio", state.assetPortfolio)
      let assetAmount = state.assetPortfolio.map(item => parseInt(item.amount))
      let amount = assetAmount.reduce((a, b) => {
        return a + b
      }, 0)
      // state.totalBal = parseInt(assetAmount + state.cashBal).toFixed(2)
      state.totalBal = parseInt(state.cashBal) + amount
    }
  },
});

// Action creators are generated for each case reducer function
export const { getAssetPortfolio, getCashBal, getTotalBal } = portfolioSlice.actions;

export default portfolioSlice.reducer;

export const assetThunk = () => async (dispatch) => {
  const token = localStorage.getItem("TOKEN");
  const response = await axios(`${process.env.REACT_APP_BACKEND}/folio/asset`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dispatch(getAssetPortfolio(response.data));
};

export const cashThunk = () => async (dispatch)=> {
  const token = localStorage.getItem("TOKEN"); 
  const response = await axios (`${process.env.REACT_APP_BACKEND}/folio/cash`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  dispatch(getCashBal(response.data[0].cash_balance));
};


