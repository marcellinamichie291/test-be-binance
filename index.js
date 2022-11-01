const ccxt = require('ccxt');
const moment = require('moment');
const _ = require('lodash')


async function main(){


    const binance = new ccxt.binance({
        // apiKey:'UJs6zrG0grTWrXH4fjraiCG1J5uUhlSx0HYUdBXIEjoRIDAaAh6mYmAsIpOWzT6z',
        // secret:'ezYVLpr91e95p8PwUXBsGQB2qc46qWQgyMbU34ol5QvX61yTxvJlhpO1GVS7gXHd', 
    })
    const price = await binance.fetchOHLCV('BTC/USDT','1m', undefined,5);
    const bPrice = price.map(price=>{
        return{
            timestamp: moment(price[0]).format(),
            open: price[1], high: price[2], low: price[3], close: price[4], volume: price[5]
        }
    })
    console.log(bPrice);
    // const averagePrice = bPrice.reduce((acc,price)=>
    //     acc + price.close
    // , 0)/5
    const max = price.map(price=> price[2])
    const findMax = _.max(max);

    const min = price.map(price=>price[3])  
    const findMin = _.min(min);

    const tranformMax = parseFloat(findMax)
    const tranformMin = parseFloat(findMin)
    const change = tranformMax/tranformMin

    const lastPrice = parseFloat(bPrice[bPrice.length - 1].close)
    // console.log('lastPrice:',lastPrice)
    // console.log('%', change -1 >= 1)
    // console.log("Short", ((findMax/lastPrice)-1)>=0.1)
    // console.log("Long",((lastPrice/findMin)-1)>=0.1)
    if((change-1) >= 1){
        if(((findMax/lastPrice)-1) >= 0.1){
            console.log("Bán đi chờ chi")
        }if (((lastPrice/findMin)-1) >= 0.1) {
            console.log("Mua đi chờ chi")
        } else {
            console.log("Bình tĩnh chờ thời")
        }
    }
}

main()
