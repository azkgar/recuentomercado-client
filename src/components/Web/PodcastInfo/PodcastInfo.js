import React, {useState, useEffect} from "react";
import {Tag, notification} from "antd";
import moment from "moment";
import "moment/locale/es-mx";
import {Redirect, Link} from "react-router-dom";
import Helmet from "react-helmet";
import ReactGa from "react-ga";
import {EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, FacebookMessengerShareButton, FacebookMessengerIcon, LinkedinShareButton, LinkedinIcon, TelegramShareButton, TelegramIcon} from "react-share";
import {getPodcastApi} from "../../../api/podcast";
import {getCategoryTagApi} from "../../../api/category";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";
import ScrollTopButton from "../ScrollTopButton";

import "./PodcastInfo.scss";

export default function PodcastInfo(props) {
    useEffect(() =>{
        ReactGa.initialize("UA-181332848-2");

        ReactGa.pageview(window.location.pathname + window.location.search);
    },[]);
    
    const {url} = props;
    const [podcastInfo, setPodcastInfo] = useState(null);
    const [urlExists, setUrlExists] = useState(null);
    const socialUrl = "https://recuentomercado.com/podcast/";
    const [categories, setCategories] = useState([]);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        getPodcastApi(url)
        .then( response => {
            if(response.code === 404) {
                setUrlExists(false);
            }
            else if(response.code !== 200) {
                notification["warning"]({message: response.code});
            } else {
                setPodcastInfo(response.podcast);
            }
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    }, [url]);

    useEffect(() => {
        const categoriesArray = [];
        if(podcastInfo){
            if(podcastInfo.categories.length === 0) {
                setCategories(null);
            } else {
                podcastInfo.categories.map( tag => {
                    getCategoryTagApi(tag)
                    .then( response => {
                        categoriesArray.push({
                            id: response.category[0]._id,
                            tag: response.category[0].tag,
                            url: response.category[0].url
                        });
                        setCategories(categoriesArray);
                        if(categoriesArray.length === podcastInfo.categories.length){
                            setComplete(true);
                        }
                    });
                });
            }
        }
    },[podcastInfo]);

    if(urlExists === false) {
        return <Redirect to = "/not-found"/>
    } else if (!podcastInfo) {
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
            <title> {podcastInfo.title} | El Recuento del Mercado</title>
            <meta 
                name = "description" 
                content =  {podcastInfo.description}
            />
            <link 
                rel = "canonical" 
                href = {`https://recuentomercado.com/videos/${podcastInfo.url}`}
            />
            <meta 
                property = "og:title" 
                content =  {`${podcastInfo.title} | El Recuento del Mercado`}
            />
            <meta 
                property = "og:description" 
                content =  {podcastInfo.description}
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
                content = {podcastInfo.cover} 
            />
            <meta 
                property = "og:image:secure_url" 
                content = {podcastInfo.cover} 
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
                content = {podcastInfo.title} 
            />
            <meta 
                property = "og:site_name" 
                content = "El Recuento del Mercado" 
            />
        </Helmet>
        <div className = "podcast-info">
            <ScrollTopButton/>
            <div className = "podcast-info__body">
                <Link to = "/podcast">
                    <button className = "podcast-info__body-return">
                        <div className = "podcast-info__body-return-arrow"></div>
                        Regresar
                    </button>
                </Link>
                <h1 className = "podcast-info__body-title">
                    {podcastInfo.title}
                </h1>
                <div className = "podcast-info__body-tags">
                    {
                        categories.map(category => {
                            if(complete){
                                return(
                                    <Link
                                        to = {`/categorias/${category.url}`}
                                        key = {category.tag}
                                    >
                                        <Tag className = "podcast-info__body-tags-item">{category.tag}</Tag>
                                    </Link>
                                );
                            }
                        })
                    }
                </div>
                <div className = "podcast-info__body-date">
                    <p>
                        {moment(podcastInfo.date).local("es-mx").format("LL")}
                    </p>
                </div>
                <div className = "podcast-info__body-podcast">
                    <iframe src={`${podcastInfo.link}?theme=custom&primary=00d762&background=061f1f`} frameBorder="0" width="100%" height="220px" allow="autoplay"></iframe>
                </div>
                <p className = "podcast-info__body-description">
                    {podcastInfo.description}
                </p>
                <div className = "podcast-info__social">
                    <h3 className = "podcast-info__social-title">
                        Comparte el podcast
                    </h3>
                    <EmailShareButton
                        url = {`${socialUrl}${url}`}
                        subject = {podcastInfo.title}
                        body = {`Escucha: ${podcastInfo.title} en: `}
                    >
                        <EmailIcon/>
                    </EmailShareButton>
                    <FacebookShareButton
                        url = {`${socialUrl}${url}`}
                        quote = {`Escucha: ${podcastInfo.title}`}
                        hashtag = "#ElRecuentoDelMercado"
                    >
                        <FacebookIcon/>
                    </FacebookShareButton>
                    <PinterestShareButton
                        url = {`${socialUrl}${url}`}
                        media = {podcastInfo.cover}
                        description = {podcastInfo.description}
                    >
                        <PinterestIcon/>
                    </PinterestShareButton>
                    <TwitterShareButton
                        url = {`${socialUrl}${url}`}
                        title = {`Escucha: ${podcastInfo.title}`}
                        hashtags = {["ElRecuentoDelMercado"]}
                    >
                        <TwitterIcon/>
                    </TwitterShareButton>
                    <WhatsappShareButton
                        url = {`${socialUrl}${url}`}
                        title = {`Escucha: ${podcastInfo.title}`}
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
                        title = {`Escucha: ${podcastInfo.title}`}
                        summary = {podcastInfo.description}
                        source = {socialUrl}
                    >
                        <LinkedinIcon/>
                    </LinkedinShareButton>
                    <TelegramShareButton
                        url = {`${socialUrl}${url}`}
                        title = {`Escucha: ${podcastInfo.title}`}
                    >
                        <TelegramIcon/>
                    </TelegramShareButton>
                </div>
            </div>
        </div>
        </>
    );
}