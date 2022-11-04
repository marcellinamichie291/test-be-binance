const ccxt = require('ccxt');
const moment = require('moment');

async function main(){
    const binance = new ccxt.binance({
        // apiKey:'UJs6zrG0grTWrXH4fjraiCG1J5uUhlSx0HYUdBXIEjoRIDAaAh6mYmAsIpOWzT6z',
        // secret:'ezYVLpr91e95p8PwUXBsGQB2qc46qWQgyMbU34ol5QvX61yTxvJlhpO1GVS7gXHd', 
    })
    const high = [];
    const low = [];
    const price = await binance.fetchOHLCV('BTC/USDT','1m', undefined,5);
    const bPrice = price.map(price=>{
        high.push(price[2]);
        low.push(price[3]);
        return{
            timestamp: moment(price[0]).format(),
            open: price[1], high: price[2], low: price[3], close: price[4], volume: price[5]
        }
    })
    console.log(bPrice);
    console.log("high",high);
    console.log("low",low);
    
    if(high.length<=5){
        max = Math.max.apply(null,high)
    }
    if(low.length<=5){
        min = Math.max.apply(null,low);
    }
    const lastPrice = (bPrice[bPrice.length - 1].close)
    const change = max/min
    console.log("change",change);
    if((change-1)*100 >= 1){
        if(((max/lastPrice)-1)*100 >= 0.1){
            console.log("Bán đi chờ chi")
        }if (((lastPrice/min)-1)*100 >= 0.1) {
            console.log("Mua đi chờ chi")
        } else {
            console.log("Bình tĩnh chờ thời")
        }
    }
     
}

main()
