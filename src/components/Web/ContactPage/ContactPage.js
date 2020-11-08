import React, {useEffect} from "react";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Banner from "../../../assets/img/jpg/recuento-mercado-contacto.jpg";
import Hi from "../../../assets/img/svg/undraw_mobile_messages_u848.svg";
import Colaborate from "../../../assets/img/svg/undraw_collaborators_prrw.svg";
import Social from "../../../assets/img/svg/undraw_contact_us_15o2.svg";

import "./ContactPage.scss";

export default function ContactPage() {
    useEffect(() =>{
        ReactGa.initialize("UA-181332848-2");

        ReactGa.pageview(window.location.pathname + window.location.search);
    },[]);

    return(
        <>
            <Helmet>
                <title>Contacto | El Recuento del Mercado</title>
                <meta
                    name = "description"
                    content = "¡Hola! Encuentra las cuentas de correo y ligas a redes sociales en donde nos puedes encontrar."
                />
                <link
                    rel = "canonical"
                    href = "https://recuentomercado.com/contacto/"
                />
                <meta
                    property = "og:title"
                    content = "Contacto | El Recuento del Mercado"
                />
                <meta 
                    property = "og:description" 
                    content =  "¡Hola! Encuentra las cuentas de correo y ligas a redes sociales en donde nos puedes encontrar."
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
        <div className = "contact">
            <div className = "contact__header">
                <img
                    src = {Banner}
                    alt = "Contacto"
                    className = "contact__header-image"
                />
            </div>
            <div className = "contact__content">
                <div className = "contact__content-hi">
                    <h2 className = "contact__content-hi-title">
                        ¡Hola!
                    </h2>
                    <img
                        src = {Hi}
                        alt = "¡Hola!"
                        className = "contact__content-hi-image"
                    />
                    <p className = "contact__content-hi-p">
                        Si quieres saludar o mandar un comentario puedes hacerlo a:     
                        <br/>
                        <a
                            href = "mailto:contacto@recuentomercado.com"
                            target = "_top"
                            rel = "noopener noreferrer"
                        >
                            contacto@recuentomercado.com
                        </a>
                    </p>
                </div>
                <div className = "contact__content-colaborate">
                    <img
                        src = {Colaborate}
                        alt = "Colabora con nosotros"
                        className = "contact__content-colaborate-image"
                    />
                    <p className = "contact__content-colaborate-p">
                        Si te interesa promover un producto, servicio o empresa en nuestra página, contratar un curso, una conferencia o invitarnos a colaborar contigo manda un correo a:
                        <br/>
                        <a
                            href = "mailto:contrato@recuentomercado.com"
                            target = "_top"
                            rel = "noopener no referrer"
                        >
                            contrato@recuentomercado.com
                        </a>
                    </p>
                </div>
                <div className = "contact__content-social">
                    <h2 className = "contact__content-social-title">
                        ¡Síguenos!
                    </h2>
                    <div className = "contact__content-social-follow">
                        <a 
                            href = "https://www.instagram.com/recuentomercado"
                            target = "_blank"
                            rel = "noopener noreferrer"
                        >
                            <div className = "contact__content-social-follow-button">
                                <FontAwesomeIcon icon = {["fab", "instagram"]} />
                                <div className = "contact__content-social-follow-button-arrow"></div>
                            </div>
                        </a>
                        <a 
                            href = "https://www.facebook.com/recuentomercado"
                            target = "_blank"
                            rel = "noopener noreferrer"
                        >
                            <div className = "contact__content-social-follow-button">
                                <FontAwesomeIcon icon = {["fab", "facebook"]} />
                                <div className = "contact__content-social-follow-button-arrow"></div>
                            </div>
                        </a>
                    </div>
                    <div className = "contact__content-social-listen">
                        <h3 className = "contact__content-social-listen-title">
                            Escuchanos en:
                        </h3>
                        <a 
                            href = "https://www.instagram.com/recuentomercado"
                            target = "_blank"
                            rel = "noopener noreferrer"
                        >
                            <div className = "contact__content-social-listen-button">
                                <FontAwesomeIcon icon = {["fas", "podcast"]}/>
                                <div className = "contact__content-social-listen-button-arrow"></div>
                            </div>
                        </a>
                        <a 
                            href = "https://www.instagram.com/recuentomercado"
                            target = "_blank"
                            rel = "noopener noreferrer"
                        >
                            <div className = "contact__content-social-listen-button">
                                <FontAwesomeIcon icon = {["fab", "spotify"]}/>
                                <div className = "contact__content-social-listen-button-arrow"></div>
                            </div>
                        </a>
                        <a 
                            href = "https://www.instagram.com/recuentomercado"
                            target = "_blank"
                            rel = "noopener noreferrer"
                        >
                            <div className = "contact__content-social-listen-button">
                            <FontAwesomeIcon icon = {["fab", "google"]}/>
                                <div className = "contact__content-social-listen-button-arrow"></div>
                            </div>
                        </a>
                    </div>
                    <div className = "contact__content-social-watch">
                        <h3 className = "contact__content-social-watch-title">
                            Venos en:
                        </h3>
                        <a
                            href = "https://www.youtube.com/channel/UCVXjaPiyO1By_PwCI0l4Wjw"
                            target = "_blank"
                            rel = "noopener noreferrer"
                        >
                            <div className = "contact__content-social-watch-button">
                                <FontAwesomeIcon icon = {["fab", "youtube"]}/>
                                <div className = "contact__content-social-watch-button-arrow"></div>
                            </div>
                        </a>
                    </div>
                    <img
                        src = {Social}
                        alt = "Redes sociales"
                        className = "contact__content-social-image"
                    />
                </div>
            </div>
        </div>
        </>
    );
}