import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {getMenuApi} from "../../../api/menu";
import Menu from "../NavMenu";
import Logo from "../../../assets/img/png/RM-logotipo_fondoblanco.png";

import "./NavBar.scss";

export default function NavBar(){
    const [isVisible, setIsVisible] = useState(false);
    const node = useRef()
    
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

    return(
        <div className = "navbar">
            <Menu
                showClass = {showClass}
            />
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
            </div>
            <a href = "/">
                <img src = {Logo} alt = "Logo el Recuento del Mercado" />
            </a>
            
        </div>
    );
}