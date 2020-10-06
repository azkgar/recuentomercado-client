import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {getMenuApi} from "../../../api/menu";
import LogoLetras from "../../../assets/img/svg/RM-logo-letras.svg";
import LogoIcono from "../../../assets/img/svg/RM-logo-icono.svg";

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
    const showTextSocial = isVisible ? "show-text social" : "hide-text social"

    const classes = `navbar__hamburguer-menu ${showClass}`

    return(
        <div className = "navbar">
            <div className = "navbar__logo">
                <a href = "/">
                    <img 
                        src = {LogoLetras} 
                        alt = "Logo el Recuento del Mercado" 
                        className = "letters"
                    />
                    <img 
                        src = {LogoIcono} 
                        alt = "Logo el Recuento del Mercado" 
                        className = "icon"
                    />
                </a>
            </div>
            <div className = {classes} ref = {node}>
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
                <ul
                    className = {showClass}
                    mode = "vertical"
                >
                    {menuData.map(item => {
                        const external = item.url.indexOf("http") > -1 ? true : false;

                        if(external) {
                            return(
                                <li
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
                                </li>
                            );
                        }

                        return(
                            <li
                                key = {item._id}
                                className = {showText}
                                onClick = {visible}
                            >
                                <Link to = {item.url}>
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                    <li className = {showTextSocial}
                        id = "first-social"
                    >
                        <a
                            href = "https://www.youtube.com/channel/UCVXjaPiyO1By_PwCI0l4Wjw"
                            rel = "noopener noreferrer"
                            target = "_blank"
                        >
                            YouTube
                        </a>
                    </li>
                    <li className = {showTextSocial}>
                        <a
                            href = "https://www.facebook.com/RecuentoMercado"
                            rel = "noopener noreferrer"
                            target = "_blank"
                        >
                            Facebook
                        </a>
                    </li>
                    <li className = {showTextSocial}>
                        <a
                            href = "https://www.spotify.com"
                            rel = "noopener noreferrer"
                            target = "_blank"
                        >
                            Spotify
                        </a>
                    </li>
                    <li className = {showTextSocial}>
                        <a
                            href = "https://www.instagram.com/RecuentoMercado"
                            rel = "noopener noreferrer"
                            target = "_blank"
                        >
                            Instagram
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}