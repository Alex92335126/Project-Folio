class UserService {
    constructor(knex) {
        this.knex = knex
    }

    async getUser(user) {
        console.log("getuser service", user)
        const foundUser = await this.knex("account").where({ username: user }).first();
        console.log('returned user', foundUser)
        return foundUser
    }

    async addUser(username, password, fname, lname, email) {
        // const hasUser = await this.getUser(username)
        // if (hasUser.length) {
        //     return false
        // }
        return this.knex.transaction(async(trx)=> {
            const userId = await trx.insert({username, password, fname, lname, email})
            .into("account")
            .returning("id")

            await trx.insert({accountID: userId[0].id, cash_balance: "100000"})
            .into("cash_acc")
        })
    }

    async updatePassword(id, oldPassword, newPassword) {
        
    }

    async updateWalletAddress(id, address) {
        /*
            await trx.update({
                    cash_balance: cashBalUpdate
                }).into("cash_acc").where({accountID: id})
        */
       return await this.knex('account').update({wallet_address: address}).where({id})
    }

    async delUser(accountId) {
        console.log("delete username", accountId);
       await this.knex("asset_acc")
        .del()
        .where({
          accountID: accountId,
        })
        await this.knex("trades")
        .del()
        .where({
          accountID: accountId,
        })
        await this.knex("cash_acc")
        .del()
        .where({
          accountID: accountId,
        })
        await this.knex("account")
        .del()
        .where({
            id: accountId,
        })
        return "deleted"
    }
}

module.exports = UserService;