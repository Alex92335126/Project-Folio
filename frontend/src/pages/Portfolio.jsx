import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { assetThunk, cashThunk, getTotalBal } from "../redux/portfolioSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BuySell from "../Components/BuySell";
import { getUserThunk } from "../redux/authSlice";
import PieChart from "../Components/PieChart";

export default function Portfolio() {
  const [cashTotal, setCashTotal] = useState();
  const dispatch = useDispatch();
  const assetList = useSelector((state) => state.portFolioReducer);
  // console.log(assetList);
  const cashBalance = useSelector((state) => state.portFolioReducer.cashBal);
  // console.log("cash", cashBalance);
  const user = useSelector((state) => state.auth.user);
  console.log("user state", user);

  const getCashTotal = () => {
    console.log("cash", cashBalance);
    let assetAmount = assetList.assetPortfolio
      .map((item) => item.amount)
      .reduce((prev, next) => prev + next);
    setCashTotal(assetAmount + cashBalance);
    // console.log(assetAmount)
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await dispatch(getUserThunk());
    await dispatch(assetThunk());
    await dispatch(cashThunk());
    // await getCashTotal()
    await dispatch(getTotalBal());
  };

  return (
    <>
    <div>
      <div className="portfolio" style={{ color: "orange", display: ""}}>
        <h2 className="py-4">Welcome Back {user.firstName}!</h2>
        {/* {cashTotal} */}
        <div className="d-flex">
            <div className="col-md-6">
                <table>
                <thead>
                    <h2> Stock Account</h2>
                    <tr>
                    <th>Symbol</th>
                    <th>Number of share</th>
                    <th>Market price</th>
                    <th>Current Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {assetList.assetPortfolio.map((asset) => (
                    <tr key={asset.id}>
                        <td>{asset.symbol}</td>
                        <td>{asset.num_shares}</td>
                        <td>{asset.sharePrice}</td>
                        <td>{asset.amount}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
                <div className="py-1" />
                <table>
                <h2 className= "py-4"> Cash Account </h2>
                <div>
                <tbody>
                    <tr>
                    <td style={{width: "510px"}}>
                        <strong >Cash Balance</strong>
                    </td>
                    <td>{assetList.cashBal}</td>
                    </tr>
                </tbody>
                </div>
                <div>
                <h2 className= "py-4">Total Asset</h2>
                <tbody>
                <tr>
                    <td style={{width: "510px"}}>
                        <strong>Total (Cash+Stock)</strong>
                    </td>
                    <td>{assetList.totalBal}</td>
                    </tr>
                </tbody>  
                </div>
                </table>
            </div>
            <div className="py-4" />
            <div className="col-md-6">
                <div>
                <BuySell />
                </div>
                
                <div style={{width: "400px"}}>

                <PieChart
                        labelStyle={{
                            fontSize: '20px'
                    }}
                />
            </div>
            
        </div>
        </div>
      </div>
    </div>
    </>
  );
}
