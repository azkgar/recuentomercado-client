import React, {useState, useEffect} from "react";
import {Tag, notification} from "antd";
import moment from "moment";
import "moment/locale/es-mx";
import {Redirect, Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import {EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, FacebookMessengerShareButton, FacebookMessengerIcon, LinkedinShareButton, LinkedinIcon, TelegramShareButton, TelegramIcon} from "react-share";
import HyvorTalk from "hyvor-talk-react";
import {getPostApi} from "../../../api/post";
import {getCategoryTagApi} from "../../../api/category";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";
import ScrollTopButton from "../ScrollTopButton";

import "./NewsInfo.scss";

export default function NewsInfo(props) {
    const {url} = props;
    const [postInfo, setPostInfo] = useState(null);
    const [urlExists, setUrlExists] = useState(null);
    const socialUrl = "https://recuentomercado.com/articulos/";
    const [categories, setCategories] = useState([]);
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        getPostApi(url)
        .then( response => {
            if(response.code === 404) {
                setUrlExists(false);
            }
            else if(response.code !== 200) {
                notification["warning"]({message: response.code});
            } else {
                setPostInfo(response.post);
            }
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor"});
        });
    },[url]);

    useEffect(() => {
        const categoriesArray = [];
        if(postInfo){
            if(postInfo.categories.length === 0){
                setCategories(null);
            } else {
                postInfo.categories.map(tag => {
                    getCategoryTagApi(tag)
                    .then( response => {
                        categoriesArray.push({
                            id: response.category[0]._id,
                            tag: response.category[0].tag,
                            url: response.category[0].url
                        });
                        setCategories(categoriesArray);
                        if(categoriesArray.length === postInfo.categories.length){
                            setComplete(true);
                        }
                    });
                });
            }
        }
    },[postInfo]);

    if(urlExists === false){
        return <Redirect to = "/not-found"/>
    } else if (!postInfo){
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
            <title> {postInfo.title} | El Recuento del Mercado</title>
            <meta 
                name = "description" 
                content =  {postInfo.description}
            />
            <link 
                rel = "canonical" 
                href = {`https://recuentomercado.com/articulos/${postInfo.url}`}
            />
            <meta 
                property = "og:title" 
                content =  {`${postInfo.title} | El Recuento del Mercado`}
            />
            <meta 
                property = "og:description" 
                content =  {postInfo.description}
            />
            <meta 
                property = "og:locale" 
                content = "es_MX"
            />
            <meta 
                property = "og:type" 
                content = "article"
            />
            <meta 
                property = "article:published_time" 
                content = {postInfo.date}
            />
            <meta 
                property = "article:autor" 
                content = {postInfo.username} 
            />
            <meta 
                property = "article:tag" 
                content = {postInfo.categories} 
            />
            <meta 
                property = "og:url" 
                content =  {window.location.pathname + window.location.search}
            />
            <meta 
                property = "og:image" 
                content = {postInfo.cover} 
            />
            <meta 
                property = "og:image:secure_url" 
                content = {postInfo.cover} 
            />
            <meta 
                property = "og:image:type" 
                content = "image/jpg" 
            />
            <meta 
                property = "og:image:width" 
                content = "1920" 
            />
            <meta 
                property = "og:image:height" 
                content = "1080" 
            />
            <meta 
                property = "og:image:alt" 
                content = {postInfo.title} 
            />
            <meta 
                property = "og:site_name" 
                content = "El Recuento del Mercado" 
            />
        </Helmet>
        <div className = "post-info">
            <ScrollTopButton/>
            <div className = "post-info__header">
            <img 
                className = "post-info__header-cover"
                src = {postInfo.cover}
                alt = {`Portada de ${postInfo.title}`}
            />
            <div className = "filter"></div>
            <h1 className = "post-info__header-title">
                {postInfo.title}
            </h1>
            <p className = "post-info__header-description">
                {postInfo.description}
            </p>
            </div>
            <div className = "post-info__body">
                <Link to = "/articulos">
                    <button className = "post-info__body-return">
                        <div className = "post-info__body-return-arrow"></div>
                        Regresar
                    </button>
                </Link>
                <div className = "post-info__body-tags">
                    {
                        categories.map(category => {
                            if(complete){
                                return(
                                    <Link
                                        to = {`/categorias/${category.url}`}
                                        key = {category.tag}
                                    >
                                        <Tag className = "post-info__body-tags-item">{category.tag}</Tag>
                                    </Link>
                                );
                            }
                        })
                    }
                </div>
                <div className = "post-info__body-date">
                    <p>
                        {`${moment(postInfo.date).local("es-mx").format("LLLL")} CDMX`}
                    </p>
                </div>
                <div 
                    className = "post-info__body-content"
                    dangerouslySetInnerHTML = {{__html: postInfo.content}}    
                ></div>
                <p className = "post-info__body-writer">
                    {`Reportado por:   ${postInfo.username}`}
                </p>
            </div>
            <div className = "post-info__social">
                <h3 className = "post-info__social-title">
                    Comparte el artículo
                </h3>
                <EmailShareButton
                    url = {`${socialUrl}${url}`}
                    subject = {postInfo.title}
                    body = {`Lee ${postInfo.title} en: `}
                >
                    <EmailIcon/>
                </EmailShareButton>
                <FacebookShareButton
                    url = {`${socialUrl}${url}`}
                    quote = {`Nuevo artículo: ${postInfo.title}`}
                    hashtag = "#ElRecuentoDelMercado"

                >
                    <FacebookIcon/>
                </FacebookShareButton>
                <PinterestShareButton
                    url = {`${socialUrl}${url}`}
                    media = {postInfo.pinterest}
                    description = {postInfo.description}
                >
                    <PinterestIcon/>
                </PinterestShareButton>
                <TwitterShareButton
                    url = {`${socialUrl}${url}`}
                    title = {`Nuevo artículo: ${postInfo.title}`}
                    hashtags = {["ElRecuentoDelMercado"]}
                >
                    <TwitterIcon/>
                </TwitterShareButton>
                <WhatsappShareButton
                    url = {`${socialUrl}${url}`}
                    title = {`Nuevo artículo: ${postInfo.title}`}
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
                    title = {`Nuevo artículo: ${postInfo.title}`}
                    summary = {postInfo.description}
                    source = {socialUrl}
                >
                    <LinkedinIcon/>
                </LinkedinShareButton>
                <TelegramShareButton
                    url = {`${socialUrl}${url}`}
                    title = {`Nuevo artículo: ${postInfo.title}`}
                >
                    <TelegramIcon/>
                </TelegramShareButton>
            </div>
            <div className = "post-info__comments">
                   <HyvorTalk.Embed
                       websiteId = {2098}
                       id = {postInfo._id}
                   /> 
            </div>
        </div>
        </>
    );
}