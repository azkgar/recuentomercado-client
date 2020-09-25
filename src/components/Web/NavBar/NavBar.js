import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import {getMenuApi} from "../../../api/menu";
import Logo from "../../../assets/img/png/RM-logotipo_fondoblanco.png";

import "./NavBar.scss";

export default function NavBar(){
    const [isVisible, setIsVisible] = useState(false);
    const [menuData, setMenuData] = useState([]);
    const node = useRef()

    useEffect(()=>{
        getMenuApi()
        .then(response => {
            const arrayMenu = [];
            response.menu.forEach(item => {
                item.active && arrayMenu.push(item);
            });
            setMenuData(arrayMenu);
        })
    },[]);
    
    function visible() {
        setIsVisible(!isVisible);
    }

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        setIsVisible(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, []);

    const showClass = isVisible ? "show-menu" : "hide-menu";
    const showText = isVisible ? "show-text" : "hide-text";

    return(
        <div className = "navbar">
            <div className = "navbar__hamburguer-menu" ref = {node}>
                <input
                    checked = {isVisible}
                    type = "checkbox"
                    id = "toggle"
                    onChange = {visible}
                >
                </input>
                <label 
                    htmlFor = "toggle"
                    className = "top"
                ></label>
                <label 
                    htmlFor = "toggle"
                    className = "middle"
                ></label>
                <label 
                    htmlFor = "toggle"
                    className = "bottom"
                ></label>
                <Menu
                    className = {showClass}
                    mode = "vertical"
                >
                    {menuData.map(item => {
                        const external = item.url.indexOf("http") > -1 ? true : false;

                        if(external) {
                            return(
                                <Menu.Item
                                    key = {item._id}
                                    className = {showText}
                                    onClick = {visible}
                                >
                                    <a
                                        href = {item.url}
                                        target = "_blank"
                                        rel = "noopener noreferrer"
                                    >
                                        {item.title}
                                    </a>
                                </Menu.Item>
                            );
                        }

                        return(
                            <Menu.Item
                                key = {item._id}
                                className = {showText}
                                onClick = {visible}
                            >
                                <Link to = {item.url}>
                                    {item.title}
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </Menu>
            </div>
            <a href = "/">
                <img src = {Logo} alt = "Logo el Recuento del Mercado" />
            </a>
        </div>
    );
}