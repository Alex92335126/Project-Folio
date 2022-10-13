import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { assetThunk, cashThunk, getTotalBal } from "../redux/portfolioSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BuySell from "../Components/BuySell";
import { getUserThunk } from "../redux/authSlice";


export default function Portfolio() {
    const [cashTotal, setCashTotal] = useState()
    const dispatch = useDispatch();
    const assetList = useSelector(
    (state) => state.portFolioReducer
    );
    // console.log(assetList);
    const cashBalance = useSelector(
    (state) => state.portFolioReducer.cashBal
    );
    // console.log("cash", cashBalance);
    const user = useSelector((state) => state.auth.user)
    console.log('user state', user)

    const getCashTotal = () => {
    console.log("cash", cashBalance)
    let assetAmount = assetList.assetPortfolio.map(item => item.amount).reduce((prev, next)=> prev+ next)
    setCashTotal(assetAmount + cashBalance) 
    // console.log(assetAmount)

    }

    useEffect(() => {
    getData()
    }, []);

    const getData = async () => {
        await dispatch(getUserThunk())
        await dispatch(assetThunk());
        await dispatch(cashThunk());
        // await getCashTotal()
        await dispatch(getTotalBal());
    }

    return (
        <>
    <div className="portfolio" style={{color: 'orange'}}>
        <div className="py-4">Welcome Back {user.firstName}!</div>
        {/* {cashTotal} */}


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

        <table>
        <tbody>
        <tr>
            <td><strong>Cash Balance</strong></td>
            <td>{assetList.cashBal}</td>
        </tr>
        <tr>

            <td><strong>Total</strong></td>
            <td>{assetList.totalBal}</td>
        </tr>
            </tbody>

        </table>
        <div>
        <BuySell />
        </div>
    </div>
    </>
    );
}
