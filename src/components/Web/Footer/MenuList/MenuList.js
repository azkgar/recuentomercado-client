import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {getMenuApi} from "../../../../api/menu";

import "./MenuList.scss";

export default function MenuList() {
    const [menuData, setMenuData] = useState([]);

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

    return(
        <div className = "footer-menu">
            {menuData.map(item => {
               const external = item.url.indexOf("http") > -1 ? true : false;

               if(external) {
                   return(
                       <p 
                        key = {item._id}
                        className = "footer-menu__item"
                       >
                           <a
                            href = {item.url}
                            target = "_blank"
                            rel = "noopener noreferrer"
                           >
                               {item.title}
                           </a>
                       </p>
                   );
               }


               return(
                   <p
                    key = {item._id}
                    className = "footer-menu__item"
                   >
                       <Link to = {item.url}>
                           {item.title}
                       </Link>
                   </p>
               );
            })}
        </div>
    );
}