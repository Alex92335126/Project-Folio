/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('account').del()
  await knex('account').insert([
    {
      username: 'alex',
      role: '1',
      password: '12345',
      fname: 'alex',
      lname: 'ng',
      email: 'alex92335126@gmail.com',
      sign_up_type: 'metamask'
    },
  ]);

  // await knex('stock').del()
  // await knex('stock').insert([
  //   {
  //     stock_name: 'apple',
  //     symbol: 'aapl',
  //   },
  // ]);

  // await knex('cash_acc').del()
  // await knex('cash_acc').insert([
  //   {
  //     accountID: '1',
  //     cash_balance: '85000',
  //   },
  // ]);

  // await knex('asset_acc').del()
  // await knex('asset_acc').insert([
  //   {
  //     accountID: '1',
  //     stockID: '1',
  //     num_shares: '100'
  //   },
  // ]);

  // await knex('trades').del()
  // await knex('trades').insert([
  //   {
  //     accountID: '1',
  //     stockID: '1',
  //     trade: 'buy',
  //     num_shares: '100',
  //     price: '150'
  //   },
  // ]);
};
