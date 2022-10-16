let data = [
    {
        id: 1,
        username: "alex",
        stock_name: "apple",
        symbol: "AAPL",
        stockID: 1,
        num_shares: "100",
        cash_balance: "85000",
        amount: "13838.00",
        sharePrice: 138.38
    },
    {
        id: 2,
        username: "test",
        stock_name: "apple",
        symbol: "AAPL",
        stockID: 1,
        num_shares: "105",
        cash_balance: "85000",
        amount: "14529.90",
        sharePrice: 138.38
    },
    {
        id: 2,
        username: "test",
        stock_name: "Google",
        symbol: "GOOGL",
        stockID: 2,
        num_shares: "10",
        cash_balance: "85000",
        amount: "965.60",
        sharePrice: 96.56
    }
]

// const groupBy = (array, field) => array.reduce((acc, obj) =>
// ({...acc, [obj[field]]: {...(acc[obj[field]] || {}), [obj.key]: obj}}), {});

// console.log(groupBy(data, 'id'))

const groupByCategory = data.reduce((group, product) => {
    const { id } = product;
    group[id] = group[id] ?? [];
    group[id].push(product);
    return group;
}, {});

console.log(groupByCategory)
  

// module.exports = groupBy