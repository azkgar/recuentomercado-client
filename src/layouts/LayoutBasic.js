import React from "react";
import {Route, Switch} from "react-router-dom";
import NavBar from "../components/Web/NavBar";

import "./LayoutBasic.scss";

export default function LayoutBasic(props){
    const {routes} = props;

    return(
        <>
            <NavBar/>
            <LoadRoutes routes = {routes} />
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