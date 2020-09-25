import React, {useState, useEffect} from "react";
import {Row, Col, Form, Input, Button, DatePicker, Select, notification} from "antd";
import {FontSizeOutlined, LinkOutlined, FileImageOutlined} from "@ant-design/icons";
import moment from "moment";
import {Editor} from "@tinymce/tinymce-react";
import {getAccessTokenApi} from "../../../../api/auth";
import {addPostApi, updatePostApi} from "../../../../api/post";
import {getUsersActiveApi} from "../../../../api/user";
import {getCategoriesApi} from "../../../../api/category";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./AddEditPostForm.scss";

export default function AddEditPostForm(props) {
    const {setIsVisibleModal, setReloadPosts, post} = props;
    const [postData, setPostData] = useState({});
    const [userData, setUserData] = useState([]);
    const [categories, setCategories] = useState([]);
    const token = getAccessTokenApi();

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

    const processPost = e => {
        e.preventDefault();
        const {title, url, content, date, categories, username, description} = postData;

        if(!title || !url || !content || !date || !username || !categories || !description){
            notification["error"]({message: "Todos los campos son obligatorios."});
        } else {
            if(!post){
                addPost();
            } else {
                updatePost();
            }
        }
    }

    const addPost = () => {
        const token = getAccessTokenApi();
        addPostApi(token, postData)
        .then(response => {
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({message: response.message});
            setIsVisibleModal(false);
            setReloadPosts(true);
            setPostData({});
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    }

    const updatePost = () => {
        const token = getAccessTokenApi();
        updatePostApi(token, post._id, postData)
        .then(response => {
            const typeNotification = response.code === 200 ? "success" : "warning";
            notification[typeNotification]({message: response.message});
            setIsVisibleModal(false);
            setReloadPosts(true);
            setPostData({});
        })
        .catch(() => {
            notification["error"]({message: "Error del servidor."});
        });
    }

    return(
        <div className = "add-edit-post-form">
            <AddEditForm
                postData = {postData}
                setPostData = {setPostData}
                post = {post}
                processPost = {processPost}
                userData = {userData}
                categories = {categories}
            />
        </div>
    );
}

function AddEditForm(props) {
    const {postData, setPostData, post, processPost, userData, categories} = props;

    return(
        <Form
            className = "add-edit-post-form"
            onSubmit = {processPost}
        >
            <Row gutter = {24}>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FontSizeOutlined/>}
                            placeholder = "Título"
                            value = {postData.title}
                            onChange = {e => setPostData({...postData, title: e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<LinkOutlined/>}
                            placeholder = "url"
                            value = {postData.url}
                            onChange = {e => setPostData({...postData, url: transformTextToUrl(e.target.value)})}
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
                            value = {postData.date && moment(postData.date)}
                            onChange = {(e, value) => setPostData({...postData, date: moment(value, "DD/MM/YYY HH:mm:ss").toISOString()})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter = {24}>
                <Col span = {8}>
                    <Form.Item>
                        <UserList
                            userData = {userData}
                            setPostData = {setPostData}
                            postData = {postData}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <CategoriesList
                            categories = {categories}
                            setPostData = {setPostData}
                            postData = {postData}
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FileImageOutlined/>}
                            placeholder = "URL de portada"
                            value = {postData.cover}
                            onChange = {e => setPostData({...postData, cover: e.target.value})}
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
                                icon = {["fab", "pinterest-p"]}
                                className = "pinterest"
                            />}
                            placeholder = "Pinterest cover url"
                            value = {postData.pinterest}
                            onChange = {e => setPostData({...postData, pinterest: e.target.value})}
                            className = "pinterest-cover-image"
                        />
                    </Form.Item>
                </Col>
                <Col span = {8}>
                    <Form.Item>
                        <Input
                            prefix = {<FontAwesomeIcon
                                icon = {["fab", "google"]}
                                className = "pinterest"
                            />}
                            placeholder = "Descripción par Google SEO"
                            value = {postData.description}
                            onChange = {e => setPostData({...postData, description: e.target.value})}
                            className = "pinterest-cover-image"
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Editor
                    apiKey = "mt7kuybeq0q9f5t5281d5rf68n924lt12oiadyukeqpjohub"
                    value = {postData.content ? postData.content : ""}
                    init = {{
                        selector: "textarea",
                        height: 500,
                        menubar: true,
                        plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                            "fullscreen preview emoticons"
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic underline strikethrough  blockquote emoticons subscript superscript code forecolor backcolor | alignleft aligncenter alignright alignjustify |bullist numlist outdent indent | removeformat | help | image editimage imageoptions | fullscreen preview ',
                        textcolor_rows: "4"
                    }}
                    onBlur = {e => setPostData({...postData, content: e.target.getContent()})}
                />
            </Form.Item>
            <Button
                type = "primary"
                htmlType = "submit"
                className = "btn-submit"
                onClick = {processPost}
            >
                {post ? "Actualizar" : "Publicar"}
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
    const {userData, postData, setPostData} = props;

    return(
        <Form.Item>
            <Select
                placeholder = "Autor"
                onChange = {e => setPostData({...postData, username: e})}
                value = {postData.username}
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
    const {categories, postData, setPostData} = props;
    const {Option} = Select;

    const categoryList = [];
    categories.map(category => (
        categoryList.push(category.tag)
    ));

    const [selectedItems, setSelectedItems] = useState([]);

    const handleChange = e => {
        if(postData) {
            setSelectedItems(e);
            setPostData({...postData, categories: e});
        } else {
            setSelectedItems(e);
        }
    }

    const filteredOptions = categoryList.filter(o => !selectedItems.includes(o));

    return(
        <Select
            mode = "multiple"
            placeholder = "Selecciona la(s) categoría(s)"
            value = {postData ? postData.categories : selectedItems}
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