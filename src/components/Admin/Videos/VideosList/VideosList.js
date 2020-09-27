import React from "react";
import {List, Button, Modal, notification} from "antd";
import {EyeOutlined, EditOutlined, DeleteOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {getAccessTokenApi} from "../../../../api/auth";
import {deleteVideoApi} from "../../../../api/video";

import "./VideosList.scss";

const {confirm} = Modal;

export default function VideosList(props) {
    const {videos, setReloadVideos, editVideo} = props;

    const deleteVideo = video => {
        const accessToken = getAccessTokenApi();

        confirm ({
            icon: <QuestionCircleOutlined/>,
            title: "Eliminando video",
            content: `¿Estás seguro de eliminar el video ${video.title}`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteVideoApi(accessToken, video._id)
                .then(response => {
                    const typeNotification = response.code === 200 ? "success" : "warning";
                    notification[typeNotification]({message: response.message});
                    setReloadVideos(true);
                })
                .catch(() => {
                    notification["error"]({message: "Error del servidor"});
                });
            }
        });
    };

    return(
        <div className = "videos-list">
            <List
                dataSource = {videos.docs}
                renderItem = {video =>
                    <Video
                        video = {video}
                        deleteVideo = {deleteVideo}
                        editVideo = {editVideo}
                    />
                }
            />
        </div>
    );
}

function Video(props) {
    const {video, deleteVideo, editVideo} = props;

    return(
        <List.Item
            actions = {[
                <Link to = {`/videos/${video.url}`} target = "_blank">
                    <Button type = "primary">
                        <EyeOutlined/>
                    </Button>
                </Link>,
                <Button
                    type = "primary"
                    onClick = {() => editVideo(video)}
                >
                    <EditOutlined/>
                </Button>,
                <Button
                    type = "danger"
                    onClick = {() => deleteVideo(video)}
                >
                    <DeleteOutlined/>
                </Button>
            ]}
        >
            <List.Item.Meta title = {video.title}/>
        </List.Item>
    );
}