import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {notification} from "antd";
import queryString from "query-string";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import {getPodcastsApi} from "../../../api/podcast";
import Pagination from "../../PaginationPodcasts";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";
import Banner from "../../../assets/img/jpg/recuento-mercado-podcast.jpg";

import "./PodcastsList.scss";

export default function PodcastsList(props) {
    const {location, history} = props;
    const [podcasts, setPodcasts] = useState();
    const {page = 1} = queryString.parse(location.search);

    useEffect(() => {
        getPodcastsApi(12, page)
        .then(response => {
            if(response.code !== 200){
                notification["warning"]({message: response.message});
            } else {
                setPodcasts(response.podcasts);
            }
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    },[page]);

    if(!podcasts) {
        return(
            <img
                className = "logo-spin"
                src = {Icono}
                alt = "Cargando"
            />
        ); 
    }

    return(
        <>
            <Helmet></Helmet>
            <div className = "podcast-list">
                <div className = "podcast-list__banner">
                    <img
                        className = "podcast-list__banner-image"
                        src = {Banner}
                        alt = "Podcast disponibles de El Recuento del Mercado"
                    />
                </div>
                <div className = "podcast-list__content">
                    <h2>
                        Nuestro podcast
                    </h2>
                    {podcasts.docs.map((podcast, index) =>{
                        let module = index % 2;
                        return(
                            <div 
                                className = {module === 0 ? "podcast-list__content-left" : "podcast-list__content-right"}
                                key = {podcast._id}
                            >
                                <Link to = {`/podcast/${podcast.url}`}>
                                    <img
                                        className = "podcast-list__content-cover"
                                        src = {podcast.cover}
                                        alt = {`Portada del podcast ${podcast.title}`}
                                    />
                                </Link>
                                <div className = "podcast-list__content-description">
                                    <p className = "podcast-list__content-description-text">
                                        {podcast.description}
                                    </p>
                                    <Link to = {`/podcast/${podcast.url}`}>
                                        <button
                                            className = "podcast-list__content-description-button"
                                        >
                                            Escuchar
                                            <div className = "listen-arrow"></div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                    <Pagination
                        podcasts = {podcasts}
                        location = {location}
                        history = {history}
                    />
                </div>
            </div>
        </>
    );
}