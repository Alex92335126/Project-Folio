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
}

module.exports = UserService;