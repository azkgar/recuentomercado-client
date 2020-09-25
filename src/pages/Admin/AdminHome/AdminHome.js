import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import {ACCESS_TOKEN} from "../../../utils/constants";
import jwtDecode from "jwt-decode";

export default function AdminHome() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token || token === "null") {
            setUserName("");
        } else {
            const metaToken = jwtDecode(token);
            const {name} = metaToken;
            setUserName(name);
        }
    }, []);
    
    return(
        <>
        <Helmet>
            <title>Admin | Inicio</title>
            <meta
                name = "description"
                content = "Inicio de la consola de administrador."
            />
        </Helmet>
        <div>
            <h1>¡Bienvenido {userName}! Estamos en Admin</h1>
        </div>
        </>
    );
}