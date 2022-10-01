/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("account", (table) => {
        table.increments();
        table.string("username");
        table.string("role");
        table.string("password");
        table.string("fname");
        table.string("lname");
        table.string("email");
        table.string("sign_up_type"); 
        table.timestamps(false, true);
    })
    
    await knex.schema.createTable("stock", (table) => {
        table.increments();
        table.string("stock_name");
        table.string("symbol");
    })

    await knex.schema.createTable("cash_acc", (table) => {
        table.increments();
        table.integer("accountID").unsigned();
        table.foreign("accountID").references("account.id");
        table.string("cash_balance");
    })

    await knex.schema.createTable("asset_acc", (table) => {
        table.increments();
        table.integer("accountID").unsigned();
        table.foreign("accountID").references("account.id");
        table.integer("stockID").unsigned();
        table.foreign("stockID").references("stock.id");
        table.string("num_shares");
    })

    await knex.schema.createTable("trades", (table) => {
        table.increments();
        table.integer("accountID").unsigned();
        table.foreign("accountID").references("account.id");
        table.integer("stockID").unsigned();
        table.foreign("stockID").references("stock.id");
        table.enu('trade',['buy', 'sell']).notNullable();
        table.string("num_shares");
        table.string('price');
        table.timestamps(false, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable("trades");
    await knex.schema.dropTable("asset_acc");
    await knex.schema.dropTable("cash_acc");
    await knex.schema.dropTable("stock");
    await knex.schema.dropTable("account");
};
