import axios from "axios"
// const finnhub = require('finnhub');
// import {finnhub} from 'finnhub'

let config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
};

export default async function getStockPrice (stock) {
    // const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    // api_key.apiKey = process.env.REACT_APP_FINNHUB_API
    // const finnhubClient = new finnhub.DefaultApi()

    // finnhubClient.quote(stock, (error, data, response) => {
    // console.log(data)
    // });

    try {
        console.log("stock", stock)
        const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${process.env.REACT_APP_FINNHUB_API}`)
        const data = await res.json()
        console.log('data', data)
        return data.c
    } catch (error) {
        console.log(error)
    }
    // const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${process.env.REACT_APP_FINNHUB_API}`, config)
    // console.log('stock price: ', res.data)

}