import React from "react";
import {useParams} from "react-router-dom";
import NewsList from "../components/Web/NewsList";
import NewsInfo from "../components/Web/NewsInfo";

export default function News(props) {
    const {location, history} = props;
    const {url} = useParams();

    return(
        <>
        {url ? <NewsInfo url = {url} /> : 
        <NewsList
            location = {location}
            history = {history}
        />}
        </>
    );
}