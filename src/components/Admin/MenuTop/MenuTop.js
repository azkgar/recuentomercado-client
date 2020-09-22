import React from "react";
import {Button} from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined} from "@ant-design/icons";
import Logo from "../../../assets/img/png/RM-logotipo.png";
import {logout} from "../../../api/auth";

import "./MenuTop.scss";

export default function MenuTop(props) {
    const {menuCollapsed, setMenuCollapsed} = props;
    const logoutUser = () => {
        logout();
        window.location.reload();
    }

    return(
        <div className = "menu-top">
            <div className="menu-top__left">
                <img
                    className = "menu-top__left-logo"
                    src={Logo}
                    alt="El Recuento del Mercado"
                />
                <Button
                    type ="Link"
                    onClick = {() => setMenuCollapsed(!menuCollapsed)}
                >
                    {menuCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                </Button>
            </div>
            <div className = "menu-top__right">
                <Button
                    type = "Link"
                    onClick = {logoutUser}
                >
                    <PoweroffOutlined/>
                </Button>
            </div>   
        </div>
    );
}