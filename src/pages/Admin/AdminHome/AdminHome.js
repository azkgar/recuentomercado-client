import React from "react";
import {Helmet} from "react-helmet";

export default function AdminHome() {
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
            <h1>Estamos en Admin</h1>
        </div>
        </>
    );
}