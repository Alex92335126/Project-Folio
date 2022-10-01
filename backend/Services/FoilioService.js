const axios = require('axios')

class FolioService {
    constructor(knex) {
      this.knex = knex;
    }
    // --portfolio-- (get)

    //get cash_acc and asset_acc

    async getPortfolio(id) {
        console.log("get folio id", id)
        let totalAsset  = []
        const cashPortfolio = await this.knex("cash_acc").select(
            "cash_balance"
        ).where({accountID: id})
        const assetPortfolio = await this.knex("asset_acc").select(
            "stockID",
            "num_shares"
        ).where({accountID: id});
        console.log('cash port', cashPortfolio)
        console.log('asset port', assetPortfolio)
        totalAsset.push(cashPortfolio[0])
        totalAsset.push(assetPortfolio[0])
        return totalAsset; 
    }

    async getCashFolio(id) {
        return await this.knex("cash_acc").select(
            "cash_balance"
        ).where({accountID: id})
    }

    async getAssetFolio(id) {
        const price = await this.knex("asset_acc").select(
            "stockID",
            "num_shares"
        ).where({accountID: id});
    }

    getStockPrice = async (stock) => {
        const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=ccoso82ad3i91ts8avv0ccoso82ad3i91ts8avvg`)
        console.log('stock price: ', res.data)
    }

    getCryptoPrice = async (tokenId) => {
        const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`)
        return res.data
    }
      
    managePerformance = async () => {
        let resList = []
        try {
            for(let task of tokenList){
                const res = await perform3(task.symbol);
                let shape = {name: task.symbol, amount: res[task.symbol].usd * task.numOfShares, price: res[task.symbol].usd, numOfShares: task.numOfShares}
                resList.push(shape)
            }
            return resList
        } catch(err) { 
            console.log(err);	    	
        }
    }

    // --buy order-- (put)

    // stock ID price x num_shares,
    // price api call? frontend?
    // check if cash_acc has enough cash 
    // if trade success 
    // update (put) cash_acc and asset_acc 

    async buy() {

    }

    // --sell--

    // check if asset_acc has enough stock 
    // if trade success 
    // update (put) cash_acc and asset_acc 

    // --portfolio return--

    // (cash_balance + ((sum of (stockID num_shares x price))) - 100,000 = profit or loss

    // --score board--

    // list out top 10 account ID which is ordered by portfolio return 

};

// https://finnhub.io/api/v1/quote?symbol=GOOGL&token=ccoso82ad3i91ts8avv0ccoso82ad3i91ts8avvg
//https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

module.exports = FolioService;


tokenList = [
    {
        symbol:"solana",
        numOfShares: 30
    }, 
    {
        symbol:"bitcoin",
        numOfShares:20
    },
    { 
        symbol: "ethereum",
        numOfShares:2
    }, 
    {
        symbol:"matic-network", 
        numOfShares: 55
    }
]

// const perform3 = async (tokenId) => {
//     const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`)
//     // console.log('api call res', res.data)
//     return res.data
//     // return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`)
//     // .then((res) => res.json())
//     // .catch((error) => console.log(error))
// }
  
// const managePerformance = async () => {
//     let resList = []
//     try {
//         for(let task of tokenList){
//             // console.log(task)
//             const res = await perform3(task.symbol);
//             // console.log({name: task.symbol, response: res[task.symbol].usd})
//             let shape = {name: task.symbol, amount: res[task.symbol].usd * task.numOfShares, price: res[task.symbol].usd, numOfShares: task.numOfShares}
//             // console.log(shape)
//             resList.push(shape)
//             // console.log(res)
//         }
//         // console.log("res list", resList)
//         return resList
//     } catch(err) { 
//         console.log(err);	    	
//     }
// }
// managePerformance().then(res => console.log('res', res))

// const getData = await managePerformance()

// console.log(getData);