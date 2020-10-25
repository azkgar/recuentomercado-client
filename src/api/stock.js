export function getCommoditiesInfoApi(){
    const url = `https://financialmodelingprep.com/api/v3/quote/CLUSD,GCUSD?apikey=${process.env.REACT_APP_STOCKS_API_KEY}`;

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

export function getIndexesInfoApi(){
    const url = `https://financialmodelingprep.com/api/v3/quote/%5EGSPC,%5EDJI,%5EIXIC,%5ERUT?apikey=${process.env.REACT_APP_STOCKS_API_KEY}`;

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