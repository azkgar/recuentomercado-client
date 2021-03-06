import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import queryString from "query-string";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import {notification} from "antd";
import {YoutubeOutlined} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/es-mx";
import {getVideosApi} from "../../../api/video";
import useScript from "../../../hooks/useScript";
import Pagination from "../../PaginationVideos";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";
import Banner from "../../../assets/img/jpg/recuento-mercado-videos.jpg";

import "./VideosList.scss";

export default function VideosList(props){
    useEffect(() =>{
        ReactGa.initialize("UA-181332848-2");

        ReactGa.pageview(window.location.pathname + window.location.search);
    },[]);
    
    const {location,history} = props;
    const [videos, setVideos] = useState();
    const [lastVideo, setLastVideo] = useState();
    const {page = 1} = queryString.parse(location.search);

    useEffect(() => {
        getVideosApi(12, page)
        .then(response => {
            if(response.code !== 200) {
                notification["warning"]({message: response.message});
            } else {
                setVideos(response.videos);
            }
        }).catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    },[page]);

    useEffect(() => {
        getVideosApi(1, 1)
        .then(response => {
            if(response.code !== 200) {
                notification["warning"]({message: response.message});
            } else {
                setLastVideo(response.videos.docs[0]);
            }
        }).catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    },[page]);

    if(!videos || !lastVideo){
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
        <Helmet>
            <title>
                Videos | El Recuento del Mercado
            </title>
            <meta
                name = "description" 
                content = "Mira las noticias más relevantes de las empresas que cotizan en bolsa y aprende a invertir de manera responsable."
            />
            <link
                rel = "canonical" href = "https://recuentomercado.com/videos"
            />
            <meta
                property = "og:title"
                content = "Videos | El Recuento del Mercado"
            />
            <meta
                property = "og:description"
                content = "Mira las noticias más relevantes de las empresas que cotizan en bolsa y aprende a invertir de manera responsable."
            />
            <meta
                property = "og:locale"
                content = "es_MX"
            />
            <meta
                property = "og:type"
                content = "website"
            />
            <meta
                property = "og:url"
                content = {window.location.pathname + window.location.search}
            />
            <meta
                property = "og:image"
                content = "http://recuentomercado.com/mstile-310x310.png"
            />
            <meta
                property = "og:image:secure_url"
                content = "https://recuentomercado.com/mstile-310x310.png"
            />
            <meta
                property = "og:image:type"
                content = "image/png"
            />
            <meta
                property = "og:image:width"
                content = "310"
            />
            <meta
                property = "og:image:height"
                content = "310"
            />
            <meta
                property = "og:image:alt"
                content = "El Recuento del Mercado"
            />
            <meta
                property = "og:site_name"
                content = "El Recuento del Mercado"
            />
        </Helmet>
        <div className = "video-list">
            <div className = "video-list__banner">
                <img
                    className = "video-list__banner-image"
                    src = {Banner}
                    alt = "Videos disponibles de El Recuento del Mercado"
                />
            </div>
            <div className = "video-list__content">
                <div className = "video-list__content-suscribe">
                    <h2 className = "video-list__content-suscribe-cta">
                        ¡Suscríbete a El Recuento del Mercado!
                    </h2>
                    <YoutubeButton useScript = {useScript}/>
                </div>
                <h2 className = "video-list__content-title">
                    Nuestros videos
                </h2>
                <Link to = {`/videos/${lastVideo.url}`}>
                    <div className = "video-list__content-recent">
                        <img
                            className = "video-list__content-recent-image"
                            src = {lastVideo.cover}
                            alt = {lastVideo.title}
                        />
                    </div>
                </Link>
                <div className = "video-list__content-videos">
                    {videos.docs.map(video => {
                        const day = moment(video.date).format("DD");
                        const month = moment(video.date).format("MMMM");
                        const year = moment(video.date).format("YYYY");

                        return(
                            <div 
                                className = "video-list__content-videos-item"
                                key =  {video._id}
                            >
                                <img
                                    className = "cover"
                                    src = {video.cover}
                                    alt = {video.title}
                                />
                                <div className = "description-container">
                                    <h3 className = "description-title">
                                        {video.title}
                                    </h3>
                                    <p className = "description-info">
                                        {video.description}
                                    </p>
                                    <p className = "description-date">
                                        {`${day} de ${month} de ${year}`}
                                    </p>
                                    <a
                                      href = {video.link}
                                      target = "_blank"
                                      rel = "noopener noreferrer"
                                      className = "youtube"  
                                    >
                                        <button className = "youtube-button">
                                            <YoutubeOutlined />
                                        </button>
                                    </a>
                                    <Link to = {`/videos/${video.url}`}>
                                        <button className = "video-button">
                                            <div className = "video-button-arrow"></div>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Pagination
                    videos = {videos}
                    location = {location}
                    history = {history}
                />
            </div>
        </div>
        </>
    );
}

function YoutubeButton(props){
   const {useScript} = props;
    useScript("https://apis.google.com/js/platform.js");

    return(
        <div className = "video-list__content-suscribe-button">
            <div className="g-ytsubscribe" data-channelid="UCVXjaPiyO1By_PwCI0l4Wjw" data-layout="full" data-theme="dark" data-count="default"></div>
        </div>
    );
}