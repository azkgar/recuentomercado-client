import React, {useState, useEffect} from "react";
import {Button, notification} from "antd";
import Modal from "../../../components/Modal";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import PodcastsList from "../../../components/Admin/Podcasts/PodcastsList";
import AddEditPodcastForm from "../../../components/Admin/Podcasts/AddEditPodcastForm";
import PaginationPodcasts from "../../../components/PaginationPodcasts";
import {getPodcastsApi} from "../../../api/podcast";
import {Helmet} from "react-helmet";

import "./Podcasts.scss";

function Podcasts(props) {
    const {location, history} = props;

    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [podcasts, setPodcasts] = useState(null);
    const [reloadPodcasts, setReloadPodcasts] = useState(false);
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    const {page = 1} = queryString.parse(location.search);

    useEffect(() => {
        getPodcastsApi(12,page)
        .then(response => {
            if(response.code !== 200){
                notification["warning"]({message: response.message});
            } else {
                setPodcasts(response.podcasts);
            }
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
        setReloadPodcasts(false);
    },[page, reloadPodcasts]);

    const addPodcast = () => {
        setIsVisibleModal(true);
        setModalTitle("Nuevo Podcast");
        setModalContent(
            <AddEditPodcastForm
                setIsVisibleModal = {setIsVisibleModal}
                setReloadPodcasts = {setReloadPodcasts}
                podcast = {null}
            />
        );
    }

    const editPodcast = podcast => {
        setIsVisibleModal(true);
        setModalTitle(`Edita el podcast ${podcast.title}`);
        setModalContent(
            <AddEditPodcastForm
                setIsVisibleModal = {setIsVisibleModal}
                setReloadPodcasts = {setReloadPodcasts}
                podcast = {podcast}
            />
        );
    }

    if(!podcasts) {
        return null;
    }

    return(
        <>
            <Helmet>
                <title>Admin | Podcast</title>
                <meta
                    name = "description"
                    content = "Página para subir, editar y eliminar podcasts."
                />
            </Helmet>
            <div className = "podcasts">
                <div className = "podcasts__add-podcast">
                    <Button
                        type = "primary"
                        onClick = {addPodcast}
                    >
                        Nuevo Podcast
                    </Button>
                </div>
                <h4>
                    Nuestros podcasts
                </h4>
                <PodcastsList
                    podcasts = {podcasts}
                    setReloadPodcasts = {setReloadPodcasts}
                    editPodcast = {editPodcast}
                />
                <PaginationPodcasts
                    podcasts = {podcasts}
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

export default withRouter(Podcasts);