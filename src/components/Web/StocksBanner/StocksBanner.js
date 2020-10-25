import React, {useState, useEffect} from "react";
//import si from "stock-info";
import {getCommoditiesInfoApi, getIndexesInfoApi} from "../../../api/stock";
import Logo from "../../../assets/img/svg/RM-logo-icono.svg";

import "./StocksBanner.scss";

export default function StocksBanner(){
    const [priceGold, setPriceGold] = useState();
    const [changeGold, setChangeGold] = useState();
    const [percentageGold, setPercentageGold] = useState();
    const [timeGold, setTimeGold] = useState();
    const [priceOil, setPriceOil] = useState();
    const [changeOil, setChangeOil] = useState();
    const [percentageOil, setPercentageOil] = useState();
    const [timeOil, setTimeOil] = useState();
    const [priceSP, setPriceSP] = useState();
    const [changeSP, setChangeSP] = useState();
    const [percentageSP, setPercentageSP] = useState();
    const [timeSP, setTimeSP] = useState();
    const [priceNQ, setPriceNQ] = useState();
    const [changeNQ, setChangeNQ] = useState();
    const [percentageNQ, setPercentageNQ] = useState();
    const [timeNQ, setTimeNQ] = useState();
    const [priceRU, setPriceRU] = useState();
    const [changeRU, setChangeRU] = useState();
    const [percentageRU, setPercentageRU] = useState();
    const [timeRU, setTimeRU] = useState();
    const [priceDJ, setPriceDJ] = useState();
    const [changeDJ, setChangeDJ] = useState();
    const [percentageDJ, setPercentageDJ] = useState();
    const [timeDJ, setTimeDJ] = useState();
    
    function formatThousands(num) {
        let values = num.toString().split('.');
        return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + ( values.length == 2 ? '.' + values[1] : '' )
    }

    function addZeroes(num){
        const string = num.toString();
        const dec = string.split(".")[1];
        const len = dec && dec.lenght > 2 ? dec.lenght : 2;
        return Number(string).toFixed(len);
    }

    useEffect(() => {
        getCommoditiesInfoApi()
        .then(response => {
            const oil = response[0].price;
            const oilR = Math.round(oil * 100) / 100;
            const oilZ = addZeroes(oilR);
            const oilC = formatThousands(oilZ);
            setPriceOil(oilC);
            const cOilR = Math.round(response[0].change * 100) / 100;
            const cOilZ = addZeroes(cOilR);
            setChangeOil(cOilZ);
            const pOilR = Math.round(response[0].changesPercentage * 100) / 100;
            const pOilZ = addZeroes(pOilR);
            setPercentageOil(pOilZ);
            setTimeOil(Date(response[0].timestamp).slice(3,33));
            const gold = response[1].price;
            const goldR = Math.round(gold * 100) / 100;
            const goldZ = addZeroes(goldR);
            const goldC = formatThousands(goldZ);
            setPriceGold(goldC);
            const cGoldR = Math.round(response[1].change * 100) / 100;
            const cGoldZ = addZeroes(cGoldR);
            setChangeGold(cGoldZ);
            const pGoldR = Math.round(response[1].changesPercentage * 100) / 100;
            const pGoldZ = addZeroes(pGoldR);
            setPercentageGold(pGoldZ);
            setTimeGold(Date(response[1].timestamp).slice(3,33));
        });

        getIndexesInfoApi()
        .then(response => {
            const dow = response[0].price;
            const dowR = Math.round(dow * 100) / 100;
            const dowZ = addZeroes(dowR);
            const dowC = formatThousands(dowZ);
            setPriceDJ(dowC);
            const cDJR = Math.round(response[0].change * 100) / 100;
            const cDJZ = addZeroes(cDJR);
            setChangeDJ(cDJZ);
            const pDJR = Math.round(response[0].changesPercentage * 100) / 100;
            const pDJZ = addZeroes(pDJR);
            setPercentageDJ(pDJZ);
            setTimeDJ(Date(response[0].timestamp).slice(3,33));
            const sp = response[1].price;
            const spR = Math.round(sp * 100) / 100;
            const spZ = addZeroes(spR);
            const spC = formatThousands(spZ);
            setPriceSP(spC);
            const cSPR = Math.round(response[1].change * 100) / 100;
            const cSPZ = addZeroes(cSPR);
            setChangeSP(cSPZ);
            const pSPR = Math.round(response[1].changesPercentage * 100) / 100;
            const pSPZ = addZeroes(pSPR);
            setPercentageSP(pSPZ);
            setTimeSP(Date(response[1].timestamp).slice(3,33));
            const nas = response[2].price;
            const nasR = Math.round(nas * 100) / 100;
            const nasZ = addZeroes(nasR);
            const nasC = formatThousands(nasZ);
            setPriceNQ(nasC);
            const cNQR = Math.round(response[2].change * 100) / 100;
            const cNQZ = addZeroes(cNQR);
            setChangeNQ(cNQZ);
            const pNQR = Math.round(response[2].changesPercentage * 100) / 100;
            const pNQZ = addZeroes(pNQR);
            setPercentageNQ(pNQZ);
            setTimeNQ(Date(response[2].timestamp).slice(3,33));
            const rus = response[3].price;
            const rusR = Math.round(rus * 100) / 100;
            const rusZ = addZeroes(rusR);
            const rusC = formatThousands(rusZ);
            setPriceRU(rusC);
            const cRUR = Math.round(response[3].change * 100) / 100;
            const cRUZ = addZeroes(cRUR);
            setChangeRU(cRUZ);
            const pRUR = Math.round(response[3].changesPercentage * 100) / 100;
            const pRUZ = addZeroes(pRUR);
            setPercentageRU(pRUZ);
            setTimeRU(Date(response[3].timestamp).slice(3,33));
        });
    }, []);
    
    return(
    <div className = "stocks-banner">
        <Gold 
            priceGold = {priceGold}
            changeGold = {changeGold}
            percentageGold = {percentageGold}
            timeGold = {timeGold}
        />
        <SP500 
            priceSP= {priceSP}
            changeSP = {changeSP}
            percentageSP = {percentageSP}
            timeSP = {timeSP}
        />
        <DOW 
            priceDJ= {priceDJ}
            changeDJ = {changeDJ}
            percentageDJ = {percentageDJ}
            timeDJ = {timeDJ}
        />
        <NASDAQ 
            priceNQ= {priceNQ}
            changeNQ = {changeNQ}
            percentageNQ = {percentageNQ}
            timeNQ = {timeNQ}
        />
        <RUSSELL 
            priceRU= {priceRU}
            changeRU = {changeRU}
            percentageRU = {percentageRU}
            timeRU = {timeRU}
        />
        <Oil 
            priceOil= {priceOil}
            changeOil = {changeOil}
            percentageOil = {percentageOil}
            timeOil = {timeOil}
        />
    </div>
    );
}

