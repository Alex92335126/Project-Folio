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
        let userTotalAsset = [];
        let resList = []
        console.log("getuser asset")
        const assetList = await this.knex.select(
            "account.id",
            "account.username",
            "account.wallet_address",
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
        console.log("assetList", assetList);
        try {
            for (let asset of assetList) {
                const res = await this.folioService.getStockPrice(asset.symbol)
                let list = {...asset, amount: (parseInt(asset.num_shares) * res.c).toFixed(2), sharePrice: res.c}
                resList.push(list);
            }
            let id;
            let obj = {username: '', totalAsset: 0, walletAddress:''};

            for (let i=0; i < resList.length; i++) {
                resList[i].amount = Number(resList[i].amount);
                resList[i].cash_balance = Number(resList[i].cash_balance);
                if (i === 0) {
                    id = resList[i].id;
                    obj.username = resList[i].username;
                    obj.walletAddress = resList[i].wallet_address
                    obj.totalAsset = resList[i].amount + resList[i].cash_balance;
                }

                if (resList.length - 1 === i) {
                    console.log("last data");
                    if (resList[i].id !== id) {
                            obj.username = resList[i].username;
                            obj.walletAddress = resList[i].wallet_address
                            obj.totalAsset = resList[i].amount + resList[i].cash_balance;
                            userTotalAsset.push(obj);
                    } else {
                        obj.totalAsset += resList[i].amount;
                        userTotalAsset.push(obj);
                    }
                }

                if (i > 0 && i < resList.length - 1) {
                if (resList[i].id !== id) {
                    let newObj = {...obj};
                    console.log("newObj", newObj);
                    userTotalAsset.push(newObj);
                        id = resList[i].id;
                        obj.username = resList[i].username;
                        obj.walletAddress = resList[i].wallet_address
                        obj.totalAsset = resList[i].amount + resList[i].cash_balance;
                } else {
                    obj.totalAsset += resList[i].amount;
                }
            }

            console.log("in for loop userTotal", userTotalAsset)
            }
          
        } catch (error) {
            
        }
        // const groupedList = groupBy(resList, "id")
        userTotalAsset.sort((a,b) => b.totalAsset - a.totalAsset);
        console.log("userTotalAsset", userTotalAsset)

        return userTotalAsset;
    }

    async issueNFt() {

    }
}

module.exports = AdminService;