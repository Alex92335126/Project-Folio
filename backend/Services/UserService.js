class UserService {
    constructor(knex) {
        this.knex = knex
    }

    async getUser(username) {
        return await this.knex("account").where({ username }).first();
    }

    async addUser(username, password) {
        await this.knex("account").insert({username, password})
    }
}

module.exports = UserService;