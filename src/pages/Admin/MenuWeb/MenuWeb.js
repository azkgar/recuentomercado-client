import React, {useState, useEffect} from "react";
import {getMenuApi} from "../../../api/menu";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList";
import {Helmet} from "react-helmet";

export default function MenuWeb() {
    const [menu, setMenu] = useState([]);
    const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

    useEffect(() => {
        getMenuApi()
        .then(response => {
            setMenu(response.menu);
        });
        setReloadMenuWeb(false);
    }, [reloadMenuWeb]);

    return(
        <>
        <Helmet>
            <title>Admin | Menú</title>
            <meta
                name = "description"
                content = "Página para agregar, eliminar y modificar el menú de la página El Recuento del Mercado"
            />
        </Helmet>
        <div className = "menu-web">
            <MenuWebList
                menu = {menu}
                setReloadMenuWeb = {setReloadMenuWeb}
            />
        </div>
        </>
    );
}