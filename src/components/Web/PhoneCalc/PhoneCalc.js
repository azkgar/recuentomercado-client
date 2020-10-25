import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";
import {Switch, notification, Form, Select} from "antd";
import {CloseOutlined, CheckOutlined} from "@ant-design/icons";
import Chart from "react-apexcharts";
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
    const [saldoInicial, setSaldoInicial] = useState();
    const [ganancia, setGanancia] = useState();
    const [impuestos, setImpuestos] = useState();
    const [saldoInicialM, setSaldoInicialM] = useState();
    const [gananciaM, setGananciaM] = useState();
    const [impuestosM, setImpuestosM] = useState();
    const [years, setYears] = useState(1);

    useEffect(() => {
        if(data){
            const arraySI = [];
            const arrayR = [];
            const arrayI = [];
            data.map( (item) => {
                arraySI.push(Math.round(item.saldo*100)/100);
                arrayR.push(Math.round(item.interest*100)/100);
                arrayI.push(Math.round(item.taxes*100)/100);
            });
            setSaldoInicial(arraySI);
            setGanancia(arrayR);
            setImpuestos(arrayI);
        }
    },[data]);

    useEffect(() => {
        if(dataMonth){
            const arraySI = [];
            const arrayR = [];
            const arrayI = [];
            dataMonth.map( (item) => {
                arraySI.push(Math.round(item.saldo*100)/100);
                arrayR.push(Math.round(item.interest*100)/100);
                arrayI.push(Math.round(item.taxes*100)/100);
            });
            setSaldoInicialM(arraySI);
            setGananciaM(arrayR);
            setImpuestosM(arrayI);
        }
    },[dataMonth]);

    function formatThousands(num) {
        let values = num.toString().split('.');
        return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + ( values.length == 2 ? '.' + values[1] : '' )
    }
    
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
                let init = array[11].result;
                const pagoMes = Math.ceil(price / 6);
                setPaymentMonth(pagoMes);
                const arrayMonth = [];
                for(var j = 0; j < 6; j++) {
                    const tasa = anual / 12;
                    const saldo = init - pagoMes;
                    const rendimiento = saldo * tasa;
                    const taxes = rendimiento * tax;
                    const final = saldo + rendimiento - taxes;
                    arrayMonth.push({
                        saldo: saldo,
                        interest: rendimiento,
                        taxes: taxes,
                        result: final
                    });
                    init = final;
                    setDataMonth(arrayMonth);
                }
            } else {
                setDataMonth();
            }
        } else {
            notification["error"]({message: "Introduce el costo del teléfono"});
        }
    }

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
                            {data ? <Grafica
                                saldoInicial = {saldoInicial}
                                ganancia = {ganancia}
                                impuestos = {impuestos}
                                formatThousands = {formatThousands}
                            /> : null}
                            {dataMonth ? <GraficaM
                                saldoInicialM = {saldoInicialM}
                                gananciaM = {gananciaM}
                                impuestosM = {impuestosM}
                                formatThousands = {formatThousands}
                            /> : null}
                </div>
            </div>
        </>
    );
}

function Grafica(props) {
    const {saldoInicial, ganancia, impuestos, formatThousands} = props
    const options = {
        chart: {
            id: "basic-bar",
            stacked: true
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        title:{
            text: "Crecimiento del ahorro"
        },
        xaxis: {
            categories: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6", "Mes 7", "Mes 8", "Mes 9", "Mes 10", "Mes 11", "Mes 12"],
            labels: {
                formatter: function (val) {
                    return "$" + formatThousands(val)
                }
            }
        },
        yaxis: {
            title: {
                text: undefined
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$" + formatThousands(val)
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40
        },
        colors: ["#061F1F", "#00D762", "#FF4550"]
    }
    const series = [
        {
            name: "Saldo Inicial",
            data: saldoInicial
        },
        {
            name: "Rendimiento",
            data: ganancia
        },
        {
            name: "Impuestos",
            data: impuestos
        },
    ]

    return(
        <Chart 
            options = {options}
            series = {series}
            type = "bar"
            width = "1500"
        />
    );
}
function GraficaM(props) {
    const {saldoInicialM, gananciaM, impuestosM, formatThousands} = props
    const options = {
        chart: {
            id: "basic-bar",
            stacked: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
        stroke: {
            width: 1,
            colors: ["#fff"]
        },
        title:{
            text: "Rendimiento durante meses sin intereses"
        },
        xaxis: {
            categories: ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5", "Mes 6"],
            labels: {
                formatter: function (val) {
                    return "$" + formatThousands(val)
                }
            }
        },
        yaxis: {
            title: {
                text: undefined
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "$" + formatThousands(val)
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40
        },
        colors: ["#061F1F", "#00D762", "#FF4550"]
    }
    const series = [
        {
            name: "Saldo",
            data: saldoInicialM
        },
        {
            name: "Rendimiento",
            data: gananciaM
        },
        {
            name: "Impuestos",
            data: impuestosM
        },
    ]

    return(
        <Chart 
            options = {options}
            series = {series}
            type = "bar"
            width = "1500"
        />
    );
}