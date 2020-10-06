import React from "react";
import CategoriesList from "../components/Web/CategoriesList";
import {useParams} from "react-router-dom";

export default function Categories(){
    const {tag} = useParams();

    return(
        <CategoriesList/>
    );
}