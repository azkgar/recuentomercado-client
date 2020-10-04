import React, {useState, useEffect} from "react";
import {Col, Row} from "antd";
import {Link} from "react-router-dom";
import moment from "moment";
import "moment/locale/es-mx";
import {getPostsApi} from "../../../api/post";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";

import "./NewsBanner.scss";

export default function NewsBanner() {
    const [posts, setPosts] = useState();
    const page = 1;

    useEffect(()=>{
        getPostsApi(6,page)
        .then(response => {
            setPosts(response.posts.docs);
        });
    },[]);

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
        <div className = "news-banner">
            <h2>
                Artículos populares
            </h2>
            <Row gutter = {24}>
                {posts.map((post) => {
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
            <Link to = "/articulos">
                <button className = "redirect-button">
                    Más artículos
                    <div className = "redirect-arrow"></div>
                </button>
            </Link>
        </div>
    );
}