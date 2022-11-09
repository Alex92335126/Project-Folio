import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import getStockPrice from "../utils/getStockPrice";
import { assetThunk, cashThunk } from "../redux/portfolioSlice";
import { ToastContainer, toast } from 'react-toastify';

export default function BuySell () {
    const [transactionError, setTransactionError] = useState('')
    const [sellError, setSellError] = useState('')
    let token = localStorage.getItem("TOKEN")
    // useEffect(() => {
    //     axios.defaults.headers.common['Authorization'] = "Bearer " + token
    // }, [token])

    const dispatch = useDispatch();
    const cashBalance = useSelector((state) => state.portFolioReducer.cashBal);
    const assetList = useSelector((state) => state.portFolioReducer.assetPortfolio);

    const [buy, setBuy] = useState({
        symbol: "",
        num_shares: "",
        price: ""
    })
    const [sell, setSell] = useState({
        symbol: "",
        num_shares:"",
        price: ""
    })

    const handleBuy = async () => {
        const canBuy = (buy.num_shares * buy.price) <= cashBalance
        console.log('canbuy', canBuy)
        if(canBuy) {
            await axios.post(`${process.env.REACT_APP_BACKEND}/folio/buy`, buy, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  }
            });
            dispatch(assetThunk())
            dispatch(cashThunk())
            .then(() => {
                toast(`Successfully bought ${buy.num_shares} shares of ${buy.symbol.toUpperCase()} at ${buy.price}! 🚀`);
            })
            setBuy({
                symbol: "",
                num_shares: "",
                price: ""
            })
        } else {
            setTransactionError('Insufficient Funds')
        }
    }

    const handleSell = async () => {
        console.log('hi sell', sell)
        console.log('asset list', assetList)
        console.log('sell symbol', sell.symbol)
        const isPartofFolio = assetList.find(item => item.symbol === sell.symbol.toUpperCase())
        console.log('have stock', isPartofFolio)
        // not enough shares 
        // does not have shares at all
        if(isPartofFolio === undefined) {
            return setSellError("Stock not in portfolio")
        } 
        if(isPartofFolio) {
            console.log("check portfolio", sell)
            if(Number(isPartofFolio.num_shares) >= Number(sell.num_shares)) {
                console.log('can sell')
                await axios.put(`${process.env.REACT_APP_BACKEND}/folio/sell`, sell, { headers: {
                    Authorization: `Bearer ${token}`,
                  }});
                  dispatch(assetThunk())
                  dispatch(cashThunk())
                  .then(() => {
                      toast(`Successfully sold ${sell.num_shares} shares of ${sell.symbol.toUpperCase()} at ${sell.price}! 💵`);
                })
                setSell({
                    symbol: "",
                    num_shares: "",
                    price: ""
                })
            } else {
                return setSellError("Not enough shares")
            }
        }
        
    }

    const getPrice = async (stock, type) => {
        console.log('stock', stock, type)
        const price = await getStockPrice(stock.toUpperCase())
        if(type === "B") {
            setBuy({...buy, price})
        } else {
            console.log('sell')
            setSell({...sell, price})
        }
    }


    return (
        <>
            <div className="buy" >
                <div style={{marginTop: "-50px"}} >
                    <label className="symbol" >
                        Symbol:
                        <input
                            type="text" 
                            name="symbol"
                            value={buy.symbol}
                            style={{textTransform:"uppercase"}}
                            onChange={(e) => {
                                const symbol = e.target.value
                                setBuy({...buy, symbol: symbol.toUpperCase()})
                            }}
                            onBlur={(e) => getPrice(e.target.value, "B")}
                        />
                    </label>
                </div>
                <div style={{marginTop: "15px"}}>
                    <label>
                        Shares: 
                        <input
                            type="number" 
                            name="num_shares"
                            value={buy.num_shares}
                            onChange={(e) => {
                                setTransactionError('')
                                setBuy({...buy, num_shares: e.target.value})
                            }}
                        />
                    </label>
                </div>
                <div style={{marginTop: "15px"}}>
                    <label>
                        Price : 
                        <input
                            type="number" 
                            name="price"
                            value={buy.price}
                            onChange={(e) => setBuy({...buy, price: e.target.value})}
                        />
                    </label>
                </div>
                <div className="d-flex align-items-center">
                    <div style={{color: "red", fontWeight: 'bold'}}>{transactionError}</div>
                    <Button className="buyButton" style={{marginTop: "15px"}} variant="primary" size = "lg" onClick={handleBuy}>
                        BUY
                    </Button>
                </div>
            </div>
            <div className="sell">
                <div style={{marginTop: "15px"}}>
                    <label>
                        Symbol:
                        <input
                            type="text" 
                            name="symbol"
                            value={sell.symbol}
                            style={{textTransform:"uppercase"}}
                            onChange={(e) => setSell({...sell, symbol: e.target.value})}
                            onBlur={(e) => getPrice(e.target.value, "S")}
                        />
                    </label>
                </div>
                <div style={{marginTop: "15px"}}>
                    <label>
                        Shares:
                        <input
                            type="number" 
                            name="num_shares"
                            value={sell.num_shares}
                            onChange={(e) => {
                                setSellError('')
                                setSell({...sell, num_shares: e.target.value})
                            }}
                            
                        />
                    </label>
                </div>
                <div style={{marginTop: "15px"}}>
                    <label>
                        Price  :
                        <input
                            type="text" 
                            name="price"
                            value={sell.price}
                            onChange={(e) => setSell({...sell, price: e.target.value})}
                        />
                    </label>
                </div>
                <div className="d-flex align-items-center">
                    <div style={{color: "red", fontWeight: 'bold'}}>{sellError}</div>     
                    <Button className="sellButton" style={{marginTop: "15px"}}  variant="danger" size="lg" onClick={handleSell}>
                        SELL 
                    </Button>
                </div>
            </div>
            

        </>
    )

}


