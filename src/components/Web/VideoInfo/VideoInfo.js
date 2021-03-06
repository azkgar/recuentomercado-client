import React, {useState, useEffect} from "react";
import {Tag, notification} from "antd";
import moment from "moment";
import "moment/locale/es-mx";
import {Redirect, Link} from "react-router-dom";
import Helmet from "react-helmet";
import ReactGa from "react-ga";
import ReactPlayer from "react-player";
import {EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, FacebookMessengerShareButton, FacebookMessengerIcon, LinkedinShareButton, LinkedinIcon, TelegramShareButton, TelegramIcon} from "react-share";
import {getVideoApi} from "../../../api/video";
import {getCategoryTagApi} from "../../../api/category";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";
import ScrollTopButton from "../ScrollTopButton";

import "./VideoInfo.scss";

export default function VideoInfo(props) {
    useEffect(() =>{
        ReactGa.initialize("UA-181332848-2");

        ReactGa.pageview(window.location.pathname + window.location.search);
    },[]);
    
    const {url} = props;
    const [videoInfo, setVideoInfo] = useState(null);
    const [urlExists, setUrlExists] = useState(null);
    const socialUrl = "https://recuentomercado.com/videos/";
    const [categories, setCategories] = useState([]);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        getVideoApi(url)
        .then( response => {
            if(response.code === 404) {
                setUrlExists(false);
            }
            else if(response.code !== 200) {
                notification["warning"]({message: response.code});
            } else {
                setVideoInfo(response.video);
            }
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    }, [url]);

    useEffect(() => {
        const categoriesArray = [];
        if(videoInfo){
            if(videoInfo.categories.length === 0) {
                setCategories(null);
            } else {
                videoInfo.categories.map( tag => {
                    getCategoryTagApi(tag)
                    .then( response => {
                        categoriesArray.push({
                            id: response.category[0]._id,
                            tag: response.category[0].tag,
                            url: response.category[0].url
                        });
                        setCategories(categoriesArray);
                        if(categoriesArray.length === videoInfo.categories.length){
                            setComplete(true);
                        }
                    });
                });
            }
        }
    },[videoInfo]);

    if(urlExists === false) {
        return <Redirect to = "/not-found"/>
    } else if (!videoInfo) {
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
            <title> {videoInfo.title} | El Recuento del Mercado</title>
            <meta 
                name = "description" 
                content =  {videoInfo.description}
            />
            <link 
                rel = "canonical" 
                href = {`https://recuentomercado.com/videos/${videoInfo.url}`}
            />
            <meta 
                property = "og:title" 
                content =  {`${videoInfo.title} | El Recuento del Mercado`}
            />
            <meta 
                property = "og:description" 
                content =  {videoInfo.description}
            />
            <meta 
                property = "og:locale" 
                content = "es_MX"
            />
            <meta 
                property = "og:url" 
                content =  {window.location.pathname + window.location.search}
            />
            <meta 
                property = "og:image" 
                content = {videoInfo.cover} 
            />
            <meta 
                property = "og:image:secure_url" 
                content = {videoInfo.cover} 
            />
            <meta 
                property = "og:image:type" 
                content = "image/jpg" 
            />
            <meta 
                property = "og:image:width" 
                content = "1280" 
            />
            <meta 
                property = "og:image:height" 
                content = "720" 
            />
            <meta 
                property = "og:image:alt" 
                content = {videoInfo.title} 
            />
            <meta 
                property = "og:site_name" 
                content = "El Recuento del Mercado" 
            />
        </Helmet>
        <div className = "video-info">
            <ScrollTopButton/>
            <div className = "video-info__body">
                <Link to = "/videos">
                    <button className = "video-info__body-return">
                        <div className = "video-info__body-return-arrow"></div>
                        Regresar
                    </button>
                </Link>
                <h1 className = "video-info__body-title">
                    {videoInfo.title}
                </h1>
                <div className = "video-info__body-tags">
                    {
                        categories.map(category => {
                            if(complete){
                                return(
                                    <Link
                                        to = {`/categorias/${category.url}`}
                                        key = {category.tag}
                                    >
                                        <Tag className = "video-info__body-tags-item">{category.tag}</Tag>
                                    </Link>
                                );
                            }
                        })
                    }
                </div>
                <div className = "video-info__body-date">
                    <p>
                        {moment(videoInfo.date).local("es-mx").format("LL")}
                    </p>
                </div>
                <div className = "video-info__body-video">
                    <ReactPlayer 
                        url = {videoInfo.link}
                        controls = "true"
                        width = "100%"
                        height = "100%"
                        pip = "true"
                        stopOnUnmount = "false"
                    />
                </div>
                <p className = "video-info__body-description">
                    {videoInfo.description}
                </p>
                <div className = "video-info__social">
                    <h3 className = "video-info__social-title">
                        Comparte el video
                    </h3>
                    <EmailShareButton
                        url = {`${socialUrl}${url}`}
                        subject = {videoInfo.title}
                        body = {`Mira el video ${videoInfo.title} en: `}
                    >
                        <EmailIcon/>
                    </EmailShareButton>
                    <FacebookShareButton
                        url = {`${socialUrl}${url}`}
                        quote = {`Mira el video: ${videoInfo.title}`}
                        hashtag = "#ElRecuentoDelMercado"
                    >
                        <FacebookIcon/>
                    </FacebookShareButton>
                    <PinterestShareButton
                        url = {`${socialUrl}${url}`}
                        media = {videoInfo.cover}
                        description = {videoInfo.description}
                    >
                        <PinterestIcon/>
                    </PinterestShareButton>
                    <TwitterShareButton
                        url = {`${socialUrl}${url}`}
                        title = {`Mira el video: ${videoInfo.title}`}
                        hashtags = {["ElRecuentoDelMercado"]}
                    >
                        <TwitterIcon/>
                    </TwitterShareButton>
                    <WhatsappShareButton
                        url = {`${socialUrl}${url}`}
                        title = {`Mira el video: ${videoInfo.title}`}
                    >
                        <WhatsappIcon/>
                    </WhatsappShareButton>
                    <FacebookMessengerShareButton
                        url = {`${socialUrl}${url}`}
                    >
                        <FacebookMessengerIcon/>
                    </FacebookMessengerShareButton>
                    <LinkedinShareButton
                        url = {`${socialUrl}${url}`}
                        title = {`Mira el video: ${videoInfo.title}`}
                        summary = {videoInfo.description}
                        source = {socialUrl}
                    >
                        <LinkedinIcon/>
                    </LinkedinShareButton>
                    <TelegramShareButton
                        url = {`${socialUrl}${url}`}
                        title = {`Mira el video: ${videoInfo.title}`}
                    >
                        <TelegramIcon/>
                    </TelegramShareButton>
                </div>
            </div>
        </div>
        </>
    );
}