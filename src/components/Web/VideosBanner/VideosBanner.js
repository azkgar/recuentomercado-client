import React, {useState, useEffect} from "react";
import {Col, Row} from "antd";
import {Link} from "react-router-dom";
import {getVideosApi} from "../../../api/video";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";

import "./VideosBanner.scss";

export default function VideosBanner() {
    const [videos, setVideos] = useState();
    const [page, setPage] = useState(1);

    useEffect(() => {
        getVideosApi(5,page)
        .then(response => {
            setVideos(response.videos.docs);
            if(!response.videos.docs.length){
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

    if(!videos){
        return(
            <img
                className = "logo-spin"
                src = {Icono}
                alt = "Cargando"
            />
        );
    }

    return(
        <div className = "videos-banner">
            <h2>
                Video blogs
            </h2>
            {videos.map((video, index) =>{
                if(index === 0){
                    return(
                        <Link to = {`/videos/${video.url}`} key = {video._id}>
                            <div className = "videos-banner__main">
                                <img
                                    className = "videos-banner__main-cover"
                                    src = {video.cover}
                                    alt = {`Portadad del video ${video.title}`}
                                />
                                <h3 className = "videos-banner__main-title">
                                    {video.title}
                                </h3>
                                <p className = "videos-banner__main-description">
                                    {video.description}
                                </p>
                            </div>
                        </Link>
                    );
                } else {
                    return(
                        <div 
                            className = "videos-banner__list"
                            key = {video._id}
                        >
                            <Link to = {`/videos/${video.url}`}>
                                <img
                                    className = "videos-banner__list-cover"
                                    src = {video.cover}
                                    alt = {`Portadad del video ${video.title}`}
                                />
                            </Link>
                        </div>
                    );
                }
            })}
            <Link to = "/videos">
                <button
                    className = "videos-banner__button"
                >
                    Más videos
                    <div className = "read-arrow"></div>
                </button>
            </Link>
            <div className = "videos-banner__carousel">
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