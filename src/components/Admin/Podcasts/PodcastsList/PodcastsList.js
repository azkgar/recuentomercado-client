import React from "react";
import {List, Button, Modal, notification} from "antd";
import {EyeOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {getAccessTokenApi} from "../../../../api/auth";
import {deletePodcastApi} from "../../../../api/podcast";

import "./PodcastsList.scss";

const {confirm} = Modal;

export default function PodcastsList(props) {
    const {podcasts, setReloadPodcasts, editPodcast} = props;

    const deletePodcast = podcast => {
        const accessToken = getAccessTokenApi();

        confirm ({
            icon: <QuestionCircleOutlined/>,
            title: "Eliminando podcast",
            content: `¿Estás seguro de eliminar el podcast ${podcast.title}`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deletePodcastApi(accessToken, podcast._id)
                .then(response => {
                    const typeNotification = response.code === 200 ? "success" : "warning";
                    notification[typeNotification]({message: response.message});
                    setReloadPodcasts(true);
                })
                .catch(() => {
                    notification["error"]({message: "Error del servidor"});
                });
            }
        });
    };

    return(
        <div className = "podcasts-list">
            <List
                dataSource = {podcasts.docs}
                renderItem = {podcast =>
                    <Podcast
                        podcast = {podcast}
                        deletePodcast = {deletePodcast}
                        editPodcast = {editPodcast}
                    />
                }
            />
        </div>
    );
}

function Podcast(props) {
    const {podcast, deletePodcast, editPodcast} = props;

    return(
        <List.Item
            actions = {[
                <Link to = {`/podcasts/${podcast.url}`} target = "_blank">
                    <Button type = "primary">
                        <EyeOutlined/>
                    </Button>
                </Link>,
                <Button
                    type = "primary"
                    onClick = {() => editPodcast(podcast)}
                >
                    <EditOutlined/>
                </Button>,
                <Button
                    type = "danger"
                    onClick = {() => deletePodcast(podcast)}
                >
                    <DeleteOutlined/>
                </Button>
            ]}
        >
            <List.Item.Meta title = {podcast.title}/>
        </List.Item>
    );
}