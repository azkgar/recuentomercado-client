import React from "react";
import {Route, Switch} from "react-router-dom";
import NavBar from "../components/Web/NavBar";
import Footer from "../components/Web/Footer";

export default function LayoutBasic(props){
    const {routes} = props;

    return(
        <>
            <NavBar/>
            <LoadRoutes routes = {routes} />
            <Footer/>
        </>
    );
}

function LoadRoutes({routes}) {
    return(
        <Switch>
            {
                routes.map((route, index) => (
                    <Route
                        key = {index}
                        path = {route.path}
                        exact = {route.exact}
                        component = {route.component}
                    />
                ))
            }
        </Switch>
    );
}