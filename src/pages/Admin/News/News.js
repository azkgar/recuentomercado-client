import React, {useState, useEffect} from "react";
import {Button, notification} from "antd";
import Modal from "../../../components/Modal";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import PostsList from "../../../components/Admin/News/PostsList";
import AddEditPostForm from "../../../components/Admin/News/AddEditPostForm";
import Pagination from "../../../components/Pagination";
import {getPostsApi} from "../../../api/post";
import {Helmet} from "react-helmet";

import "./News.scss";

function News(props) {
    const {location, history} = props;

    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [posts, setPosts] = useState(null);
    const [reloadPosts, setReloadPosts] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    const {page = 1} = queryString.parse(location.search);

    useEffect(() => {
        getPostsApi(12,page)
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
        setReloadPosts(false);
    },[page, reloadPosts]);

    const addPost = () => {
        setIsVisibleModal(true);
        setModalTitle("Zona de redacción");
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal = {setIsVisibleModal}
                setReloadPosts = {setReloadPosts}
                post = {null}
            />
        );
    }

    const editPost = post => {
        setIsVisibleModal(true);
        setModalTitle(`Edita el post ${post.title}`);
        setModalContent(
            <AddEditPostForm
                setIsVisibleModal = {setIsVisibleModal}
                setReloadPosts = {setReloadPosts}
                post = {post}
            />
        );
    }

    if(!posts) {
        return null;
    }

    return(
        <>
            <Helmet>
                <title>Admin | Noticias</title>
                <meta
                    name = "description"
                    content = "Página para redactar, editar y eliminar noticias."
                />
            </Helmet>
            <div className = "news">
                <div className = "news__add-post">
                    <Button
                        type = "primary"
                        onClick = {addPost}
                    >
                        Nuevo Post
                    </Button>
                </div>
                <h4>
                    Nuestras publicaciones
                </h4>
                <PostsList
                    posts = {posts}
                    setReloadPosts = {setReloadPosts}
                    editPost = {editPost}
                />
                <Pagination
                    posts = {posts}
                    location = {location}
                    history = {history}
                />
                <Modal
                    title = {modalTitle}
                    isVisible = {isVisibleModal}
                    setIsVisible = {setIsVisibleModal}
                    width = "75%"
                >
                    {modalContent}
                </Modal>
            </div>
        </>
    );
}

export default withRouter(News);