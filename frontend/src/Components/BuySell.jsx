import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import getStockPrice from "../utils/getStockPrice";

export default function BuySell () {
    let token = localStorage.getItem("TOKEN")
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = "Bearer " + token
    }, [token])

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
        await axios.post(`${process.env.REACT_APP_BACKEND}/folio/buy`, buy)
    }

    const handleSell = async () => {
        console.log('hi sell', sell)
        await axios.put(`${process.env.REACT_APP_BACKEND}/folio/sell`, sell)
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
            <div className="">
                Transaction page
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <div>
                    <label>
                        Symbol:
                        <input
                            type="text" 
                            name="symbol"
                            value={buy.symbol}
                            style={{textTransform:"uppercase"}}
                            onChange={(e) => setBuy({...buy, symbol: e.target.value})}
                            onBlur={(e) => getPrice(e.target.value, "B")}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Number of Shares: 
                        <input
                            type="text" 
                            name="num_shares"
                            value={buy.num_shares}
                            onChange={(e) => setBuy({...buy, num_shares: e.target.value})}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price: 
                        <input
                            type="number" 
                            name="price"
                            value={buy.price}
                            onChange={(e) => setBuy({...buy, price: e.target.value})}
                        />
                    </label>
                </div>
                <Button variant="primary" onClick={handleBuy}>
                    BUY
                </Button>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <div>
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
                <div>
                    <label>
                        Number of Shares:
                        <input
                            type="text" 
                            name="num_shares"
                            value={sell.num_shares}
                            onChange={(e) => setSell({...sell, num_shares: e.target.value})}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input
                            type="text" 
                            name="price"
                            value={sell.price}
                            onChange={(e) => setSell({...sell, price: e.target.value})}
                        />
                    </label>
                </div>
                <Button variant="warning" onClick={handleSell}>
                    SELL 
                </Button>
            </div>
            

        </>
    )

}