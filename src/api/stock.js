export function getStockInfoApi(ticker){
    const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols==${ticker}`;

    return fetch(url)
    .then(response => {
        return response.json();
    })
    .then(result=>{
        return result;
    })
    .catch(err => {
        return err;
    });
}