import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";
import {Switch, notification} from "antd";
import {CloseOutlined, CheckOutlined} from "@ant-design/icons";
import Helmet from "react-helmet";
import Phone from "../../../assets/img/svg/undraw_product_teardown_elol.svg";

import "./PhoneCalc.scss";

export default function PhoneCalc(){
    const [price, setPrice] = useState(0.00);
    const [anual, setAnual] = useState(0.04);
    const [months, setMonths] = useState(true);
    const [tax, setTax] = useState(0.35);
    const [payment, setPayment] = useState(0.00);
    const [paymentMonth, setPaymentMonth] = useState(0);
    const [data, setData] = useState();
    const [dataMonth, setDataMonth] = useState();

    function calculate() {
        if(price > 0){
            const pagos = Math.ceil(price / 12);
            setPayment(pagos);
            let inicial = 0;
            const array = [];
            for(var i = 0; i < 12; i++){
                const tasa = anual / 12;
                const saldo = inicial + pagos;
                const rendimiento = saldo * tasa;
                const taxes = rendimiento * tax;
                const final = saldo + rendimiento - taxes; 
                array.push({
                    saldo: saldo,
                    interest: rendimiento,
                    taxes: taxes,
                    result: final
                });
                inicial = final;
                setData(array);
            } if(months){
                let inicial = array[11].result;
                const pagoMes = Math.ceil(price / 6);
                setPaymentMonth(pagoMes);
                const arrayMonth = [];
                for(var i = 0; i < 6; i++) {
                    const tasa = anual / 12;
                    const saldo = inicial - pagoMes;
                    const rendimiento = saldo * tasa;
                    const taxes = rendimiento * tax;
                    const final = saldo + rendimiento - taxes;
                    arrayMonth.push({
                        saldo: saldo,
                        interest: rendimiento,
                        taxes: taxes,
                        result: final
                    });
                    inicial = final;
                    setDataMonth(arrayMonth);
                }
            }
        } else {
            notification["error"]({message: "Introduce el costo del teléfono"});
        }
    }
    console.log(data);
    console.log(dataMonth);
    return(
        <>
            <Helmet></Helmet>
            <div className = "phone-calc">
                <div className = "phone-calc__image">
                    <img 
                        alt = "teléfono en construcción"
                        src = {Phone}      
                    />
                </div>
                <div className = "phone-calc__data">
                            <NumberFormat
                                thousandSeparator = {true} 
                                prefix = {"$"}
                                allowNegative = "false"
                                onValueChange = {(values) => {
                                    const {formattedValue, value} = values;
                                    setPrice(value);
                                }}
                                isNumericString = "true"
                            />
                            <NumberFormat
                                thousandSeparator = {true} 
                                suffix = {"%"}
                                allowNegative = "false"
                                onChange = {e => setAnual(parseInt(e.target.value)/100)}
                            />
                            <NumberFormat
                                thousandSeparator = {true} 
                                suffix = {"%"}
                                allowNegative = "false"
                                onChange = {e => setTax(parseInt(e.target.value)/100)}
                            />
                            <Switch
                                checkedChildren = {<CheckOutlined/>}
                                unCheckedChildren = {<CloseOutlined/>}
                                defaultChecked = {months}
                                onChange = {e => setMonths(e)}
                            />
                            <button
                                onClick = {calculate} 
                            >
                                Calcular
                            </button>
                </div>
            </div>
        </>
    );
}