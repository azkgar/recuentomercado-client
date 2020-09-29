import React from "react";
import {Layout} from "antd";
import moment from "moment";
import MenuList from "./MenuList";
import SocialList from "./SocialList";
import Logo from "../../../assets/img/svg/RM-logo-icono.svg";

import "./Footer.scss";

export default function Home(){
    const {Footer} = Layout;

    return(
        <Footer className = "footer">
            <div className = "footer__icon">
                <img
                    src = {Logo}
                    alt = "El Recuento del Mercado"
                />
            </div>
            <MenuList/>
            <SocialList/>
            <div className = "footer__copyright">
                <p className = "footer__copyright-year">
                    Copyright {moment().year()} El Recuento del Mercado. Derechos reservados.
                </p>
            </div>
        </Footer>
    );
}