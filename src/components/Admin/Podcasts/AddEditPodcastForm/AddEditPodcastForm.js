import React, {useState, useEffect} from "react";
import {Row, Col, Form, Input, Button, DatePicker, Select, notification} from "antd";
import {FontSizeOutlined, LinkOutlined, FileImageOutlined} from "@ant-design/icons";
import moment from "moment";
import {getAccessTokenApi} from "../../../../api/auth";
import {addPodcastApi, updatePodcastApi} from "../../../../api/podcast";
import {getUsersActiveApi} from "../../../../api/user";
import {getCategoriesApi} from "../../../../api/category";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./AddEditPodcastForm.scss";

export default function AddEditPodcastForm(props) {
    const {setIsVisibleModal, setReloadPodcasts, podcast} = props;
    const [podcastData, setPodcastData] = useState({});
    const [userData, setUserData] = useState([]);
    const [categories, setCategories] = useState([]);
    const token = getAccessTokenApi();

    useEffect(()=>{
        if(podcast){
            setPodcastData(podcast);
        } else {
            setPodcastData({});
        }
    },[podcast]);

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

    const processPodcast = e => {
        e.preventDefault();
        const {title, url, date, categories, username, description, link, cover} = podcastData;

        if(!title || !url || !link || !date || !username || !categories || !description || !cover){
            notification["error"]({message: "Todos los campos son obligatorios."});
        } else {
            if(!podcast){
                addPodcast();
            } else {
                updatePodcast();
            }
        }
    }

    const addPodcast = () => {
        const token = getAccessTokenApi();
        addPodcastApi(token, podcastData)
        .then(response => {
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({message: response.message});
            setIsVisibleModal(false);
            setReloadPodcasts(true);
            setPodcastData({});
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    }

    const updatePodcast = () => {
        const token = getAccessTokenApi();
        updatePodcastApi(token, podcast._id, podcastData)
        .then(response => {
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({message: response.message});
            setIsVisibleModal(false);
            setReloadPodcasts(true);
            setPodcastData({});
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    }

    return(
        <div className = "add-edit-podcast-form">
            <AddEditForm
                podcastData = {podcastData}
                setPodcastData = {setPodcastData}
                podcast = {podcast}
                processPodcast = {processPodcast}
                userData = {userData}
                categories = {categories}
            />
        </div>
    );
}

function AddEditForm(props) {
    const {podcastData, setPodcastData, podcast, processPodcast, userData, categories} = props;

    return(
        <Form
            className = "add-edit-podcast-form"
            onSubmit = {processPodcast}
        >
            <Row gutter = {24}>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FontSizeOutlined/>}
                            placeholder = "Título"
                            value = {podcastData.title}
                            onChange = {e => setPodcastData({...podcastData, title: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<LinkOutlined/>}
                            placeholder = "url"
                            value = {podcastData.url}
                            onChange = {e => setPodcastData({...podcastData, url: transformTextToUrl(e.target.value)})}
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
                            value = {podcastData.date && moment(podcastData.date)}
                            onChange = {(e, value) => setPodcastData({...podcastData, date: moment(value, "DD/MM/YYYY HH:mm:ss").toISOString()})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter = {24}>
                <Col span = {8}>
                    <Form.Item>
                        <UserList
                            userData = {userData}
                            setPodcastData = {setPodcastData}
                            podcastData = {podcastData}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <CategoriesList
                            categories = {categories}
                            setPodcastData = {setPodcastData}
                            podcastData = {podcastData}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FileImageOutlined/>}
                            placeholder = "URL de portada"
                            value = {podcastData.cover}
                            onChange = {e => setPodcastData({...podcastData, cover: e.target.value})}
                            className = "cover-image"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter = {24}>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FontAwesomeIcon
                                icon = {["fas", "podcast"]}
                                className = "podcast"
                            />}
                            placeholder = "Podcast url link"
                            value = {podcastData.link}
                            onChange = {e => setPodcastData({...podcastData, link: e.target.value})}
                            className = "podcast-link"
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FontAwesomeIcon
                                icon = {["fab", "google"]}
                                className = "podcast"
                            />}
                            placeholder = "Descripción para Google SEO"
                            value = {podcastData.description}
                            onChange = {e => setPodcastData({...podcastData, description: e.target.value})}
                            className = "podcast-link"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Button
                type = "primary"
                htmlType = "submit"
                className = "btn-submit"
                onClick = {processPodcast}
            >
                {podcast ? "Actualizar" : "Publicar"}
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
    const {userData, podcastData, setPodcastData} = props;

    return(
        <Form.Item>
            <Select
                placeholder = "Autor"
                onChange = {e => setPodcastData({...podcastData, username: e})}
                value = {podcastData.username}
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
    const {categories, podcastData, setPodcastData} = props;
    const {Option} = Select;

    const categoryList = [];
    categories.map(category => (
        categoryList.push(category.tag)
    ));

    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = e => {
        if(podcastData) {
            setSelectedItems(e);
            setPodcastData({...podcastData, categories: e});
        } else {
            setSelectedItems(e);
        }
    }

    const filteredOptions = categoryList.filter(o => !selectedItems.includes(o));

    return(
        <Select
            mode = "multiple"
            placeholder = "Selecciona la(s) categoría(s)"
            value = {podcastData ? podcastData.categories : selectedItems}
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