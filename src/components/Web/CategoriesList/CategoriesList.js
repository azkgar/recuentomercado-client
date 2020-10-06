import React, {useEffect, useState} from "react";
import {getCategoriesApi} from "../../../api/category";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";
import Missing from "../../../assets/img/png/Missing.png";
import Banner from "../../../assets/img/jpg/recuento-mercado-categorias.jpg";

import "./CategoriesList.scss";

export default function CategoriesList() {
    const [categories, setCategories] = useState();

    useEffect(() => {
        getCategoriesApi()
        .then( response => {
            const arrayCategories = [];
            response.category.forEach(item => {
                item.active && arrayCategories.push(item);
            });
            setCategories(arrayCategories);
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
            <Helmet></Helmet>
            <div className = "categories-cover">
                <img
                    alt = "Categorías"
                    src = {Banner}
                />
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