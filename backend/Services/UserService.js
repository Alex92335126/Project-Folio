class UserService {
    constructor(knex) {
        this.knex = knex
    }

    async getUser(username) {
        console.log("getuser service", username)
        return await this.knex("account").where({ username }).first();
    }

    async addUser(username, password, fname, lname, email) {
        return this.knex.transaction(async(trx)=> {
            const userId = await trx.insert({username, password, fname, lname, email})
            .into("account")
            .returning("id")

            await trx.insert({accountID: userId[0].id, cash_balance: "100000"})
            .into("cash_acc")
        })
    }
}

module.exports = UserService;