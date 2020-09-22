import React from "react";
import {Layout, Tabs} from "antd";
import {Redirect} from "react-router-dom";
import Logo from "../../../assets/img/png/RM-logotipo.png";
import RegisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";
import {getAccessTokenApi} from "../../../api/auth";
import {Helmet} from "react-helmet";

import "./SignIn.scss";

export default function SignIn() {
    const {Content} = Layout;
    const {TabPane} = Tabs;

    if(getAccessTokenApi()) {
        return <Redirect to = "/admin" />
    }

    return(
        <>
            <Helmet>
                <title>RM | Entrar</title>
                <meta
                    name = "description"
                    content = "Consola de administrador de El Recuento del Mercado."
                />
            </Helmet>
            <Layout className = "signin">
                <Content className = "signin__content">
                    <h1 className = "signin__content-logo">
                        <img src = {Logo} alt = "El Recuento del Mercado"/>
                    </h1>
                    <div className = "signin__content-tabs">
                        <Tabs type = "card">
                            <TabPane tab = {<span>Entrar</span>} key = "1">
                                <LoginForm/>
                            </TabPane>
                            <TabPane tab = {<span>Nuevo Usuario</span>} key = "2">
                                <RegisterForm/>
                            </TabPane>
                        </Tabs>
                    </div>
                </Content>
            </Layout>
        </>
    );
}