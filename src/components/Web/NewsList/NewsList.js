import React, {useState, useEffect} from "react";
import {Col, Row, notification} from "antd";
import {Link} from "react-router-dom";
import moment from "moment";
import "moment/locale/es-mx";
import queryString from "query-string";
import {Helmet} from "react-helmet";
import ReactGa from "react-ga";
import {getPostsApi} from "../../../api/post";
import Pagination from "../../Pagination";
import SearchBar from "../SearchBar";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";
import Banner from "../../../assets/img/jpg/recuento-mercado-articulos.jpg";

import "./NewsList.scss";

export default function NewsList(props){
    const {location, history} = props;
    const [posts, setPosts] = useState();
    const {page = 1} = queryString.parse(location.search);

    useEffect(() => {
        getPostsApi(12, page)
        .then(response => {
            if(response.code !== 200){
                notification["warning"]({message: response.message});
            } else {
                setPosts(response.posts);
            }
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    },[page]);

    if(!posts){
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
                Artículos | El Recuento del Mercado
            </title>
            <meta
                name = "description" 
                content = "Encuentra las noticias más relevantes de las empresas que cotizan en bolsa y aprende a invertir de manera responsable."
            />
            <link
                rel = "canonical" href = "https://recuentomercado.com/articulos"
            />
            <meta
                property = "og:title"
                content = "Artículos | El Recuento del Mercado"
            />
            <meta
                property = "og:description"
                content = "Encuentra las noticias más relevantes de las empresas que cotizan en bolsa y aprende a invertir de manera responsable."
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
        <div className = "news-list">
                <div className = "news-list__banner">
                    <img
                        className = "news-list__banner-image"
                        src = {Banner}
                        alt = "Artículos disponibles de El Recuento del Mercado"
                    />
                </div>
                <div className = "news-list__content">
                    <h2>
                        Nuestros artículos
                    </h2>
                    <SearchBar/>
                    <Row gutter = {24}>
                        {posts.docs.map(post => {
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
                <Pagination 
                    posts = {posts}
                    location = {location}
                    history = {history}
                />
                </div>
            </div>
        </>
    );
}