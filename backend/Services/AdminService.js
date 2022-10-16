const groupBy = require('../utils/groupBy')
class AdminService {
    constructor(knex, folioService) {
        this.knex = knex
        this.folioService = folioService
    }

    async getAllUser() {
        return await this.knex.select('id', 'fname', 'lname').from('account')
    }

    async forgetPassword(userId) {

    }

    async getAllUsersAssets() {
        let resList = []
        console.log("getuser asset")
        const assetList = await this.knex.select(
            "account.id",
            "account.username",
            "stock.stock_name",
            "stock.symbol",
            "asset_acc.stockID",
            "asset_acc.num_shares",
            // "asset_acc.accountID",
            "cash_acc.cash_balance"
        ).from('account')
        .innerJoin("asset_acc", "account.id", "asset_acc.accountID")
        .innerJoin("cash_acc", "account.id", "cash_acc.accountID")
        .innerJoin("stock", "asset_acc.stockID", "stock.id")
        // .groupBy('id')
        try {
            for (let asset of assetList) {
                const res = await this.folioService.getStockPrice(asset.symbol)
                let list = {...asset, amount: (parseInt(asset.num_shares) * res.c).toFixed(2), sharePrice: res.c}
                resList.push(list)
            }
            
        } catch (error) {
            
        }
        // const groupedList = groupBy(resList, "id")
        return resList
    }

    async issueNFt() {

    }
}

module.exports = AdminService;