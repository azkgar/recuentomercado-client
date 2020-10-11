import React from "react";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {Row, Col} from "antd";
import ReactGa from "react-ga";
import Image from "../../../assets/img/svg/undraw_sunlight_tn7t.svg";

import "./NotFound.scss";

export default function NotFound(){
    return(
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
    );
}