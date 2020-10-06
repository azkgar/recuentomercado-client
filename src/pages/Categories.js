import React from "react";
import CategoriesList from "../components/Web/CategoriesList";
import CategoryInfo from "../components/Web/CategoryInfo";
import {useParams} from "react-router-dom";

export default function Categories(){
    const {tag} = useParams();

    return(
        <div>
            {tag ? <CategoryInfo tag = {tag}/> : <CategoriesList/>}
        </div>
    );
}