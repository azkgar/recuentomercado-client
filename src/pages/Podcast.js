import React from "react";
import {useParams} from "react-router-dom";
import PodcastsList from "../components/Web/PodcastsList";
import PodcastInfo from "../components/Web/PodcastInfo";


export default function Podcast(props) {
    const {location, history} = props;
    const {url} = useParams();

    return(
        <>
        {url ? <PodcastInfo url = {url} /> :
            <PodcastsList
                location = {location}
                history = {history}
            />
        }
        </>
    );
}