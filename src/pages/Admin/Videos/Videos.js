import React, {useState, useEffect} from "react";
import {Button, notification} from "antd";
import Modal from "../../../components/Modal";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import VideosList from "../../../components/Admin/Videos/VideosList";
import AddEditVideoForm from "../../../components/Admin/Videos/AddEditVideoForm";
import PaginationVideos from "../../../components/PaginationVideos";
import {getVideosApi} from "../../../api/video";
import {Helmet} from "react-helmet";

import "./Videos.scss";

function Videos(props) {
    const {location, history} = props;

    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [videos, setVideos] = useState(null);
    const [reloadVideos, setReloadVideos] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    const {page = 1} = queryString.parse(location.search);

    useEffect(() => {
        getVideosApi(12,page)
        .then(response => {
            if(response.code !== 200){
                notification["warning"]({message: response.message});
            } else {
                setVideos(response.videos);
            }
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
        setReloadVideos(false);
    },[page, reloadVideos]);

    const addVideo = () => {
        setIsVisibleModal(true);
        setModalTitle("Nuevo Video");
        setModalContent(
            <AddEditVideoForm
                setIsVisibleModal = {setIsVisibleModal}
                setReloadVideos = {setReloadVideos}
                video = {null}
            />
        );
    }

    const editVideo = video => {
        setIsVisibleModal(true);
        setModalTitle(`Edita el video ${video.title}`);
        setModalContent(
            <AddEditVideoForm
                setIsVisibleModal = {setIsVisibleModal}
                setReloadVideos = {setReloadVideos}
                video = {video}
            />
        );
    }

    if(!videos) {
        return null;
    }

    return(
        <>
            <Helmet>
                <title>Admin | Videos</title>
                <meta
                    name = "description"
                    content = "Página para subir, editar y eliminar videoblogs."
                />
            </Helmet>
            <div className = "videos">
                <div className = "videos__add-video">
                    <Button
                        type = "primary"
                        onClick = {addVideo}
                    >
                        Nuevo Video
                    </Button>
                </div>
                <h4>
                    Nuestros videoblogs
                </h4>
                <VideosList
                    videos = {videos}
                    setReloadVideos = {setReloadVideos}
                    editVideo = {editVideo}
                />
                <PaginationVideos
                    videos = {videos}
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

export default withRouter(Videos);