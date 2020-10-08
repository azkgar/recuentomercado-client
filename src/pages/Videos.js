import React from "react";
import {useParams} from "react-router-dom";
import VideosList from "../components/Web/VideosList";

export default function Videos(props) {
    const {location, history} = props;
    const {url} = useParams();

    return(
        <VideosList
            location = {location}
            history = {history}
        />
    );
}