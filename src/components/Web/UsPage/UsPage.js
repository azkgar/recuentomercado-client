import React, {useEffect} from "react";
import {Row, Col} from "antd";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import Banner from "../../../assets/img/jpg/recuento-mercado-nosotros.jpg";
import First from "../../../assets/img/svg/undraw_stock_prices_afrt.svg";
import Second from "../../../assets/img/svg/undraw_personal_finance_tqcd.svg";
import Third from "../../../assets/img/svg/undraw_progress_data_4ebj.svg";
import Fourth from "../../../assets/img/svg/undraw_growth_curve_8mqx.svg";

import "./UsPage.scss";

export default function UsPage() {
    return(
        <>
            <Helmet>
                <title> El Recuento del Mercado</title>
                <meta
                    name = "description"
                    content = "Recopilamos las noticias más importantes relacionadas a las empresas que cotizan en la bolsa de valores e impulsamos el tema de las inversiones responsables."
                />
                <link
                    rel = "canonical"
                    href = "https://recuentomercado.com/nosotros/"
                />
                <meta
                    property = "og:title"
                    content = "El Recuento del Mercado"
                />
                <meta 
                    property = "og:description" 
                    content =  "Recopilamos las noticias más importantes relacionadas a las empresas que cotizan en la bolsa de valores e impulsamos el tema de las inversiones responsables."
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
        <div className = "us-page">
            <div className = "us-page__header">
                <img
                    src = {Banner}
                    alt = "El Recuento del Mercado"
                    className = "us-page__header-image"
                />
            </div>
            <div className = "us-page__content">
                <div className = "us-page__content-row-first">
                    <Row gutter = {24}>
                        <Col xxl = {12} xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                            <img
                                src = {First}
                                alt = "undraw stock prices"
                                className = "us-page__content-row-first-image"
                            />
                        </Col>
                        <Col xxl = {12} xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                            <p>El Recuento del Mercado busca difundir el tema de las inversiones para que a través del tiempo y con conocimiento aprendas a formar tu portafolio de inversiones y logres hacer crecer tu dinero de manera responsable.</p>
                        </Col>
                    </Row>
                </div>
                <div className = "us-page__content-row-second">
                    <Row gutter = {24}>
                        <Col xxl = {12} xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                            <p>Recopilamos y publicamos noticias relevantes en español relacionadas con las empresas que cotizan en la bolsa de valores, para que estés siempre al tanto de todo lo que pasa con tus empresas e incluso descubras empresas que podrías agregar a tu portafolio de inversión.</p>
                        </Col>
                        <Col xxl = {12} xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                            <img
                                src = {Second}
                                alt = "undraw personal finance"
                                className = "us-page__content-row-second-image"
                            />
                        </Col>
                    </Row>
                </div>
                <div className = "us-page__content-row-third">
                    <Row gutter = {24}>
                        <Col xxl = {12} xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                            <img
                                src = {Third}
                                alt = "undraw progress data"
                                className = "us-page__content-row-third-image"
                            />
                        </Col>
                        <Col xxl = {12} xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                            <p>¿Llevas una vida muy ocupada y no tienes tiempo de estar leyendo noticias? <br/> ¡No te preocupes! <br/> <br/> Todos los sábados compartimos un recuento semanal de las noticias más importantes en formato de video y podcast que podrás ver o escuchar cuando quieras. <span role = "img" aria-label = "guiño guiño">😉</span></p>
                        </Col>
                    </Row>
                </div>
                <div className = "us-page__content-row-fourth">
                    <Row gutter = {24}>
                        <Col xxl = {12} xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                            <p>¿Quieres invertir pero no sabes cómo hacerlo? <br/> <br/> Aquí encontrarás: conceptos, artículos, videos, libros y cualquier cosa que sea útil para iniciar tu camino en el mundo de las inversiones.</p>
                        </Col>
                        <Col xxl = {12} xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                            <img
                                src = {Fourth}
                                alt = "undraw stock prices"
                                className = "us-page__content-row-fourth-image"
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        </>
    );
}