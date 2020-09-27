import React, {useState, useEffect} from "react";
import {Row, Col, Form, Input, Button, DatePicker, Select, notification} from "antd";
import {FontSizeOutlined, LinkOutlined, FileImageOutlined, YoutubeOutlined} from "@ant-design/icons";
import moment from "moment";
import {getAccessTokenApi} from "../../../../api/auth";
import {addVideoApi, updateVideoApi} from "../../../../api/video";
import {getUsersActiveApi} from "../../../../api/user";
import {getCategoriesApi} from "../../../../api/category";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./AddEditVideoForm.scss";

export default function AddEditVideoForm(props) {
    const {setIsVisibleModal, setReloadVideos, video} = props;
    const [videoData, setVideoData] = useState({});
    const [userData, setUserData] = useState([]);
    const [categories, setCategories] = useState([]);
    const token = getAccessTokenApi();

    useEffect(()=>{
        if(video){
            setVideoData(video);
        } else {
            setVideoData({});
        }
    },[video]);

    useEffect(() => {
        getUsersActiveApi(token, true)
        .then(response => {
            setUserData(response.users);
        });
    }, [token]);

    useEffect(() => {
        getCategoriesApi()
        .then(response => {
            const arrayCategories = [];
            response.category.forEach(item => {
                item.active && arrayCategories.push(item);
            });
            setCategories(arrayCategories);
        });
    }, []);

    const processVideo = e => {
        e.preventDefault();
        const {title, url, date, categories, username, description, link, cover} = videoData;

        if(!title || !url || !link || !date || !username || !categories || !description || !cover){
            notification["error"]({message: "Todos los campos son obligatorios."});
        } else {
            if(!video){
                addVideo();
            } else {
                updateVideo();
            }
        }
    }

    const addVideo = () => {
        const token = getAccessTokenApi();
        addVideoApi(token, videoData)
        .then(response => {
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({message: response.message});
            setIsVisibleModal(false);
            setReloadVideos(true);
            setVideoData({});
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    }

    const updateVideo = () => {
        const token = getAccessTokenApi();
        updateVideoApi(token, video._id, videoData)
        .then(response => {
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({message: response.message});
            setIsVisibleModal(false);
            setReloadVideos(true);
            setVideoData({});
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    }

    return(
        <div className = "add-edit-Video-form">
            <AddEditForm
                videoData = {videoData}
                setVideoData = {setVideoData}
                video = {video}
                processVideo = {processVideo}
                userData = {userData}
                categories = {categories}
            />
        </div>
    );
}

function AddEditForm(props) {
    const {videoData, setVideoData, video, processVideo, userData, categories} = props;

    return(
        <Form
            className = "add-edit-video-form"
            onSubmit = {processVideo}
        >
            <Row gutter = {24}>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FontSizeOutlined/>}
                            placeholder = "Título"
                            value = {videoData.title}
                            onChange = {e => setVideoData({...videoData, title: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<LinkOutlined/>}
                            placeholder = "url"
                            value = {videoData.url}
                            onChange = {e => setVideoData({...videoData, url: transformTextToUrl(e.target.value)})}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <DatePicker
                            style = {{width: "100%"}}
                            format = "DD/MM/YYYY HH:mm:ss"
                            placeholder = "Fecha de publicación"
                            showTime = {{defaultValue: moment("00:00:00", "HH:mm:ss")}}
                            value = {videoData.date && moment(videoData.date)}
                            onChange = {(e, value) => setVideoData({...videoData, date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter = {24}>
                <Col span = {8}>
                    <Form.Item>
                        <UserList
                            userData = {userData}
                            setVideoData = {setVideoData}
                            videoData = {videoData}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <CategoriesList
                            categories = {categories}
                            setVideoData = {setVideoData}
                            videoData = {videoData}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FileImageOutlined/>}
                            placeholder = "URL de portada"
                            value = {videoData.cover}
                            onChange = {e => setVideoData({...videoData, cover: e.target.value})}
                            className = "cover-image"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter = {24}>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<YoutubeOutlined />}
                            placeholder = "Video url link"
                            value = {videoData.link}
                            onChange = {e => setVideoData({...videoData, link: e.target.value})}
                            className = "video-link"
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FontAwesomeIcon
                                icon = {["fab", "google"]}
                                className = "video"
                            />}
                            placeholder = "Descripción para Google SEO"
                            value = {videoData.description}
                            onChange = {e => setVideoData({...videoData, description: e.target.value})}
                            className = "video-link"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Button
                type = "primary"
                htmlType = "submit"
                className = "btn-submit"
                onClick = {processVideo}
            >
                {video ? "Actualizar" : "Publicar"}
            </Button>
        </Form>
    );
}

function transformTextToUrl(text) {
    const url = text.replace(" ", "-");
    return url.toLowerCase();
}

function UserList(props) {
    const {Option} = Select;
    const {userData, videoData, setVideoData} = props;

    return(
        <Form.Item>
            <Select
                placeholder = "Autor"
                onChange = {e => setVideoData({...videoData, username: e})}
                value = {videoData.username}
            >
                {userData.map( user => 
                <Option
                    key = {user._id}
                    value = {user.name}
                >
                    {user.name}
                </Option>)}
            </Select>
        </Form.Item>
    );
}

function CategoriesList(props) {
    const {categories, videoData, setVideoData} = props;
    const {Option} = Select;

    const categoryList = [];
    categories.map(category => (
        categoryList.push(category.tag)
    ));

    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = e => {
        if(videoData) {
            setSelectedItems(e);
            setVideoData({...videoData, categories: e});
        } else {
            setSelectedItems(e);
        }
    }

    const filteredOptions = categoryList.filter(o => !selectedItems.includes(o));

    return(
        <Select
            mode = "multiple"
            placeholder = "Selecciona la(s) categoría(s)"
            value = {videoData ? videoData.categories : selectedItems}
            onChange = {e => handleChange(e)}
            style = {{width: "100%"}}
            className = "categories"
        >
            {filteredOptions.map(item => (
                <Option
                    key = {item}
                    value = {item}
                >
                    {item}
                </Option>
            ))}
        </Select>
    );
}