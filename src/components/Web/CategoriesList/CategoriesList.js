import React, {useEffect, useState} from "react";
import {getCategoriesApi} from "../../../api/category";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";
import Missing from "../../../assets/img/png/Missing.png";
import Aprende from "../../../assets/img/jpg/recuento-mercado-aprende.jpg";
import Banner from "../../../assets/img/jpg/recuento-mercado-categorias.jpg";

import "./CategoriesList.scss";

export default function CategoriesList() {
    useEffect(() =>{
        ReactGa.initialize("UA-181332848-2");

        ReactGa.pageview(window.location.pathname + window.location.search);
    },[]);
    
    const [categories, setCategories] = useState();

    useEffect(() => {
        getCategoriesApi()
        .then( response => {
            const arrayCategories = [];
            response.category.forEach(item => {
                item.active && arrayCategories.push(item);
            });
            const orderedCategories = arrayCategories.sort();
            setCategories(orderedCategories);
        });
    },[]);

    if(!categories){
        return(
            <img
                className = "logo-spin"
                src = {Icono}
                alt = "Cargando"
            />
        ) 
    }

    return(
        <>
            <Helmet>
            <title>Categorías | El Recuento del Mercado</title>
                <meta
                    name = "description"
                    content = "Categorías de los artículos disponibles en El Recuento del Mercado"
                />
                <link
                    rel = "canonical"
                    href = "https://recuentomercado.com/categorias/"
                />
                <meta
                    property = "og:title"
                    content = "Categorías | El Recuento del Mercado"
                />
                <meta 
                    property = "og:description" 
                    content =  "Categorías de los artículos disponibles en El Recuento del Mercado"
                />
                <meta 
                    property = "og:locale" 
                    content = "es_MX"
                />
                <meta 
                    property = "og:type" 
                    content = "website"
                />
                <meta 
                    property = "og:url" 
                    content =  {window.location.pathname + window.location.search}
                />
                <meta 
                    property = "og:image" 
                    content = "http://recuentomercado.com/mstile-310x310.png" 
                />
                <meta 
                    property = "og:image:secure_url" 
                    content = "https://recuentomercado.com/mstile-310x310.png"
                />
                <meta 
                    property = "og:image:type" 
                    content = "image/png" 
                />
                <meta 
                    property = "og:image:width" 
                    content = "310" 
                />
                <meta 
                    property = "og:image:height" 
                    content = "310" 
                />
                <meta 
                    property = "og:image:alt"
                    content = "El Recuento del Mercado" 
                />
                <meta 
                    property = "og:site_name" 
                    content = "El Recuento del Mercado" 
                />
            </Helmet>
            <div className = "categories-cover">
                <img
                    alt = "Categorías"
                    src = {Banner}
                />
            </div>
            <div className = "categories-learn">
                <Link to = "/categorias/aprende">
                    <img
                        alt = "Aprende"
                        src = {Aprende}
                    />
                </Link>
            </div>
            <div className = "categories-list">
                <h2 className = "categories-list__title">
                    Encuentra artículos relacionados con:
                </h2>
                { categories.map(category => {
                    return(
                        <Link
                            to = {`/categorias/${category.url}`}
                            key = {category._id}
                        >
                            <div className = "categories-list__item">
                                <img
                                    alt ={category.tag}
                                    src = {category.avatar ? category.avatar : Missing}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}