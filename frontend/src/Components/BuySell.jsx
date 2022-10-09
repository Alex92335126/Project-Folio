import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function BuySell () {
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

    const handleBuy = () => {
        console.log(buy)
    }

    const handleSell = () => {
        console.log(sell)
    }

    const getPrice = async() => {

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
                            onChange={(e) => setBuy({...buy, symbol: e.target.value})}
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
                            onChange={(e) => setSell({...sell, symbol: e.target.value})}
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