import React from "react";
import {useParams} from "react-router-dom";
import NewsList from "../components/Web/NewsList";

export default function News(props) {
    const {location, history} = props;
    const {url} = useParams();

    return(
        <NewsList
            location = {location}
            history = {history}
        />
    );
}