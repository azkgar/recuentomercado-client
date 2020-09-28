import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {getPodcastsApi} from "../../../api/podcast";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";

import "./PodcastBanner.scss";

export default function PodcastBanner() {
    const [podcasts, setPodcasts] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        getPodcastsApi(2,page)
        .then(response => {
            setPodcasts(response.podcasts.docs);
            if(!response.podcasts.docs.length){
                setPage(1);
            }
        });
    },[page]);

    const nextPage = () => {
        if(page === 4){
            setPage(1);
        } else {
            const next = page + 1;
            setPage(next);
        }
    }

    const prevPage = () => {
        if(page === 1) {
            setPage(4);
        } else {
            const prev = page - 1;
            setPage(prev);
        }
    }

    const carouselFill1 = "carousel-left filled";
    const carouselEmpty1 = "carousel-left empty";

    const carouselFill2 = "carousel-center1 filled";
    const carouselEmpty2 = "carousel-center1 empty";

    const carouselFill3 = "carousel-center2 filled";
    const carouselEmpty3 = "carousel-center2 empty";

    const carouselFill4 = "carousel-right filled";
    const carouselEmpty4 = "carousel-right empty";

    if(!podcasts){
        return(
            <img
                className = "logo-spin"
                src = {Icono}
                alt = "Cargando"
            />
        );
    }

    return(
        <div className = "podcast-banner">
            <h2>
                Podcast
            </h2>
            {podcasts.map((podcast, index) =>{
                return(
                    <div 
                        className = {index === 0 ? "podcast-banner__list-left" : "podcast-banner__list-right"}
                        key = {podcast._id}
                    >
                        <Link to = {`/podcast/${podcast.url}`}>
                            <img
                                className = "podcast-banner__list-cover"
                                src = {podcast.cover}
                                alt = {`Portada del podcast ${podcast.title}`}
                            />
                        </Link>
                        <div className = "podcast-banner__list-description">
                            <p className = "podcast-banner__list-description-text">
                                {podcast.description}
                            </p>
                            <Link to = {`/podcast/${podcast.url}`}>
                                <button
                                    className = "podcast-banner__list-description-button"
                                >
                                    Escuchar
                                    <div className = "listen-arrow"></div>
                                </button>
                            </Link>
                        </div>
                    </div>
                );
            })}
            <Link to = "/podcast">
                <button
                    className = "podcast-banner__button"
                >
                    Más podcasts
                    <div className = "read-arrow"></div>
                </button>
            </Link>
            <div className = "podcast-banner__carousel">
                <div
                    className = {page === 1 ? carouselFill1 : carouselEmpty1}
                ></div>
                <div
                    className = {page === 2 ? carouselFill2 : carouselEmpty2}
                ></div>
                <div
                    className = {page === 3 ? carouselFill3 : carouselEmpty3}
                ></div>
                <div
                    className = {page === 4 ? carouselFill4 : carouselEmpty4}
                ></div>
                <button
                    className = "prev-button"
                    onClick = {prevPage}
                >
                    <div className = "prev-arrow"></div>
                </button>
                <button
                    className = "next-button"
                    onClick = {nextPage}
                >
                    <div className = "next-arrow"></div>
                </button>
            </div>
        </div>
    );
}