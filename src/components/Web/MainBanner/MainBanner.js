import React, {useState, useEffect} from "react";
import {getPostsApi} from "../../../api/post";
import {Link} from "react-router-dom";
import {Spin} from "antd";
import Icono from "../../../assets/img/svg/RM-logo-icono.svg";

import "./MainBanner.scss";

export default function MainBanner() {
    const [posts, setPosts] = useState();
    const [current, setCurrent] = useState(0);
    const page = 1;

    useEffect(() => {
        getPostsApi(3,page)
        .then(response => {
            setPosts(response.posts.docs);
        });
    },[]);

    const nextPost = () => {
        if(current === 2) {
            setCurrent(0);
        } else {
            const next = current + 1;
            setCurrent(next);
        }
    }

    const prevPost = () => {
        if(current === 0) {
            setCurrent(2);
        } else {
            const prev = current - 1;
            setCurrent(prev);
        }
    }

    const carouselFill1 = "carousel-left filled";
    const carouselEmpty1 = "carousel-left empty";

    const carouselFill2 = "carousel-center filled";
    const carouselEmpty2 = "carousel-center empty";

    const carouselFill3 = "carousel-right filled";
    const carouselEmpty3 = "carousel-right empty";

    if(!posts){
        return(
            
            <img
                className = "logo-spin"
                src = {Icono}
            />
        )
    }

    return(
        <div className = "main-banner">
            {posts.map((post, index) => {
                return(
                    <img
                        key = {post._id}
                        src = {post.cover}
                        alt = {`Portada de la noticia ${post.title}`}
                        className = {index === current ? "show-cover" : "hide-cover"}
                    />
                );
            })}
            <div className = {posts ? "filter" : "hide-text"}></div>
            {posts.map((post, index) => {
                return(
                    <h1
                        key = {post._id}
                        className = {index === current ? "show-text" : "hide-text"}
                    >
                        {post.title}
                    </h1>
                );
            })}
            {posts.map((post, index) => {
                return(
                    <p
                        key = {post._id}
                        className = {index === current ? "show-text" : "hide-text"}
                    >
                        {post.description}
                    </p>
                );
            })}
            {posts.map((post, index) => {
                return(
                    <Link
                        to = {`/noticias/${post.url}`}
                        key = {post._id}
                    >
                        <button
                            className = {index === current ? "show-button" : "hide-button"}
                        >
                            Leer más
                            <div className = "read-arrow"></div>
                        </button>
                    </Link>
                );
            })}
            <div
                className = {current === 0 ? carouselFill1 : carouselEmpty1}
            ></div>
            <div
                className = {current === 1 ? carouselFill2 : carouselEmpty2}
            ></div>
            <div
                className = {current === 2 ? carouselFill3 : carouselEmpty3}
            ></div>
            <button
                className = "prev-button"
                onClick = {prevPost}
            >
                <div className = "prev-arrow"></div>
            </button>
            <button
                className = "next-button"
                onClick = {nextPost}
            >
                <div className = "next-arrow"></div>
            </button>
        </div>
    );
}