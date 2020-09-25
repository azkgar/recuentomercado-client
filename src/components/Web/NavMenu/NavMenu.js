import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import {getMenuApi} from "../../../api/menu";

import "./NavMenu.scss";

export default function NavMenu(props) {
    const [menuData, setMenuData] = useState([]);
    const {showClass} = props;

    useEffect( () => {
        getMenuApi()
        .then(response => {
            const arrayMenu = [];
            response.menu.forEach(item => {
                if(item.active){
                    arrayMenu.push(item);
                }
            });
            setMenuData(arrayMenu);
        });
    }, []);

    return(
        <div className = {showClass}>
            <Menu
                className = "menu-web"
                mode = "vertical"
            >
                {
                    menuData.map(item => {
                        const external = item.url.indexOf("http") > -1 ? true : false;

                        if(external){
                            return(
                                <Menu.Item
                                    key = {item._id}
                                    className = "menu-web__item"
                                >
                                    <a
                                        href = {item.url}
                                        target = "_blank"
                                        rel = "noopener noreferrer"
                                    >
                                        {item.title}
                                    </a>
                                </Menu.Item>
                            )
                        }
                        return(
                            <Menu.Item
                                key = {item._id}
                                className = "menu-web__item"
                            >
                                <Link to = {item.url}>
                                    {item.title}
                                </Link>
                            </Menu.Item>
                        );
                    })
                }
            </Menu>
        </div>
    );
}