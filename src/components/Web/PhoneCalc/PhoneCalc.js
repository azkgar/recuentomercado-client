import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";
import {Switch, notification, Form, Select, Table, Row, Col} from "antd";
import {CloseOutlined, CheckOutlined} from "@ant-design/icons";
import Chart from "react-apexcharts";
import Helmet from "react-helmet";
import ReactGa from "react-ga";
import Phone from "../../../assets/img/svg/undraw_product_teardown_elol.svg";

import "./PhoneCalc.scss";

export default function PhoneCalc(){
    useEffect(() =>{
        ReactGa.initialize("UA-181332848-2");

        ReactGa.pageview(window.location.pathname + window.location.search);
    },[]);

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
    const [meses, setMeses] = useState();
    const [depositoArray, setDepositoArray] = useState();
    const [pagoArray, setPagoArray] = useState();
    const {Option} = Select;
    const [dataSource, setDataSource] = useState();
    const [dataSourceM, setDataSourceM] = useState();
    const [finalFooter, setFinalFooter] = useState();
    const [finalFooterM, setFinalFooterM] = useState();

    useEffect(() => {
        if(data){
            const arraySI = [];
            const arrayR = [];
            const arrayI = [];
            const arraySource = [];
            data.map( (item) => {
                arraySI.push(Math.round((item.saldo)*100)/100);
                arrayR.push(Math.round(item.interest*100)/100);
                arrayI.push(Math.round(item.taxes*100)/100);
                arraySource.push({
                    key: item.key,
                    month: item.month,
                    payment: `$ ${formatThousands(addZeroes(item.payment))}`,
                    result: `$ ${formatThousands(addZeroes(Math.floor(item.result*100)/100))}`,
                    saldo: `$ ${formatThousands(addZeroes(Math.floor(item.saldo*100)/100))}`,
                    interest: `$ ${formatThousands(addZeroes(Math.floor(item.interest*100)/100))}`,
                    taxes: `$ ${formatThousands(addZeroes(Math.ceil(item.taxes*100)/100))}`,
                    total: `$ ${formatThousands(addZeroes(Math.floor(item.total*100)/100))}`
                });
            });
            setSaldoInicial(arraySI);
            setGanancia(arrayR);
            setImpuestos(arrayI);
            setDataSource(arraySource);
            setFinalFooter(formatThousands(addZeroes(Math.round((data[years * 12 -1].result - price)*100)/100)));
        }
    },[data]);

    useEffect(() => {
        if(dataMonth){
            const arraySI = [];
            const arrayR = [];
            const arrayI = [];
            const arraySource = []
            dataMonth.map( (item) => {
                arraySI.push(Math.round(item.total*100)/100);
                arrayR.push(Math.round(item.interest*100)/100);
                arrayI.push(Math.round(item.taxes*100)/100);
                arraySource.push({
                    key: item.key,
                    month: item.month,
                    payment: `$ ${formatThousands(addZeroes(item.payment))}`,
                    result: `$ ${formatThousands(addZeroes(Math.floor(item.result*100)/100))}`,
                    saldo: `$ ${formatThousands(addZeroes(Math.floor(item.saldo*100)/100))}`,
                    interest: `$ ${formatThousands(addZeroes(Math.floor(item.interest*100)/100))}`,
                    taxes: `$ ${formatThousands(addZeroes(Math.ceil(item.taxes*100)/100))}`,
                    total: `$ ${formatThousands(addZeroes(Math.floor(item.total*100)/100))}`
                });
            });
            setSaldoInicialM(arraySI);
            setGananciaM(arrayR);
            setImpuestosM(arrayI);
            setDataSourceM(arraySource);
            setFinalFooterM(formatThousands(addZeroes(Math.round((dataMonth[5].result)*100)/100)));
        }
    },[dataMonth]);

    useEffect(() => {
        if(years && price){
            const convert = years * 12;
            const array = ["Mes 1"];
            const deposito = [Math.ceil(price / convert)];
            let x = 2;
            for(var k = 1; k < convert; k++){
                array.push(`Mes ${x}`);
                deposito.push(Math.ceil(price / convert));
                x++;
            }
            setMeses(array);
            setDepositoArray(deposito);
        }
    },[years, price]);

    function formatThousands(num) {
        let values = num.toString().split('.');
        return values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + ( values.length === 2 ? '.' + values[1] : '' )
    }

    function addZeroes(num){
        const string = num.toString();
        const dec = string.split(".")[1];
        const len = dec && dec.lenght > 2 ? dec.lenght : 2;
        return Number(string).toFixed(len);
    }
    
    function calculate() {
        if(price > 0){
            const pagos = Math.ceil(price / (12 * years));
            setPayment(pagos);
            let inicial = 0;
            const array = [];
            for(var i = 0; i < 12 * years; i++){
                const tasa = anual / 12;
                const saldo = inicial + pagos;
                const rendimiento = saldo * tasa;
                const taxes = rendimiento * tax;
                const final = saldo + rendimiento - taxes; 
                array.push({
                    key: i+1,
                    month: `Mes ${i+1}`,
                    payment: pagos,
                    saldo: inicial,
                    total: saldo,
                    interest: rendimiento,
                    taxes: taxes,
                    result: final,  
                });
                inicial = final;
                setData(array);
            } if(months){
                let init = array[12 * years - 1].result;
                const pagoMes = Math.ceil(price / 6);
                setPaymentMonth(pagoMes);
                const arrayMonth = [];
                const arrayPago = [];
                for(var j = 0; j < 6; j++) {
                    const tasa = anual / 12;
                    const saldo = init - pagoMes;
                    const rendimiento = saldo * tasa;
                    const taxes = rendimiento * tax;
                    const final = saldo + rendimiento - taxes;
                    arrayMonth.push({
                        key: j+1,
                        month: `Mes ${j+1}`,
                        payment: pagoMes,
                        saldo: init,
                        total: saldo,
                        interest: rendimiento,
                        taxes: taxes,
                        result: final,
                    });
                    arrayPago.push(pagoMes);
                    init = final;
                }
                setDataMonth(arrayMonth);
                setPagoArray(arrayPago);
            } else {
                setDataMonth();
            }
        } else {
            notification["error"]({message: "Introduce el costo del teléfono"});
        }
    }

    const columns = [   
        {
            title: "Mes",
            dataIndex: "month",
            align: "center"
        },
        {
            title: "Depósito",
            dataIndex: "payment",
            align: "right"
        },
        {
            title: "Saldo Periodo Anterior",
            dataIndex: "saldo",
            align: "right"
        },
        {
            title: "Total a invertir",
            dataIndex: "total",
            align: "right"
        },
        {
            title: "Rendimiento",
            dataIndex: "interest",
            align: "right"
        },
        {
            title: "Impuestos",
            dataIndex: "taxes",
            align: "right"
        },
        {
            title: "Saldo a Fin de Mes",
            dataIndex: "result",
            align: "right"
        }
    ]

    const columnsM = [   
        {
            title: "Mes",
            dataIndex: "month",
            align: "center"
        },
        {
            title: "Pago a tarjeta",
            dataIndex: "payment",
            align: "right"
        },
        {
            title: "Saldo Periodo Anterior",
            dataIndex: "saldo",
            align: "right"
        },
        {
            title: "Total a Invertir",
            dataIndex: "total",
            align: "right"
        },
        {
            title: "Rendimiento",
            dataIndex: "interest",
            align: "right"
        },
        {
            title: "Impuestos",
            dataIndex: "taxes",
            align: "right"
        },
        {
            title: "Saldo a Fin de Mes",
            dataIndex: "result",
            align: "right"
        }
    ]

    return(
        <>
            <Helmet>
            <title>Calculadora Teléfono | El Recuento del Mercado</title>
                <meta
                    name = "description"
                    content = "¡Hola! En esta página puedes calcular cuánto dinero vas a ganar por estrenar teléfono 😎."
                />
                <link
                    rel = "canonical"
                    href = "https://recuentomercado.com/calculadora-telefono/"
                />
                <meta
                    property = "og:title"
                    content = "Calculadora Teléfono | El Recuento del Mercado"
                />
                <meta 
                    property = "og:description" 
                    content =  "¡Hola! En esta página puedes calcular cuánto dinero vas a ganar por estrenar teléfono 😎.."
                />
                <meta 
                    property = "og:locale" 
                    content = "es_MX"
                />
                <meta 
                    property = "og:type" 
                    content = "website"
                />
                <meta 
                    property = "og:url" 
                    content =  {window.location.pathname + window.location.search}
                />
                <meta 
                    property = "og:image" 
                    content = "http://recuentomercado.com/mstile-310x310.png" 
                />
                <meta 
                    property = "og:image:secure_url" 
                    content = "https://recuentomercado.com/mstile-310x310.png"
                />
                <meta 
                    property = "og:image:type" 
                    content = "image/png" 
                />
                <meta 
                    property = "og:image:width" 
                    content = "310" 
                />
                <meta 
                    property = "og:image:height" 
                    content = "310" 
                />
                <meta 
                    property = "og:image:alt"
                    content = "El Recuento del Mercado" 
                />
                <meta 
                    property = "og:site_name" 
                    content = "El Recuento del Mercado" 
                />
            </Helmet>
            <div className = "phone-calc">
                <Row gutter = {24}>
                <Col lg = {12} md = {24} sm = {24} xs = {24}>
                <div className = "phone-calc__image">
                    <img 
                        alt = "teléfono en construcción"
                        src = {Phone}      
                    />
                </div>
                </Col>
                <Col lg = {12} md = {24} sm = {24} xs = {24}>
                <div className = "phone-calc__instructions">
                    <h2>¡Hola!</h2>
                    <p>
                        En esta página puedes calcular cuánto dinero vas a ganar por estrenar teléfono <span role = "img" aria-label = "cool">😎</span>
                        <br/>
                        <br/>
                        Es muy sencillo, sigue los pasos y prepárate parar empezar.
                        <br/>
                        <br/>
                        ¡Ojo! Si quieres ver un ejemplo de como se usa esta calculadora puedes dar clic <a href = "" rel = "noopener noreferrer" target = "_blank">aquí</a>.
                    </p>
                </div>
                </Col>
                </Row>
                <div className = "phone-calc__data">
                    <Form
                        className = "phone-calc__data-form"
                        onSubmit = {calculate}
                    >
                        <h3>
                            Paso 1) Anota cuánto cuesta el teléfono que quieres comprar.
                        </h3>
                        <Form.Item>
                            <p>
                                El teléfono cuesta:
                            </p>
                            <NumberFormat
                                decimalScale = {2}
                                fixedDecimalScale = {true}
                                decimalSeparator = {"."}
                                thousandSeparator = {true} 
                                prefix = {"$"}
                                allowNegative = "false"
                                onValueChange = {(values) => {
                                    const {formattedValue, value} = values;
                                    setPrice(value);
                                }}
                                isNumericString = "true"
                                inputMode = "decimal"
                            />
                        </Form.Item>
                        <h3>
                            Paso 2) Anota el rendimiento anual que vas a obtener
                        </h3>
                        <Form.Item>
                            <p>
                                La tasa de interés anual es de:
                            </p>
                            <NumberFormat
                                decimalScale = {2}
                                fixedDecimalScale = {true}
                                decimalSeparator = {"."}
                                thousandSeparator = {true} 
                                suffix = {"%"}
                                allowNegative = "false"
                                onChange = {e => setAnual(parseInt(e.target.value)/100)}
                                inputMode = "decimal"
                            />
                            <p> <strong><sup>*</sup>Si dejas el cuadro en blanco la calculadora va a usar una tasa de interés anual del 4%.</strong> </p>
                        </Form.Item>
                        <h3>
                            Paso 3) Anota el porcentaje que tienes que pagar de impuestos.
                        </h3>
                        <Form.Item>
                            <p>
                                El porcentaje de impuestos es de:
                            </p>
                            <NumberFormat
                                decimalScale = {2}
                                fixedDecimalScale = {true}
                                decimalSeparator = {"."}
                                thousandSeparator = {true} 
                                suffix = {"%"}
                                allowNegative = "false"
                                onChange = {e => setTax(parseInt(e.target.value)/100)}
                                inputMode = "decimal"
                            />
                            <p> <strong><sup>*</sup>Si dejas el cuadro en blanco la calculadora va a calcular el 35% de impuestos.</strong> </p>
                        </Form.Item>
                        <h3>
                            Paso 4) ¿En cuántos años vas a cambiar de teléfono?
                        </h3>
                        <Form.Item>
                            <p>Voy a comprar mi teléfono en:</p>
                            <Select defaultValue = "1" onChange = {e => setYears(e)}>
                                <Option value = "1">
                                    1 año
                                </Option>
                                <Option value = "2">
                                    2 años
                                </Option>
                                <Option value = "3">
                                    3 años
                                </Option>
                                <Option value = "4">
                                    4 años
                                </Option>
                                <Option value = "5">
                                    5 años
                                </Option>
                            </Select>
                        </Form.Item>
                        <h3>
                            Paso 5) ¿Vas a pagar el teléfono a meses sin intereses?
                        </h3>
                        <Form.Item>
                            <p>No</p>
                            <Switch
                                checkedChildren = {<CheckOutlined/>}
                                unCheckedChildren = {<CloseOutlined/>}
                                defaultChecked = {months}
                                onChange = {e => setMonths(e)}
                            />
                            <p>Sí</p>
                        </Form.Item>
                        <p> <strong><sup>*</sup>¡Ojo! Asegúrate de que los meses sean SIN INTERESES, si no mejor paga de contado.</strong></p>
                        <Form.Item>
                            <button
                                className = "calculate"
                                onClick = {calculate} 
                            >
                                Calcular <div className = "calculate-arrow"></div>
                            </button>
                        </Form.Item>
                    </Form>
                </div>
                <div className = "phone-calc__result">
                    {data ? 
                    <div className = "phone-calc__result-header">
                    <h3>Resultados:</h3>
                    <p>{`Para comprar el teléfono de $ ${formatThousands(addZeroes(price))} tienes que ahorrar $ ${formatThousands(addZeroes(payment))} por ${years * 12} meses.`}</p>
                    {dataMonth ? <p>
                       {`La mensualidad que tienes que pagar a meses sin intereses es de $ ${formatThousands(addZeroes(paymentMonth))} por 6 meses.`} 
                    </p>: null}
                    </div>
                    : null}
                    <div className = "phone-calc__result-table">
                        {data ? <h4>
                            En esta tabla puedes ver como va creciento tu dinero mes a mes.
                        </h4> : null}
                        {data ? <Table
                            columns = {columns}
                            dataSource = {dataSource}
                            bordered
                            pagination = {{pageSize: 12}}
                            //scroll = {{y: 240}}
                            footer = {() => `Si pagas el teléfono de contado terminas con un saldo a favor de: $ ${finalFooter}`}
                        /> : null}
                    </div>
                    <div className = "phone-calc__result-tableMonths">
                        {dataMonth ? <h4>
                            En esta tabla puedes ver como va creciento tu dinero mientras pagas tu teléfono nuevo.
                        </h4> : null}
                        {dataMonth ? <Table
                            columns = {columnsM}
                            dataSource = {dataSourceM}
                            bordered
                            pagination = {{pageSize: 12}}
                            //scroll = {{y: 240}}
                            footer = {() => `Después de pagar tu tarjeta terminas con un teléfono nuevo y un saldo a favor de: $ ${finalFooterM}`}
                        /> : null}
                    </div>
                    <div className = "phone-calc__result-graph">
                        {data ? <h4>
                            En esta gráfica puedes ver los datos de la tabla de crecimiento. Descárgala para tenerla siempre a la mano.
                        </h4> : null}
                        {data ? <Grafica
                            saldoInicial = {saldoInicial}
                            ganancia = {ganancia}
                            impuestos = {impuestos}
                            formatThousands = {formatThousands}
                            meses = {meses}
                            depositoArray = {depositoArray}
                        /> : null}
                    </div>
                    <div className = "phone-calc__result-graphMonths">
                        {data ? <h4>
                            En esta gráfica puedes ver los datos de la tabla de meses sin intereses. Descárgala para tenerla siempre a la mano.
                        </h4> : null}
                        {dataMonth ? <GraficaM
                            saldoInicialM = {saldoInicialM}
                            gananciaM = {gananciaM}
                            impuestosM = {impuestosM}
                            formatThousands = {formatThousands}
                            pagoArray = {pagoArray}
                        /> : null}
                    </div>
                </div>
            </div>
        </>
    );
}

function Grafica(props) {
    const {saldoInicial, ganancia, impuestos, formatThousands, meses, depositoArray} = props
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
            categories: meses,
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
        colors: ["#C8C8C8", "#061F1F", "#00D762", "#FF4550"]
    }
    const series = [
        {
            name: "Depósito",
            data: depositoArray
        },
        {
            name: "Saldo Anterior",
            data: saldoInicial
        },
        {
            name: "Rendimiento",
            data: ganancia
        },
        {
            name: "Impuestos",
            data: impuestos
        }
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
    const {saldoInicialM, gananciaM, impuestosM, formatThousands, pagoArray} = props
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
        colors: ["#C8C8C8","#061F1F", "#00D762", "#FF4550"]
    }
    const series = [
        {
            name: "Pago",
            data: pagoArray
        },
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