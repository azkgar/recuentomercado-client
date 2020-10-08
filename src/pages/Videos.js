import React from "react";
import {useParams} from "react-router-dom";
import VideosList from "../components/Web/VideosList";
import VideoInfo from "../components/Web/VideoInfo";

export default function Videos(props) {
    const {location, history} = props;
    const {url} = useParams();

    return(
        <>
        {url ? <VideoInfo url = {url} /> :
            <VideosList
                location = {location}
                history = {history}
            />
        }
        </>
    );
}