function Gold(props) {
    const {priceGold, changeGold, percentageGold, timeGold} = props;
    const [color, setColor] = useState();
    const [text, setText] = useState();
    const [icon, setIcon] = useState();
    const regularMarketPrice = priceGold;
    const regularMarketChange = changeGold;
    const regularMarketChangePercent = percentageGold;
    const regularMarketTime = timeGold;

    useEffect(()=>{
        identifyClass();
    },[regularMarketChange,regularMarketChangePercent]);

    const identifyClass = () => {
        if(regularMarketChange === 0){
            setColor("stocks-banner__ticker-zero");
            setText("0.00 (0.00%)");
            setIcon(
                <div className = "stocks-banner__ticker-icon">
                    <img className = "stocks-banner__ticker-icon-logo"
                        src = {Logo}
                        alt = "No hay cambios de puntuación en el índice."
                    />
                </div>
            );

        } else {
            if(regularMarketChange > 0) {
                setColor("stocks-banner__ticker-positive");
                setText(`+${regularMarketChange} (+${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-up"></div>
                    </div>
                );
            } else {
                setColor("stocks-banner__ticker-negative");
                setText(`${regularMarketChange} (${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-down"></div>
                    </div>
                );
            }
        }
    }

    if(!regularMarketPrice){
        return(null);
    }

    return(
        <div className = "stocks-banner__ticker"
            id = "gold"
        >
            <h4 className = "stocks-banner__ticker-title">
                Oro
            </h4>
            <p className = "stocks-banner__ticker-price">
                {regularMarketPrice}
            </p>
            <p className = {color}>
                {text}
            </p>
            <p className = "stocks-banner__ticker-date">
                {regularMarketTime}
            </p>
            {icon}
        </div>
    );
}

function SP500(props) {
    const {priceSP, changeSP, percentageSP, timeSP} = props;
    const [color, setColor] = useState();
    const [text, setText] = useState();
    const [icon, setIcon] = useState();
    const regularMarketPrice = priceSP;
    const regularMarketChange = changeSP;
    const regularMarketChangePercent = percentageSP;
    const regularMarketTime = timeSP;

    useEffect(()=>{
        identifyClass();
    },[regularMarketChange,regularMarketChangePercent]);

    const identifyClass = () => {
        if(regularMarketChange === 0){
            setColor("stocks-banner__ticker-zero");
            setText("0.00 (0.00%)");
            setIcon(
                <div className = "stocks-banner__ticker-icon">
                    <img className = "stocks-banner__ticker-icon-logo"
                        src = {Logo}
                        alt = "No hay cambios de puntuación en el índice."
                    />
                </div>
            );

        } else {
            if(regularMarketChange > 0) {
                setColor("stocks-banner__ticker-positive");
                setText(`+${regularMarketChange} (+${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-up"></div>
                    </div>
                );
            } else {
                setColor("stocks-banner__ticker-negative");
                setText(`${regularMarketChange} (${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-down"></div>
                    </div>
                );
            }
        }
    }

    if(!regularMarketPrice){
        return(null);
    }

    return(
        <div className = "stocks-banner__ticker"
            id = "sp500"
        >
            <h4 className = "stocks-banner__ticker-title">
                S&P 500
            </h4>
            <p className = "stocks-banner__ticker-price">
                {regularMarketPrice}
            </p>
            <p className = {color}>
                {text}
            </p>
            <p className = "stocks-banner__ticker-date">
                {regularMarketTime}
            </p>
            {icon}
        </div>
    );
}

function DOW(props) {
    const {priceDJ, changeDJ, percentageDJ, timeDJ} = props;
    const [color, setColor] = useState();
    const [text, setText] = useState();
    const [icon, setIcon] = useState();
    const regularMarketPrice = priceDJ;
    const regularMarketChange = changeDJ;
    const regularMarketChangePercent = percentageDJ;
    const regularMarketTime = timeDJ;

    useEffect(()=>{
        identifyClass();
    },[regularMarketChange,regularMarketChangePercent]);

    const identifyClass = () => {
        if(regularMarketChange === 0){
            setColor("stocks-banner__ticker-zero");
            setText("0.00 (0.00%)");
            setIcon(
                <div className = "stocks-banner__ticker-icon">
                    <img className = "stocks-banner__ticker-icon-logo"
                        src = {Logo}
                        alt = "No hay cambios de puntuación en el índice."
                    />
                </div>
            );

        } else {
            if(regularMarketChange > 0) {
                setColor("stocks-banner__ticker-positive");
                setText(`+${regularMarketChange} (+${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-up"></div>
                    </div>
                );
            } else {
                setColor("stocks-banner__ticker-negative");
                setText(`${regularMarketChange} (${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-down"></div>
                    </div>
                );
            }
        }
    }

    if(!regularMarketPrice){
        return(null);
    }

    return(
        <div className = "stocks-banner__ticker"
            id = "dow"
        >
            <h4 className = "stocks-banner__ticker-title">
                Dow Jones
            </h4>
            <p className = "stocks-banner__ticker-price">
                {regularMarketPrice}
            </p>
            <p className = {color}>
                {text}
            </p>
            <p className = "stocks-banner__ticker-date">
                {regularMarketTime}
            </p>
            {icon}
        </div>
    );
}

function NASDAQ(props) {
    const {priceNQ, changeNQ, percentageNQ, timeNQ} = props;
    const [color, setColor] = useState();
    const [text, setText] = useState();
    const [icon, setIcon] = useState();
    const regularMarketPrice = priceNQ;
    const regularMarketChange = changeNQ;
    const regularMarketChangePercent = percentageNQ;
    const regularMarketTime = timeNQ;

    useEffect(()=>{
        identifyClass();
    },[regularMarketChange,regularMarketChangePercent]);

    const identifyClass = () => {
        if(regularMarketChange === 0){
            setColor("stocks-banner__ticker-zero");
            setText("0.00 (0.00%)");
            setIcon(
                <div className = "stocks-banner__ticker-icon">
                    <img className = "stocks-banner__ticker-icon-logo"
                        src = {Logo}
                        alt = "No hay cambios de puntuación en el índice."
                    />
                </div>
            );

        } else {
            if(regularMarketChange > 0) {
                setColor("stocks-banner__ticker-positive");
                setText(`+${regularMarketChange} (+${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-up"></div>
                    </div>
                );
            } else {
                setColor("stocks-banner__ticker-negative");
                setText(`${regularMarketChange} (${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-down"></div>
                    </div>
                );
            }
        }
    }

    if(!regularMarketPrice){
        return(null);
    }

    return(
        <div className = "stocks-banner__ticker"
            id = "nasdaq"
        >
            <h4 className = "stocks-banner__ticker-title">
                Nasdaq
            </h4>
            <p className = "stocks-banner__ticker-price">
                {regularMarketPrice}
            </p>
            <p className = {color}>
                {text}
            </p>
            <p className = "stocks-banner__ticker-date">
                {regularMarketTime}
            </p>
            {icon}
        </div>
    );
}

function RUSSELL(props) {
    const {priceRU, changeRU, percentageRU, timeRU} = props;
    const [color, setColor] = useState();
    const [text, setText] = useState();
    const [icon, setIcon] = useState();
    const regularMarketPrice = priceRU;
    const regularMarketChange = changeRU;
    const regularMarketChangePercent = percentageRU;
    const regularMarketTime = timeRU;

    useEffect(()=>{
        identifyClass();
    },[regularMarketChange,regularMarketChangePercent]);

    const identifyClass = () => {
        if(regularMarketChange === 0){
            setColor("stocks-banner__ticker-zero");
            setText("0.00 (0.00%)");
            setIcon(
                <div className = "stocks-banner__ticker-icon">
                    <img className = "stocks-banner__ticker-icon-logo"
                        src = {Logo}
                        alt = "No hay cambios de puntuación en el índice."
                    />
                </div>
            );

        } else {
            if(regularMarketChange > 0) {
                setColor("stocks-banner__ticker-positive");
                setText(`+${regularMarketChange} (+${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-up"></div>
                    </div>
                );
            } else {
                setColor("stocks-banner__ticker-negative");
                setText(`${regularMarketChange} (${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-down"></div>
                    </div>
                );
            }
        }
    }

    if(!regularMarketPrice){
        return(null);
    }

    return(
        <div className = "stocks-banner__ticker"
            id = "russell"
        >
            <h4 className = "stocks-banner__ticker-title">
                Russell 2000
            </h4>
            <p className = "stocks-banner__ticker-price">
                {regularMarketPrice}
            </p>
            <p className = {color}>
                {text}
            </p>
            <p className = "stocks-banner__ticker-date">
                {regularMarketTime}
            </p>
            {icon}
        </div>
    );
}

function Oil(props) {
    const {priceOil, changeOil, percentageOil, timeOil} = props;
    const [color, setColor] = useState();
    const [text, setText] = useState();
    const [icon, setIcon] = useState();
    const regularMarketPrice = priceOil;
    const regularMarketChange = changeOil;
    const regularMarketChangePercent = percentageOil;
    const regularMarketTime = timeOil;

    useEffect(()=>{
        identifyClass();
    },[regularMarketChange,regularMarketChangePercent]);

    const identifyClass = () => {
        if(regularMarketChange === 0){
            setColor("stocks-banner__ticker-zero");
            setText("0.00 (0.00%)");
            setIcon(
                <div className = "stocks-banner__ticker-icon">
                    <img className = "stocks-banner__ticker-icon-logo"
                        src = {Logo}
                        alt = "No hay cambios de puntuación en el índice."
                    />
                </div>
            );
        } else {
            if(regularMarketChange > 0) {
                setColor("stocks-banner__ticker-positive");
                setText(`+${regularMarketChange} (+${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-up"></div>
                    </div>
                );
            } else {
                setColor("stocks-banner__ticker-negative");
                setText(`${regularMarketChange} (${regularMarketChangePercent}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-down"></div>
                    </div>
                );
            }
        }
    }

    if(!regularMarketPrice){
        return(null);
    }

    return(
        <div className = "stocks-banner__ticker"
            id = "oil"
        >
            <h4 className = "stocks-banner__ticker-title">
                Petróleo
            </h4>
            <p className = "stocks-banner__ticker-price">
                {regularMarketPrice}
            </p>
            <p className = {color}>
                {text}
            </p>
            <p className = "stocks-banner__ticker-date">
                {regularMarketTime}
            </p>
            {icon}
        </div>
    );
}

/*function Oil(props) {
    const {formatThousands} = props
    const ticker = "CL=F";
    const [regularMarketPrice, setRegularMarketPrice] = useState();
    const [regularMarketChange, setRegularMarketChange] = useState();
    const [regularMarketChangePercent, setRegularMarketChangePercent] = useState();
    const [regularMarketTime, setRegularMarketTime] = useState();
    const [color, setColor] = useState();
    const [text, setText] = useState();
    const [icon, setIcon] = useState();

    useEffect(()=>{
        si.getSingleStockInfo(ticker).then(response => {
            const price = response.regularMarketPrice;
            const priceRound = Math.round(price * 100) / 100;
            const priceComma = formatThousands(priceRound);
            setRegularMarketPrice(priceComma);
            setRegularMarketChange(response.regularMarketChange);
            setRegularMarketChangePercent(response.regularMarketChangePercent);
            setRegularMarketTime(Date(response.regularMarketTime).slice(3,33));
        });
    },[]);

    useEffect(()=>{
        identifyClass();
    },[regularMarketChange,regularMarketChangePercent]);

    const identifyClass = () => {
        if(regularMarketChange === 0){
            setColor("stocks-banner__ticker-zero");
            setText("0.00 (0.00%)");
            setIcon(
                <div className = "stocks-banner__ticker-icon">
                    <img className = "stocks-banner__ticker-icon-logo"
                        src = {Logo}
                        alt = "No hay cambios de puntuación en el índice."
                    />
                </div>
            );
        } else {
            if(regularMarketChange > 0) {
                setColor("stocks-banner__ticker-positive");
                setText(`+${Math.round(regularMarketChange * 100) / 100} (+${Math.round(regularMarketChangePercent*100)/100}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-up"></div>
                    </div>
                );
            } else {
                setColor("stocks-banner__ticker-negative");
                setText(`${Math.round(regularMarketChange * 100)/100} (${Math.round(regularMarketChangePercent*100)/100}%)`);
                setIcon(
                    <div className = "stocks-banner__ticker-icon">
                        <div className = "stocks-banner__ticker-icon-down"></div>
                    </div>
                );
            }
        }
    }

    if(!regularMarketPrice){
        return(null);
    }

    return(
        <div className = "stocks-banner__ticker"
            id = "oil"
        >
            <h4 className = "stocks-banner__ticker-title">
                Petróleo
            </h4>
            <p className = "stocks-banner__ticker-price">
                {regularMarketPrice}
            </p>
            <p className = {color}>
                {text}
            </p>
            <p className = "stocks-banner__ticker-date">
                {regularMarketTime}
            </p>
            {icon}
        </div>
    );
}*/
