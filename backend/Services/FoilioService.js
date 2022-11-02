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
        const assetPortfolio = await this.knex.select(
            "stock.stock_name",
            "stock.symbol",
            "asset_acc.stockID",
            "asset_acc.num_shares",
            "asset_acc.accountID"
        )
        .from("asset_acc")
        .innerJoin("stock", "asset_acc.stockID", "stock.id")
        .where({accountID: id});
        console.log('cash port', cashPortfolio)
        console.log('asset port', assetPortfolio)
        totalAsset.push(cashPortfolio[0])
        totalAsset.push(assetPortfolio)
        return totalAsset; 
    }

    // Get Cash Balance 
    async getCashFolio(id) {
        return await this.knex("cash_acc").select(
            "cash_balance"
        ).where({accountID: id})
    }
    // Get Asset Balance 
    async getAssetFolio(id) {
        let resList = []
        const assetList = await this.knex('asset_acc')
        .join("stock", "stock.id", "asset_acc.stockID")
        .select("stock.id", "asset_acc.num_shares", 'stock.stock_name', 'stock.symbol')
        .where("asset_acc.accountID", id)
        console.log('asset list', assetList)
        try {
            for (let asset of assetList) {
                const res = await this.getStockPrice(asset.symbol)
                let list = {...asset, amount: (parseInt(asset.num_shares) * res.c).toFixed(2), sharePrice: res.c}
                resList.push(list)
            }
        } catch (error) {
            console.log(error)
            return error
        }
        return resList
    }

    getStockPrice = async (stock) => {
        const res = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=ccoso82ad3i91ts8avv0ccoso82ad3i91ts8avvg`)
        console.log('stock price: ', res.data)
        return res.data
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



    // --buy order-- (p)

    async postBuyOrder(
        symbol,
        price,
        numShares,
        // cash_balance,
        id
    ) {
        let newStockID
        console.log("symbol", symbol)
        const buyAmount = numShares * price
        const cashinAcct = await this.knex("cash_acc").select("cash_balance").where({accountID: id})
        const updatedCashBal = parseInt(cashinAcct[0].cash_balance) - buyAmount
        let stockID = await this.knex("stock").select("id").where({symbol: symbol.toUpperCase()})
        console.log("enough money", parseInt(cashinAcct[0].cash_balance) > buyAmount, "buy amount", buyAmount, "cash", parseInt(cashinAcct[0].cash_balance))
        console.log("stockId", stockID)
        console.log("updated cash bal", updatedCashBal)
        console.log("no stockID", !stockID || !stockID.length > 0)
        console.log("stockID length", !stockID.length > 0)
        console.log("add to knex? =======> ", !(stockID && stockID.length > 0))
        if(!(stockID && stockID.length > 0)) {
            console.log("add to knex", symbol)
            stockID = await this.knex("stock").insert({
                symbol: symbol.toUpperCase()
            }).returning("id")
        }
        console.log('after add to knex =====> ', stockID)
        if (parseInt(cashinAcct[0].cash_balance) > buyAmount) {
            // console.log("stockid", stockID[0].id)
            // console.log("account id", id)
            const buyAsset = this.knex.transaction(async(trx)=> {
                try {
                    let asset_acc = await this.knex("asset_acc").where({
                        accountID: id,
                        stockID: stockID[0].id
                    }).first();
                    console.log('asset_acc', asset_acc)
                    if (asset_acc) {
                        console.log("asset acc", asset_acc)
                        let currentShare = await this.knex("asset_acc").select("num_shares").where({accountID: id,stockID: stockID[0].id}).first()
                        await trx.update({ 
                            num_shares: Number(currentShare.num_shares) + Number(numShares),
                        }).where({accountID: id,stockID: stockID[0].id}).into("asset_acc")
                    } else {
                        console.log('no asset acc', 'user id', id, 'num of shares', numShares, 'stock id', stockID[0].id)
                        await trx.insert({
                            accountID: id,
                            num_shares: numShares,
                            stockID: stockID[0].id
                        }).into("asset_acc")
                    }
                    console.log('insert into trades')
                await trx.insert({
                    accountID: id,
                    stockID: stockID[0].id,
                    trade: 'buy',
                    num_shares: numShares,
                    price,
                }).into("trades").returning("id")
                console.log('insert into cash acc')
                await trx.update({
                    cash_balance: updatedCashBal
                }).into("cash_acc").where({accountID: id})
                console.log('done')
                return trx.commit;
            } catch(err) {
               return trx.rollback
            }
            });
        } else {
            return "insufficient balance"
        }
        
    }

    // --sell--

    async putSellOrder(
        symbol,
        price,
        numShares,
        id
    ) {
        let sellAmount = numShares * price
        const stockID = await this.knex("stock").select("id").where({symbol: symbol.toUpperCase()})
        const assetOutAcct = await this.knex("asset_acc").select("num_shares").where({stockID: stockID[0].id})
        const updatedAssetBal = parseInt(assetOutAcct[0].num_shares) - numShares
        console.log("asset", assetOutAcct)
        console.log("num shares", numShares)
        console.log("updated asset bal", updatedAssetBal)
        const cashinAcct = await this.knex("cash_acc").select("cash_balance").where({accountID: id})
        const cashBalUpdate= sellAmount + parseInt(cashinAcct[0].cash_balance)
        
        if (parseInt(assetOutAcct[0].num_shares) >= numShares) {

            this.knex.transaction(async(trx)=> {
                await trx.update({   
                    num_shares: updatedAssetBal,
                }).where({accountID: id,stockID: stockID[0].id}).into("asset_acc").returning("id")
                await trx.insert({
                    accountID: id,
                    stockID: stockID[0].id,
                    trade: 'sell',
                    num_shares: numShares,
                    price,
                }).into("trades").returning("id")
                await trx.update({
                    cash_balance: cashBalUpdate
                }).into("cash_acc").where({accountID: id})
            });
            return 
        } else {
            return "insufficient balance"
        }
    }   

    
};
    // check if asset_acc has enough stock 
    // if trade success 
    // update (put) cash_acc and asset_acc 

    // --portfolio return--

    // (cash_balance + ((sum of (stockID num_shares x price))) - 100,000 = profit or loss

    // --score board--

    // list out top 10 account ID which is ordered by portfolio return 


// https://finnhub.io/api/v1/quote?symbol=GOOGL&token=ccoso82ad3i91ts8avv0ccoso82ad3i91ts8avvg
//https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd

module.exports = FolioService;


// tokenList = [
//     {
//         symbol:"solana",
//         numOfShares: 30
//     }, 
//     {
//         symbol:"bitcoin",
//         numOfShares:20
//     },
//     { 
//         symbol: "ethereum",
//         numOfShares:2
//     }, 
//     {
//         symbol:"matic-network", 
//         numOfShares: 55
//     }
// ]

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