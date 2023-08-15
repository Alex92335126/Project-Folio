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
        const userTotalAsset = [];
    console.log("getuser asset");

    try {
        const assetList = await this.knex.select(
            "account.id",
            "account.username",
            "account.wallet_address",
            "stock.stock_name",
            "stock.symbol",
            "asset_acc.stockID",
            "asset_acc.num_shares",
            "cash_acc.cash_balance"
        ).from('account')
        .innerJoin("asset_acc", "account.id", "asset_acc.accountID")
        .innerJoin("cash_acc", "account.id", "cash_acc.accountID")
        .innerJoin("stock", "asset_acc.stockID", "stock.id");

        console.log("assetList", assetList);

        const resList = [];

        for (let asset of assetList) {
            const res = await this.folioService.getStockPrice(asset.symbol);
            let list = {
                ...asset,
                amount: (parseFloat(asset.num_shares) * res.c).toFixed(2),
                sharePrice: res.c
            };
            resList.push(list);
        }

        console.log("resList", resList);

        const userTotalAssetMap = new Map();

        for (const asset of resList) {
            const amount = parseFloat(asset.amount);

            if (userTotalAssetMap.has(asset.id)) {
                userTotalAssetMap.set(asset.id, userTotalAssetMap.get(asset.id) + amount);
            } else {
                userTotalAssetMap.set(asset.id, amount + parseFloat(asset.cash_balance));
            }
        }

        for (const [userId, totalAsset] of userTotalAssetMap.entries()) {
            userTotalAsset.push({
                userId: userId,
                totalAsset: totalAsset,
                username: resList.find(asset => asset.id === userId).username,
                walletAddress: resList.find(asset => asset.id === userId).wallet_address
            });
        }

        userTotalAsset.sort((a, b) => b.totalAsset - a.totalAsset);

    } catch (error) {
        // Handle the error
        console.error(error);
    }

    console.log("userTotalAsset", userTotalAsset);

    return userTotalAsset;

    }

    async issueNFt() {
    

    }
}

module.exports = AdminService;