import React, {useState, useEffect} from "react";
import si from "stock-info";
import Logo from "../../../assets/img/svg/RM-logo-icono.svg";

import "./StocksBanner.scss";

export default function StocksBanner(){
    
    
    return(
    <div className = "stocks-banner">
        <Gold />
        <SP500/>
        <DOW/>
        <NASDAQ/>
        <RUSSELL/>
        <Oil/>
    </div>
    );
}

function Gold() {
    const ticker = "GC=F";
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
            const priceComma = priceRound.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
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
        <div className = "stocks-banner__ticker">
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

function SP500() {
    const ticker = "^GSPC";
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
            const priceComma = priceRound.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
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
        <div className = "stocks-banner__ticker">
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

function DOW() {
    const ticker = "^DJI";
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
            const priceComma = priceRound.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
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
        <div className = "stocks-banner__ticker">
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

function NASDAQ() {
    const ticker = "^IXIC";
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
            const priceComma = priceRound.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
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
        <div className = "stocks-banner__ticker">
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

function RUSSELL() {
    const ticker = "^RUT";
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
            const priceComma = priceRound.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
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
        <div className = "stocks-banner__ticker">
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

function Oil() {
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
            const priceComma = priceRound.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
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
        <div className = "stocks-banner__ticker">
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