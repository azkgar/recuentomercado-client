import React from "react";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {Row, Col} from "antd";
import ReactGa from "react-ga";
import Image from "../../../assets/img/svg/undraw_sunlight_tn7t.svg";

import "./NotFound.scss";

export default function NotFound(){
    return(
        <>
            <Helmet>
                <title>¡Ups! | El Recuento del Mercado</title>
                <meta
                    name = "description"
                    content = "Esta página ya está disfrutando del retiro. Entra y descubre como tú también puedes hacerlo."
                />
                <meta
                    property = "og:title"
                    content = "¡Ups! | El Recuento del Mercado"
                />
                <meta 
                    property = "og:description" 
                    content =  "Esta página ya está disfrutando del retiro. Entra y descubre como tú también puedes hacerlo."
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
        <div className = "not-found">
            <div className = "not-found__title">
                <h2>¡Lo sentimos!</h2>
            </div>
            <Row gutter = {24} className = "not-found__content">
                <Col xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                    <img
                        src = {Image}
                        alt = "Undraw sunlight"
                    />
                </Col>
                <Col xl = {12} lg = {12} md = {24} sm = {24} xs = {24}>
                <p>
                    Esta página ya se retiró porque invirtió su dinero de manera responsable por varios años.
                    <br/>
                    <br/>
                    <span>
                        ¡Tú también puedes lograrlo!
                    </span>
                    <br/>
                    <br/>
                    Descubre cómo hacerlo en:
                </p>
                <Link to = "/articulos">
                        <button className = "not-found__content-button">
                            Artículos
                            <div className = "not-found__content-button-arrow"></div>
                        </button>
                    </Link>
                    <Link to = "/videos">
                        <button className = "not-found__content-button">
                            Videos
                            <div className = "not-found__content-button-arrow"></div>
                        </button>
                    </Link>
                    <Link to = "/podcast">
                        <button className = "not-found__content-button">
                            Podcast
                            <div className = "not-found__content-button-arrow"></div>
                        </button>
                    </Link>
                </Col>
            </Row>
        </div>
        </>
    );
}