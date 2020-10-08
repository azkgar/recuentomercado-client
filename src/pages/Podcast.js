import React from "react";
import {useParams} from "react-router-dom";
import PodcastsList from "../components/Web/PodcastsList";


export default function Podcast(props) {
    const {location, history} = props;
    const {url} = useParams();

    return(

            <PodcastsList
                location = {location}
                history = {history}
            />

    );
}