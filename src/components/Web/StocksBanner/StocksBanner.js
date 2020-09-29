import React from "react";
import si from "stock-info";

export default function StocksBanner(){

    si.getSingleStockInfo("^MXX").then(response => {
        console.log(response.regularMarketPrice);
    })
    
    return(
    <div>
        Hola
    </div>);
}