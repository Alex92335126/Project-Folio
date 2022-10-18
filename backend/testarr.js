const testdata = [
  {
    id: 1,
    username: "hello",
    wallet_address: null,
    stock_name: null,
    symbol: "GOOGL",
    stockID: 1,
    num_shares: "10",
    cash_balance: "94025.864",
    amount: "1017.20",
    sharePrice: 101.72,
  },
//   {
//     id: 1,
//     username: "hello",
//     wallet_address: null,
//     stock_name: null,
//     symbol: "F",
//     stockID: 3,
//     num_shares: "50",
//     cash_balance: "94025.864",
//     amount: "603.25",
//     sharePrice: 12.065,
//   },
  //   {
  //     id: 1,
  //     username: 'hello',
  //     wallet_address: null,
  //     stock_name: null,
  //     symbol: 'AAPL',
  //     stockID: 2,
  //     num_shares: '30',
  //     cash_balance: '94025.864',
  //     amount: '4365.03',
  //     sharePrice: 145.501
  //   },
  {
    id: 2,
    username: "me",
    wallet_address: null,
    stock_name: null,
    symbol: "META",
    stockID: 4,
    num_shares: "100",
    cash_balance: "164700",
    amount: "13418.01",
    sharePrice: 134.1801,
  },
  //   {
  //     id: 2,
  //     username: 'me',
  //     wallet_address: null,
  //     stock_name: null,
  //     symbol: 'TSLA',
  //     stockID: 5,
  //     num_shares: '100',
  //     cash_balance: '164700',
  //     amount: '22058.50',
  //     sharePrice: 220.585
  //   },
    // {
    //   id: 4,
    //   username: 'stocks',
    //   wallet_address: null,
    //   stock_name: null,
    //   symbol: 'TSLA',
    //   stockID: 5,
    //   num_shares: '500',
    //   cash_balance: '9851.550000000003',
    //   amount: '110292.50',
    //   sharePrice: 220.585
    // }
];

const testArr = (resList) => {
  let userTotalAsset = [];
  let id;
  let obj = { username: "", totalAsset: 0, walletAddress: "", cash: 0 };

  for (let i = 0; i < resList.length; i++) {
    resList[i].amount = Number(resList[i].amount);
    resList[i].cash_balance = Number(resList[i].cash_balance);
    let idx = resList[0].id
    console.log('condition', resList[i].id === resList[i].id)
    if(idx === resList[i].id) {
        // console.log('before assignment', obj)
        obj.username = resList[i].username;
        obj.walletAddress = resList[i].wallet_address;
        obj.cash = resList[i].cash_balance;
        console.log('object asset', obj.totalAsset)
        console.log(resList[i].symbol, resList[i].amount)

        obj.totalAsset = obj.totalAsset + Number(resList[i].amount)
        // console.log('after assignment', obj)
        // if(resList[i].symbol !== resList[i].symbol) {
            
        // }
    }
    console.log('not same username', idx, resList[i].id)
    if(id !== resList[i].username) {
        console.log('push object', obj)
        userTotalAsset.push(obj)
        idx = resList[i].id
    }
    // id = resList[i].id;

    // while (resList[i].id === id) {
    //     obj.username = resList[i].username;
    //     obj.walletAddress = resList[i].wallet_address;
    //     obj.amount = resList[i].cash_balance;
    //     obj.totalAsset += resList[i].amount

    // }
    // userTotalAsset.push(obj)
    // if (i === 0) {
    //     console.log('resList', resList[i])
    //   id = resList[i].id;
    //   obj.username = resList[i].username;
    //   obj.walletAddress = resList[i].wallet_address;
    //   obj.totalAsset = resList[i].amount + resList[i].cash_balance;
    // }

    // // if (resList.length - 1 === i) {
    //   console.log("last data");
    //   if (resList[i].id !== id) {
    //     obj.username = resList[i].username;
    //     obj.walletAddress = resList[i].wallet_address;
    //     obj.totalAsset = resList[i].amount + resList[i].cash_balance;
    //     userTotalAsset.push(obj);
    //   } else {
    //     obj.totalAsset += resList[i].amount;
    //     userTotalAsset.push(obj);
    //   }
    // // }

    // if (i > 0 && i < resList.length - 1) {
    //   if (resList[i].id !== id) {
    //     let newObj = { ...obj };
    //     console.log("newObj", newObj);
    //     userTotalAsset.push(newObj);
    //     id = resList[i].id;
    //     obj.username = resList[i].username;
    //     obj.walletAddress = resList[i].wallet_address;
    //     obj.totalAsset = resList[i].amount + resList[i].cash_balance;
    //   } else {
    //     obj.totalAsset += resList[i].amount;
    //   }
    // }

    }
    console.log("userTotal =========> ", userTotalAsset);
};

testArr(testdata)
