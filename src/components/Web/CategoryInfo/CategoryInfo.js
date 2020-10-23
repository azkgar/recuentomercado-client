import React, {useState, useEffect} from "react";
import {Col, Row} from "antd";
import {Link} from "react-router-dom";
import moment from "moment";
import "moment/locale/es-mx";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import {getCategoryApi} from "../../../api/category";
import {getRelatedPostsApi} from "../../../api/post";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";
import Missing from "../../../assets/img/png/Missing.png";
import ScrollTopButton from "../ScrollTopButton";

import "./CategoryInfo.scss";

export default function CategoryInfo(props) {
    const {tag} = props;
    const [avatar, setAvatar]= useState(null);
    const [label, setLabel] = useState(null);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        getCategoryApi(tag)
        .then( response => {
            setAvatar(response.category[0].avatar);
            setLabel(response.category[0].tag);
        });
    },[]);

    useEffect(() => {
        if(label) {
            getRelatedPostsApi(label)
            .then(response => {
                setPosts(response.posts);
            });
        }
    },[label]);

    if(!posts){
        return(
            <img
                className = "logo-spin"
                src = {Icono}
                alt = "Cargando"
            />
        ) 
    }
    
    return(
        <>
            <Helmet>
                <title>{`${tag.toUpperCase()}`} | El Recuento del Mercado</title>
                <meta
                    name = "description"
                    content = {`Artículos relacionados con ${tag.toUpperCase()}`}
                />
                <link
                    rel = "canonical"
                    href = {`https://recuentomercado.com/categorias/${tag}`}
                />
                <meta
                    property = "og:title"
                    content = {`${tag.toUpperCase()} | El Recuento del Mercado`}
                />
                <meta 
                    property = "og:description" 
                    content =  {`Artículos relacionados con ${tag.toUpperCase()}`}
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
                    content =  {window.location.pathname + window.location.search}
                />
                <meta 
                    property = "og:image" 
                    content = {avatar} 
                />
                <meta 
                    property = "og:image:secure_url" 
                    content = {avatar}
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
                    content = {tag.toUpperCase()} 
                />
                <meta 
                    property = "og:site_name" 
                    content = "El Recuento del Mercado" 
                />
            </Helmet>
            <div className = "category">
                <ScrollTopButton/>
                <div className= "category__header">
                    <img
                        className = "category__header-cover"
                        src = {avatar ? avatar : Missing}
                        alt = {`Portada de artículos relacionados con ${label}`}
                    />
                    <div className = "filter"></div>
                </div>
                <div className = "category__body">
                    <Link to = "/categorias">
                        <button className = "category__body-return">
                            <div className = "category__body-return-arrow"></div>
                            Categorías
                        </button>
                    </Link>
                    <h2 className = "category__body-title">
                        {`Artículos relacionados con: ${label}`}
                    </h2>
                    <Row gutter = {24}>
                        {posts.map(post => {
                            const day = moment(post.date).format("DD");
                            const month = moment(post.date).format("MMMM");
                            const year = moment(post.date).format("YYYY");

                            return(
                                <Col xl = {8} lg = {12} md = {12} sm = {24} xs = {24} key = {post._id}>
                                    <Link to = {`/articulos/${post.url}`}>
                                        <div className = "news-card">
                                            <img
                                                className = "news-cover"
                                                src = {post.cover}
                                                alt = {`Portada de la noticia ${post.title}`}
                                            />
                                            <h3 className = "news-title">
                                                {post.title}
                                            </h3>
                                            <p className = "news-content">
                                                {post.description}
                                            </p>
                                            <p className = "news-date">
                                                {`${day} de ${month} de ${year}`}
                                            </p>
                                            <button className = "news-button">
                                                <div className = "news-arrow"></div>
                                            </button>
                                        </div>  
                                    </Link>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </>
    );
}