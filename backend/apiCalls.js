const axios = require('axios');

const getStockPrice = async(ticker) => {
    const price = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=ccoso82ad3i91ts8avv0ccoso82ad3i91ts8avvg`)
    console.log('get stock price: ', price.data)
}

getStockPrice('AAPL')