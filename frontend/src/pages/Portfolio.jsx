import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { assetThunk, cashThunk, getTotalBal } from "../redux/portfolioSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BuySell from "../Components/BuySell";
import { getUserThunk } from "../redux/authSlice";
import PieChart from "../Components/PieChart";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

export default function Portfolio() {
  const [cashTotal, setCashTotal] = useState();
  const [isInput, setIsInput] = useState(false)
  const [changeAdd, setChangeAdd] = useState('')
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

  const handleChange = async() => {
    const token = localStorage.getItem("TOKEN");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND}/user/update-address`, {walletAddress: changeAdd} ,{
          headers: {
            Authorization: `Bearer ${token}`,
          }})
        if (res) {
          toast(`Update Address Success!`);
          dispatch(getUserThunk())
          setIsInput(false)
        }
    } catch (error) {
      console.log(error)
    }
  }

  const showAddressDiv = () => {
    if (isInput) {
      return (
        <input
          type="text" 
          name="changeAddress"
          value={changeAdd}
          onChange={(e) => setChangeAdd(e.target.value)}
        />
      )
    } else {
        return (
          <div>{" " + user.walletAddress}</div>
        )
    }
  }

  useEffect(() => {
      dispatch(getUserThunk());
      dispatch(assetThunk())
      .then(() => 
        dispatch(cashThunk())
      )
      .then(() => 
       dispatch(getTotalBal())
      )
  }, []);


  return (
    <>
    <ToastContainer
      position="top-center"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <div>
      <div className="portfolio" style={{ color: "orange"}}>
        <h2 className="py-4">Welcome Back {user.firstName}!</h2>
        {/* {cashTotal} */}
        <div className="d-flex ">
            <div className="col-md-6">
                    <h2> Stock Account</h2>
                <table>
                <thead>
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
                <h2 className= "py-4"> Cash Account </h2>
                <table>
                {/* <div> */}
                <tbody>
                    <tr>
                    <td style={{width: "380px"}}>
                        <strong >Cash Balance</strong>
                    </td>
                    <td>{assetList.cashBal}</td>
                    </tr>
                </tbody>
                {/* </div> */}
                </table>
                {/* <div> */}
                <h2 className= "py-4">Total Asset</h2>
                <table>
                <tbody>
                <tr>
                    <td style={{width: "380px"}}>
                        <strong>Total (Cash+Stock)</strong>
                    </td>
                    <td>{assetList.totalBal}</td>
                    </tr>
                </tbody>  
                </table>
                {/* </div> */}
                <div className="d-flex align-items-center py-4">
                  <div>Wallet Address: {showAddressDiv()}</div>
                  <div>
                    {isInput ?
                      <>
                        <Button className="" style={{margin: "0.25rem"}} variant="primary" onClick={handleChange}>
                          Submit
                        </Button>
                        <Button className="" style={{margin: "0.25rem"}} variant="danger" onClick={() => setIsInput(false)}>
                          Cancel
                        </Button>
                      </>
                      :
                      <Button className="" style={{margin: "0.25rem"}} variant="warning" onClick={() => setIsInput(true)}>
                        Update
                      </Button>
                    }
                    
                  </div>
                </div>
            </div>

            <div className="py-4" />
                <div className="col-md-6" style={{marginLeft: "100px"}}>
                    <div>
                        <BuySell />
                    </div>
                
                <div style={{width: "350px", fontSize: "20px", marginTop: "15px"}}>

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
